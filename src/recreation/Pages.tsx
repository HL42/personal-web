import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Hero,
  Marquee,
  SelectedWork,
  Gallery,
  Statement,
  FocusAreas,
} from "./Sections";
import { KineticText } from "./KineticText";
import { StudyLink } from "./Chrome";
import { ProjectMedia } from "./Media";
import { projects, number } from "./data";
import { PERSON, SITE_COPY, experience, SKILL_GROUPS } from "../data/portfolio";
import { useReveal } from "./motion-runtime";
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
      <FocusAreas />
    </div>
  );
}
function PageTitle({ text, intro }: { text: string; intro?: string }) {
  return (
    <div className="study-page-heading">
      <h1>
        <KineticText text={text} radius={360} fit />
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
          ["Project", project.name],
          ["Focus", project.type],
          ["Status", project.status],
          ["Year", project.year],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="study-meta">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="portfolio-project-links">
        {project.live && (
          <a
            className="study-pill"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Visit site →
          </a>
        )}
        {project.github && (
          <a
            className="study-pill"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            View source →
          </a>
        )}
      </div>
      <div className="study-case-cover">
        <ProjectMedia project={project} />
      </div>
      <p className="portfolio-media-caption study-meta">
        {project.media.caption}
      </p>
      <div className="study-case-description">
        <h2 className="study-meta">(Overview)</h2>
        <div>
          <p className="study-case-lead">{project.summary}</p>
          <ul className="portfolio-feature-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className="portfolio-boundary">{project.boundary}</p>
        </div>
      </div>
      <div
        className="portfolio-stack study-chips"
        aria-label="Technology stack"
      >
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      {project.media.kind === "screenshot" && (
        <div className="study-case-pair">
          <ProjectMedia project={project} phone />
          <ProjectMedia project={project} detail />
        </div>
      )}
      <StudyLink
        className="study-next-project"
        to={`/work/${projects[(i + 1) % projects.length].slug}`}
        label={projects[(i + 1) % projects.length].name}
      >
        <span className="study-meta">Next project →</span>
        <KineticText
          text={projects[(i + 1) % projects.length].name.toUpperCase()}
          fit
        />
      </StudyLink>
    </article>
  );
}
export function AboutPage() {
  return (
    <>
      <PageTitle text="ABOUT" intro={PERSON.focus} />
      <div className="study-about-copy">
        <p>
          Useful products.
          <br />
          Reliable systems.
        </p>
        <div>
          {PERSON.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className="study-pill"
            href={PERSON.resume}
            target="_blank"
            rel="noreferrer"
          >
            View resume →
          </a>
        </div>
      </div>
      <section className="portfolio-education">
        <h2 className="study-meta">Education</h2>
        <div>
          <h3>{PERSON.education.school}</h3>
          <p>{PERSON.education.degree}</p>
          <span className="study-meta">
            {PERSON.education.graduation} / {PERSON.education.location}
          </span>
        </div>
      </section>
      <section className="portfolio-skills">
        <h2 className="study-meta">Technical skills</h2>
        <div className="portfolio-skill-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category}>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Statement />
    </>
  );
}
const questions = [
  [
    "What did the internship focus on?",
    "Build and release workflows across Go and Node.js services: Jenkins CI/CD, automated test gates, AI-assisted code review and deployment automation.",
  ],
  [
    "How were deployments validated?",
    "The workflow transferred build artifacts over SCP/SSH, checked service health after deployment and rolled back when validation failed. Prometheus and Grafana supported service observability.",
  ],
  [
    "How do AI projects fit into my work?",
    "RepoWiki explores codebase knowledge and cited retrieval. The multi-source RAG agent explores model-selected tools over policy vectors and relational records. These are scoped projects, not claims of production enterprise adoption.",
  ],
];
export function ExperiencePage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageTitle
        text="EXPERIENCE"
        intro="Software engineering, with a focus on backend systems, delivery automation and application reliability."
      />
      {experience.map((job) => (
        <section className="portfolio-experience" key={job.id}>
          <div className="portfolio-experience-heading">
            <span className="study-meta">
              {job.period} / {job.location}
            </span>
            <h2>{job.role}</h2>
            <p>{job.company}</p>
          </div>
          <div>
            <p className="portfolio-experience-summary">{job.summary}</p>
            <ul className="portfolio-feature-list">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="portfolio-stack study-chips">
              {job.stack?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="study-faq">
        <h2>Engineering in practice</h2>
        {questions.map(([q, a], i) => (
          <div
            className={`study-faq-item ${open === i ? "is-open" : ""}`}
            key={q}
          >
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`experience-answer-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                data-cursor={open === i ? "Close" : "Open"}
              >
                {q}
                <span aria-hidden="true">{open === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div
              id={`experience-answer-${i}`}
              className="study-faq-panel"
              inert={open !== i}
            >
              <p>{a}</p>
            </div>
          </div>
        ))}
      </section>
      <FocusAreas />
    </>
  );
}
export function ContactPage() {
  const [topics, setTopics] = useState<string[]>([]),
    [draft, setDraft] = useState(""),
    [formValues, setFormValues] = useState({
      name: "",
      email: "",
      message: "",
    });
  return (
    <>
      <PageTitle text={SITE_COPY.contactTitle} intro={SITE_COPY.contactIntro} />
      <section className="study-contact">
        <div>
          <span className="study-meta">{PERSON.location}</span>
          <p>{PERSON.focus}</p>
          <a
            className="portfolio-contact-email"
            href={`mailto:${PERSON.email}`}
          >
            {PERSON.email}
          </a>
          <div className="portfolio-project-links">
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
        </div>
        {draft ? (
          <div className="study-form-success" role="status">
            <h2>Your email draft is ready.</h2>
            <p>
              Open it in your email app to review and send. Nothing has been
              submitted to this website.
            </p>
            <a className="study-pill" href={draft}>
              Open email app →
            </a>
            <button className="study-pill" onClick={() => setDraft("")}>
              Edit message
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget),
                name = String(form.get("name")).trim(),
                email = String(form.get("email")).trim(),
                message = String(form.get("message")).trim();
              const body = `Hi Fuquan,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}\nRegarding: ${topics.join(", ") || "Software engineering"}`;
              setDraft(
                `mailto:${PERSON.email}?subject=${encodeURIComponent(topics.join(" / ") || "Software engineering opportunity")}&body=${encodeURIComponent(body)}`,
              );
            }}
          >
            <fieldset>
              <legend className="study-meta">{SITE_COPY.contactLabel}</legend>
              <div className="study-chips">
                {SITE_COPY.contactTopics.map((topic) => (
                  <button
                    type="button"
                    key={topic}
                    aria-pressed={topics.includes(topic)}
                    onClick={() =>
                      setTopics(
                        topics.includes(topic)
                          ? topics.filter((t) => t !== topic)
                          : [...topics, topic],
                      )
                    }
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="study-field">
              <span className="study-sr">Your name</span>
              <input
                name="name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.currentTarget.value })
                }
                placeholder="Your name"
                autoComplete="name"
                required
                maxLength={120}
              />
            </label>
            <label className="study-field">
              <span className="study-sr">Email address</span>
              <input
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.currentTarget.value })
                }
                type="email"
                placeholder="Email address"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label className="study-field">
              <span className="study-sr">Your message</span>
              <textarea
                name="message"
                value={formValues.message}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    message: e.currentTarget.value,
                  })
                }
                placeholder="Your message"
                rows={4}
                required
                maxLength={3000}
              />
            </label>
            <button type="submit" className="study-pill study-form-submit">
              {SITE_COPY.contactButton}
            </button>
            <p className="portfolio-form-note">
              Creates a draft in your email app. This site has no message
              backend.
            </p>
          </form>
        )}
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="study-not-found">
      <PageTitle text="404" intro="This page could not be found." />
      <StudyLink className="study-pill" to="/" label="Home">
        Back home →
      </StudyLink>
    </section>
  );
}
