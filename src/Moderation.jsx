import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import StudentAccess from "./StudentAccess";
import { supabase } from "./supabase";
import { ProjectCards } from "./ProjectCards";
import "./Moderation.css";

function ModerationContent() {
  const [allowed, setAllowed] = useState(null);
  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) =>
        setAllowed(data.user?.app_metadata?.role === "moderator")
      );
  }, []);
  return (
    <div className="moderation-page">
      <NavBar />
      <main className="moderation-content">
        {allowed === null ? (
          <p>Checking moderator access…</p>
        ) : !allowed ? (
          <>
            <h1>Moderator access required</h1>
            <p>This account is not assigned the moderator role yet.</p>
          </>
        ) : (
          <>
            <p className="moderation-eyebrow">Moderator tools</p>
            <h1>Review submissions</h1>
            <p>
              Approve work to publish it, reject it, or remove it with an
              explanation for its owner. Contact details are visible only here.
            </p>
            <section className="moderation-section">
              <h2>Needs approval</h2>
              <ProjectCards moderator reviewStatus="pending" />
            </section>
            <section className="moderation-section approved-section">
              <h2>Approved</h2>
              <ProjectCards moderator reviewStatus="approved" />
            </section>
            <section className="moderation-section">
              <h2>Rejected</h2>
              <ProjectCards moderator reviewStatus="rejected" />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
export default function Moderation() {
  return (
    <StudentAccess>
      <ModerationContent />
    </StudentAccess>
  );
}
