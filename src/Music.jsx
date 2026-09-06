import NavBar from "./NavBar";
import "./Page.css";

function Music() {
  return (
    <div className="page">
      <NavBar />

      <main className="page-content">
        <p className="page-label">EXPLORE</p>
        <h1>Music</h1>
        <p>
          Discover independent musicians, albums, songs, and performances.
        </p>
      </main>
    </div>
  );
}

export default Music;