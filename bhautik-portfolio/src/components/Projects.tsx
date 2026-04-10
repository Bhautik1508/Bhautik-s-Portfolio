import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PROJECT_CARDS } from "../data/caseStudies";
import type { ProjectCardData } from "../data/caseStudies";

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
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

/* ── Single project card ── */
function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E2D9",
        borderRadius: 12,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#3B6D11";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(59, 109, 17, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5E2D9";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Category badge */}
      <span
        className="font-sans"
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "#3B6D11",
          backgroundColor: "rgba(59, 109, 17, 0.06)",
          borderRadius: 4,
          padding: "3px 10px",
          marginBottom: 14,
        }}
      >
        {project.category}
      </span>

      {/* Project name */}
      <h3
        className="font-display"
        style={{
          fontSize: "clamp(20px, 2.5vw, 24px)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "#1A1A18",
          margin: "0 0 8px 0",
        }}
      >
        {project.name}
      </h3>

      {/* Problem statement */}
      <p
        className="font-sans"
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "#6B7280",
          margin: "0 0 14px 0",
        }}
      >
        {project.problem}
      </p>

      {/* Outcome metric */}
      <p
        className="font-sans"
        style={{
          fontSize: 13,
          lineHeight: 1.55,
          fontWeight: 600,
          color: "#3B6D11",
          margin: "0 0 16px 0",
        }}
      >
        {project.outcome}
      </p>

      {/* Spacer to push bottom content down */}
      <div style={{ flex: 1 }} />

      {/* Bottom row: tools + link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Tool chips */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="font-sans"
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "#6B7280",
                backgroundColor: "#F9F7F3",
                borderRadius: 4,
                padding: "3px 8px",
                border: "1px solid #E5E2D9",
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Live site link (if available) */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#1A1A18",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                transition: "opacity 0.15s",
                whiteSpace: "nowrap",
                minHeight: "auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Live ↗
            </a>
          )}

          {project.liveUrl && (
            <span style={{ color: "#E5E2D9", fontSize: 12 }}>|</span>
          )}

          {/* Case study link */}
          <Link
            to={project.link}
            className="font-sans"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#3B6D11",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
              minHeight: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Read Case Study →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="mission-cards"
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
          Mission Cards
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
          Featured Projects
        </motion.h2>

        {/* 2x2 project grid */}
        <motion.div
          variants={containerVariants}
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {PROJECT_CARDS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </motion.div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
