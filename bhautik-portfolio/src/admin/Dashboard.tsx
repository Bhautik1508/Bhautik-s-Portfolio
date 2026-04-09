import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../hooks/useProjects";
import {
  deleteProject,
  toggleFeatured,
} from "../hooks/useAdminProjects";

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

/* ── Status badge config (reused from MissionCard) ── */

const STATUS_STYLE: Record<
  string,
  { bg: string; color: string; border?: string; prefix: string }
> = {
  Live: { bg: "#DCFCE7", color: "#166534", prefix: "●" },
  "Case Study": { bg: "#FEF9C3", color: "#854D0E", prefix: "◆" },
  "In Progress": {
    bg: "#F9F8F6",
    color: "#6B7280",
    border: "1px solid #E5E4E0",
    prefix: "○",
  },
};

/* ── Grid template for table columns ── */

const TABLE_GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 80px 90px",
  alignItems: "center",
  padding: "13px 16px",
};

/* ── Component ── */

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { projects, loading } = useProjects();
  const navigate = useNavigate();

  /* Derived stats */
  const stats = [
    { label: "Total", value: projects.length },
    { label: "Featured", value: projects.filter((p) => p.featured).length },
    { label: "Live", value: projects.filter((p) => p.status === "Live").length },
    {
      label: "In Progress",
      value: projects.filter((p) => p.status === "In Progress").length,
    },
  ];

  /* Sorted by order field */
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  /* Actions */
  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      await toggleFeatured(id, current);
      toast.success(current ? "Removed from featured" : "Marked as featured");
    } catch {
      toast.error("Failed to toggle featured");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Delete "${title}"? This action cannot be undone.`
    );
    if (!confirmed) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
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
        }}
      >
        <span style={serif(16, "#111110")}>Command Centre</span>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/admin/resume")}
            className="admin-logout-btn"
            style={{
              ...inter(11, 500, "#3D3D3A"),
              border: "1px solid #E5E4E0",
              padding: "5px 12px",
              borderRadius: 5,
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            Resume
          </button>
          <span
            data-testid="user-email"
            style={inter(11, 400, "#6B7280")}
          >
            {user?.email ?? ""}
          </span>
          <button
            onClick={handleLogout}
            data-testid="logout-btn"
            className="admin-logout-btn"
            style={{
              ...inter(11, 500, "#3D3D3A"),
              border: "1px solid #E5E4E0",
              padding: "5px 12px",
              borderRadius: 5,
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ═══════ Page body ═══════ */}
      <main style={{ padding: "32px 24px", maxWidth: 900, margin: "0 auto" }}>
        {/* ── Page header ── */}
        <h1 style={serif(26, "#111110", { marginBottom: 4 })}>Projects</h1>
        <p
          style={inter(12, 400, "#6B7280", {
            marginBottom: 24,
            lineHeight: 1.5,
          })}
        >
          Manage what recruiters and visitors see on your portfolio.
        </p>

        {/* ── Stats row ── */}
        <div
          data-testid="stats-row"
          style={{ display: "flex", gap: 10, marginBottom: 28 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              data-testid={`stat-${s.label}`}
              style={{
                flex: 1,
                backgroundColor: "#F9F8F6",
                border: "1px solid #E5E4E0",
                borderRadius: 8,
                padding: "14px 18px",
              }}
            >
              <div style={inter(22, 500, "#111110")}>{s.value}</div>
              <div
                style={inter(10, 500, "#6B7280", {
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginTop: 4,
                })}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Table header row ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span style={inter(13, 500, "#111110")}>All Projects</span>
          <button
            onClick={() => navigate("/admin/projects/new")}
            data-testid="add-project-btn"
            className="accent-btn"
            style={{
              ...inter(12, 500, "#fff"),
              backgroundColor: "#2D6A4F",
              border: "none",
              padding: "7px 16px",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background-color 0.15s",
            }}
          >
            + Add Project
          </button>
        </div>

        {/* ── Projects table ── */}
        <div
          data-testid="projects-table"
          style={{
            border: "1px solid #E5E4E0",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* Table column headers */}
          <div
            style={{
              ...TABLE_GRID,
              backgroundColor: "#F9F8F6",
              borderBottom: "1px solid #E5E4E0",
              padding: "10px 16px",
            }}
          >
            {["Title", "Category", "Status", "Featured", "Actions"].map(
              (col) => (
                <span
                  key={col}
                  style={inter(10, 500, "#6B7280", {
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  })}
                >
                  {col}
                </span>
              )
            )}
          </div>

          {/* ── Loading skeleton ── */}
          {loading && (
            <div data-testid="table-loading">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="skeleton-row"
                  style={{
                    height: 52,
                    borderBottom: i < 3 ? "1px solid #E5E4E0" : "none",
                    backgroundImage:
                      "linear-gradient(90deg, #F9F8F6 25%, #F0EFED 50%, #F9F8F6 75%)",
                    backgroundSize: "200% 100%",
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && sorted.length === 0 && (
            <div
              data-testid="empty-state"
              style={{ textAlign: "center", padding: 40 }}
            >
              <p style={inter(13, 400, "#6B7280", { marginBottom: 14 })}>
                No projects yet. Add your first one.
              </p>
              <button
                onClick={() => navigate("/admin/projects/new")}
                className="accent-btn"
                style={{
                  ...inter(12, 500, "#fff"),
                  backgroundColor: "#2D6A4F",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                + Add Project
              </button>
            </div>
          )}

          {/* ── Data rows ── */}
          {!loading &&
            sorted.map((project, idx) => (
              <div
                key={project.id}
                data-testid={`project-row-${project.id}`}
                className="table-row"
                style={{
                  ...TABLE_GRID,
                  borderBottom:
                    idx < sorted.length - 1
                      ? "1px solid #E5E4E0"
                      : "none",
                  transition: "background-color 0.1s",
                }}
              >
                {/* Title cell */}
                <div>
                  <div style={inter(13, 500, "#111110")}>
                    {project.title}
                  </div>
                  <div
                    style={inter(11, 400, "#6B7280", { marginTop: 2 })}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Category badge */}
                <div>
                  <span
                    style={{
                      ...inter(10, 500, "#6B7280"),
                      border: "1px solid #E5E4E0",
                      padding: "2px 8px",
                      borderRadius: 4,
                      display: "inline-block",
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Status badge */}
                <div>
                  <span
                    style={{
                      ...inter(9, 500, STATUS_STYLE[project.status]?.color ?? "#6B7280", {
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }),
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor:
                        STATUS_STYLE[project.status]?.bg ?? "#F9F8F6",
                      border:
                        STATUS_STYLE[project.status]?.border ?? "none",
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    <span aria-hidden="true">
                      {STATUS_STYLE[project.status]?.prefix ?? "○"}
                    </span>
                    {project.status}
                  </span>
                </div>

                {/* Featured toggle */}
                <div>
                  <button
                    onClick={() =>
                      handleToggleFeatured(project.id, project.featured)
                    }
                    data-testid={`toggle-featured-${project.id}`}
                    aria-label={
                      project.featured
                        ? "Remove from featured"
                        : "Mark as featured"
                    }
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: project.featured
                        ? "none"
                        : "1px solid #E5E4E0",
                      backgroundColor: project.featured
                        ? "#2D6A4F"
                        : "#fff",
                      color: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...inter(11, 500, "#fff"),
                      padding: 0,
                    }}
                  >
                    {project.featured ? "✓" : ""}
                  </button>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() =>
                      navigate(`/admin/projects/${project.id}`)
                    }
                    data-testid={`edit-${project.id}`}
                    aria-label={`Edit ${project.title}`}
                    className="action-edit"
                    style={{
                      width: 28,
                      height: 28,
                      border: "1px solid #E5E4E0",
                      borderRadius: 5,
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      transition: "border-color 0.15s, color 0.15s",
                      padding: 0,
                    }}
                  >
                    ✏
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    data-testid={`delete-${project.id}`}
                    aria-label={`Delete ${project.title}`}
                    className="action-delete"
                    style={{
                      width: 28,
                      height: 28,
                      border: "1px solid #E5E4E0",
                      borderRadius: 5,
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      transition: "border-color 0.15s, color 0.15s",
                      padding: 0,
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* ── CSS ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton-row {
          animation: shimmer 1.4s ease-in-out infinite;
        }
        .table-row:hover {
          background-color: #FAFAFA;
        }
        .admin-logout-btn:hover {
          border-color: #C4C3BF !important;
        }
        .accent-btn:hover {
          background-color: #245A41 !important;
        }
        .action-edit:hover {
          border-color: #2D6A4F !important;
          color: #2D6A4F !important;
        }
        .action-delete:hover {
          border-color: #EF4444 !important;
          color: #EF4444 !important;
        }
      `}</style>
    </div>
  );
}
