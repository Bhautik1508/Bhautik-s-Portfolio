import { motion } from "framer-motion";
import { RESUME_URL } from "../config/site";

/* ── Hex grid SVG background (very subtle, 4-5% opacity) ── */
function HexGridBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: 0.045,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hero-hex-grid"
            width="56"
            height="64"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <polygon
              points="28,2 52,16 52,48 28,62 4,48 4,16"
              fill="none"
              stroke="#3B6D11"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-hex-grid)" />
      </svg>
    </div>
  );
}

/* ── Animation variants for staggered entrance ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.03, 0.26, 1] },
  },
};

const ctaVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.26, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#F9F7F3",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Subtle hex-grid background texture */}
      <HexGridBackground />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 800,
          margin: "0 auto",
          padding: "120px 24px 80px",
          width: "100%",
        }}
      >
        {/* ── Headline: "Bhautik Patel" ── */}
        <motion.h1
          variants={fadeUpVariant}
          className="font-display"
          style={{
            fontSize: "clamp(48px, 8vw, 88px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "#1A1A18",
            margin: 0,
            marginBottom: 20,
          }}
        >
          Bhautik Patel
        </motion.h1>

        {/* ── Subheadline ── */}
        <motion.p
          variants={fadeUpVariant}
          className="font-sans"
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.5,
            color: "#6B7280",
            margin: 0,
            marginBottom: 14,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Product Manager · Fintech · AI Products · IIT Delhi MBA
        </motion.p>

        {/* ── One-liner ── */}
        <motion.p
          variants={fadeUpVariant}
          className="font-sans"
          style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            lineHeight: 1.65,
            color: "#1A1A18",
            margin: 0,
            marginBottom: 40,
            maxWidth: 580,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          I turn ambiguous problems into shipped products.
          <br />
          4+ years across fintech and AI.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          variants={ctaVariant}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}
        >
          {/* Primary: See My Work */}
          <a
            href="#mission-cards"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("mission-cards");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.pushState(null, "", "#mission-cards");
            }}
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 6,
              backgroundColor: "#3B6D11",
              color: "#FFFFFF",
              textDecoration: "none",
              border: "none",
              transition: "all 150ms ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2F5A0D";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(59, 109, 17, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3B6D11";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            See My Work ↓
          </a>

          {/* Secondary: Download Resume */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 6,
              backgroundColor: "transparent",
              color: "#1A1A18",
              textDecoration: "none",
              border: "1px solid #E5E2D9",
              transition: "all 150ms ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3B6D11";
              e.currentTarget.style.color = "#3B6D11";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E2D9";
              e.currentTarget.style.color = "#1A1A18";
            }}
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
