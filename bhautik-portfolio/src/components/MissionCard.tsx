import type { Project } from "../hooks/useProjects";

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

export type CardVariant = "hero" | "medium" | "small";

interface MissionCardProps {
  project: Project;
  featured?: boolean;
  variant?: CardVariant;
}

export default function MissionCard({
  project,
  featured = false,
  variant = "medium",
}: MissionCardProps) {
  const status = STATUS_CONFIG[project.status];
  const hasLink = project.caseStudyUrl || project.liveUrl;

  const isHero = variant === "hero";
  const isSmall = variant === "small";

  /* Title sizes per variant */
  const titleSize = isHero ? 22 : isSmall ? 15 : 18;

  /* Metric / tag limits */
  const metricsToShow = isHero
    ? project.metrics
    : isSmall
      ? project.metrics.slice(0, 2)
      : project.metrics;
  const tagsToShow = isSmall
    ? project.tags.slice(0, 2)
    : project.tags;

  /* Metric font sizes */
  const metricValSize = isSmall ? 14 : 17;
  const metricLabelSize = isSmall ? 8 : 9;

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
        padding: isSmall ? 16 : 22,
        cursor: hasLink ? "pointer" : "default",
        transition: "border-color 0.2s, box-shadow 0.2s",
        height: "100%",
        boxSizing: "border-box",
        ...(isHero
          ? {
              display: "grid",
              gridTemplateColumns: "1fr 240px",
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
            ...inter(9, 500, status.color, {
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
          style={serif(titleSize, "#111110", {
            marginTop: isSmall ? 8 : 10,
            marginBottom: isSmall ? 4 : 6,
            transition: "color 0.2s",
          })}
        >
          {project.title}
        </h3>

        {/* 3. Tagline — hidden on small cards */}
        {!isSmall && (
          <p
            style={inter(13, 400, "#6B7280", {
              lineHeight: 1.65,
              marginBottom: 16,
            })}
          >
            {project.tagline}
          </p>
        )}

        {/* 4. Metrics row */}
        {metricsToShow.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: isSmall ? 14 : 20,
              marginBottom: isSmall ? 10 : 14,
            }}
          >
            {metricsToShow.map((m) => (
              <div key={m.label}>
                <div
                  style={inter(metricValSize, 500, "#111110", {
                    lineHeight: 1,
                  })}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontFamily: '"DM Mono", "Courier New", monospace',
                    fontSize: metricLabelSize,
                    fontWeight: 500,
                    color: "#6B7280",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 3,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. Tags row */}
        {tagsToShow.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              marginBottom: isSmall ? 10 : 16,
            }}
          >
            {tagsToShow.map((tag, i) => (
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
                style={inter(isSmall ? 11 : 12, 500, "#2D6A4F", {
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
                style={inter(isSmall ? 11 : 12, 400, "#6B7280", {
                  textDecoration: "none",
                })}
              >
                ↗ Live Site
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Right side: large emoji panel (hero only) ── */}
      {isHero && (
        <div
          data-testid="featured-image"
          className="hero-emoji-panel"
          style={{
            backgroundColor: "#F9F8F6",
            border: "1px solid #E5E4E0",
            borderRadius: 8,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            alignSelf: "stretch",
            minHeight: 120,
          }}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 48 }}>
              {CATEGORY_EMOJI[project.category] ?? "🎯"}
            </span>
          )}
        </div>
      )}
    </Wrapper>
  );
}
