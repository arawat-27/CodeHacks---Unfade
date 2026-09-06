import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import ProjectPreview from "./ProjectCards";
import { supabase } from "./supabase";
import "./CreatorProfiles.css";

export function NewArtists() {
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadCreators = async () => {
      if (!supabase) {
        if (active) setError("Artist profiles are unavailable right now.");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("submissions")
        .select("creator_name, cover_photo, created_at")
        .eq("status", "approved")
        .not("creator_name", "is", null)
        .order("created_at", { ascending: false });

      if (!active) return;
      if (loadError) {
        setError(loadError.message);
        return;
      }

      const uniqueCreators = [];
      const seen = new Set();
      (data || []).forEach((submission) => {
        const name = submission.creator_name?.trim();
        if (name && !seen.has(name.toLowerCase())) {
          seen.add(name.toLowerCase());
          uniqueCreators.push({ name, cover: submission.cover_photo?.url });
        }
      });
      setCreators(uniqueCreators);
    };

    loadCreators();
    return () => {
      active = false;
    };
  }, []);

  if (error) return <p className="creator-message">{error}</p>;
  if (!creators.length) {
    return <p className="creator-message">No new artists yet.</p>;
  }

  return creators.map((creator) => (
    <button
      className="creator-card"
      key={creator.name}
      onClick={() => navigate(`/Creators/${encodeURIComponent(creator.name)}`)}
    >
      {creator.cover ? (
        <img src={creator.cover} alt="" />
      ) : (
        <span className="creator-card-placeholder">Unfade</span>
      )}
      <span className="creator-card-name">{creator.name}</span>
      <span className="creator-card-link">View projects →</span>
    </button>
  ));
}

export default function CreatorProfile() {
  const { creatorName: creatorNameParam = "" } = useParams();
  const creatorName = decodeURIComponent(creatorNameParam);
  const [projects, setProjects] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      if (!supabase) {
        if (active) setError("Artist projects are unavailable right now.");
        setLoading(false);
        return;
      }

      const { data, error: loadError } = await supabase
        .from("submissions")
        .select(
          "id, title, category, subcategory, description, website, instagram_handle, cover_photo, media, preview_video, status, created_at"
        )
        .eq("creator_name", creatorName)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!active) return;
      if (loadError) setError(loadError.message);
      else setProjects(data || []);
      setLoading(false);
    };

    loadProjects();
    return () => {
      active = false;
    };
  }, [creatorName]);

  return (
    <div className="creator-profile-page">
      <NavBar />
      <main className="creator-profile-content">
        <button className="creator-back-button" onClick={() => navigate("/Home")}>
          ← Back to Home
        </button>
        <p className="creator-profile-eyebrow">Creator profile</p>
        <h1>{creatorName}</h1>
        <p className="creator-profile-intro">Explore {creatorName}&apos;s work on Unfade.</p>

        {loading && <p className="creator-message">Loading projects…</p>}
        {error && <p className="creator-message creator-error">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="creator-message">No approved projects yet.</p>
        )}
        {projects.length > 0 && (
          <section className="creator-project-grid" aria-label={`${creatorName}'s projects`}>
            {projects.map((project) => (
              <button
                className="creator-project-card"
                key={project.id}
                onClick={() => setPreview(project)}
              >
                {project.cover_photo?.url ? (
                  <img src={project.cover_photo.url} alt="" />
                ) : (
                  <span className="creator-project-placeholder">Preview</span>
                )}
                <span className="creator-project-body">
                  <span className="creator-project-category">
                    {project.category}
                    {project.subcategory ? ` · ${project.subcategory}` : ""}
                  </span>
                  <strong>{project.title}</strong>
                  <span>Preview project →</span>
                </span>
              </button>
            ))}
          </section>
        )}
      </main>
      <ProjectPreview
        key={preview?.id}
        project={preview}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}
