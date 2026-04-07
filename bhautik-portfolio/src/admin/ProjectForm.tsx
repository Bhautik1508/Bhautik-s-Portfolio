import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { addProject, updateProject } from "../hooks/useAdminProjects";
import type {
  ProjectCategory,
  ProjectMetric,
  ProjectStatus,
} from "../hooks/useProjects";

/* ── Style helpers ── */

const inter = (
  size: number,
  weight: number,
  color: string,
  extra?: React.CSSProperties
): React.CSSProperties => ({
  fontFamily: '"Inter", system-ui, sans-serif',
  fontSize: size,
  fontWeight: weight,
  color,
  margin: 0,
  ...extra,
});

const serif = (
  size: number,
  color: string,
  extra?: React.CSSProperties
): React.CSSProperties => ({
  fontFamily: '"Instrument Serif", Georgia, serif',
  fontSize: size,
  color,
  lineHeight: 1.15,
  margin: 0,
  ...extra,
});

/* ── Constants ── */

const CATEGORIES: ProjectCategory[] = [
  "0→1 Build",
  "Growth",
  "Ops",
  "Research",
];
const STATUSES: ProjectStatus[] = ["Live", "Case Study", "In Progress"];
const MAX_METRICS = 4;

/* ── Form data shape (Project minus id & createdAt) ── */

interface FormData {
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  metrics: ProjectMetric[];
  status: ProjectStatus;
  caseStudyUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  order: number;
}

const INITIAL: FormData = {
  title: "",
  tagline: "",
  description: "",
  category: "0→1 Build",
  tags: [],
  metrics: [],
  status: "In Progress",
  caseStudyUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false,
  order: 0,
};

/* ── Validation errors ── */

interface FormErrors {
  title?: string;
  tagline?: string;
  category?: string;
  status?: string;
}

/* ── Input base style ── */

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E5E4E0",
  borderRadius: 6,
  padding: "9px 12px",
  ...inter(13, 400, "#111110"),
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

/* ── Component ── */

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<FormData>({ ...INITIAL });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [fetchingProject, setFetchingProject] = useState(false);
  const [dirty, setDirty] = useState(false);

  /* Tag input state */
  const [tagInput, setTagInput] = useState("");
  const tagRef = useRef<HTMLInputElement>(null);

  /* ── Fetch project for edit mode ── */

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setFetchingProject(true);

    (async () => {
      try {
        const snap = await getDoc(doc(db, "projects", id));
        if (!cancelled && snap.exists()) {
          const d = snap.data();
          setForm({
            title: d.title ?? "",
            tagline: d.tagline ?? "",
            description: d.description ?? "",
            category: d.category ?? "0→1 Build",
            tags: d.tags ?? [],
            metrics: d.metrics ?? [],
            status: d.status ?? "In Progress",
            caseStudyUrl: d.caseStudyUrl ?? "",
            liveUrl: d.liveUrl ?? "",
            imageUrl: d.imageUrl ?? "",
            featured: d.featured ?? false,
            order: d.order ?? 0,
          });
        }
      } catch {
        toast.error("Failed to load project");
      } finally {
        if (!cancelled) setFetchingProject(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ── Field updater ── */

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    []
  );

  /* ── Tag helpers ── */

  const parseTags = useCallback(
    (raw: string) => {
      const parsed = raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (parsed.length > 0) {
        updateField("tags", [...new Set([...form.tags, ...parsed])]);
      }
      setTagInput("");
    },
    [form.tags, updateField]
  );

  const removeTag = useCallback(
    (tag: string) => {
      updateField(
        "tags",
        form.tags.filter((t) => t !== tag)
      );
    },
    [form.tags, updateField]
  );

  /* ── Metric helpers ── */

  const addMetric = useCallback(() => {
    if (form.metrics.length >= MAX_METRICS) return;
    updateField("metrics", [...form.metrics, { label: "", value: "" }]);
  }, [form.metrics, updateField]);

  const updateMetric = useCallback(
    (index: number, field: "label" | "value", val: string) => {
      const next = [...form.metrics];
      next[index] = { ...next[index], [field]: val };
      setForm((prev) => ({ ...prev, metrics: next }));
      setDirty(true);
    },
    [form.metrics]
  );

  const removeMetric = useCallback(
    (index: number) => {
      updateField(
        "metrics",
        form.metrics.filter((_, i) => i !== index)
      );
    },
    [form.metrics, updateField]
  );

  /* ── Validation ── */

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.title || form.title.trim().length < 3) {
      e.title = "Title is required (min 3 characters)";
    }
    if (!form.tagline || !form.tagline.trim()) {
      e.tagline = "Tagline is required";
    }
    if (!form.category) {
      e.category = "Category is required";
    }
    if (!form.status) {
      e.status = "Status is required";
    }
    return e;
  };

  /* ── Submit ── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      if (isEditing && id) {
        await updateProject(id, form);
        toast.success("Project updated!", {
          style: {
            background: "#111110",
            color: "#fff",
            ...inter(13, 400, "#fff"),
            borderRadius: 8,
          },
        });
      } else {
        await addProject(form);
        toast.success("Project added!", {
          style: {
            background: "#111110",
            color: "#fff",
            ...inter(13, 400, "#fff"),
            borderRadius: 8,
          },
        });
      }
      navigate("/admin/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
          ...inter(13, 400, "#DC2626"),
          borderRadius: 8,
        },
      });
    } finally {
      setSaving(false);
    }
  };

  /* ── Loading state for edit mode ── */

  if (fetchingProject) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          data-testid="loading-spinner"
          className="pf-spinner"
          style={{
            width: 32,
            height: 32,
            border: "3px solid #E5E4E0",
            borderTopColor: "#2D6A4F",
            borderRadius: "50%",
          }}
        />
      </div>
    );
  }

  /* ── Render ── */

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ═══════ Top bar ═══════ */}
      <header
        data-testid="admin-topbar"
        style={{
          height: 52,
          borderBottom: "1px solid #E5E4E0",
          backgroundColor: "#fff",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={serif(16, "#111110")}>Command Centre</span>

        <a
          href="/admin/dashboard"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin/dashboard");
          }}
          data-testid="back-link"
          className="pf-back-link"
          style={inter(11, 500, "#3D3D3A", {
            textDecoration: "none",
            border: "1px solid #E5E4E0",
            padding: "5px 12px",
            borderRadius: 5,
            transition: "border-color 0.15s",
          })}
        >
          ← Back to Dashboard
        </a>
      </header>

      {/* ═══════ Page body ═══════ */}
      <main
        style={{
          flex: 1,
          maxWidth: 680,
          margin: "0 auto",
          padding: "32px 24px",
          width: "100%",
          boxSizing: "border-box",
          paddingBottom: 80, // space for sticky footer
        }}
      >
        <h1 style={serif(26, "#111110", { marginBottom: 24 })}>
          {isEditing ? "Edit Project" : "Add New Project"}
        </h1>

        <form
          onSubmit={handleSubmit}
          data-testid="project-form"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* ── 1. Title (full-width) ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="title" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder='e.g. GiftSense — AI Gifting Engine'
              className="pf-input"
              style={INPUT_STYLE}
            />
            {errors.title && (
              <div data-testid="error-title" style={inter(11, 400, "#DC2626", { marginTop: 4 })}>{errors.title}</div>
            )}
          </div>

          {/* ── 2. Tagline (full-width) ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="tagline" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Tagline *
            </label>
            <input
              id="tagline"
              type="text"
              value={form.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              placeholder="One-line card summary"
              className="pf-input"
              style={INPUT_STYLE}
            />
            {errors.tagline && (
              <div data-testid="error-tagline" style={inter(11, 400, "#DC2626", { marginTop: 4 })}>{errors.tagline}</div>
            )}
          </div>

          {/* ── 3. Description (full-width) ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="description" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Full description for case study detail view..."
              className="pf-input"
              style={{
                ...INPUT_STYLE,
                minHeight: 80,
                resize: "vertical",
              }}
            />
          </div>

          {/* ── 4. Category (half-width) ── */}
          <div>
            <label htmlFor="category" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Category *
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value as ProjectCategory)}
              className="pf-input"
              style={{ ...INPUT_STYLE, cursor: "pointer" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <div data-testid="error-category" style={inter(11, 400, "#DC2626", { marginTop: 4 })}>{errors.category}</div>
            )}
          </div>

          {/* ── 5. Status (half-width) ── */}
          <div>
            <label style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Status *
            </label>
            <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "9px 0" }}>
              {STATUSES.map((s) => (
                <label
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                    ...inter(12, 400, "#3D3D3A"),
                  }}
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={() => updateField("status", s)}
                    style={{ accentColor: "#2D6A4F" }}
                  />
                  {s}
                </label>
              ))}
            </div>
            {errors.status && (
              <div data-testid="error-status" style={inter(11, 400, "#DC2626", { marginTop: 4 })}>{errors.status}</div>
            )}
          </div>

          {/* ── 6. Key Metrics (full-width) ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 2 })}>
              Key Metrics
            </label>
            <span style={inter(10, 400, "#6B7280", { display: "block", marginBottom: 8 })}>
              2–4 numbers shown on the project card
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {form.metrics.map((m, i) => (
                <div key={i} data-testid={`metric-row-${i}`} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={m.label}
                    onChange={(e) => updateMetric(i, "label", e.target.value)}
                    placeholder="Label"
                    className="pf-input"
                    aria-label={`Metric ${i + 1} label`}
                    style={{ ...INPUT_STYLE, maxWidth: 140 }}
                  />
                  <input
                    value={m.value}
                    onChange={(e) => updateMetric(i, "value", e.target.value)}
                    placeholder="Value"
                    className="pf-input"
                    aria-label={`Metric ${i + 1} value`}
                    style={{ ...INPUT_STYLE, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeMetric(i)}
                    aria-label={`Remove metric ${i + 1}`}
                    data-testid={`remove-metric-${i}`}
                    className="pf-remove-metric"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6B7280",
                      cursor: "pointer",
                      fontSize: 16,
                      padding: "4px 6px",
                      transition: "color 0.15s",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {form.metrics.length < MAX_METRICS && (
              <button
                type="button"
                onClick={addMetric}
                data-testid="add-metric-btn"
                className="pf-add-metric"
                style={{
                  width: "100%",
                  marginTop: 8,
                  border: "1px dashed #C4EDD5",
                  borderRadius: 5,
                  color: "#2D6A4F",
                  ...inter(11, 500, "#2D6A4F"),
                  padding: 7,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                }}
              >
                + Add Metric
              </button>
            )}
          </div>

          {/* ── 7. Tags (full-width) ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="tags" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Tags
            </label>
            <input
              id="tags"
              ref={tagRef}
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onBlur={() => {
                if (tagInput.trim()) parseTags(tagInput);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (tagInput.trim()) parseTags(tagInput);
                }
              }}
              placeholder="AI, Fintech, India (comma separated)"
              className="pf-input"
              style={INPUT_STYLE}
            />

            {form.tags.length > 0 && (
              <div
                data-testid="tag-chips"
                style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}
              >
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: "#DCFCE7",
                      color: "#166534",
                      ...inter(11, 500, "#166534"),
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      aria-label={`Remove tag ${tag}`}
                      data-testid={`remove-tag-${tag}`}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#166534",
                        cursor: "pointer",
                        fontSize: 13,
                        padding: 0,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── 8. Image URL (half-width) ── */}
          <div>
            <label htmlFor="imageUrl" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={form.imageUrl}
              onChange={(e) => updateField("imageUrl", e.target.value)}
              placeholder="https://... or leave blank for emoji placeholder"
              className="pf-input"
              style={INPUT_STYLE}
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Preview"
                data-testid="image-preview"
                style={{
                  width: 60,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid #E5E4E0",
                  marginTop: 6,
                }}
              />
            )}
          </div>

          {/* ── 9. Case Study URL (half-width) ── */}
          <div>
            <label htmlFor="caseStudyUrl" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Case Study URL
            </label>
            <input
              id="caseStudyUrl"
              type="text"
              value={form.caseStudyUrl}
              onChange={(e) => updateField("caseStudyUrl", e.target.value)}
              placeholder="https://..."
              className="pf-input"
              style={INPUT_STYLE}
            />
          </div>

          {/* ── 10. Live Site URL (half-width) ── */}
          <div>
            <label htmlFor="liveUrl" style={inter(11, 500, "#3D3D3A", { display: "block", marginBottom: 4 })}>
              Live Site URL
            </label>
            <input
              id="liveUrl"
              type="text"
              value={form.liveUrl}
              onChange={(e) => updateField("liveUrl", e.target.value)}
              placeholder="https://..."
              className="pf-input"
              style={INPUT_STYLE}
            />
          </div>

          {/* Spacer for grid alignment — keep 2nd column empty */}
          <div />

          {/* ── 11. Featured toggle (full-width) ── */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <button
              type="button"
              role="switch"
              aria-checked={form.featured}
              aria-label="Featured toggle"
              data-testid="featured-toggle"
              onClick={() => updateField("featured", !form.featured)}
              style={{
                position: "relative",
                width: 34,
                height: 18,
                borderRadius: 9,
                border: "none",
                backgroundColor: form.featured ? "#2D6A4F" : "#E5E4E0",
                cursor: "pointer",
                transition: "background-color 0.2s",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: form.featured ? 18 : 2,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                }}
              />
            </button>
            <span style={inter(12, 400, "#3D3D3A")}>
              Feature this project — spans full width on projects page
            </span>
          </div>
        </form>
      </main>

      {/* ═══════ Sticky footer ═══════ */}
      <footer
        data-testid="form-footer"
        style={{
          position: "sticky",
          bottom: 0,
          borderTop: "1px solid #E5E4E0",
          backgroundColor: "#fff",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Left: auto-save indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {dirty && (
            <>
              <span
                className="pf-pulse-dot"
                data-testid="draft-dot"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "inline-block",
                }}
              />
              <span style={inter(10, 400, "#6B7280")}>Draft saved</span>
            </>
          )}
        </div>

        {/* Right: action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            data-testid="cancel-btn"
            className="pf-cancel-btn"
            style={{
              ...inter(12, 500, "#3D3D3A"),
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px 14px",
              transition: "color 0.15s",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form=""
            onClick={handleSubmit}
            disabled={saving}
            data-testid="save-btn"
            className="pf-save-btn"
            style={{
              ...inter(12, 500, "#fff"),
              backgroundColor: "#2D6A4F",
              border: "none",
              padding: "8px 18px",
              borderRadius: 6,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
              transition: "background-color 0.15s, opacity 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {saving ? (
              <>
                <span
                  className="pf-spinner"
                  aria-hidden="true"
                  style={{
                    width: 12,
                    height: 12,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                Saving...
              </>
            ) : (
              "Save Project →"
            )}
          </button>
        </div>
      </footer>

      {/* ── CSS ── */}
      <style>{`
        .pf-input:focus {
          border-color: #2D6A4F !important;
        }
        .pf-back-link:hover {
          border-color: #C4C3BF !important;
        }
        .pf-save-btn:hover:not(:disabled) {
          background-color: #245A41 !important;
        }
        .pf-cancel-btn:hover {
          color: #111110 !important;
        }
        .pf-add-metric:hover {
          background-color: #F0FDF4 !important;
        }
        .pf-remove-metric:hover {
          color: #EF4444 !important;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .pf-spinner {
          animation: spin 0.6s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pf-pulse-dot {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
