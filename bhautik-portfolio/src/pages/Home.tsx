import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RESUME_URL } from "../lib/config";
import { useCountUp } from "../hooks/useCountUp";
import { useFeaturedProject } from "../hooks/useFeaturedProject";

/* ────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────── */

const STATS: { value: string; numericEnd?: number; label: string }[] = [
  { value: "4+", numericEnd: 4, label: "Yrs Experience" },
  { value: "30%", label: "Reporting Speed ↑" },
  { value: "$3M", label: "Revenue (Prodapt)" },
  { value: "IIT Delhi", label: "MBA" },
];

/* Fallback featured project when Firestore is empty or loading fails */
const FALLBACK_PROJECT = {
  title: "GiftSense — AI Gifting Engine",
  tagline:
    "Solves personalisation anxiety in India's ₹65K Cr gifting market.",
  metrics: [
    { value: "₹65K Cr", label: "Market Size" },
    { value: "3×", label: "Conversion Lift" },
  ],
  tags: ["AI/ML", "E-Commerce", "React", "Node.js"],
  caseStudyUrl: "/projects",
};

/* ────────────────────────────────────────────────────────
   Hooks
   ──────────────────────────────────────────────────────── */

/** Track scroll position to hide scroll indicator (#9) */
function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}

/* ────────────────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────────────────── */

function NumericStat({ end, suffix }: { end: number; suffix: string }) {
  const val = useCountUp(end);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

function StatCardItem({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  const isNumeric = stat.numericEnd !== undefined;
  const suffix = isNumeric ? stat.value.replace(/\d/g, "") : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.08,
        duration: 0.45,
        ease: "easeOut" as const,
      }}
      style={{
        backgroundColor: "#111110",
        borderRadius: 8,
        padding: "14px 18px",
        minWidth: 0,
      }}
    >
      <p
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 24,
          fontWeight: 600,
          color: "#ffffff",
          lineHeight: 1,
          margin: 0,
        }}
      >
        {isNumeric ? (
          <NumericStat end={stat.numericEnd!} suffix={suffix} />
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {stat.value}
          </motion.span>
        )}
      </p>
      <p
        style={{
          fontFamily: '"DM Mono", "Courier New", monospace',
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#6B7280",
          marginTop: 6,
          marginBottom: 0,
          lineHeight: 1.3,
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Featured Work Card
   ──────────────────────────────────────────────────────── */

function FeaturedCardSkeleton() {
  return (
    <div
      data-testid="featured-skeleton"
      style={{
        borderRadius: 12,
        height: 220,
        background:
          "linear-gradient(90deg, #f0efed 25%, #e8e7e4 50%, #f0efed 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

function FeaturedWorkCard() {
  const { project, loading } = useFeaturedProject();

  if (loading) return <FeaturedCardSkeleton />;

  const title = project?.title ?? FALLBACK_PROJECT.title;
  const tagline = project?.tagline ?? FALLBACK_PROJECT.tagline;
  const metrics = (project?.metrics ?? FALLBACK_PROJECT.metrics).slice(0, 2);
  const tags = (project?.tags ?? FALLBACK_PROJECT.tags).slice(0, 3);
  const caseStudyUrl =
    project?.caseStudyUrl ?? FALLBACK_PROJECT.caseStudyUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
    >
      <div
        style={{
          background: "#F9F8F6",
          border: "1px solid #E5E4E0",
          borderRadius: 12,
          padding: 20,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: '"DM Mono", "Courier New", monospace',
            fontSize: 9,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#6B7280",
            margin: "0 0 10px 0",
          }}
        >
          ✦ Featured Work
        </p>

        {/* Title */}
        <p
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 16,
            color: "#111110",
            lineHeight: 1.25,
            margin: "0 0 5px 0",
          }}
        >
          {title}
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 11,
            color: "#6B7280",
            lineHeight: 1.6,
            margin: "0 0 12px 0",
          }}
        >
          {tagline}
        </p>

        {/* Mini metrics row */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 12,
          }}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <p
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#111110",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {m.value}
              </p>
              <p
                style={{
                  fontFamily: '"DM Mono", "Courier New", monospace',
                  fontSize: 8,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  color: "#6B7280",
                  margin: "2px 0 0 0",
                }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          {tags.map((tag, i) => (
            <span
              key={tag}
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: 9,
                padding: "2px 6px",
                borderRadius: 3,
                ...(i < 2
                  ? { background: "#EAF3EE", color: "#2D6A4F" }
                  : {
                      background: "transparent",
                      color: "#6B7280",
                      border: "1px solid #E5E4E0",
                    }),
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Case Study link */}
        <a
          href={caseStudyUrl}
          className="link-animated"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 11,
            fontWeight: 500,
            color: "#2D6A4F",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          View Case Study →
        </a>
      </div>

      {/* View all projects button */}
      <Link
        to="/projects"
        className="featured-all-btn"
        style={{
          display: "block",
          marginTop: 10,
          border: "1px dashed #E5E4E0",
          borderRadius: 6,
          padding: 8,
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 10,
          fontWeight: 500,
          color: "#6B7280",
          textAlign: "center",
          textDecoration: "none",
          transition: "border-color 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#2D6A4F";
          e.currentTarget.style.color = "#2D6A4F";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E5E4E0";
          e.currentTarget.style.color = "#6B7280";
        }}
      >
        View all projects →
      </Link>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Hex grid SVG pattern
   ──────────────────────────────────────────────────────── */

function HexGridBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: 0.035,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hex-grid"
            width="40"
            height="46"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <polygon
              points="20,2 38,12 38,34 20,44 2,34 2,12"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Scroll indicator (#9)
   ──────────────────────────────────────────────────────── */

function ScrollIndicator() {
  const scrollY = useScrollY();
  const opacity = scrollY > 80 ? 0 : 1;

  return (
    <div
      data-testid="scroll-indicator"
      style={{
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        opacity,
        transition: "opacity 0.3s ease",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 12,
          color: "#6B7280",
          animation: "scrollBounce 1.8s ease-in-out infinite",
        }}
      >
        ↓
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Stagger animation config
   ──────────────────────────────────────────────────────── */

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ────────────────────────────────────────────────────────
   Home component
   ──────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* Subtle hex-grid background texture */}
        <HexGridBackground />

        {/* Two-column hero grid */}
        <div
          className="hero-grid"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 960,
            margin: "0 auto",
            padding: "80px 24px 64px",
            display: "grid",
            gridTemplateColumns: "1fr 240px",
            gap: 36,
            alignItems: "start",
          }}
        >
          {/* ── Left column: existing hero content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* 1 · Overline */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: '"DM Mono", "Courier New", monospace',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6B7280",
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              Product Manager · Fintech · IIT Delhi MBA
            </motion.p>

            {/* 2 · Heading */}
            <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
              <h1
                className="hero-heading"
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                <span style={{ color: "#111110", display: "block" }}>
                  Bhautik
                </span>
                <span
                  style={{
                    color: "#2D6A4F",
                    fontStyle: "italic",
                    display: "block",
                  }}
                >
                  Patel
                </span>
              </h1>
            </motion.div>

            {/* 3 · Tagline */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: 16,
                color: "#6B7280",
                lineHeight: 1.75,
                maxWidth: 480,
                marginTop: 0,
                marginBottom: 32,
              }}
            >
              I build 0→1 fintech products that move money, reduce risk, and
              scale.
              <br />
              4&nbsp;years turning complex domain problems into shipped
              products.
            </motion.p>

            {/* 4 · CTA Buttons */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 56,
              }}
            >
              <Link
                to="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "9px 18px",
                  borderRadius: 6,
                  backgroundColor: "#2D6A4F",
                  color: "#ffffff",
                  textDecoration: "none",
                  transition:
                    "background-color 0.15s, transform 0.1s, box-shadow 0.15s",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#245A41";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(45,106,79,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2D6A4F";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                View Projects →
              </Link>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "9px 18px",
                  borderRadius: 6,
                  backgroundColor: "#ffffff",
                  color: "#3D3D3A",
                  textDecoration: "none",
                  border: "1px solid #E5E4E0",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2D6A4F";
                  e.currentTarget.style.color = "#2D6A4F";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E4E0";
                  e.currentTarget.style.color = "#3D3D3A";
                }}
              >
                ↓ Download Resume
              </a>
            </motion.div>

            {/* 5 · Stats row */}
            <motion.div
              variants={fadeUp}
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10,
              }}
            >
              {STATS.map((stat, i) => (
                <StatCardItem key={stat.label} stat={stat} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column: Featured Work card ── */}
          <div className="featured-col">
            <FeaturedWorkCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* ── Responsive overrides & shimmer animation ── */}
      <style>{`
        .hero-heading {
          font-size: clamp(36px, 8vw, 64px);
        }
        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-col {
            order: 1;
          }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
