import { Magnetic } from "./motion";
import { PERSON, SITE_COPY } from "../data/portfolio";
import { useRef, useState } from "react";
import { KineticText } from "./KineticText";
import { ProjectMedia } from "./Media";
import { StudyLink } from "./Chrome";
import { projects, skills, services, number } from "./data";
import { clamp, damp, useFrame } from "./motion-runtime";
export function Hero() {
  return (
    <section className="study-hero" aria-labelledby="study-hero-title">
      <div className="study-hero-meta study-meta">
        <span>{SITE_COPY.portfolioLabel}</span>
        <span className="study-hero-role">{PERSON.role}</span>
        <span>{PERSON.shortLocation}</span>
      </div>
      <h1 className="study-hero-name" id="study-hero-title">
        <span className="study-hero-line">
          <KineticText text={PERSON.firstName} fit />
        </span>
        <span className="study-hero-line study-hero-line-last">
          <KineticText text={PERSON.lastName} fit />
        </span>
      </h1>
      <div className="study-hero-bottom">
        <p className="study-hero-description">{PERSON.bio}</p>
        <span className="study-hero-scroll study-meta">
          {SITE_COPY.scrollHint}
        </span>
        <Magnetic className="study-hero-action">
          <StudyLink to="/work" label="Work" className="study-pill">
            {SITE_COPY.workAction}
          </StudyLink>
        </Magnetic>
      </div>
    </section>
  );
}
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null),
    state = useRef({ x: 0, half: 0, top: 0, height: 0 });
  useFrame(
    (f) => {
      const el = ref.current,
        s = state.current;
      if (
        !el ||
        f.reduced ||
        s.top - f.scroll > innerHeight ||
        s.top + s.height - f.scroll < 0
      )
        return;
      s.x -=
        ((0.7 + Math.min(0.35 * Math.abs(f.velocity), 30)) * f.dt) / 16.667;
      if (s.half && s.x < -s.half) s.x += s.half;
      el.style.transform = `translate3d(${s.x}px,0,0) skewX(${clamp(-f.velocity * 0.25, -10, 10)}deg)`;
    },
    () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.parentElement!.getBoundingClientRect();
      Object.assign(state.current, {
        half: el.scrollWidth / 2,
        top: rect.top + scrollY,
        height: rect.height,
      });
    },
  );
  return (
    <div className="study-marquee" aria-label={skills.join(", ")}>
      <div ref={ref} className="study-marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="study-marquee-copy" key={copy}>
            {skills.map((skill) => (
              <span key={skill}>
                {skill}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export function SelectedWork() {
  const section = useRef<HTMLElement>(null),
    dock = useRef<HTMLDivElement>(null),
    floating = useRef<HTMLDivElement>(null),
    bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0),
    [paused, setPaused] = useState(false),
    [slide, setSlide] = useState(0);
  const swipe = useRef({ x: 0, y: 0, moved: false });
  const hovered = useRef(-1),
    focused = useRef(-1),
    current = useRef(0),
    lift = useRef(0),
    follow = useRef({ x: -500, y: 0 }),
    geometry = useRef({
      centres: [] as number[],
      top: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      colTop: 0,
      colBottom: 0,
    });
  useFrame(
    (f) => {
      const g = geometry.current;
      if (!g.centres.length) return;
      const middle = f.scroll + innerHeight / 2;
      let next = 0;
      let distance = Infinity;
      g.centres.forEach((y, i) => {
        if (Math.abs(y - middle) < distance) {
          distance = Math.abs(y - middle);
          next = i;
        }
      });
      if (hovered.current >= 0) next = hovered.current;
      if (focused.current >= 0) next = focused.current;
      if (next !== current.current) {
        current.current = next;
        setActive(next);
        setSlide(0);
      }
      if (bar.current)
        bar.current.style.transform = `scaleX(${clamp((middle - g.centres[0]) / (g.centres.at(-1)! - g.centres[0]))})`;
      const card = floating.current;
      if (!card || !f.fine || innerWidth <= 700 || f.reduced) {
        if (card) card.style.opacity = "0";
        return;
      }
      const inSection =
        g.bottom - f.scroll > innerHeight * 0.15 &&
        g.top - f.scroll < innerHeight * 0.9;
      card.style.opacity = inSection ? "1" : "0";
      const chasing = hovered.current >= 0 && f.pointer.inside;
      lift.current = damp(
        lift.current,
        chasing ? 1 : 0,
        chasing ? 0.15 : 0.08,
        f.dt,
      );
      const liftAmount = lift.current;
      const oldX = follow.current.x;
      follow.current.x = damp(follow.current.x, f.pointer.x, 0.1, f.dt);
      follow.current.y = damp(follow.current.y, f.pointer.y, 0.1, f.dt);
      const dockY = clamp(
        innerHeight / 2 - g.height / 2,
        g.colTop - f.scroll,
        g.colBottom - f.scroll - g.height,
      );
      const scale = g.width / 320 + (1 - g.width / 320) * liftAmount;
      const centreX =
        g.left +
        g.width / 2 +
        (follow.current.x + 190 - g.left - g.width / 2) * liftAmount;
      const centreY =
        dockY +
        g.height / 2 +
        (follow.current.y - dockY - g.height / 2) * liftAmount;
      const rotate =
        clamp(((follow.current.x - oldX) / (f.dt / 16.667)) * 0.6, -12, 12) *
        liftAmount;
      card.style.transform = `translate3d(${centreX - 160}px,${centreY - 200}px,0) rotate(${rotate}deg) scale(${scale})`;
    },
    () => {
      const root = section.current,
        d = dock.current;
      if (!root || !d) return;
      const rows = [...root.querySelectorAll<HTMLElement>(".study-work-row")],
        r = root.getBoundingClientRect(),
        c = d.parentElement!.getBoundingClientRect(),
        frame = d.querySelector(".study-work-frame")!.getBoundingClientRect();
      geometry.current = {
        centres: rows.map((el) => {
          const b = el.getBoundingClientRect();
          return b.top + scrollY + b.height / 2;
        }),
        top: r.top + scrollY,
        bottom: r.bottom + scrollY,
        left: frame.left,
        width: frame.width,
        height: frame.height,
        colTop: c.top + scrollY,
        colBottom: c.bottom + scrollY,
      };
    },
  );
  const media = (
    <div className={`study-preview-layers ${paused ? "is-paused" : ""}`}>
      {projects.map((p, i) => (
        <div
          key={p.slug}
          className={`study-preview-layer ${i === active ? "is-active" : ""}`}
        >
          <ProjectMedia project={p} />
        </div>
      ))}
    </div>
  );
  return (
    <section
      ref={section}
      className="study-selected"
      id="selected-work"
      aria-labelledby="study-work-heading"
    >
      <div className="study-section-head study-meta" data-study-reveal>
        <h2 id="study-work-heading">
          {SITE_COPY.workHeading} ({number(projects.length - 1)})
        </h2>
        <div>
          <button aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? "(Play motion)" : "(Pause motion)"}
          </button>
          <span className="study-work-years">
            {projects.map((p) => p.year).sort()[0]} —{" "}
            {projects
              .map((p) => p.year)
              .sort()
              .at(-1)}
          </span>
        </div>
      </div>
      <div className="study-work-grid">
        <div
          className="study-work-rows"
          onPointerLeave={() => (hovered.current = -1)}
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              onPointerEnter={() => (hovered.current = i)}
              onFocus={() => (focused.current = i)}
              onBlur={() => (focused.current = -1)}
            >
              <StudyLink
                to={`/work/${project.slug}`}
                label={project.name}
                className={`study-work-row ${i === active ? "is-active" : ""}`}
              >
                <span className="study-work-number study-meta">
                  {number(i)}
                </span>
                <span className="study-work-name">
                  {project.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <span className="study-work-year study-meta">
                  {project.year}
                </span>
                <span className="study-work-description study-meta">
                  <span>{project.type}</span>
                  {"note" in project && (
                    <span className="study-accent">{project.note}</span>
                  )}
                  <span className="study-work-cta">View project →</span>
                </span>
              </StudyLink>
            </div>
          ))}
        </div>
        <div className="study-work-column">
          <div className="study-work-dock" ref={dock}>
            <StudyLink
              to={`/work/${projects[active].slug}`}
              label={projects[active].name}
              className="study-work-frame"
            >
              <span className="study-work-rest-number">{number(active)}</span>
              <div
                className="study-docked-media"
                onDragStart={(e) => e.preventDefault()}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  swipe.current = { x: e.clientX, y: e.clientY, moved: false };
                }}
                onPointerUp={(e) => {
                  const dx = e.clientX - swipe.current.x,
                    dy = e.clientY - swipe.current.y;
                  if (
                    innerWidth <= 700 &&
                    Math.abs(dx) > 40 &&
                    Math.abs(dx) > Math.abs(dy)
                  ) {
                    swipe.current.moved = true;
                    setSlide((s) => clamp(s + (dx < 0 ? 1 : -1), 0, 2));
                    if (e.currentTarget.hasPointerCapture(e.pointerId))
                      e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                }}
                onPointerCancel={() => (swipe.current.moved = false)}
                onClickCapture={(e) => {
                  if (swipe.current.moved) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <div
                  className={`study-dock-deck ${paused ? "is-paused" : ""}`}
                  style={{ transform: `translateX(${(-slide * 100) / 3}%)` }}
                >
                  {[0, 1, 2].map((n) => (
                    <div key={n}>
                      <ProjectMedia
                        project={projects[active]}
                        phone={n === 1}
                        detail={n === 2}
                      />
                    </div>
                  ))}
                </div>
                <div className="study-dock-dots" aria-hidden="true">
                  {[0, 1, 2].map((n) => (
                    <i className={slide === n ? "is-current" : ""} key={n} />
                  ))}
                </div>
              </div>
            </StudyLink>
            <div className="study-work-caption study-meta">
              <span>
                <b>{number(active)}</b> / {number(projects.length - 1)}
              </span>
              <span>{projects[active].platform}</span>
            </div>
            <div className="study-work-progress">
              <div ref={bar} />
            </div>
          </div>
        </div>
      </div>
      <div ref={floating} className="study-floating-preview" aria-hidden="true">
        {media}
      </div>
    </section>
  );
}
export function Gallery() {
  const ref = useRef<HTMLElement>(null),
    viewport = useRef<HTMLDivElement>(null),
    track = useRef<HTMLDivElement>(null);
  const state = useRef({
    top: 0,
    height: 0,
    over: 0,
    x: 0,
    offset: 0,
    velocity: 0,
    drag: false,
    start: 0,
    last: 0,
    startOffset: 0,
    moved: false,
  });
  useFrame(
    (f) => {
      const s = state.current,
        el = track.current;
      if (!el) return;
      if (f.reduced || !f.fine || innerWidth <= 700) {
        el.style.transform = "";
        return;
      }
      if (s.top - f.scroll > innerHeight || s.top + s.height - f.scroll < 0)
        return;
      const progress = clamp(
        (f.scroll + innerHeight - s.top) / (innerHeight + s.height),
      );
      if (!s.drag) {
        s.offset += (s.velocity * f.dt) / 16.667;
        s.velocity *= Math.pow(0.92, f.dt / 16.667);
      }
      const desired = clamp(progress * s.over + s.offset, 0, s.over);
      s.offset = desired - progress * s.over;
      s.x = damp(s.x, desired, 0.2, f.dt);
      el.style.transform = `translate3d(${-s.x}px,0,0) skewX(${clamp(-f.velocity * 0.25 + s.velocity * 0.15, -3, 3)}deg)`;
    },
    () => {
      if (!ref.current || !viewport.current || !track.current) return;
      const r = ref.current.getBoundingClientRect();
      Object.assign(state.current, {
        top: r.top + scrollY,
        height: r.height,
        over: Math.max(
          0,
          track.current.scrollWidth -
            viewport.current.clientWidth +
            2 * parseFloat(getComputedStyle(viewport.current).paddingLeft),
        ),
      });
    },
  );
  return (
    <section
      className="study-gallery"
      ref={ref}
      aria-labelledby="study-gallery-heading"
    >
      <div className="study-section-head study-meta" data-study-reveal>
        <h2 id="study-gallery-heading">(Up close)</h2>
        <span>Drag or scroll</span>
      </div>
      <div
        ref={viewport}
        className="study-gallery-viewport"
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.button !== 0 || e.pointerType !== "mouse" || innerWidth <= 700)
            return;
          const s = state.current;
          Object.assign(s, {
            drag: true,
            start: e.clientX,
            last: e.clientX,
            startOffset: s.offset,
            velocity: 0,
            moved: false,
          });
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.drag) return;
          const difference = e.clientX - s.start;
          if (Math.abs(difference) > 6) {
            s.moved = true;
            if (!e.currentTarget.hasPointerCapture(e.pointerId))
              e.currentTarget.setPointerCapture(e.pointerId);
          }
          s.offset = s.startOffset - difference;
          s.velocity = -(e.clientX - s.last);
          s.last = e.clientX;
        }}
        onPointerUp={(e) => {
          state.current.drag = false;
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
          setTimeout(() => {
            state.current.moved = false;
          }, 0);
        }}
        onPointerCancel={() => {
          state.current.drag = false;
          state.current.moved = false;
        }}
        onClickCapture={(e) => {
          if (state.current.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="study-gallery-track" ref={track}>
          {projects.flatMap((p, i) =>
            (p.media.kind === "diagram" ? [false] : [false, true]).map(
              (detail) => (
                <StudyLink
                  to={`/work/${p.slug}`}
                  label={p.name}
                  cursor="Look"
                  key={`${p.slug}-${detail}`}
                  className="study-gallery-item"
                >
                  <div className="study-gallery-frame">
                    <ProjectMedia project={p} detail={detail} phone={!detail} />
                  </div>
                  <div className="study-gallery-caption study-meta">
                    <span>
                      ({number(i)}) {p.name}
                    </span>
                    <span>
                      {p.media.kind === "diagram"
                        ? "Architecture"
                        : p.media.desktopOnly
                          ? detail ? "Desktop · Q&A panel" : "Desktop · setup"
                          : detail ? "Desktop" : "Mobile"}
                    </span>
                  </div>
                </StudyLink>
              ),
            ),
          )}
        </div>
      </div>
    </section>
  );
}
const statement = PERSON.statement;
export function Statement() {
  const ref = useRef<HTMLElement>(null),
    words = useRef<HTMLParagraphElement>(null),
    bounds = useRef({ top: 0, height: 0 }),
    nodes = useRef<HTMLElement[]>([]);
  useFrame(
    (f) => {
      const b = bounds.current;
      const progress = f.reduced
        ? 1
        : clamp((f.scroll - b.top) / (b.height - innerHeight));
      nodes.current.forEach((word, i) => {
        word.style.opacity = String(
          0.14 + 0.86 * clamp(progress * nodes.current.length * 1.1 - i),
        );
      });
    },
    () => {
      if (!ref.current || !words.current) return;
      const r = ref.current.getBoundingClientRect();
      bounds.current = { top: r.top + scrollY, height: r.height };
      nodes.current = [
        ...words.current.querySelectorAll<HTMLElement>(".study-statement-word"),
      ];
    },
  );
  return (
    <section ref={ref} className="study-statement" id="about">
      <div className="study-statement-sticky">
        <h2 className="study-meta study-accent">(Hello)</h2>
        <p className="study-statement-text" ref={words}>
          <span className="study-sr">{statement}</span>
          {statement.split(" ").map((word, i) => (
            <span
              aria-hidden="true"
              className={`study-statement-word ${PERSON.statementEmphasis.includes(word) ? "is-emphasis" : ""} ${word === `${PERSON.city}.` ? "study-accent" : ""}`}
              key={`${word}-${i}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
export function FocusAreas() {
  return (
    <section className="study-services" id="focus">
      <div className="study-section-head study-meta" data-study-reveal>
        <h2>{SITE_COPY.focusHeading}</h2>
        <StudyLink to="/experience" label="Experience">
          {SITE_COPY.focusAction}
        </StudyLink>
      </div>
      <div className="study-services-grid">
        {services.map((s, i) => (
          <StudyLink
            key={s.name}
            to={s.to}
            label={s.name}
            className="study-service"
            cursor="View"
          >
            <div className="study-service-fill" />
            <div className="study-service-content">
              <div className="study-service-top study-meta">
                <span>{number(i)}</span>
                <span className="study-service-arrow">→</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
          </StudyLink>
        ))}
      </div>
    </section>
  );
}
