import backgroundImage from "./Background.png";
import collaborationImage from "./Collab.jpeg";
import "./App.css";

import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <section className="about-section">
        <img
          src={backgroundImage}
          className="about-background"
          alt="Unfade Background"
        />

        <div className="about-overlay" />

        <div className="about-content">
          <p className="about-label">About</p>
          <h1>UNFADE</h1>

          <p className="about-description">
            Independent creators often struggle to get noticed while large
            companies take up most of the spotlight.
          </p>

          <p className="about-description">
            Unfade gives college creators a place to share their businesses,
            films, music, books, and original projects with people looking for
            something new. Unfade also helps creators connect. Through
            collaboration posts, students can find actors, musicians, writers,
            designers, and other people who can help bring their ideas to life.
          </p>
        </div>
      </section>
      <main className="discovery-section" id="discover">
        {/* Most Popular */}
        <section className="project-section">
          <div className="project-heading">
            <div>
              <h2>Most Popular</h2>

              <p>What the community is loving</p>
            </div>

            <button className="view-all-button">View all →</button>
          </div>

          {/* Project cards will go here later */}
          <div className="project-row"></div>
        </section>

        {/* New Artists */}
        <section className="project-section">
          <div className="project-heading">
            <div>
              <h2>New Artists</h2>

              <p>Recently added creators</p>
            </div>

            <button className="view-all-button">View all →</button>
          </div>

          <div className="project-row"></div>
        </section>

        {/* Try Something New */}
        <section className="project-section">
          <div className="project-heading">
            <div>
              <h2>Try Something New</h2>

              <p>Discover something different</p>
            </div>

            <button className="view-all-button">View all →</button>
          </div>

          <div className="project-row"></div>
        </section>
      </main>

      {/* Collaboration section */}
      <section className="collaboration-section">
        {/* Left side */}
        <div className="collaboration-about">
          <p className="collaboration-label">CREATE TOGETHER</p>

          <h2>
            Want to
            <br />
            collaborate?
          </h2>

          <p>Find other creators who to work with!</p>

          <a href="/Collaborate" className="collaboration-main-button">
            View collaborations →
          </a>
        </div>
        <div className="collaboration-image-container">
          <img
            src={collaborationImage}
            className="collaboration-image"
            alt="Creators collaborating"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Unfade</p>

        <p>Independent work deserves an audience.</p>
      </footer>
    </div>
  );
}

export default App;
