import NavBar from "./NavBar";
import backgroundImage from "./Background.png";
import { ProjectCards } from "./ProjectCards";
import "./Music.css";

function Music() {
  return (
    <div className="music-page">
      <NavBar />

      <section
        className="music-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="music-overlay"></div>

        <div className="music-hero-content">
          <p className="music-label">LISTEN</p>

          <h1>Music</h1>

          <p className="music-description">
            Discover original songs, albums, performances, and independent
            musicians from college communities.
          </p>
        </div>
      </section>

      {/* Music categories */}

      <main className="music-main-content">
        {/* Most Popular Music */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>Most Popular Music</h2>

              <p>Songs and artists the community is loving</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row">
            <ProjectCards category="Music" />
          </div>
        </section>

        {/* New Artists */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>New Artists</h2>

              <p>Recently added independent musicians</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row"></div>
        </section>

        {/* Hip-Hop and Rap */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>Hip-Hop & Rap</h2>

              <p>Discover original tracks from emerging artists</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row"></div>
        </section>

        {/* Pop */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>Pop</h2>

              <p>Find fresh songs from independent pop artists</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row"></div>
        </section>

        {/* R&B and Soul */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>R&amp;B & Soul</h2>

              <p>Explore smooth sounds and soulful performances</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row"></div>
        </section>

        {/* Indie and Alternative */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>Indie & Alternative</h2>

              <p>Hear creative sounds that are different from the mainstream</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row"></div>
        </section>

        {/* Rock */}

        <section className="music-project-section">
          <div className="music-project-heading">
            <div>
              <h2>Rock</h2>

              <p>Discover independent bands, musicians, and performances</p>
            </div>

            <button className="music-view-all-button">View all →</button>
          </div>

          <div className="music-project-row"></div>
        </section>
      </main>
    </div>
  );
}

export default Music;
