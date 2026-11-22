import { useEffect, useRef } from "react";
import { clamp, damp, useFrame } from "./motion";
type Letter = {
  el: HTMLElement;
  x: number;
  y: number;
  r: number;
  delta: number;
  amount: number;
};
export function KineticText({
  text,
  className = "",
  radius = 420,
  fit = false,
}: {
  text: string;
  className?: string;
  radius?: number;
  fit?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null),
    metrics = useRef<{ letters: Letter[]; room: number }>({
      letters: [],
      room: 0,
    });
  const measure = () => {
    const root = ref.current;
    if (!root) return;
    const letters = [
      ...root.querySelectorAll<HTMLElement>("[data-study-letter]"),
    ];
    letters.forEach((el) => (el.style.fontVariationSettings = ""));
    if (fit) {
      root.style.fontSize = "100px";
      root.style.letterSpacing = "-.01em";
      const width = root.getBoundingClientRect().width;
      root.style.removeProperty("font-size");
      root.style.removeProperty("letter-spacing");
      root.parentElement?.style.setProperty(
        "--study-fit",
        `${(root.parentElement.clientWidth / width) * 100}px`,
      );
    }
    const rects = letters.map((el) => el.getBoundingClientRect());
    // Measure both real font-axis endpoints once; frames never read layout.
    letters.forEach(
      (el) => (el.style.fontVariationSettings = '"wdth" 125, "wght" 260'),
    );
    const wide = letters.map((el) => el.getBoundingClientRect().width);
    letters.forEach((el) => (el.style.fontVariationSettings = ""));
    const parent = root.parentElement!;
    const width = root.getBoundingClientRect().width;
    metrics.current = {
      room: Math.max(0, parent.clientWidth - width - 1),
      letters: letters.map((el, i) => ({
        el,
        x: rects[i].x + rects[i].width / 2,
        y: rects[i].y + scrollY + rects[i].height / 2,
        r: radius,
        delta: Math.max(0, wide[i] - rects[i].width),
        amount: 0,
      })),
    };
  };
  useEffect(() => {
    document.fonts.ready.then(measure);
  }, [text, fit]);
  useFrame((f) => {
    const m = metrics.current;
    let needed = 0;
    const desired = m.letters.map((l) => {
      const distance = Math.hypot(
        f.pointer.x - l.x,
        f.pointer.y - (l.y - f.scroll),
      );
      const v =
        f.fine && !f.reduced && f.pointer.inside
          ? clamp(1 - distance / l.r)
          : 0;
      const influence = v * v * (3 - 2 * v);
      needed += influence * l.delta;
      return influence;
    });
    const budget = needed > m.room ? m.room / needed : 1;
    m.letters.forEach((l, i) => {
      const target = desired[i] * budget;
      const next = damp(l.amount, target, 0.12, f.dt);
      if (
        Math.abs(next - l.amount) < 0.0005 &&
        Math.abs(target - l.amount) < 0.001
      )
        return;
      l.amount = next;
      l.el.style.fontVariationSettings = `"wdth" ${70 + 55 * next}, "wght" ${800 - 540 * next}`;
    });
  }, measure);
  return (
    <span ref={ref} className={`study-kinetic ${className}`}>
      <span className="study-sr">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((c, i) =>
          c === " " ? (
            <span className="study-word-space" key={i}>
              {" "}
            </span>
          ) : (
            <span data-study-letter key={i}>
              {c}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
