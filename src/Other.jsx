import NavBar from "./NavBar";
import backgroundImage from "./Background.png";
import { ProjectCards } from "./ProjectCards";
import "./Other.css";

const sections = [
  ["Most Popular Other Projects", "Projects the community is loving"],
  ["Recently Added", "New ideas from student creators"],
  ["Multidisciplinary", "Projects that blend more than one creative field"],
  [
    "Community Project",
    "Projects made to support, connect, or improve a community",
  ],
  [
    "Personal Project",
    "Independent work made from an individual idea or passion",
  ],
  ["Other", "Creative work that does not fit another category"],
];

function Other() {
  return (
    <div className="other-page">
      <NavBar />
      <section
        className="other-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="other-overlay"></div>
        <div className="other-hero-content">
          <p className="other-label">EXPLORE</p>
          <h1>Other</h1>
          <p className="other-description">
            Discover student projects that do not fit into one category—from
            community initiatives and events to experiments and new ideas.
          </p>
        </div>
      </section>
      <main className="other-main-content">
        {sections.map(([title, description]) => (
          <section className="other-project-section" key={title}>
            <div className="other-project-heading">
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <button className="other-view-all-button">View all →</button>
            </div>
            <div className="other-project-row">
              {title === "Most Popular Other Projects" && (
                <ProjectCards category="Other" />
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Other;
