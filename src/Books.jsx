import NavBar from "./NavBar";
import backgroundImage from "./Background.png";
import { ProjectCards } from "./ProjectCards";
import "./Books.css";

function Books() {
  return (
    <div className="books-page">
      <NavBar />

      <section
        className="books-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="books-overlay"></div>

        <div className="books-hero-content">
          <p className="books-label">READ</p>

          <h1>Books</h1>

          <p className="books-description">
            Discover original books, poetry, comics, short stories, and other
            writing from independent student creators.
          </p>
        </div>
      </section>

      {/* Book categories */}

      <main className="books-main-content">
        {/* Most Popular Books */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Most Popular Books</h2>

              <p>Stories and writers the community is loving</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row">
            <ProjectCards category="Books" />
          </div>
        </section>

        {/* New Writers */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>New Writers</h2>

              <p>Recently added independent authors</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>

        {/* Fiction */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Fiction</h2>

              <p>Explore original characters, worlds, and stories</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>

        {/* Poetry */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Poetry</h2>

              <p>Discover poetry collections and individual poems</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>

        {/* Comics and Graphic Novels */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Comics & Graphic Novels</h2>

              <p>Find illustrated stories from independent creators</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>

        {/* Short Stories */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Short Stories</h2>

              <p>Read original stories in a shorter format</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>

        {/* Nonfiction */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Nonfiction</h2>

              <p>Explore essays, memoirs, guides, and real experiences</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>

        {/* Fantasy and Science Fiction */}

        <section className="books-project-section">
          <div className="books-project-heading">
            <div>
              <h2>Fantasy & Science Fiction</h2>

              <p>Discover imaginative worlds and futuristic ideas</p>
            </div>

            <button className="books-view-all-button">View all →</button>
          </div>

          <div className="books-project-row"></div>
        </section>
      </main>
    </div>
  );
}

export default Books;
