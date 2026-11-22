import type { StudyProject } from "./data";
/** Original demonstration interfaces. No reference images, videos, or logos. */
export function SampleScreen({
  kind,
  detail = false,
}: {
  kind: StudyProject["media"];
  detail?: boolean;
}) {
  if (kind === "play")
    return (
      <div
        className={`sample-screen sample-play ${detail ? "sample-detail" : ""}`}
      >
        <div className="sample-status">
          9:41 <span>●●● ▰</span>
        </div>
        <div className="sample-play-brand">PLAY / PARK</div>
        <div className="sample-welcome">
          Good times.
          <br />
          <strong>Great rewards.</strong>
        </div>
        <div className="sample-ticket">
          YOUR NEXT ADVENTURE{" "}
          <b>
            Book your visit <span>↗</span>
          </b>
          <small>Jump in. Make a day of it.</small>
        </div>
        <div className="sample-squares">
          {["GIFT CARDS", "OUR MENU", "NEW OFFERS", "YOUR REWARDS"].map(
            (s, i) => (
              <div
                key={s}
                style={{
                  background: ["#d76b49", "#d5ae49", "#a998c9", "#6aa5a7"][i],
                }}
              >
                {s}
                <span>{["↗", "☰", "+", "★"][i]}</span>
              </div>
            ),
          )}
        </div>
        <h4>What’s happening</h4>
        <div className="sample-event">
          <span>WEEKEND CLUB</span>
          <b>A little more play.</b>
          <small>Plan your next adventure</small>
        </div>
        <div className="sample-nav">Home · Explore · Rewards · Account</div>
      </div>
    );
  if (kind === "paws")
    return (
      <div
        className={`sample-screen sample-paws ${detail ? "sample-detail" : ""}`}
      >
        <div className="sample-announcement">
          A little care, every day. Free delivery over £30
        </div>
        <div className="sample-shop-nav">
          <b>goodpaws</b>
          <span>☰　Bag (0)</span>
        </div>
        <div className="sample-dog">
          <img
            src="/study/dog.jpg"
            alt="Golden retriever in an independently created demonstration pet shop"
          />
          <h4>
            Hello,
            <br />
            good days.
          </h4>
          <p>Good things for your best friend.</p>
          <span>Explore daily care →</span>
        </div>
        <div className="sample-categories">
          <b>Everyday care</b>
          <b>Happy routines</b>
        </div>
        <div className="sample-calm">
          <small>DAILY WELLNESS</small>
          <h4>Calm, naturally.</h4>
          <div className="sample-bottle">
            <span>
              goodpaws
              <br />
              <strong>
                DAILY
                <br />
                CALM
              </strong>
              <small>100 ml</small>
            </span>
          </div>
          <p>
            Thoughtful ingredients.
            <br />
            Made for everyday moments.
          </p>
        </div>
      </div>
    );
  if (kind === "wear")
    return (
      <div
        className={`sample-screen sample-wear ${detail ? "sample-detail" : ""}`}
      >
        <div className="sample-announcement">
          Independent essentials. Worldwide delivery.
        </div>
        <div className="sample-shop-nav">
          <b>FIELD / FORM</b>
          <span>Menu　Bag</span>
        </div>
        <div className="sample-fashion">
          <img
            src="/study/fashion.jpg"
            alt="Apparel photograph used in an original demonstration fashion store"
          />
          <div>
            <small>THE SUMMER EDIT</small>
            <h4>
              Out of
              <br />
              the ordinary.
            </h4>
            <span>Discover the collection →</span>
          </div>
        </div>
        <p className="sample-brands">EVERYDAY / STUDIO / OUTDOORS</p>
        <div className="sample-products">
          {["The daily tee", "Light layers", "Easy essentials"].map((s, i) => (
            <div key={s}>
              <div style={{ background: ["#d9cec0", "#9ba9a1", "#c6b7a0"][i] }}>
                <span>F / F</span>
              </div>
              <b>{s}</b>
              <small>New collection · £45</small>
            </div>
          ))}
        </div>
        <h4 className="sample-editorial">
          Good design.
          <br />
          Every day.
        </h4>
      </div>
    );
  return (
    <div
      className={`sample-screen sample-agency ${detail ? "sample-detail" : ""}`}
    >
      <div className="sample-agency-nav">
        <b>
          OTHER
          <br />
          STUDIO®
        </b>
        <span>Work　Info　Contact ↗</span>
      </div>
      <div className="sample-agency-hero">
        <small>INDEPENDENT DIGITAL STUDIO</small>
        <h4>
          Make
          <br />
          some
          <br />
          <i>noise.</i>
        </h4>
        <span>Ideas worth moving for.</span>
      </div>
      <div className="sample-agency-work">
        <small>SELECTED PARTNERSHIPS / 2026</small>
        <div>
          <b>
            Furniture.
            <br />
            Reconsidered.
          </b>
          <span>Campaign / Design / Digital</span>
        </div>
      </div>
    </div>
  );
}
export function ProjectMedia({
  project,
  detail = false,
  phone = false,
}: {
  project: StudyProject;
  detail?: boolean;
  phone?: boolean;
}) {
  return (
    <div
      className={`study-project-media study-media-${project.media} ${detail ? "is-detail" : ""}`}
      style={{ background: project.tone }}
    >
      {phone || project.media === "play" ? (
        <div className="study-phone">
          <div className="study-phone-island" />
          <SampleScreen kind={project.media} detail={detail} />
        </div>
      ) : (
        <div className="study-browser">
          <div className="study-browser-bar">
            <i />
            <i />
            <i />
            <span>Independent interface study</span>
          </div>
          <SampleScreen kind={project.media} detail={detail} />
        </div>
      )}
    </div>
  );
}
