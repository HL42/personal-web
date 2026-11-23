import { Magnetic } from "./motion";
import { PERSON, NAVIGATION, SITE_COPY } from "../data/portfolio";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { KineticText } from "./KineticText";
import {
  COVER_EASE,
  EASE,
  clamp,
  damp,
  useEngine,
  useFrame,
  useReduced,
} from "./motion-runtime";
const TransitionContext = createContext<(to: string, label: string) => void>(
  () => {},
);
export function StudyLink({
  to,
  children,
  className = "",
  label,
  cursor = "View",
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  label?: string;
  cursor?: string;
  onClick?: () => void;
}) {
  const go = useContext(TransitionContext);
  return (
    <Link
      draggable={false}
      to={to}
      className={className}
      data-cursor={cursor}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        if (e.button || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
          return;
        e.preventDefault();
        onClick?.();
        go(to, label ?? (e.currentTarget.textContent || ""));
      }}
    >
      {children}
    </Link>
  );
}
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate(),
    location = useLocation(),
    engine = useEngine(),
    reduce = useReduced();
  const panel = useRef<HTMLDivElement>(null),
    busy = useRef(false);
  const [label, setLabel] = useState("");
  useEffect(() => {
    engine.refresh();
  }, [location.pathname, engine]);
  const go = async (to: string, title: string) => {
    if (busy.current) return;
    if (to === location.pathname) {
      engine.lenis?.scrollTo(0, { duration: 1.6 });
      if (!engine.lenis) window.scrollTo(0, 0);
      return;
    }
    if (reduce) {
      navigate(to);
      window.scrollTo(0, 0);
      return;
    }
    busy.current = true;
    setLabel(title);
    engine.lenis?.stop();
    const p = panel.current!;
    p.style.visibility = "visible";
    p.setAttribute("aria-hidden", "false");
    // Let React commit the destination label before measuring its letters.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    const bars = [...p.querySelectorAll<HTMLElement>(".study-cover-bar")];
    const content = p.querySelector<HTMLElement>(".study-cover-content")!;
    // Reveal text only where every staggered bar already covers the page.
    content.animate(
      [{ clipPath: "inset(101% 0 0)" }, { clipPath: "inset(0 0 0)" }],
      {
        duration: 520,
        delay: (bars.length - 1) * 40,
        easing: COVER_EASE,
        fill: "both",
      },
    );
    const entered = bars.map((el, i) =>
      el.animate(
        [{ transform: "translateY(101%)" }, { transform: "translateY(0)" }],
        { duration: 520, delay: i * 40, easing: COVER_EASE, fill: "forwards" },
      ),
    );
    const titleAnimations = [...p.querySelectorAll(".study-cover-letter")].map(
      (letter, index) =>
        letter.animate(
          [
            {
              transform: "translateY(110%)",
              fontVariationSettings: '"wdth" 125,"wght" 200',
            },
            {
              transform: "translateY(0)",
              fontVariationSettings: '"wdth" 70,"wght" 800',
            },
          ],
          {
            duration: 650,
            delay: 200 + index * 16,
            easing: EASE,
            fill: "both",
          },
        ),
    );
    try {
      await Promise.all(entered.map((a) => a.finished));
      navigate(to);
      engine.lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      await Promise.all(titleAnimations.map((animation) => animation.finished));
      const exit = bars.map((el, i) =>
        el.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-101%)" }],
          {
            duration: 500,
            delay: i * 40,
            easing: COVER_EASE,
            fill: "forwards",
          },
        ),
      );
      // Clip against the first departing bar, then keep the whole label hidden.
      // A finished, unfilled fade would restore black text over the new page.
      content.animate(
        [{ clipPath: "inset(0 0 0)" }, { clipPath: "inset(0 0 101%)" }],
        { duration: 500, easing: COVER_EASE, fill: "forwards" },
      );
      content.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-80px)" },
        ],
        { duration: 350, easing: COVER_EASE, fill: "forwards" },
      );
      await Promise.all(exit.map((a) => a.finished));
      document.getElementById("study-main")?.focus({ preventScroll: true });
    } finally {
      p.style.visibility = "hidden";
      p.setAttribute("aria-hidden", "true");
      p.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      engine.lenis?.start();
      engine.refresh();
      busy.current = false;
    }
  };
  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div ref={panel} className="study-cover" aria-hidden="true">
        <div className="study-cover-bars">
          {[0, 1, 2, 3, 4].map((n) => (
            <div className="study-cover-bar" key={n} />
          ))}
        </div>
        <div className="study-cover-content">
          <span className="study-meta">(Next)</span>
          <div className="study-cover-title" aria-label={label}>
            {label.split(" ").map((word, wordIndex) => (
              <span
                className="study-cover-word"
                aria-hidden="true"
                key={wordIndex}
              >
                {Array.from(word).map((letter, index) => (
                  <span className="study-cover-clip" key={index}>
                    <span className="study-cover-letter">{letter}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
          <span className="study-cover-rule" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
export function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: PERSON.timezone,
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}
const links = NAVIGATION;
export function Navigation() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null),
    toggle = useRef<HTMLButtonElement>(null),
    engine = useEngine(),
    location = useLocation();
  useEffect(() => {
    if (!open) return;
    engine.lenis?.stop();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          toggle.current,
          ...menu.current!.querySelectorAll<HTMLAnchorElement>("a"),
        ].filter((n): n is HTMLButtonElement | HTMLAnchorElement => !!n);
        const first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const wide = matchMedia("(min-width:901px)");
    const resize = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", resize);
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      engine.lenis?.start();
      window.removeEventListener("keydown", key);
      wide.removeEventListener("change", resize);
    };
  }, [open, engine]);
  return (
    <>
      <header className="study-header">
        <StudyLink to="/" label="Home" className="study-wordmark" cursor="Home">
          <b>{PERSON.firstName}</b>
          <span>{PERSON.lastName.toLowerCase()}</span>
        </StudyLink>
        <div className="study-header-time study-meta">
          {PERSON.shortLocation} <span>/</span> <Clock />
        </div>
        <nav aria-label="Main navigation" className="study-nav-links">
          {links.slice(1).map(([to, label]) => (
            <Magnetic key={to}>
              <StudyLink
                to={to}
                label={label}
                className={to === "/contact" ? "study-nav-cta" : ""}
              >
                {to === "/contact" ? "Contact" : label}
              </StudyLink>
            </Magnetic>
          ))}
        </nav>
        <button
          ref={toggle}
          className="study-menu-toggle study-meta"
          aria-expanded={open}
          aria-controls="study-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="study-menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <nav
        id="study-menu"
        ref={menu}
        className={`study-menu ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {links.map(([to, label], i) => (
          <StudyLink
            key={to}
            to={to}
            label={label}
            onClick={() => setOpen(false)}
            className={`study-menu-item ${location.pathname === to ? "is-current" : ""}`}
          >
            <span className="study-menu-mask">
              <span style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}>
                {label}
              </span>
            </span>
            <small className="study-meta" aria-hidden="true">
              0{i + 1}
            </small>
          </StudyLink>
        ))}
        <div className="study-menu-footer study-meta">
          <span>
            {PERSON.name} · {PERSON.role}
          </span>
          <span>
            {PERSON.shortLocation} / <Clock />
          </span>
        </div>
      </nav>
    </>
  );
}
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null),
    dot = useRef<HTMLDivElement>(null),
    label = useRef<HTMLSpanElement>(null),
    target = useRef({ text: "", compact: false }),
    state = useRef({ x: -200, y: -200, scale: 0.35 });
  useEffect(() => {
    const over = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>(
        "a,button,[data-cursor]",
      );
      target.current = {
        text: el?.dataset.cursor ?? "",
        compact: !!el?.matches("button,.study-nav-links a,.study-wordmark"),
      };
    };
    document.addEventListener("pointerover", over);
    return () => document.removeEventListener("pointerover", over);
  }, []);
  useFrame((f) => {
    if (!ring.current || !dot.current || !label.current || !f.fine || f.reduced)
      return;
    const s = state.current,
      t = target.current;
    const goal = t.text && !t.compact ? 1 : 0.35;
    s.x = damp(s.x, f.pointer.x, 0.18, f.dt);
    s.y = damp(s.y, f.pointer.y, 0.18, f.dt);
    s.scale = damp(s.scale, goal, 0.15, f.dt);
    ring.current.style.transform = `translate3d(${s.x - 44}px,${s.y - 44}px,0) scale(${s.scale})`;
    ring.current.style.opacity = f.pointer.inside ? "1" : "0";
    ring.current.classList.toggle("is-labeled", !!t.text && !t.compact);
    dot.current.style.transform = `translate3d(${f.pointer.x - 3}px,${f.pointer.y - 3}px,0)`;
    dot.current.style.opacity = f.pointer.inside ? "1" : "0";
    label.current.textContent = t.compact ? "" : t.text;
  });
  return (
    <>
      <div ref={dot} className="study-cursor-dot" aria-hidden="true" />
      <div ref={ring} className="study-cursor-ring" aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
export function Intro() {
  const reduce = useReduced(),
    engine = useEngine(),
    ref = useRef<HTMLDivElement>(null),
    counter = useRef<HTMLSpanElement>(null),
    progress = useRef<HTMLDivElement>(null),
    [show, setShow] = useState(() => {
      try {
        return !sessionStorage.getItem("study-intro-seen");
      } catch {
        return true;
      }
    }),
    speed = useRef(1);
  useEffect(() => {
    if (!show) return;
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0,
      last = 0,
      elapsed = 0,
      done = false;
    engine.lenis?.stop();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = [
      ...document.querySelectorAll<HTMLElement>(
        ".study-header,.study-menu,#study-main,.study-footer",
      ),
    ].map((el) => ({ el, inert: el.inert }));
    background.forEach(({ el }) => (el.inert = true));
    const previous = document.activeElement as HTMLElement | null;
    (el.querySelector("button") as HTMLButtonElement)?.focus({
      preventScroll: true,
    });
    try {
      sessionStorage.setItem("study-intro-seen", "1");
    } catch {
      /* Continue without persistence. */
    }
    const words = [...el.querySelectorAll(".study-intro-letter")];
    words.forEach((w, i) =>
      w.animate(
        [
          {
            transform: "translateY(115%)",
            fontVariationSettings: '"wdth" 125,"wght" 150',
          },
          {
            transform: "translateY(0)",
            fontVariationSettings: '"wdth" 68,"wght" 850',
          },
        ],
        { duration: 750, delay: 80 + i * 30, easing: EASE, fill: "both" },
      ),
    );
    const finish = () => {
      done = true;
      background.forEach(({ el, inert }) => (el.inert = inert));
      document.body.style.overflow = old;
      engine.lenis?.start();
      setShow(false);
      engine.refresh();
    };
    const step = (time: number) => {
      elapsed += last ? (time - last) * speed.current : 0;
      last = time;
      const p = 1 - Math.pow(1 - clamp(elapsed / 1100), 3);
      if (counter.current)
        counter.current.textContent = String(Math.round(p * 100)).padStart(
          3,
          "0",
        );
      if (progress.current) progress.current.style.transform = `scaleX(${p})`;
      if (elapsed > 1650 && !done) {
        done = true;
        const box = el.querySelector(".study-intro-mark")!;
        box.animate([{ transform: "scale(1)" }, { transform: "scale(100)" }], {
          duration: 650 / speed.current,
          easing: COVER_EASE,
          fill: "forwards",
        });
        el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 400 / speed.current,
          delay: 650 / speed.current,
          fill: "forwards",
        }).finished.then(finish, () => {});
      }
      if (!done) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape") speed.current = 4;
    };
    window.addEventListener("keydown", skip);
    return () => {
      cancelAnimationFrame(raf);
      background.forEach(({ el, inert }) => (el.inert = inert));
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = old;
      engine.lenis?.start();
    };
  }, [show, reduce, engine]);
  if (!show || reduce) return null;
  return (
    <div
      ref={ref}
      className="study-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Opening animation"
    >
      <button
        className="study-intro-skip study-meta"
        onClick={() => {
          speed.current = 4;
        }}
      >
        Skip intro
      </button>
      <div className="study-intro-name" aria-label={PERSON.name}>
        {PERSON.firstName.split("").map((c, i) => (
          <span className="study-intro-mask" key={i}>
            <span className="study-intro-letter">{c}</span>
          </span>
        ))}
        <span className="study-intro-mark">L</span>
        <i>in</i>
      </div>
      <div className="study-intro-meta study-meta">
        <span>{PERSON.role} / Portfolio</span>
        <span ref={counter}>000</span>
      </div>
      <div className="study-intro-progress">
        <div ref={progress} />
      </div>
    </div>
  );
}
export function Footer() {
  const engine = useEngine();
  return (
    <footer className="study-footer">
      <p className="study-meta study-footer-label">
        {PERSON.name} / {SITE_COPY.footerPrompt}
      </p>
      <StudyLink to="/contact" label="Contact me" className="study-footer-title">
        <KineticText text={SITE_COPY.footerTitle} radius={420} fit />
      </StudyLink>
      <div className="study-footer-row study-meta">
        <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        <div className="study-footer-socials">
          <a href={PERSON.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={PERSON.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={PERSON.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
        <span>
          {PERSON.city} <Clock />
        </span>
        <button
          onClick={() =>
            window.dispatchEvent(new Event("study-open-preferences"))
          }
        >
          Privacy settings
        </button>
        <button
          onClick={() => {
            if (engine.lenis) engine.lenis.scrollTo(0, { duration: 1.6 });
            else window.scrollTo(0, 0);
          }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
export function ConsentNotice() {
  const [open, setOpen] = useState(false);
  const chosen = useRef(false);
  useEffect(() => {
    try {
      chosen.current = !!localStorage.getItem("study-storage-choice");
    } catch {
      /* Show a dismissible notice when storage is unavailable. */
    }
    const scroll = () => {
      if (!chosen.current && scrollY > 120) setOpen(true);
    };
    const reopen = () => setOpen(true);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("study-open-preferences", reopen);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("study-open-preferences", reopen);
    };
  }, []);
  useEffect(() => {
    document.body.classList.toggle("study-notice-open", open);
    return () => document.body.classList.remove("study-notice-open");
  }, [open]);
  const choose = (value: string) => {
    chosen.current = true;
    try {
      localStorage.setItem("study-storage-choice", value);
    } catch {
      /* Choice still takes effect for the current display. */
    }
    setOpen(false);
  };
  return (
    <section
      className={`study-consent ${open ? "is-open" : ""}`}
      inert={!open}
      aria-label="Storage preferences"
    >
      <p>
        <span className="study-meta study-accent">(Cookies)</span> This site
        remembers display preferences on this device. No analytics or tracking
        cookies are used.
      </p>
      <div>
        <button onClick={() => choose("declined")}>Decline</button>
        <button onClick={() => choose("accepted")}>Accept</button>
        <StudyLink to="/about" label="About this study" cursor="View">
          Privacy
        </StudyLink>
      </div>
    </section>
  );
}
