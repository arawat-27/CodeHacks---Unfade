import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import StudentAccess from "./StudentAccess";
import { supabase } from "./supabase";
import "./Profile.css";

function ProfileContent() {
  const [submissions, setSubmissions] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const navigate = useNavigate();
  const signOut = async () => { await supabase.auth.signOut(); navigate("/"); };
  useEffect(() => { const load = async () => { const { data: { user } } = await supabase.auth.getUser(); if (!user) return; const { data, error: queryError } = await supabase.from("submissions").select("id, title, category, subcategory, status, cover_photo, created_at").eq("owner_id", user.id).order("created_at", { ascending: false }); if (queryError) setError(queryError.message); else setSubmissions(data || []); setLoading(false); }; load(); }, []);
  return <div className="profile-page"><NavBar /><main className="profile-content"><div className="profile-heading"><div><p className="profile-eyebrow">Your profile</p><h1>Your posted work</h1><p className="profile-intro">Track submissions and their review status.</p></div><div className="profile-actions"><button className="profile-add-button" onClick={() => navigate("/AddWork")}>+ Add Your Work</button><button className="logout-button" onClick={signOut}>Log out</button></div></div>{loading && <p>Loading your work…</p>}{error && <p className="profile-error">{error}</p>}{!loading && !error && submissions.length === 0 && <div className="empty-profile"><h2>No projects yet</h2><p>Submit your first project from the Add Your Work page.</p></div>}{submissions.length > 0 && <div className="profile-grid">{submissions.map((submission) => <article className="profile-card" key={submission.id}>{submission.cover_photo?.url && <img src={submission.cover_photo.url} alt="" />}<div><span className={`submission-status ${submission.status}`}>{submission.status}</span><p className="profile-category">{submission.category}{submission.subcategory ? ` · ${submission.subcategory}` : ""}</p><h2>{submission.title}</h2><p className="profile-date">Submitted {new Date(submission.created_at).toLocaleDateString()}</p></div></article>)}</div>}</main></div>;
}
function Profile() { return <StudentAccess><ProfileContent /></StudentAccess>; }
export default Profile;
