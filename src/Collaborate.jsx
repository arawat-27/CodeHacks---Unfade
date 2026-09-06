import NavBar from "./NavBar";
import "./Collaborate.css";

const opportunities = [
  {
    tag: "Film",
    title: "Looking for a cinematographer",
    description:
      "I’m filming a short campus story this month and need someone who enjoys warm, documentary-style shots.",
    creator: "Maya Chen",
    role: "Director · USC",
    initials: "MC",
    color: "coral",
    skills: ["Camera", "Editing"],
    time: "2 hours ago",
  },
  {
    tag: "Music",
    title: "Singer wanted for indie-pop track",
    description:
      "I have the song and production ready—now I’m looking for a vocalist to make it feel like a real collaboration.",
    creator: "Jordan Lee",
    role: "Producer · NYU",
    initials: "JL",
    color: "violet",
    skills: ["Vocals", "Songwriting"],
    time: "Yesterday",
  },
  {
    tag: "Design",
    title: "Help shape a student magazine",
    description:
      "Join our tiny editorial team to create a playful first issue about creativity around campus.",
    creator: "Sofia Patel",
    role: "Editor · UCLA",
    initials: "SP",
    color: "gold",
    skills: ["Illustration", "Layout"],
    time: "2 days ago",
  },
];

function OpportunityCard({ opportunity }) {
  return (
    <article className="opportunity-card">
      <div className="card-topline">
        <span className={`category-pill ${opportunity.color}`}>
          {opportunity.tag}
        </span>
        <span className="posted-time">{opportunity.time}</span>
      </div>

      <h2>{opportunity.title}</h2>
      <p>{opportunity.description}</p>

      <div className="skill-row">
        {opportunity.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <footer className="card-footer">
        <div className="creator">
          <span className={`avatar ${opportunity.color}`}>
            {opportunity.initials}
          </span>
          <span>
            <strong>{opportunity.creator}</strong>
            <small>{opportunity.role}</small>
          </span>
        </div>

        <button className="text-button" type="button">
          View post <span>→</span>
        </button>
      </footer>
    </article>
  );
}

export default function Collaborate() {
  return (
    <>
      <NavBar />

      <main className="collaborate-page">
        <section className="collaborate-hero">
          <div className="hero-copy">
            <span className="eyebrow">CREATE TOGETHER</span>

            <h1>
              Find your next
              <br />
              <em>creative partner.</em>
            </h1>

            <p>
              Meet the writers, artists, musicians, and makers who can help turn
              your next idea into something real.
            </p>

            <button className="primary-button" type="button">
              + Post a collaboration
            </button>
          </div>
        </section>

        <section className="opportunities">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OPEN CALLS</span>
              <h2>Fresh opportunities</h2>
            </div>

            <button className="browse-button" type="button">
              Browse all <span>→</span>
            </button>
          </div>

          <div className="filter-bar">
            <button className="filter active" type="button">All</button>
            <button className="filter" type="button">Film</button>
            <button className="filter" type="button">Music</button>
            <button className="filter" type="button">Design</button>
            <button className="filter" type="button">Writing</button>
          </div>

          <div className="opportunity-grid">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.title}
                opportunity={opportunity}
              />
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
