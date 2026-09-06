import NavBar from "./NavBar";
import "./AddWork.css";

function AddWork() {
  return (
    <div className="page">
      <NavBar />

      <main className="page-content">
        <p className="page-label">FOR COLLEGE STUDENTS</p>
        <h1>Add Your Work</h1>
        <p>
          Log in to share your project, business, artwork, music, or film.
        </p>
      </main>
    </div>
  );
}

export default AddWork;