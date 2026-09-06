import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./ProjectCards.css";

function ProjectPreview({ project, onClose, moderator = false }) {
  const [showPreviewVideo, setShowPreviewVideo] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const [isVerticalCover, setIsVerticalCover] = useState(false);
  const [isVerticalGallery, setIsVerticalGallery] = useState(false);
  const projectId = project?.id;
  useEffect(() => {
    if (!projectId) return undefined;
    setShowPreviewVideo(false);
    setGalleryIndex(null);
    setIsVerticalCover(false);
    const timer = window.setTimeout(() => setShowPreviewVideo(true), 1400);
    return () => window.clearTimeout(timer);
  }, [projectId]);
  useEffect(() => setIsVerticalGallery(false), [galleryIndex]);
  if (!project) return null;
  const cover = project.cover_photo?.url;
  const media = (project.media || []).filter((item) => item?.url);
  const selectedMedia = galleryIndex === null ? null : media[galleryIndex];
  const shiftGallery = (direction) =>
    setGalleryIndex((galleryIndex + direction + media.length) % media.length);
  return (
    <div
      className="project-modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <article
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} preview`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close preview"
        >
          ×
        </button>
        <div
          className="project-modal-hero"
          style={{
            height: "clamp(520px, 64vh, 760px)",
            minHeight: 0,
            maxHeight: "760px",
            flex: "0 0 clamp(520px, 64vh, 760px)",
          }}
        >
          {showPreviewVideo && project.preview_video?.url ? (
            <video
              src={project.preview_video.url}
              controls
              playsInline
              autoPlay
              muted
              style={{
                width: "auto",
                height: "483px",
                maxHeight: "82%",
                maxWidth: "326px",
              }}
              onDoubleClick={(event) =>
                event.currentTarget.requestFullscreen?.()
              }
              title="Double-click to expand"
            />
          ) : cover ? (
            <img
              src={cover}
              alt={`Cover for ${project.title}`}
              onLoad={(event) =>
                setIsVerticalCover(
                  event.currentTarget.naturalHeight > event.currentTarget.naturalWidth,
                )
              }
              style={
                isVerticalCover
                  ? { width: "auto", height: "483px", maxHeight: "82%", maxWidth: "326px" }
                  : { width: "100%", height: "100%", objectFit: "contain" }
              }
            />
          ) : (
            <div className="project-modal-empty">No preview available</div>
          )}
        </div>
        <div className="project-modal-info">
          <p className="project-modal-category">
            {project.category}
            {project.subcategory ? ` · ${project.subcategory}` : ""}
          </p>
          <h2>{project.title}</h2>
          <section className="project-info-section">
            <h3>About this project</h3>
            <p className="project-modal-description">{project.description}</p>
          </section>
          <section className="project-info-section">
            <h3>Project info</h3>
            <div className="project-links">
              {project.website && (
                <a href={project.website} target="_blank" rel="noreferrer">
                  Website ↗
                </a>
              )}
              {project.instagram_handle && (
                <a
                  href={`https://instagram.com/${project.instagram_handle.replace(
                    /^@/,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.instagram_handle}
                </a>
              )}
              {moderator && (
                <>
                  <span>Email: {project.email}</span>
                  {project.phone && <span>Phone: {project.phone}</span>}
                </>
              )}
            </div>
          </section>
          {media.length > 0 && (
            <div className="project-media-strip">
              {media.map((item, index) => (
                <button
                  key={item.path || index}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Open media ${index + 1}`}
                >
                  {item.type?.startsWith("video/") ? (
                    <video src={item.url} muted />
                  ) : (
                    <img
                      src={item.url}
                      alt={`${project.title} media ${index + 1}`}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </article>
      {selectedMedia && (
        <div
          role="presentation"
          onMouseDown={() => setGalleryIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 4000,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(16,24,49,.88)",
          }}
        >
          <div
            role="dialog"
            aria-label="Gallery media"
            onMouseDown={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(600px,100%)",
              height: "min(78vh,700px)",
              display: "grid",
              placeItems: "center",
              padding: 28,
              border: "10px solid #5752a2",
              borderRadius: 28,
              background: "#474590",
            }}
          >
            {selectedMedia.type?.startsWith("video/") ? (
          <video
            src={selectedMedia.url}
            controls
            autoPlay
            onLoadedMetadata={(event) =>
              setIsVerticalGallery(
                event.currentTarget.videoHeight > event.currentTarget.videoWidth,
              )
            }
            style={{
              width: isVerticalGallery ? "auto" : "100%",
              height: isVerticalGallery ? "94%" : "100%",
              maxWidth: isVerticalGallery ? "68%" : "100%",
              maxHeight: isVerticalGallery ? "94%" : "100%",
              objectFit: "contain",
            }}
          />
            ) : (
              <img
                src={selectedMedia.url}
                alt={`${project.title} gallery`}
                onLoad={(event) =>
                  setIsVerticalGallery(
                    event.currentTarget.naturalHeight > event.currentTarget.naturalWidth,
                  )
                }
                style={{
              width: isVerticalGallery ? "auto" : "100%",
              height: isVerticalGallery ? "94%" : "100%",
              maxWidth: isVerticalGallery ? "68%" : "100%",
              maxHeight: isVerticalGallery ? "94%" : "100%",
                  objectFit: "contain",
                }}
              />
            )}
            <button
              onClick={() => setGalleryIndex(null)}
              style={{
                position: "absolute",
                right: 14,
                top: 14,
                width: 34,
                height: 34,
                border: 0,
                borderRadius: "50%",
                background: "#e26ad8",
                color: "#fff",
                fontSize: 23,
              }}
            >
              ×
            </button>
            {media.length > 1 && (
              <>
                <button
                  onClick={() => shiftGallery(-1)}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    border: 0,
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    background: "#ed713f",
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() => shiftGallery(1)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    border: 0,
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    background: "#ed713f",
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectCards({
  category,
  moderator = false,
  pendingOnly = false,
  reviewStatus,
  onStatusChange,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [updating, setUpdating] = useState("");
  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!supabase) return;
      let query = supabase
        .from("submissions")
        .select(
          "id,title,category,subcategory,description,email,website,instagram_handle,phone,cover_photo,media,preview_video,status,created_at"
        )
        .order("created_at", { ascending: false });
      query = moderator
        ? query.eq("status", reviewStatus || "pending")
        : pendingOnly
        ? query.eq("status", "pending")
        : query.eq("category", category).eq("status", "approved");
      const { data, error: loadError } = await query;
      if (!active) return;
      if (loadError) setError(loadError.message);
      else setProjects(data || []);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [category, pendingOnly, moderator, reviewStatus]);
  const updateStatus = async (project, status) => {
    setUpdating(project.id);
    const { error: updateError } = await supabase
      .from("submissions")
      .update({ status })
      .eq("id", project.id);
    if (updateError) setError(updateError.message);
    else {
      setProjects((items) => items.filter((item) => item.id !== project.id));
      onStatusChange?.();
    }
    setUpdating("");
  };
  const removeProject = async (project) => {
    const reason = window.prompt(
      "Why is this project being removed? This reason will be shown to its owner."
    );
    if (!reason?.trim()) return;
    setUpdating(project.id);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error: removeError } = await supabase
      .from("submissions")
      .update({
        status: "removed",
        removal_reason: reason.trim(),
        removed_by: user.id,
        removed_at: new Date().toISOString(),
      })
      .eq("id", project.id);
    if (removeError) setError(removeError.message);
    else setProjects((items) => items.filter((item) => item.id !== project.id));
    setUpdating("");
  };
  if (loading)
    return <p className="project-cards-message">Loading projects…</p>;
  if (error) return <p className="project-cards-message error">{error}</p>;
  if (!projects.length)
    return (
      <p className="project-cards-message">
        {pendingOnly
          ? "No submissions are waiting for review."
          : "No approved projects here yet."}
      </p>
    );
  return (
    <>
      <div className="project-card-row">
        {projects.map((project) => (
          <article
            className={`project-card ${
              moderator && project.status === "approved"
                ? "approved-project"
                : ""
            }`}
            key={project.id}
          >
            <button
              className="project-card-preview"
              onClick={() => setPreview(project)}
              aria-label={`Preview ${project.title}`}
            >
              {project.cover_photo?.url ? (
                <img src={project.cover_photo.url} alt="" />
              ) : (
                <div className="project-card-placeholder">Preview</div>
              )}
              <span>Preview</span>
            </button>
            <div className="project-card-body">
              <p>{project.subcategory || project.category}</p>
              <h3>{project.title}</h3>
              {moderator && (
                <small>
                  {project.status} · {project.email}
                  {project.phone ? ` · ${project.phone}` : ""}
                </small>
              )}
              {moderator && (
                <div className="moderation-actions">
                  {project.status !== "approved" && (
                    <button
                      disabled={updating === project.id}
                      onClick={() => updateStatus(project, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {project.status === "pending" && (
                    <button
                      className="reject"
                      disabled={updating === project.id}
                      onClick={() => updateStatus(project, "rejected")}
                    >
                      Reject
                    </button>
                  )}
                  <button
                    className="remove"
                    disabled={updating === project.id}
                    onClick={() => removeProject(project)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <ProjectPreview
        key={preview?.id}
        project={preview}
        onClose={() => setPreview(null)}
        moderator={moderator}
      />
    </>
  );
}

export default ProjectPreview;
