import NavBar from "./NavBar";
import backgroundImage from "./Background.png";
import { ProjectCards } from "./ProjectCards";
import "./Business.css";

function Business() {
  return (
    <div className="business-page">
      <NavBar />

      <section
        className="business-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="business-overlay"></div>

        <div className="business-hero-content">
          <p className="business-label">EXPLORE</p>

          <h1>Businesses</h1>

          <p className="business-description">
            Discover independent cafés, clothing brands, shops, restaurants, and
            other businesses created by college students.
          </p>
        </div>
      </section>

      {/* Business categories */}

      <main className="business-main-content">
        {/* Most Popular Businesses */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Most Popular Businesses</h2>

              <p>Businesses the community is loving</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row">
            <ProjectCards category="Business" />
          </div>
        </section>

        {/* New Businesses */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>New Businesses</h2>

              <p>Recently added independent businesses</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>

        {/* Cafés */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Cafés</h2>

              <p>Discover independent coffee shops and cafés</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>

        {/* Restaurants and Food */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Restaurants & Food</h2>

              <p>Explore local food businesses and student-made treats</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>

        {/* Clothing and Fashion */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Clothing & Fashion</h2>

              <p>Find independent clothing brands and designers</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>

        {/* Beauty and Wellness */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Beauty & Wellness</h2>

              <p>Discover beauty, skincare, fitness, and wellness businesses</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>

        {/* Art and Design */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Art & Design</h2>

              <p>Explore artwork, handmade products, and creative studios</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>

        {/* Services */}

        <section className="business-project-section">
          <div className="business-project-heading">
            <div>
              <h2>Services</h2>

              <p>Find photography, tutoring, design, and other services</p>
            </div>

            <button className="business-view-all-button">View all →</button>
          </div>

          <div className="business-project-row"></div>
        </section>
      </main>
    </div>
  );
}

export default Business;
