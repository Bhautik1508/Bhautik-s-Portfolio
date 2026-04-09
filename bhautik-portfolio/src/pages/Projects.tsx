import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import { Badge } from "../components/ui";
import MissionCard from "../components/MissionCard";
import type { CardVariant } from "../components/MissionCard";

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

/* ── Animation variants ── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

/* ── Bento size helpers ── */

/**
 * Determine the card variant and grid-column span class
 * based on index in the filtered array and featured flag.
 */
function getCardLayout(
  index: number,
  featured: boolean
): { variant: CardVariant; span: number; minHeight: number } {
  if (index === 0 && featured) {
    return { variant: "hero", span: 6, minHeight: 160 };
  }
  if (index <= 2) {
    // index 0 (non-featured), 1, 2 → medium
    return { variant: "medium", span: 3, minHeight: 200 };
  }
  // index 3+ → small
  return { variant: "small", span: 2, minHeight: 180 };
}

/* ── Skeleton shimmer ── */

function SkeletonCard({ span = 3 }: { span?: number }) {
  return (
    <div
      className="skeleton-card"
      style={{
        gridColumn: `span ${span}`,
        borderRadius: 12,
        border: "1px solid #E5E4E0",
        height: 180,
        backgroundImage:
          "linear-gradient(90deg, #F9F8F6 25%, #F0EFED 50%, #F9F8F6 75%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

/* ── Projects page ── */

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [activeFilter, setActiveFilter] = useState("All");

  /* Derive categories from live data */
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  /* Filter + sort: featured first, then by order */
  const filtered = projects
    .filter((p) => activeFilter === "All" || p.category === activeFilter)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.order - b.order;
    });

  return (
    <>
    <section
      style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      {/* ── Header ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        style={{ marginBottom: 8 }}
      >
        <Badge variant="default">Mission Dossier</Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        style={serif(40, "#111110")}
      >
        Projects
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        style={inter(14, 400, "#6B7280", {
          marginTop: 8,
          marginBottom: 32,
          lineHeight: 1.6,
        })}
      >
        A record of products built, problems solved, and bets made.
      </motion.p>

      {/* ── Filter row ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              data-testid={`filter-${cat}`}
              className="filter-pill"
              style={{
                ...inter(11, 500, isActive ? "#fff" : "#6B7280"),
                padding: "7px 16px",
                borderRadius: 999,
                border: `1px solid ${isActive ? "#111110" : "#E5E4E0"}`,
                backgroundColor: isActive ? "#111110" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s",
                position: "relative",
                zIndex: 1,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    backgroundColor: "#111110",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* ── Error state ── */}
      {error && (
        <div
          data-testid="error-message"
          style={{
            textAlign: "center",
            padding: "48px 0",
          }}
        >
          <p style={{ fontSize: 32, marginBottom: 8 }}>⚠️</p>
          <p style={inter(14, 400, "#6B7280")}>
            Failed to load projects. Please try again later.
          </p>
        </div>
      )}

      {/* ── Loading state ── */}
      {loading && !error && (
        <div
          data-testid="loading-skeleton"
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
          }}
        >
          <SkeletonCard span={6} />
          <SkeletonCard span={3} />
          <SkeletonCard span={3} />
          <SkeletonCard span={2} />
          <SkeletonCard span={2} />
          <SkeletonCard span={2} />
        </div>
      )}

      {/* ── Projects bento grid ── */}
      {!loading && !error && filtered.length > 0 && (
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="bento-grid"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 12,
              }}
            >
              {filtered.map((project, index) => {
                const { variant, span, minHeight } = getCardLayout(
                  index,
                  project.featured
                );

                return (
                  <motion.div
                    key={project.id}
                    layout
                    layoutId={project.id}
                    variants={cardVariants}
                    className={`card-${variant}`}
                    style={{
                      gridColumn: `span ${span}`,
                      minHeight,
                    }}
                  >
                    <MissionCard
                      project={project}
                      featured={variant === "hero"}
                      variant={variant}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && filtered.length === 0 && (
        <div
          data-testid="empty-state"
          style={{ textAlign: "center", padding: "48px 0" }}
        >
          <p style={{ fontSize: 32, marginBottom: 8 }}>🎲</p>
          <p style={inter(14, 400, "#6B7280")}>
            No projects in this category yet.
          </p>
        </div>
      )}

      {/* ── CSS animations & responsive ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton-card {
          animation: shimmer 1.4s ease-in-out infinite;
        }
        .filter-pill:hover:not([style*="background-color: rgb(17, 17, 16)"]) {
          border-color: #C4C3BF !important;
          color: #111110 !important;
        }
        .mission-card:hover {
          border-color: #C4C3BF !important;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05) !important;
        }
        .case-study-link:hover {
          text-decoration: underline !important;
        }
        .live-site-link:hover {
          color: #111110 !important;
        }
        /* Tablet: all cards full-width */
        @media (max-width: 767px) {
          .bento-grid .card-hero,
          .bento-grid .card-medium,
          .bento-grid .card-small {
            grid-column: span 6 !important;
          }
          .hero-emoji-panel {
            display: none !important;
          }
          .mission-card {
            grid-template-columns: 1fr !important;
          }
        }
        /* Mobile: same as tablet */
        @media (max-width: 639px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid .card-hero,
          .bento-grid .card-medium,
          .bento-grid .card-small {
            grid-column: span 1 !important;
          }
          [data-testid="loading-skeleton"] .skeleton-card {
            grid-column: span 1 !important;
          }
          [data-testid="loading-skeleton"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
    </>
  );
}
