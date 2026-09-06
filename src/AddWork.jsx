import { useMemo, useRef, useState } from "react";
import * as tus from "tus-js-client";
import NavBar from "./NavBar";
import {
  supabase,
  supabaseConfigurationError,
  supabasePublishableKey,
  supabaseUrl,
} from "./supabase";
import StudentAccess from "./StudentAccess";
import "./AddWork.css";

const categories = {
  Business: ["Food & drink", "Fashion", "Technology", "Services", "Other"],
  Music: ["Artist", "Band", "Producer", "DJ", "Other"],
  Films: ["Short film", "Documentary", "Animation", "Music video", "Other"],
  Books: ["Poetry", "Fiction", "Non-fiction", "Comics", "Other"],
  Other: [
    "Multidisciplinary",
    "Community project",
    "Personal project",
    "Other",
  ],
};
const MAX_COVER_FILE_SIZE = 6 * 1024 * 1024;
const MAX_MEDIA_FILE_SIZE = 100 * 1024 * 1024;
const STANDARD_UPLOAD_LIMIT = 6 * 1024 * 1024;
const MEDIA_BUCKET = "project-media";
const initialForm = {
  category: "",
  subcategory: "",
  creatorName: "",
  title: "",
  description: "",
  email: "",
  website: "",
  instagram: "",
  phone: "",
};

function safeFileName(fileName) {
  const extension = fileName.includes(".")
    ? `.${fileName.split(".").pop()}`
    : "";
  return `${crypto.randomUUID()}${extension.toLowerCase()}`;
}

function validateFiles(files, allowedType, maxSize) {
  return Array.from(files).every(
    (file) => file.size <= maxSize && file.type.startsWith(allowedType)
  );
}

function AddWork() {
  const [form, setForm] = useState(initialForm);
  const [gallery, setGallery] = useState([]);
  const [activePreview, setActivePreview] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const galleryInput = useRef(null);
  const coverInput = useRef(null);
  const videoInput = useRef(null);
  const subcategories = useMemo(
    () => (form.category ? categories[form.category] : []),
    [form.category]
  );

  const updateField = ({ target: { name, value } }) =>
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "category" ? { subcategory: "" } : {}),
    }));
  const selectGallery = (event) => {
    const selected = Array.from(event.target.files || []);
    if (
      !selected.every(
        (file) =>
          file.size <= MAX_MEDIA_FILE_SIZE &&
          (file.type.startsWith("image/") || file.type.startsWith("video/"))
      )
    )
      return setStatus({
        type: "error",
        message: "Each project image or video must be 100 MB or smaller.",
      });
    if (gallery.length + selected.length > 8)
      return setStatus({
        type: "error",
        message: "You can add up to 8 project images or videos.",
      });
    setGallery((current) => [
      ...current,
      ...selected.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
    setStatus({ type: "", message: "" });
    event.target.value = "";
  };
  const selectCover = (event) => {
    const [selected] = event.target.files || [];
    if (!selected) return;
    if (!validateFiles([selected], "image/", MAX_COVER_FILE_SIZE))
      return setStatus({
        type: "error",
        message: "Your cover photo must be an image that is 6 MB or smaller.",
      });
    setCoverPhoto(selected);
    setStatus({ type: "", message: "" });
  };
  const selectVideo = (event) => {
    const [selected] = event.target.files || [];
    if (!selected) return;
    if (!validateFiles([selected], "video/", MAX_MEDIA_FILE_SIZE))
      return setStatus({
        type: "error",
        message: "Your preview video must be 100 MB or smaller.",
      });
    setPreviewVideo(selected);
    setStatus({ type: "", message: "" });
  };
  const uploadFile = async (file, submissionId, kind) => {
    const path = `${submissionId}/${kind}/${safeFileName(file.name)}`;
    const standardUpload = async () => {
      const { error } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });
      if (error) throw error;
    };
    if (file.size > STANDARD_UPLOAD_LIMIT) {
      const endpoint = supabaseUrl.includes(".supabase.co")
        ? `${supabaseUrl.replace(
            ".supabase.co",
            ".storage.supabase.co"
          )}/storage/v1/upload/resumable`
        : `${supabaseUrl}/storage/v1/upload/resumable`;
      try {
        await new Promise((resolve, reject) => {
          const upload = new tus.Upload(file, {
            endpoint,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            chunkSize: 6 * 1024 * 1024,
            headers: { apikey: supabasePublishableKey, "x-upsert": "false" },
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: true,
            metadata: {
              bucketName: MEDIA_BUCKET,
              objectName: path,
              contentType: file.type,
              cacheControl: "3600",
            },
            onError: reject,
            onSuccess: resolve,
          });
          upload
            .findPreviousUploads()
            .then((previousUploads) => {
              if (previousUploads.length)
                upload.resumeFromPreviousUpload(previousUploads[0]);
              upload.start();
            })
            .catch(reject);
        });
      } catch (resumableError) {
        console.warn(
          "Resumable upload failed; retrying with standard upload.",
          resumableError
        );
        await standardUpload();
      }
    } else {
      await standardUpload();
    }
    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    return { path, url: data.publicUrl, type: file.type, name: file.name };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (supabaseConfigurationError)
      return setStatus({ type: "error", message: supabaseConfigurationError });
    if (!coverPhoto)
      return setStatus({
        type: "error",
        message: "Please choose a cover photo for your project.",
      });
    if (!gallery.length)
      return setStatus({
        type: "error",
        message: "Please add at least one project image or video.",
      });
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    const submissionId = crypto.randomUUID();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in before submitting your work.");
      const [uploadedCover, uploadedMedia, uploadedVideo] = await Promise.all([
        uploadFile(coverPhoto, submissionId, "cover"),
        Promise.all(
          gallery.map(({ file }) => uploadFile(file, submissionId, "gallery"))
        ),
        previewVideo ? uploadFile(previewVideo, submissionId, "preview") : null,
      ]);
      const { error } = await supabase
        .from("submissions")
        .insert({
          id: submissionId,
          owner_id: user.id,
          creator_name: form.creatorName.trim(),
          category: form.category,
          subcategory: form.subcategory || null,
          title: form.title.trim(),
          description: form.description.trim(),
          email: form.email.trim(),
          website: form.website.trim() || null,
          instagram_handle: form.instagram.trim() || null,
          phone: form.phone.trim() || null,
          cover_photo: uploadedCover,
          media: uploadedMedia,
          preview_video: uploadedVideo,
        });
      if (error) throw error;
      setForm(initialForm);
      setGallery([]);
      setCoverPhoto(null);
      setPreviewVideo(null);
      setStatus({
        type: "success",
        message: "Thanks! Your work has been submitted for moderator review.",
      });
    } catch (error) {
      console.error("Unable to submit project", error);
      setStatus({
        type: "error",
        message:
          error.message || "We couldn't submit your work. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StudentAccess>
      <div className="add-work-page">
        <NavBar />
        <main className="submission-shell">
          <form className="submission-form" onSubmit={handleSubmit}>
            <div className="form-banner">Add your work</div>
            <p className="required-note">
              <span aria-hidden="true">*</span> Required fields
            </p>
            <section>
              <div className="section-heading">
                <h1>Category</h1>
                <p>Select the category that best suits your project.</p>
              </div>
              <div className="category-grid">
                <label>
                  Main category{" "}
                  <span className="required-marker" aria-label="required">
                    *
                  </span>
                  <select
                    name="category"
                    value={form.category}
                    onChange={updateField}
                    required
                  >
                    <option value="" disabled>
                      Choose a category
                    </option>
                    {Object.keys(categories).map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Subcategory <span className="optional">optional</span>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={updateField}
                    disabled={!form.category}
                  >
                    <option value="">
                      {form.category
                        ? "Choose a subcategory"
                        : "Choose a main category first"}
                    </option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
            <section className="text-fields">
              <label>
                Creator name{" "}
                <span className="required-marker" aria-label="required">
                  *
                </span>
                <input
                  name="creatorName"
                  value={form.creatorName}
                  onChange={updateField}
                  placeholder="Your public name"
                  required
                  maxLength="80"
                />
              </label>
              <label>
                Title{" "}
                <span className="required-marker" aria-label="required">
                  *
                </span>
                <input
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder="Name your project"
                  required
                  maxLength="120"
                />
              </label>
              <label>
                Description{" "}
                <span className="required-marker" aria-label="required">
                  *
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Tell people about your work"
                  required
                  maxLength="2000"
                  rows="6"
                />
              </label>
            </section>
            <section>
              <div className="section-heading">
                <h2>
                  Pictures & videos{" "}
                  <span className="required-marker" aria-label="required">
                    *
                  </span>
                </h2>
                <p>Add up to 8 images or short videos that show your work.</p>
              </div>
              <input
                ref={galleryInput}
                className="visually-hidden"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={selectGallery}
              />
              <button
                className="upload-dropzone"
                type="button"
                onClick={() => galleryInput.current?.click()}
              >
                <span className="upload-icon">+</span>
                <strong>Add project media</strong>
                <small>
                  Choose files from your computer, or take a photo on your phone
                  · max 100 MB each
                </small>
              </button>
              {gallery.length > 0 && (
                <div className="media-preview-grid">
                  {gallery.map(({ file, previewUrl }, index) => (
                    <article
                      className="media-preview-card"
                      key={`${file.name}-${index}`}
                    >
                      <button
                        className="media-preview-button"
                        type="button"
                        aria-label={`Preview ${file.name}`}
                        onClick={() => setActivePreview({ file, previewUrl })}
                      >
                        {file.type.startsWith("image/") ? (
                          <img
                            src={previewUrl}
                            alt={`Preview of ${file.name}`}
                          />
                        ) : (
                          <>
                            <video src={previewUrl} muted />
                            <span className="video-preview-label">▶ Video</span>
                          </>
                        )}
                      </button>
                      <div>
                        <span title={file.name}>{file.name}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          onClick={() => {
                            URL.revokeObjectURL(previewUrl);
                            setGallery((items) =>
                              items.filter(
                                (_, itemIndex) => itemIndex !== index
                              )
                            );
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <section className="asset-grid">
              <div>
                <h2>
                  Cover photo{" "}
                  <span className="required-marker" aria-label="required">
                    *
                  </span>
                </h2>
                <p>This is the first image people see.</p>
                <input
                  ref={coverInput}
                  className="visually-hidden"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={selectCover}
                />
                <button
                  className="asset-button"
                  type="button"
                  onClick={() => coverInput.current?.click()}
                >
                  {coverPhoto
                    ? `Change ${coverPhoto.name}`
                    : "Choose cover photo"}
                </button>
              </div>
              <div>
                <h2>
                  Preview video <span className="optional">optional</span>
                </h2>
                <p>If you skip this, your cover photo will be used instead.</p>
                <input
                  ref={videoInput}
                  className="visually-hidden"
                  type="file"
                  accept="video/*"
                  onChange={selectVideo}
                />
                <button
                  className="asset-button"
                  type="button"
                  onClick={() => videoInput.current?.click()}
                >
                  {previewVideo
                    ? `Change ${previewVideo.name}`
                    : "Choose preview video"}
                </button>
              </div>
            </section>
            <section>
              <div className="section-heading">
                <h2>Info</h2>
                <p>
                  Phone number is optional to enter and is visible only to
                  moderators after submission.
                </p>
              </div>
              <div className="info-grid">
                <label>
                  Email{" "}
                  <span className="required-marker" aria-label="required">
                    *
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label>
                  Phone number{" "}
                  <span className="private-label">
                    optional · moderators can view after submission
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="(555) 555-5555"
                  />
                </label>
                <label>
                  Website <span className="optional">optional</span>
                  <input
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={updateField}
                    placeholder="https://your-site.com"
                  />
                </label>
                <label>
                  Instagram handle <span className="optional">optional</span>
                  <input
                    name="instagram"
                    value={form.instagram}
                    onChange={updateField}
                    placeholder="@yourhandle"
                  />
                </label>
              </div>
            </section>
            {status.message && (
              <p className={`form-status ${status.type}`} role="status">
                {status.message}
              </p>
            )}
            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading your work…" : "Submit for review"}
            </button>
          </form>
        </main>
        {activePreview && (
          <div
            className="preview-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${activePreview.file.name}`}
            onMouseDown={() => setActivePreview(null)}
          >
            <div
              className="preview-modal-content"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                className="preview-close"
                type="button"
                aria-label="Close preview"
                onClick={() => setActivePreview(null)}
              >
                ×
              </button>
              {activePreview.file.type.startsWith("image/") ? (
                <img
                  src={activePreview.previewUrl}
                  alt={`Full preview of ${activePreview.file.name}`}
                />
              ) : (
                <video src={activePreview.previewUrl} controls autoPlay />
              )}
            </div>
          </div>
        )}
      </div>
    </StudentAccess>
  );
}
export default AddWork;
