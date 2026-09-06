import NavBar from "./NavBar";
import backgroundImage from "./Background.png";
import { ProjectCards } from "./ProjectCards";
import "./Films.css";

function Films() {
  return (
    <div className="films-page">
      <NavBar />

      <section
        className="films-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="films-overlay"></div>

        <div className="films-hero-content">
          <p className="films-label">WATCH</p>

          <h1>Films</h1>

          <p className="films-description">
            Discover original short films, documentaries, animations, and
            student productions from independent filmmakers.
          </p>
        </div>
      </section>

      {/* Film categories */}

      <main className="films-main-content">
        {/* Most Popular Films */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Most Popular Films</h2>

              <p>Films the community is watching</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row">
            <ProjectCards category="Films" />
          </div>
        </section>

        {/* New Filmmakers */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>New Filmmakers</h2>

              <p>Recently added independent creators</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>

        {/* Short Films */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Short Films</h2>

              <p>Explore original stories told in a shorter format</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>

        {/* Documentaries */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Documentaries</h2>

              <p>Discover real stories and new perspectives</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>

        {/* Animation */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Animation</h2>

              <p>Watch original animated films and visual stories</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>

        {/* Drama */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Drama</h2>

              <p>Explore emotional stories and powerful performances</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>

        {/* Comedy */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Comedy</h2>

              <p>Find funny and original films from emerging creators</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>

        {/* Horror and Thriller */}

        <section className="films-project-section">
          <div className="films-project-heading">
            <div>
              <h2>Horror & Thriller</h2>

              <p>Discover suspenseful stories and independent horror films</p>
            </div>

            <button className="films-view-all-button">View all →</button>
          </div>

          <div className="films-project-row"></div>
        </section>
      </main>
    </div>
  );
}

export default Films;
