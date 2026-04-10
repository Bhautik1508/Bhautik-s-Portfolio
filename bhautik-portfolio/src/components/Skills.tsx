import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Skill clusters with category metadata ── */
const SKILL_CLUSTERS = [
  {
    category: "Product Strategy",
    tint: "#3B6D11",
    tintBg: "rgba(59, 109, 17, 0.06)",
    skills: ["Roadmapping", "PRDs", "OKRs", "Prioritization (RICE/MoSCoW)"],
  },
  {
    category: "Discovery & Research",
    tint: "#1A6B5A",
    tintBg: "rgba(26, 107, 90, 0.06)",
    skills: [
      "User Interviews",
      "Surveys",
      "Competitive Analysis",
      "Jobs-to-be-Done",
    ],
  },
  {
    category: "Data & Analytics",
    tint: "#5B4FC7",
    tintBg: "rgba(91, 79, 199, 0.06)",
    skills: ["SQL", "Tableau", "Metrics Frameworks", "A/B Testing"],
  },
  {
    category: "Delivery",
    tint: "#B45309",
    tintBg: "rgba(180, 83, 9, 0.06)",
    skills: [
      "Agile / Scrum",
      "JIRA",
      "Sprint Planning",
      "Stakeholder Management",
    ],
  },
  {
    category: "Technical",
    tint: "#6B21A8",
    tintBg: "rgba(107, 33, 168, 0.06)",
    skills: [
      "APIs",
      "Figma",
      "Firebase",
      "Python (basic)",
      "LangGraph (conceptual)",
    ],
  },
] as const;

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.26, 1] },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="resource-board"
      ref={sectionRef}
      style={{
        backgroundColor: "#F9F7F3",
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
          Resource Board
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
          Skills &amp; Tools
        </motion.h2>

        {/* Skill clusters */}
        <motion.div
          variants={containerVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {SKILL_CLUSTERS.map((cluster) => (
            <motion.div key={cluster.category} variants={fadeUp}>
              {/* Category label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                {/* Color dot */}
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: cluster.tint,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-sans"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1A1A18",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cluster.category}
                </span>
              </div>

              {/* Skill tags */}
              <motion.div
                variants={containerVariants}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {cluster.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className="font-sans skill-tag"
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: cluster.tint,
                      backgroundColor: cluster.tintBg,
                      border: `1px solid transparent`,
                      borderRadius: 6,
                      padding: "6px 14px",
                      lineHeight: 1.4,
                      transition:
                        "border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cluster.tint;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "";
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
