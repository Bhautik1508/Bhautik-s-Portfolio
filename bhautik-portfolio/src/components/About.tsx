import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── PM Superpower cards data ── */
const SUPERPOWERS = [
  {
    icon: "🔍",
    label: "Discovery First",
    description: "I start with user research, not features",
  },
  {
    icon: "📊",
    label: "Data-Backed Decisions",
    description: "Every tradeoff has a number attached",
  },
  {
    icon: "🚀",
    label: "0-to-1 Builder",
    description: "Two products launched from scratch",
  },
] as const;

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.03, 0.26, 1] },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="opening-move"
      ref={sectionRef}
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E2D9",
        padding: "80px 24px",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        style={{
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {/* Section eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#3B6D11",
            margin: "0 0 12px 0",
          }}
        >
          Opening Move
        </motion.p>

        {/* Section heading */}
        <motion.h2
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1A1A18",
            margin: "0 0 48px 0",
          }}
        >
          Who I Am
        </motion.h2>

        {/* Two-column layout */}
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* ── Left column: Avatar + Bio ── */}
          <motion.div variants={fadeUp}>
            {/* Avatar circle with initials */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#F9F7F3",
                border: "2px solid #E5E2D9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 24,
                  color: "#3B6D11",
                  letterSpacing: "-0.02em",
                }}
              >
                BP
              </span>
            </div>

            {/* Bio paragraph */}
            <p
              className="font-sans"
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "#3D3D3A",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              I'm a Product Manager with 4+ years in fintech — from automating
              KYC at Standard Chartered to building AI-powered gifting products
              from 0&#8209;to&#8209;1. I hold an MBA from IIT Delhi. I think in
              systems, ship in sprints, and play Wingspan on weekends.
            </p>
          </motion.div>

          {/* ── Right column: PM Superpower cards ── */}
          <motion.div
            variants={containerVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {SUPERPOWERS.map((sp) => (
              <motion.div
                key={sp.label}
                variants={fadeUp}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E2D9",
                  borderRadius: 10,
                  padding: "18px 20px",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3B6D11";
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(59, 109, 17, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E2D9";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Icon + Label row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{sp.icon}</span>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1A1A18",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {sp.label}
                  </span>
                </div>
                {/* Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    margin: 0,
                    lineHeight: 1.5,
                    paddingLeft: 28,
                  }}
                >
                  {sp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
