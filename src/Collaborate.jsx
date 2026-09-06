import NavBar from "./NavBar";
import "./Page.css";

function Collaborate() {
  return (
    <div className="page">
      <NavBar />

      <main className="page-content">
        <p className="page-label">WORK TOGETHER</p>
        <h1>Collaborate</h1>
        <p>
          Find other students who are looking for artists, actors,
          musicians, writers, designers, and more.
        </p>
      </main>
    </div>
  );
}

export default Collaborate;