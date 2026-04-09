import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useResume } from "../hooks/useResume";
import type {
  WorkEntry,
  EducationEntry,
  SkillCategory,
  DomainExpertise,
} from "../hooks/useResume";
import {
  updateWorkExperience,
  updateEducation,
  updateSkills,
} from "../hooks/useAdminResume";

/* ── Style helpers ── */

const inter = (
  size: number,
  weight: number,
  color: string,
  extra?: React.CSSProperties
): React.CSSProperties => ({
  fontFamily: '"DM Sans", system-ui, sans-serif',
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

/* ── Accordion wrapper ── */

function Accordion({
  title,
  count,
  children,
  defaultOpen = false,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: "1px solid #E5E4E0",
        borderRadius: 10,
        marginBottom: 12,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="accordion-btn"
        style={{
          width: "100%",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "none",
          backgroundColor: open ? "#F9F8F6" : "#fff",
          cursor: "pointer",
          transition: "background-color 0.15s",
        }}
      >
        <span style={inter(13, 500, "#111110")}>
          {title}{" "}
          <span style={inter(11, 400, "#6B7280")}>({count})</span>
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#6B7280",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div style={{ padding: "16px 18px", borderTop: "1px solid #E5E4E0" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Component ── */

export default function ResumeEditor() {
  const navigate = useNavigate();
  const { workExperience, education, skills, domainExpertise, loading } =
    useResume();

  /* Local editable state */
  const [work, setWork] = useState<WorkEntry[]>([]);
  const [edu, setEdu] = useState<EducationEntry[]>([]);
  const [sk, setSk] = useState<SkillCategory[]>([]);
  const [domain, setDomain] = useState<DomainExpertise>({
    title: "",
    description: "",
    tags: [],
  });
  const [savingWork, setSavingWork] = useState(false);
  const [savingEdu, setSavingEdu] = useState(false);
  const [savingSkills, setSavingSkills] = useState(false);

  /* Sync from Firestore on first load */
  useEffect(() => {
    if (!loading) {
      setWork(workExperience);
      setEdu(education);
      setSk(skills);
      if (domainExpertise) setDomain(domainExpertise);
    }
  }, [loading, workExperience, education, skills, domainExpertise]);

  /* ── Work entry helpers ── */

  const updateWork = useCallback(
    (idx: number, field: keyof WorkEntry, value: unknown) => {
      setWork((prev) => {
        const next = [...prev];
        next[idx] = { ...next[idx], [field]: value };
        return next;
      });
    },
    []
  );

  const addWorkEntry = useCallback(() => {
    setWork((prev) => [
      ...prev,
      {
        company: "",
        location: "",
        role: "",
        period: "",
        turnLabel: "",
        bullets: [""],
        tags: [],
        order: prev.length + 1,
      },
    ]);
  }, []);

  const removeWorkEntry = useCallback((idx: number) => {
    setWork((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const addBullet = useCallback((workIdx: number) => {
    setWork((prev) => {
      const next = [...prev];
      next[workIdx] = {
        ...next[workIdx],
        bullets: [...next[workIdx].bullets, ""],
      };
      return next;
    });
  }, []);

  const updateBullet = useCallback(
    (workIdx: number, bulletIdx: number, value: string) => {
      setWork((prev) => {
        const next = [...prev];
        const bullets = [...next[workIdx].bullets];
        bullets[bulletIdx] = value;
        next[workIdx] = { ...next[workIdx], bullets };
        return next;
      });
    },
    []
  );

  const removeBullet = useCallback(
    (workIdx: number, bulletIdx: number) => {
      setWork((prev) => {
        const next = [...prev];
        next[workIdx] = {
          ...next[workIdx],
          bullets: next[workIdx].bullets.filter((_, i) => i !== bulletIdx),
        };
        return next;
      });
    },
    []
  );

  /* ── Education helpers ── */

  const updateEdu = useCallback(
    (idx: number, field: keyof EducationEntry, value: unknown) => {
      setEdu((prev) => {
        const next = [...prev];
        next[idx] = { ...next[idx], [field]: value };
        return next;
      });
    },
    []
  );

  const addEduEntry = useCallback(() => {
    setEdu((prev) => [
      ...prev,
      {
        institution: "",
        degree: "",
        period: "",
        featured: false,
        order: prev.length + 1,
      },
    ]);
  }, []);

  const removeEduEntry = useCallback((idx: number) => {
    setEdu((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  /* ── Skills helpers ── */

  const updateSkillCat = useCallback(
    (idx: number, field: keyof SkillCategory, value: unknown) => {
      setSk((prev) => {
        const next = [...prev];
        next[idx] = { ...next[idx], [field]: value };
        return next;
      });
    },
    []
  );

  const addSkillCat = useCallback(() => {
    setSk((prev) => [
      ...prev,
      { icon: "📦", category: "", items: [], order: prev.length + 1 },
    ]);
  }, []);

  const removeSkillCat = useCallback((idx: number) => {
    setSk((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  /* ── Save handlers ── */

  const handleSaveWork = async () => {
    setSavingWork(true);
    try {
      await updateWorkExperience(work);
      toast.success("Work experience saved!");
    } catch {
      toast.error("Failed to save work experience");
    } finally {
      setSavingWork(false);
    }
  };

  const handleSaveEdu = async () => {
    setSavingEdu(true);
    try {
      await updateEducation(edu);
      toast.success("Education saved!");
    } catch {
      toast.error("Failed to save education");
    } finally {
      setSavingEdu(false);
    }
  };

  const handleSaveSkills = async () => {
    setSavingSkills(true);
    try {
      await updateSkills(sk, domain);
      toast.success("Skills saved!");
    } catch {
      toast.error("Failed to save skills");
    } finally {
      setSavingSkills(false);
    }
  };

  /* ── Loading state ── */

  if (loading) {
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* ═══════ Top bar ═══════ */}
      <header
        style={{
          height: 52,
          borderBottom: "1px solid #E5E4E0",
          backgroundColor: "#fff",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={serif(16, "#111110")}>Command Centre</span>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="admin-nav-btn"
            style={{
              ...inter(11, 500, "#6B7280"),
              border: "1px solid #E5E4E0",
              padding: "5px 12px",
              borderRadius: 5,
              backgroundColor: "transparent",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            Projects
          </button>
          <button
            disabled
            style={{
              ...inter(11, 500, "#111110"),
              border: "1px solid #111110",
              padding: "5px 12px",
              borderRadius: 5,
              backgroundColor: "#F9F8F6",
              cursor: "default",
            }}
          >
            Resume
          </button>
          <a
            href="/admin/dashboard"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/dashboard");
            }}
            className="pf-back-link"
            style={inter(11, 500, "#3D3D3A", {
              textDecoration: "none",
              border: "1px solid #E5E4E0",
              padding: "5px 12px",
              borderRadius: 5,
              transition: "border-color 0.15s",
              marginLeft: 6,
            })}
          >
            ← Back
          </a>
        </div>
      </header>

      {/* ═══════ Page body ═══════ */}
      <main style={{ padding: "32px 24px", maxWidth: 780, margin: "0 auto" }}>
        <h1 style={serif(26, "#111110", { marginBottom: 4 })}>
          Resume Editor
        </h1>
        <p
          style={inter(12, 400, "#6B7280", {
            marginBottom: 24,
            lineHeight: 1.5,
          })}
        >
          Edit work experience, education, and skills displayed on the Resume
          &amp; About pages.
        </p>

        {/* ═══════ WORK EXPERIENCE ═══════ */}
        <Accordion
          title="Work Experience"
          count={work.length}
          defaultOpen={true}
        >
          {work.map((entry, wi) => (
            <div
              key={wi}
              style={{
                border: "1px solid #E5E4E0",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span style={inter(12, 500, "#111110")}>
                  Entry #{wi + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeWorkEntry(wi)}
                  className="action-delete"
                  style={{
                    ...inter(11, 500, "#DC2626"),
                    border: "1px solid #FECACA",
                    backgroundColor: "#FEF2F2",
                    borderRadius: 4,
                    padding: "3px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Company
                  </label>
                  <input
                    value={entry.company}
                    onChange={(e) =>
                      updateWork(wi, "company", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Role
                  </label>
                  <input
                    value={entry.role}
                    onChange={(e) =>
                      updateWork(wi, "role", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Location
                  </label>
                  <input
                    value={entry.location}
                    onChange={(e) =>
                      updateWork(wi, "location", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Period
                  </label>
                  <input
                    value={entry.period}
                    onChange={(e) =>
                      updateWork(wi, "period", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Turn Label
                  </label>
                  <input
                    value={entry.turnLabel}
                    onChange={(e) =>
                      updateWork(wi, "turnLabel", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    value={entry.order}
                    onChange={(e) =>
                      updateWork(wi, "order", Number(e.target.value))
                    }
                    className="pf-input"
                    style={{ ...INPUT_STYLE, maxWidth: 80 }}
                  />
                </div>
              </div>

              {/* Tags (comma-separated) */}
              <div style={{ marginBottom: 10 }}>
                <label
                  style={inter(10, 500, "#6B7280", {
                    display: "block",
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  })}
                >
                  Tags (comma separated)
                </label>
                <input
                  value={entry.tags.join(", ")}
                  onChange={(e) =>
                    updateWork(
                      wi,
                      "tags",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  className="pf-input"
                  style={INPUT_STYLE}
                />
              </div>

              {/* Bullets (dynamic list) */}
              <label
                style={inter(10, 500, "#6B7280", {
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                })}
              >
                Bullets
              </label>
              {entry.bullets.map((b, bi) => (
                <div
                  key={bi}
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <textarea
                    value={b}
                    onChange={(e) => updateBullet(wi, bi, e.target.value)}
                    className="pf-input"
                    style={{
                      ...INPUT_STYLE,
                      flex: 1,
                      minHeight: 36,
                      resize: "vertical",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(wi, bi)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6B7280",
                      cursor: "pointer",
                      fontSize: 16,
                      padding: "4px 6px",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addBullet(wi)}
                style={{
                  ...inter(11, 500, "#2D6A4F"),
                  border: "1px dashed #C4EDD5",
                  borderRadius: 5,
                  padding: "5px 12px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: 2,
                }}
              >
                + Add Bullet
              </button>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={addWorkEntry}
              style={{
                ...inter(11, 500, "#2D6A4F"),
                border: "1px dashed #C4EDD5",
                borderRadius: 5,
                padding: "7px 16px",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              + Add Entry
            </button>
            <button
              type="button"
              onClick={handleSaveWork}
              disabled={savingWork}
              className="accent-btn"
              style={{
                ...inter(12, 500, "#fff"),
                backgroundColor: "#2D6A4F",
                border: "none",
                padding: "7px 20px",
                borderRadius: 6,
                cursor: "pointer",
                opacity: savingWork ? 0.6 : 1,
              }}
            >
              {savingWork ? "Saving…" : "Save Work"}
            </button>
          </div>
        </Accordion>

        {/* ═══════ EDUCATION ═══════ */}
        <Accordion title="Education" count={edu.length}>
          {edu.map((entry, ei) => (
            <div
              key={ei}
              style={{
                border: "1px solid #E5E4E0",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span style={inter(12, 500, "#111110")}>
                  Entry #{ei + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEduEntry(ei)}
                  className="action-delete"
                  style={{
                    ...inter(11, 500, "#DC2626"),
                    border: "1px solid #FECACA",
                    backgroundColor: "#FEF2F2",
                    borderRadius: 4,
                    padding: "3px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Institution
                  </label>
                  <input
                    value={entry.institution}
                    onChange={(e) =>
                      updateEdu(ei, "institution", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Degree
                  </label>
                  <input
                    value={entry.degree}
                    onChange={(e) =>
                      updateEdu(ei, "degree", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Period
                  </label>
                  <input
                    value={entry.period}
                    onChange={(e) =>
                      updateEdu(ei, "period", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, paddingBottom: 4 }}>
                  <div>
                    <label
                      style={inter(10, 500, "#6B7280", {
                        display: "block",
                        marginBottom: 3,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      })}
                    >
                      Order
                    </label>
                    <input
                      type="number"
                      value={entry.order}
                      onChange={(e) =>
                        updateEdu(ei, "order", Number(e.target.value))
                      }
                      className="pf-input"
                      style={{ ...INPUT_STYLE, maxWidth: 80 }}
                    />
                  </div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                      ...inter(12, 400, "#3D3D3A"),
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={entry.featured}
                      onChange={(e) =>
                        updateEdu(ei, "featured", e.target.checked)
                      }
                      style={{ accentColor: "#2D6A4F" }}
                    />
                    Featured
                  </label>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={addEduEntry}
              style={{
                ...inter(11, 500, "#2D6A4F"),
                border: "1px dashed #C4EDD5",
                borderRadius: 5,
                padding: "7px 16px",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              + Add Entry
            </button>
            <button
              type="button"
              onClick={handleSaveEdu}
              disabled={savingEdu}
              className="accent-btn"
              style={{
                ...inter(12, 500, "#fff"),
                backgroundColor: "#2D6A4F",
                border: "none",
                padding: "7px 20px",
                borderRadius: 6,
                cursor: "pointer",
                opacity: savingEdu ? 0.6 : 1,
              }}
            >
              {savingEdu ? "Saving…" : "Save Education"}
            </button>
          </div>
        </Accordion>

        {/* ═══════ SKILLS ═══════ */}
        <Accordion title="Skills & Domain" count={sk.length}>
          {sk.map((cat, si) => (
            <div
              key={si}
              style={{
                border: "1px solid #E5E4E0",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span style={inter(12, 500, "#111110")}>
                  {cat.icon} {cat.category || `Category #${si + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeSkillCat(si)}
                  className="action-delete"
                  style={{
                    ...inter(11, 500, "#DC2626"),
                    border: "1px solid #FECACA",
                    backgroundColor: "#FEF2F2",
                    borderRadius: 4,
                    padding: "3px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 60px",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Icon
                  </label>
                  <input
                    value={cat.icon}
                    onChange={(e) =>
                      updateSkillCat(si, "icon", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Category Name
                  </label>
                  <input
                    value={cat.category}
                    onChange={(e) =>
                      updateSkillCat(si, "category", e.target.value)
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label
                    style={inter(10, 500, "#6B7280", {
                      display: "block",
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    })}
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    value={cat.order}
                    onChange={(e) =>
                      updateSkillCat(si, "order", Number(e.target.value))
                    }
                    className="pf-input"
                    style={INPUT_STYLE}
                  />
                </div>
              </div>

              <div>
                <label
                  style={inter(10, 500, "#6B7280", {
                    display: "block",
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  })}
                >
                  Items (comma separated)
                </label>
                <input
                  value={cat.items.join(", ")}
                  onChange={(e) =>
                    updateSkillCat(
                      si,
                      "items",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  className="pf-input"
                  style={INPUT_STYLE}
                />
              </div>
            </div>
          ))}

          {/* Domain expertise section */}
          <div
            style={{
              border: "1px solid #2D6A4F",
              borderRadius: 8,
              padding: 16,
              marginBottom: 12,
              backgroundColor: "#EAF3EE",
            }}
          >
            <span
              style={inter(12, 500, "#2D6A4F", {
                display: "block",
                marginBottom: 10,
              })}
            >
              Domain Expertise Band
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 10,
              }}
            >
              <div>
                <label
                  style={inter(10, 500, "#6B7280", {
                    display: "block",
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  })}
                >
                  Title
                </label>
                <input
                  value={domain.title}
                  onChange={(e) =>
                    setDomain((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="pf-input"
                  style={INPUT_STYLE}
                />
              </div>
              <div>
                <label
                  style={inter(10, 500, "#6B7280", {
                    display: "block",
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  })}
                >
                  Description
                </label>
                <textarea
                  value={domain.description}
                  onChange={(e) =>
                    setDomain((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="pf-input"
                  style={{
                    ...INPUT_STYLE,
                    minHeight: 60,
                    resize: "vertical",
                  }}
                />
              </div>
              <div>
                <label
                  style={inter(10, 500, "#6B7280", {
                    display: "block",
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  })}
                >
                  Tags (comma separated)
                </label>
                <input
                  value={domain.tags.join(", ")}
                  onChange={(e) =>
                    setDomain((prev) => ({
                      ...prev,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    }))
                  }
                  className="pf-input"
                  style={INPUT_STYLE}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={addSkillCat}
              style={{
                ...inter(11, 500, "#2D6A4F"),
                border: "1px dashed #C4EDD5",
                borderRadius: 5,
                padding: "7px 16px",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              + Add Category
            </button>
            <button
              type="button"
              onClick={handleSaveSkills}
              disabled={savingSkills}
              className="accent-btn"
              style={{
                ...inter(12, 500, "#fff"),
                backgroundColor: "#2D6A4F",
                border: "none",
                padding: "7px 20px",
                borderRadius: 6,
                cursor: "pointer",
                opacity: savingSkills ? 0.6 : 1,
              }}
            >
              {savingSkills ? "Saving…" : "Save Skills"}
            </button>
          </div>
        </Accordion>
      </main>

      {/* ── CSS ── */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .pf-spinner {
          animation: spin 0.8s linear infinite;
        }
        .accent-btn:hover {
          background-color: #245A41 !important;
        }
        .accordion-btn:hover {
          background-color: #F9F8F6 !important;
        }
        .admin-nav-btn:hover {
          border-color: #C4C3BF !important;
          color: #111110 !important;
        }
        .pf-input:focus {
          border-color: #2D6A4F !important;
        }
      `}</style>
    </div>
  );
}
