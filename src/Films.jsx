import NavBar from "./NavBar";
import "./Page.css";

function Films() {
  return (
    <div className="page">
      <NavBar />

      <main className="page-content">
        <p className="page-label">EXPLORE</p>
        <h1>Films</h1>
        <p>
          Discover original short films, documentaries, and student productions.
        </p>
      </main>
    </div>
  );
}

export default Films;