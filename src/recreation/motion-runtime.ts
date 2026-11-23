import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import type Lenis from "lenis";
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
export class Engine {
  readonly frames = new Set<(frame: Frame) => void>();
  readonly measures = new Set<() => void>();
  lenis: Lenis | null = null;
  refresh: () => void = () => {};
  connect(lenis: Lenis | null, refresh: () => void) {
    this.lenis = lenis;
    this.refresh = refresh;
  }
  disconnect() {
    this.lenis?.destroy();
    this.lenis = null;
  }
}
export const MotionContext = createContext<Engine | null>(null);
export function useEngine() {
  const e = useContext(MotionContext);
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
  useLayoutEffect(() => {
    current.current = callback;
    currentMeasure.current = measure;
  }, [callback, measure]);
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
