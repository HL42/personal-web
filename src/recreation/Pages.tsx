import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Hero,
  Marquee,
  SelectedWork,
  Gallery,
  Statement,
  Services,
} from "./Sections";
import { KineticText } from "./KineticText";
import { StudyLink } from "./Chrome";
import { ProjectMedia } from "./Media";
import { projects, services, number } from "./data";
import { useReveal } from "./motion";
export function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  return (
    <div ref={root}>
      <Hero />
      <Marquee />
      <SelectedWork />
      <Gallery />
      <Statement />
      <Services />
    </div>
  );
}
function PageTitle({ text, intro }: { text: string; intro?: string }) {
  return (
    <div className="study-page-heading">
      <h1>
        <KineticText text={text} radius={360} />
      </h1>
      {intro && <p>{intro}</p>}
    </div>
  );
}
export function WorkPage() {
  const [grid, setGrid] = useState(false);
  return (
    <section className="study-work-page">
      <div className="study-index-heading">
        <PageTitle text="WORK" />
        <div className="study-view-toggle" role="group" aria-label="View">
          <button aria-pressed={!grid} onClick={() => setGrid(false)}>
            List
          </button>
          <button aria-pressed={grid} onClick={() => setGrid(true)}>
            Grid
          </button>
        </div>
      </div>
      <div className={grid ? "study-project-grid" : "study-project-list"}>
        {projects.map((p, i) => (
          <StudyLink
            key={p.slug}
            to={`/work/${p.slug}`}
            label={p.name}
            className="study-project-index-item"
          >
            {grid ? (
              <ProjectMedia project={p} />
            ) : (
              <span className="study-meta">{number(i)}</span>
            )}
            <h2>{p.name}</h2>
            <span className="study-meta">{p.type}</span>
            <span className="study-meta">{p.year}</span>
          </StudyLink>
        ))}
      </div>
    </section>
  );
}
export function CasePage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const i = projects.indexOf(project);
  return (
    <article className="study-case">
      <StudyLink to="/work" label="Work" className="study-meta">
        ← All work
      </StudyLink>
      <PageTitle text={project.name.toUpperCase()} />
      <dl className="study-case-meta">
        {[
          ["Client", "Demonstration study"],
          ["Role", "Independent recreation"],
          ["Platform", project.platform],
          ["Year", project.year],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="study-meta">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="study-case-cover">
        <ProjectMedia project={project} />
      </div>
      <div className="study-case-description">
        <h2 className="study-meta">(Overview)</h2>
        <div>
          <p className="study-case-lead">An interface in motion.</p>
          <p>
            This is an independently authored demonstration interface for a
            Phase 1 visual study. It reproduces the presentation structure and
            interactions of the reference, using original sample content. These
            are not the original client’s images, application or website.
          </p>
        </div>
      </div>
      <div className="study-case-pair">
        <ProjectMedia project={project} phone />
        <ProjectMedia project={project} detail />
      </div>
      <StudyLink
        className="study-next-project"
        to={`/work/${projects[(i + 1) % projects.length].slug}`}
        label={projects[(i + 1) % projects.length].name}
      >
        <span className="study-meta">Next project →</span>
        <KineticText
          text={projects[(i + 1) % projects.length].name.toUpperCase()}
        />
      </StudyLink>
    </article>
  );
}
export function AboutPage() {
  return (
    <>
      <PageTitle text="ABOUT" />
      <div className="study-about-copy">
        <p>A study of type, movement and interaction.</p>
        <p>
          This Phase 1 build independently recreates the reference’s composition
          and motion. Its colors, spacing, variable font and responsive
          arrangements follow measured reference values. Brand assets and
          project media are original demonstration replacements.
        </p>
      </div>
      <Statement />
    </>
  );
}
export function ServicesPage() {
  return (
    <>
      <PageTitle
        text="SERVICES"
        intro="Design, development and movement, brought together."
      />
      <Services />
    </>
  );
}
const questions = [
  [
    "How was this study built?",
    "React, TypeScript and Vite, using a real variable font, Lenis and native browser animations.",
  ],
  [
    "Are these the original project assets?",
    "No. All demonstration interfaces are independently authored. No reference photographs, videos, source code or logos are included.",
  ],
  [
    "Can I use the contact form?",
    "The form is a local demonstration and sends no data. Phase 2 personalization begins only after Phase 1 is accepted.",
  ],
];
export function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.name.toLowerCase() === slug);
  const [open, setOpen] = useState(0);
  if (!service) return <NotFound />;
  return (
    <article className="study-service-page">
      <StudyLink to="/services" label="Services" className="study-meta">
        ← All services
      </StudyLink>
      <PageTitle
        text={service.name.toUpperCase()}
        intro={service.description}
      />
      <div className="study-service-includes">
        {["Discovery", "Interface design", "Development", "Launch"].map(
          (s, i) => (
            <div key={s}>
              <span className="study-meta">{number(i)}</span>
              <h2>{s}</h2>
              <p>A carefully considered part of the complete experience.</p>
            </div>
          ),
        )}
      </div>
      <section className="study-faq">
        <h2>Questions about this study</h2>
        {questions.map(([q, a], i) => (
          <div
            className={`study-faq-item ${open === i ? "is-open" : ""}`}
            key={q}
          >
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`study-answer-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                data-cursor={open === i ? "Close" : "Open"}
              >
                {q}
                <span aria-hidden="true">{open === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div
              id={`study-answer-${i}`}
              className="study-faq-panel"
              inert={open !== i}
            >
              <p>{a}</p>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
export function ContactPage() {
  const [needs, setNeeds] = useState<string[]>([]),
    [budget, setBudget] = useState(""),
    [complete, setComplete] = useState(false);
  return (
    <>
      <PageTitle
        text="SAY HI"
        intro="A local interaction demonstration. No information leaves this browser."
      />
      <section className="study-contact">
        <div>
          <span className="study-meta">Phase 1 / Form study</span>
          <p>
            The layout is ready for review.
            <br />
            Personalization comes in Phase 2.
          </p>
        </div>
        {complete ? (
          <div className="study-form-success" role="status">
            <h2>Thanks for trying it.</h2>
            <p>This was a local preview. Nothing was sent.</p>
            <button className="study-pill" onClick={() => setComplete(false)}>
              Try again
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setComplete(true);
            }}
          >
            <fieldset>
              <legend className="study-meta">What do you need?</legend>
              <div className="study-chips">
                {[
                  "Website",
                  "Shopify store",
                  "Webflow build",
                  "App design",
                  "Something else",
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    aria-pressed={needs.includes(s)}
                    onClick={() =>
                      setNeeds(
                        needs.includes(s)
                          ? needs.filter((n) => n !== s)
                          : [...needs, s],
                      )
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="study-meta">Rough budget</legend>
              <div className="study-chips">
                {[
                  "Under £3k",
                  "£3k–8k",
                  "£8k–15k",
                  "£15k+",
                  "Not sure yet",
                ].map((s) => (
                  <label className={budget === s ? "is-selected" : ""} key={s}>
                    <input
                      type="radio"
                      name="budget"
                      value={s}
                      checked={budget === s}
                      onChange={() => setBudget(s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="study-field">
              <span className="study-sr">Your name</span>
              <input
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label className="study-field">
              <span className="study-sr">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                required
              />
            </label>
            <label className="study-field">
              <span className="study-sr">What are you making?</span>
              <textarea
                name="message"
                placeholder="What are you making?"
                rows={4}
              />
            </label>
            <button type="submit" className="study-pill study-form-submit">
              Preview enquiry →
            </button>
          </form>
        )}
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="study-not-found">
      <PageTitle text="404" intro="This page isn’t part of the study." />
      <StudyLink className="study-pill" to="/" label="Home">
        Back home →
      </StudyLink>
    </section>
  );
}
