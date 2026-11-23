import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  MotionContext,
  useReduced,
  useFrame,
  clamp,
  damp,
} from "./motion-runtime";
import { Engine } from "./motion-runtime";
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReduced();
  const [engine] = useState(() => new Engine());
  useEffect(() => {
    const e = engine;
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
    e.connect(
      reduced
        ? null
        : new Lenis({ lerp: 0.085, smoothWheel: true, autoRaf: false }),
      measure,
    );
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
      e.disconnect();
      document.documentElement.classList.remove("study-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measure);
      document.fonts.removeEventListener("loadingdone", measure);
    };
  }, [reduced, engine]);
  return (
    <MotionContext.Provider value={engine}>{children}</MotionContext.Provider>
  );
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
