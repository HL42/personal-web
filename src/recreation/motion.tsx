import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const EASE = "cubic-bezier(.16,1,.3,1)";
export const COVER_EASE = "cubic-bezier(.76,0,.24,1)";
export const clamp = (v: number, lo = 0, hi = 1) =>
  Math.min(hi, Math.max(lo, v));
export const damp = (a: number, b: number, factor: number, dt: number) =>
  a + (b - a) * (1 - Math.pow(1 - factor, dt / (1000 / 60)));
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export const useReduced = () =>
  useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
export type Frame = {
  time: number;
  dt: number;
  scroll: number;
  velocity: number;
  pointer: { x: number; y: number; inside: boolean };
  fine: boolean;
  reduced: boolean;
};
type Engine = {
  frames: Set<(f: Frame) => void>;
  measures: Set<() => void>;
  lenis: Lenis | null;
  refresh: () => void;
};
const Context = createContext<Engine | null>(null);
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReduced();
  const engine = useRef<Engine>({
    frames: new Set(),
    measures: new Set(),
    lenis: null,
    refresh: () => {},
  });
  useEffect(() => {
    const e = engine.current;
    let raf = 0,
      last = 0,
      velocity = 0,
      oldScroll = scrollY,
      measureRaf = 0;
    const pointer = { x: -1000, y: -1000, inside: false };
    const fine = matchMedia("(pointer:fine)").matches;
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
    };
    const leave = () => {
      pointer.inside = false;
    };
    const measure = () => {
      cancelAnimationFrame(measureRaf);
      measureRaf = requestAnimationFrame(() =>
        e.measures.forEach((fn) => fn()),
      );
    };
    e.refresh = measure;
    if (!reduced)
      e.lenis = new Lenis({ lerp: 0.085, smoothWheel: true, autoRaf: false });
    const loop = (time: number) => {
      const dt = last ? clamp(time - last, 1, 64) : 16.667;
      last = time;
      e.lenis?.raf(time);
      const speed = (e.lenis?.velocity ?? scrollY - oldScroll) / (dt / 16.667);
      oldScroll = scrollY;
      velocity = damp(velocity, speed, 0.12, dt);
      const f = { time, dt, scroll: scrollY, velocity, pointer, fine, reduced };
      e.frames.forEach((fn) => fn(f));
      raf = requestAnimationFrame(loop);
    };
    document.documentElement.classList.toggle(
      "study-custom-cursor",
      fine && !reduced,
    );
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    document.fonts.ready.then(measure);
    document.fonts.addEventListener("loadingdone", measure);
    measure();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(measureRaf);
      ro.disconnect();
      e.lenis?.destroy();
      e.lenis = null;
      document.documentElement.classList.remove("study-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measure);
      document.fonts.removeEventListener("loadingdone", measure);
    };
  }, [reduced]);
  return <Context.Provider value={engine.current}>{children}</Context.Provider>;
}
export function useEngine() {
  const e = useContext(Context);
  if (!e) throw new Error("MotionProvider required");
  return e;
}
export function useFrame(
  callback: (frame: Frame) => void,
  measure?: () => void,
) {
  const e = useEngine();
  const current = useRef(callback),
    currentMeasure = useRef(measure);
  current.current = callback;
  currentMeasure.current = measure;
  useEffect(() => {
    const frame = (f: Frame) => current.current(f);
    const read = () => currentMeasure.current?.();
    e.frames.add(frame);
    e.measures.add(read);
    e.refresh();
    return () => {
      e.frames.delete(frame);
      e.measures.delete(read);
    };
  }, [e]);
}
export function useReveal(
  root: React.RefObject<HTMLElement | null>,
  key?: string,
) {
  const reduced = useReduced();
  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const animations: Animation[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          animations.push(
            entry.target.animate(
              [
                { opacity: 0, transform: "translateY(48px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 1100, easing: EASE },
            ),
          );
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    el.querySelectorAll("[data-study-reveal]").forEach((n) => io.observe(n));
    return () => {
      io.disconnect();
      animations.forEach((a) => a.cancel());
    };
  }, [root, reduced, key]);
}
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const bounds = useRef({ x: 0, y: 0, w: 0, h: 0, fixed: false }),
    pos = useRef({ x: 0, y: 0 });
  useFrame(
    (f) => {
      const el = ref.current;
      if (!el) return;
      const b = bounds.current;
      const x = f.pointer.x - b.x,
        y = f.pointer.y - (b.y - (b.fixed ? 0 : f.scroll));
      const active =
        f.fine &&
        !f.reduced &&
        f.pointer.inside &&
        Math.abs(x) < b.w / 2 + 50 &&
        Math.abs(y) < b.h / 2 + 50;
      pos.current.x = damp(pos.current.x, active ? x * 0.35 : 0, 0.15, f.dt);
      pos.current.y = damp(pos.current.y, active ? y * 0.35 : 0, 0.15, f.dt);
      el.style.transform = `translate3d(${pos.current.x}px,${pos.current.y}px,0)`;
    },
    () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      bounds.current = {
        x: r.x + r.width / 2 - pos.current.x,
        y:
          r.y +
          (el.closest("header") ? 0 : scrollY) +
          r.height / 2 -
          pos.current.y,
        w: r.width,
        h: r.height,
        fixed: !!el.closest("header"),
      };
    },
  );
  return (
    <span ref={ref} className={`study-magnet ${className}`}>
      {children}
    </span>
  );
}
