import type { StudyProject } from "./data";
/** Genuine project captures, or an explicitly labelled diagram derived from source. */
export function ProjectMedia({
  project,
  detail = false,
  phone = false,
}: {
  project: StudyProject;
  detail?: boolean;
  phone?: boolean;
}) {
  const media = project.media;
  if (media.kind === "diagram")
    return (
      <div
        className="study-project-media portfolio-diagram"
        style={{ background: project.tone }}
      >
        <div className="portfolio-diagram-inner">
          <span className="study-meta">{media.eyebrow}</span>
          <h3>{project.name}</h3>
          <ol>
            {media.steps.map((step, i) => (
              <li key={step.title}>
                <span className="portfolio-flow-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <b>{step.title}</b>
                  <small>{step.detail}</small>
                </div>
              </li>
            ))}
          </ol>
          <span className="portfolio-diagram-source">
            Repository architecture · {project.stack[0]}
          </span>
        </div>
      </div>
    );
  const usePhone = phone && !media.desktopOnly;
  const src = usePhone
    ? media.mobile
    : detail
      ? (media.detail ?? media.desktop)
      : media.desktop;
  return (
    <div
      className={`study-project-media portfolio-project-capture ${detail ? "is-detail" : ""}`}
      style={{ background: project.tone }}
    >
      {usePhone ? (
        <div className="study-phone">
          <div className="study-phone-island" />
          <img
            className="sample-screen portfolio-capture"
            src={src}
            alt={media.alt}
            draggable={false}
          />
        </div>
      ) : (
        <div className="study-browser">
          <div className="study-browser-bar">
            <i />
            <i />
            <i />
            <span>{project.name}</span>
          </div>
          <img
            className="sample-screen portfolio-capture"
            src={src}
            alt={
              detail && media.detail
                ? `Actual ${project.name} interface captured in the browser, detail view`
                : media.alt
            }
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
