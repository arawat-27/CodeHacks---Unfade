import NavBar from "./NavBar";
import "./Page.css";

function Books() {
  return (
    <div className="page">
      <NavBar />

      <main className="page-content">
        <p className="page-label">EXPLORE</p>
        <h1>Books</h1>
        <p>
          Discover books, poetry, comics, and stories by independent writers.
        </p>
      </main>
    </div>
  );
}

export default Books;