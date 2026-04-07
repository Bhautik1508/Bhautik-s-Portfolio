import { motion } from "framer-motion";
import { Badge } from "../components/ui";
import { RESUME_URL } from "../lib/config";
import PageWrapper from "../components/layout/PageWrapper";

/* ────────────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

/* ────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────── */

interface TimelineEntry {
  company: string;
  turnRange: string;
  role: string;
  bullets: string[];
  tags: string[];
}

const EXPERIENCE: TimelineEntry[] = [
  {
    company: "Standard Chartered Bank",
    turnRange: "2022–Present",
    role: "Product Manager",
    bullets: [
      "Led 0→1 build of payments feature serving 200K+ customers, ₹2Cr+ revenue impact",
      "Reduced onboarding drop-off 34% via iterative UX improvements and A/B testing",
      "Partnered with Risk & Compliance to ship KYC automation in 3 regulated markets",
      "Owned product roadmap across 4 squads; ran weekly sprint reviews and stakeholder demos",
    ],
    tags: ["Payments", "KYC", "Fintech", "0→1"],
  },
  {
    company: "Addivity (Co-founded)",
    turnRange: "2020–2022",
    role: "Co-founder & Product Lead",
    bullets: [
      "Co-founded edtech startup — defined product vision, roadmap, and GTM strategy",
      "Shipped MVP in 8 weeks; grew to 1,200 active learners in first semester",
      "Raised seed funding; led team of 6 across engineering and design",
    ],
    tags: ["0→1", "EdTech", "Startup", "Fundraising"],
  },
  {
    company: "Prodapt Solutions",
    turnRange: "2019–2020",
    role: "Business Analyst",
    bullets: [
      "Delivered 3 process automation initiatives saving 1,200 hours/quarter",
      "Built dashboards in Tableau for senior stakeholders across 2 BUs",
    ],
    tags: ["Analytics", "Automation", "Tableau"],
  },
];

/* ────────────────────────────────────────────────────────
   Shared inline style helpers
   ──────────────────────────────────────────────────────── */

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
  lineHeight: 1.15,
  margin: 0,
  ...extra,
});

/* ────────────────────────────────────────────────────────
   Timeline Item
   ──────────────────────────────────────────────────────── */

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  return (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      style={{
        paddingLeft: 28,
        marginBottom: 36,
        position: "relative",
      }}
    >
      {/* Dot */}
      <div
        style={{
          position: "absolute",
          left: -5,
          top: 7,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#fff",
          border: "2px solid #2D6A4F",
        }}
      />

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <span
          style={inter(11, 600, "#2D6A4F", {
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          })}
        >
          {entry.company}
        </span>
        <span
          style={{
            ...inter(9, 400, "#6B7280"),
            backgroundColor: "#F9F8F6",
            border: "1px solid #E5E4E0",
            padding: "2px 8px",
            borderRadius: 4,
            lineHeight: 1.4,
          }}
        >
          Turn {entry.turnRange}
        </span>
      </div>

      {/* Role */}
      <h3 style={serif(19, "#111110", { marginBottom: 8, lineHeight: 1.25 })}>
        {entry.role}
      </h3>

      {/* Bullets */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 12px 0",
        }}
      >
        {entry.bullets.map((bullet, i) => (
          <li
            key={i}
            style={{
              ...inter(13, 400, "#3D3D3A", { lineHeight: 1.65 }),
              paddingLeft: 14,
              position: "relative",
              marginBottom: 3,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                color: "#E5E4E0",
              }}
            >
              —
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            style={{
              ...inter(10, 500, "#2D6A4F"),
              backgroundColor: "#EAF3EE",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Resume page
   ──────────────────────────────────────────────────────── */

export default function Resume() {
  return (
    <PageWrapper>
    <section
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      {/* ═══════════════════════════════════════════════════
          SECTION 1 — WORK EXPERIENCE TIMELINE
          ═══════════════════════════════════════════════════ */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        style={{ marginBottom: 8 }}
      >
        <Badge variant="default">Campaign History</Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        style={serif(40, "#111110", { marginBottom: 0 })}
      >
        Experience
      </motion.h1>

      {/* Timeline container */}
      <div
        style={{
          marginTop: 32,
          position: "relative",
        }}
      >
        {/* Vertical accent line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 1,
            backgroundColor: "#E5E4E0",
          }}
        />

        {EXPERIENCE.map((entry, i) => (
          <TimelineItem key={entry.company} entry={entry} index={i} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — EDUCATION & CERTIFICATIONS
          ═══════════════════════════════════════════════════ */}

      <div
        style={{
          marginTop: 56,
          borderTop: "1px solid #E5E4E0",
          paddingTop: 40,
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0}
          style={{ marginBottom: 8 }}
        >
          <Badge variant="default">Achievements</Badge>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0.1}
          style={serif(32, "#111110")}
        >
          Education
        </motion.h2>

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginTop: 24,
          }}
          className="edu-grid"
        >
          {/* Left — MBA card */}
          <motion.div
            variants={cardFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0}
            style={{
              border: "1.5px solid #2D6A4F",
              backgroundColor: "#EAF3EE",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <p
              style={inter(10, 600, "#2D6A4F", {
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 6,
              })}
            >
              IIT Delhi
            </p>
            <h3
              style={serif(17, "#111110", {
                marginBottom: 6,
                lineHeight: 1.25,
              })}
            >
              Master of Business Administration
            </h3>
            <p style={inter(12, 400, "#6B7280", { marginBottom: 12 })}>
              2019 – 2021
            </p>
            <span
              style={{
                ...inter(10, 500, "#2D6A4F"),
                backgroundColor: "#ffffff",
                border: "1px solid #2D6A4F",
                padding: "3px 8px",
                borderRadius: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              🏆 IIT Delhi
            </span>
          </motion.div>

          {/* Right — Certifications card */}
          <motion.div
            variants={cardFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={1}
            style={{
              border: "1px solid #E5E4E0",
              backgroundColor: "#F9F8F6",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <p
              style={inter(10, 600, "#6B7280", {
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 10,
              })}
            >
              Certifications
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {[
                "[Add certification 1]",
                "[Add certification 2]",
                "[Add certification 3]",
              ].map((cert, i) => (
                <li
                  key={i}
                  style={inter(12, 400, "#3D3D3A", {
                    lineHeight: 1.9,
                  })}
                >
                  · {cert}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — DOWNLOAD
          ═══════════════════════════════════════════════════ */}

      <div
        style={{
          marginTop: 48,
          borderTop: "1px solid #E5E4E0",
          paddingTop: 36,
          textAlign: "center",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0}
        >
          <h2 style={serif(24, "#111110", { marginBottom: 8 })}>
            Want the full picture?
          </h2>
          <p
            style={inter(13, 400, "#6B7280", {
              marginBottom: 20,
              lineHeight: 1.6,
            })}
          >
            Full resume with all details, metrics, and projects.
          </p>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              padding: "10px 22px",
              borderRadius: 6,
              backgroundColor: "#2D6A4F",
              color: "#ffffff",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#245A41")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2D6A4F")
            }
          >
            📄 Download Full Resume
          </a>

          <p style={inter(11, 400, "#6B7280", { marginTop: 8 })}>
            PDF · Last updated April 2026
          </p>
        </motion.div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 600px) {
          .edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
    </PageWrapper>
  );
}
