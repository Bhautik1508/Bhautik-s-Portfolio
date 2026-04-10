import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CASE_STUDIES } from "../data/caseStudies";
import type { CaseStudyData } from "../data/caseStudies";
import Navbar from "../components/Navbar";
import BoardFooter from "../components/BoardFooter";

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.03, 0.26, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ── Section icon map (board-game flavored) ── */
const SECTION_ICONS: Record<string, string> = {
  "the-objective": "🎯",
  "the-map": "🗺️",
  "moves-made": "♟️",
  "victory-condition": "🏆",
  "next-turn": "🔄",
};

/* ── Sticky Table of Contents (desktop sidebar) ── */
function TableOfContents({
  sections,
  activeId,
}: {
  sections: CaseStudyData["sections"];
  activeId: string;
}) {
  return (
    <nav
      aria-label="Table of contents"
      className="toc-sidebar"
      style={{
        position: "sticky",
        top: 96,
        alignSelf: "start",
      }}
    >
      <p
        className="font-sans"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "#6B7280",
          margin: "0 0 14px 0",
        }}
      >
        On this page
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="font-sans"
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#3B6D11" : "#6B7280",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 6,
                  borderLeft: isActive
                    ? "2px solid #3B6D11"
                    : "2px solid transparent",
                  transition: "all 0.15s ease",
                  minHeight: "auto",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#1A1A18";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#6B7280";
                }}
              >
                <span style={{ fontSize: 14 }}>
                  {SECTION_ICONS[section.id] || "•"}
                </span>
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ── 404 state ── */
function CaseStudyNotFound() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F9F7F3" }}
    >
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center"
        style={{ paddingTop: 64 }}
      >
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <h1
            className="font-display"
            style={{
              fontSize: 48,
              color: "#1A1A18",
              margin: "0 0 16px 0",
            }}
          >
            Mission Not Found
          </h1>
          <p
            className="font-sans"
            style={{
              fontSize: 16,
              color: "#6B7280",
              margin: "0 0 32px 0",
            }}
          >
            This case study doesn't exist yet — or the URL is incorrect.
          </p>
          <Link
            to="/"
            className="font-sans"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#3B6D11",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </main>
      <BoardFooter />
    </div>
  );
}

/* ── Main Case Study Page ── */
export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const [activeId, setActiveId] = useState("");

  const study = slug ? CASE_STUDIES[slug] : undefined;

  // Scroll spy for TOC highlighting
  useEffect(() => {
    if (!study) return;

    const handleScroll = () => {
      const sectionEls = study.sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[];

      let current = "";
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [study]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) return <CaseStudyNotFound />;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F9F7F3" }}
    >
      <Navbar />
      <main className="flex-1" style={{ paddingTop: 64 }}>
        {/* Hero banner */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={stagger}
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5E2D9",
            padding: "60px 24px 48px",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {/* Back link */}
            <motion.div variants={fadeUp}>
              <Link
                to="/#mission-cards"
                className="font-sans"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#6B7280",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 24,
                  transition: "color 0.15s",
                  minHeight: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3B6D11";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                ← Back to Mission Cards
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.span
              variants={fadeUp}
              className="font-sans"
              style={{
                display: "inline-flex",
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
              {study.category}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: "clamp(36px, 6vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#1A1A18",
                margin: "0 0 12px 0",
              }}
            >
              {study.name}
            </motion.h1>

            {/* Problem statement */}
            <motion.p
              variants={fadeUp}
              className="font-sans"
              style={{
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.6,
                color: "#6B7280",
                margin: "0 0 20px 0",
                maxWidth: 600,
              }}
            >
              {study.problem}
            </motion.p>

            {/* Tool chips */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-sans"
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "#6B7280",
                    backgroundColor: "#F9F7F3",
                    borderRadius: 4,
                    padding: "4px 10px",
                    border: "1px solid #E5E2D9",
                  }}
                >
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Content area: sidebar + main */}
        <div
          className="case-study-layout"
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "48px 24px 80px",
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Sidebar TOC — desktop only */}
          <TableOfContents sections={study.sections} activeId={activeId} />

          {/* Main content sections */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
            {study.sections.map((section) => (
              <motion.article
                key={section.id}
                id={section.id}
                variants={fadeUp}
                style={{
                  scrollMarginTop: 96,
                }}
              >
                {/* Section header with icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <span style={{ fontSize: 20 }}>
                    {SECTION_ICONS[section.id] || "•"}
                  </span>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "clamp(22px, 3vw, 28px)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      color: "#1A1A18",
                      margin: 0,
                    }}
                  >
                    {section.title}
                  </h2>
                </div>

                {/* Content paragraphs */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {section.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-sans"
                      style={{
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: "#3D3D3A",
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}

            {/* Bottom CTA */}
            <div
              style={{
                paddingTop: 32,
                borderTop: "1px solid #E5E2D9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Link
                to="/#mission-cards"
                className="font-sans"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  minHeight: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3B6D11";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                ← All Projects
              </Link>
              <Link
                to="/#contact"
                className="font-sans"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  backgroundColor: "#3B6D11",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: 6,
                  transition: "background-color 0.15s, transform 0.1s",
                  minHeight: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2F5A0D";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3B6D11";
                  e.currentTarget.style.transform = "";
                }}
              >
                Let's Work Together →
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <BoardFooter />

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 767px) {
          .case-study-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .toc-sidebar {
            position: static !important;
            border-bottom: 1px solid #E5E2D9;
            padding-bottom: 20px;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}
