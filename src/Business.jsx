import NavBar from "./NavBar";
import "./Page.css";

function Business() {
  return (
    <div className="page">
      <NavBar />

      <main className="page-content">
        <p className="page-label">EXPLORE</p>
        <h1>Businesses</h1>
        <p>
          Discover independent cafés, clothing brands, shops,
          restaurants, and other student-created businesses.
        </p>
      </main>
    </div>
  );
}

export default Business;