import type { Project } from "../hooks/useProjects";

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
  lineHeight: 1.25,
  margin: 0,
  ...extra,
});

/* ── Status badge config ── */

const STATUS_CONFIG: Record<
  Project["status"],
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

/* ── Category emoji map ── */

const CATEGORY_EMOJI: Record<string, string> = {
  "0→1 Build": "🎯",
  Growth: "📈",
  Ops: "⚙",
  Research: "🔬",
};

/* ── Component ── */

interface MissionCardProps {
  project: Project;
  featured?: boolean;
}

export default function MissionCard({
  project,
  featured = false,
}: MissionCardProps) {
  const status = STATUS_CONFIG[project.status];
  const hasLink = project.caseStudyUrl || project.liveUrl;

  /* ── Clickable wrapper (whole card) ── */
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = project.caseStudyUrl
    ? {
        href: project.caseStudyUrl,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : project.liveUrl
      ? {
          href: project.liveUrl,
          target: "_blank" as const,
          rel: "noopener noreferrer",
        }
      : {};

  return (
    <Wrapper
      {...wrapperProps}
      data-testid={`mission-card-${project.id}`}
      className="mission-card"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: "#fff",
        border: "1px solid #E5E4E0",
        borderRadius: 12,
        padding: 22,
        cursor: hasLink ? "pointer" : "default",
        transition: "border-color 0.2s, box-shadow 0.2s",
        ...(featured
          ? {
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 24,
              alignItems: "start",
            }
          : {}),
      }}
    >
      {/* ── Left / primary content ── */}
      <div>
        {/* 1. Status badge */}
        <span
          data-testid="status-badge"
          style={{
            ...inter(9, 600, status.color, {
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }),
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: status.bg,
            border: status.border ?? "none",
            padding: "3px 8px",
            borderRadius: 4,
          }}
        >
          <span aria-hidden="true">{status.prefix}</span>
          {project.status}
        </span>

        {/* 2. Title */}
        <h3
          className="card-title"
          style={serif(featured ? 22 : 18, "#111110", {
            marginTop: 10,
            marginBottom: 6,
            transition: "color 0.2s",
          })}
        >
          {project.title}
        </h3>

        {/* 3. Tagline */}
        <p
          style={inter(13, 400, "#6B7280", {
            lineHeight: 1.65,
            marginBottom: 16,
          })}
        >
          {project.tagline}
        </p>

        {/* 4. Metrics row */}
        {project.metrics.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 14,
            }}
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div style={inter(17, 600, "#111110", { lineHeight: 1 })}>
                  {m.value}
                </div>
                <div
                  style={inter(9, 500, "#6B7280", {
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 3,
                  })}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. Tags row */}
        {project.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                style={{
                  ...inter(10, 500, i < 2 ? "#2D6A4F" : "#6B7280"),
                  backgroundColor: i < 2 ? "#EAF3EE" : "transparent",
                  border: i < 2 ? "none" : "1px solid #E5E4E0",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 6. Actions row */}
        {(project.caseStudyUrl || project.liveUrl) && (
          <div
            style={{ display: "flex", gap: 14, alignItems: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-link link-animated"
                style={inter(12, 500, "#2D6A4F", {
                  textDecoration: "none",
                })}
              >
                View Case Study →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="live-site-link link-animated"
                style={inter(12, 400, "#6B7280", {
                  textDecoration: "none",
                })}
              >
                ↗ Live Site
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Right side: image / emoji placeholder (featured only) ── */}
      {featured && (
        <div
          data-testid="featured-image"
          style={{
            width: 140,
            height: 90,
            backgroundColor: "#F9F8F6",
            border: "1px solid #E5E4E0",
            borderRadius: 8,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 28 }}>
              {CATEGORY_EMOJI[project.category] ?? "🎯"}
            </span>
          )}
        </div>
      )}
    </Wrapper>
  );
}
