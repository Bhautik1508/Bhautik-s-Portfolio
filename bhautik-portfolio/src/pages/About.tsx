import { motion } from "framer-motion";
import { Badge } from "../components/ui";

/* ────────────────────────────────────────────────────────
   Animation helpers
   ──────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const staggerPanel = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.05 },
  }),
};

/* ────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────── */

const TRAITS = ["Strategic Thinker", "Data-Driven", "0→1 Builder"];

const SKILL_PANELS = [
  { icon: "📊", title: "Data & Analytics", tags: ["SQL", "Tableau", "Microsoft Office", "Hadoop"] },
  { icon: "🎨", title: "Design & Prototyping", tags: ["Figma", "JIRA", "Confluence", "Wireframing"] },
  { icon: "⚙", title: "Product Management", tags: ["Roadmaps", "Prioritization", "Agile", "Scrum", "Stakeholder Engagement"] },
  { icon: "💡", title: "Domain", tags: ["Credit Risk Management", "Regulatory Reporting", "Go-to-Market", "User Research"] },
];

const DOMAIN_TAGS = ["Nostro", "Risk Appetite", "Large Exposure", "Regulatory", "Hadoop"];

const GAMES = ["Wingspan", "Gloomhaven", "Dune Imperium", "Terraforming Mars"];

/* ────────────────────────────────────────────────────────
   Skill Tag with hover
   ──────────────────────────────────────────────────────── */

function SkillTag({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: 10,
        fontWeight: 500,
        color: "#6B7280",
        border: "1px solid #E5E4E0",
        backgroundColor: "transparent",
        padding: "3px 8px",
        borderRadius: 4,
        transition: "all 150ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#2D6A4F";
        e.currentTarget.style.color = "#2D6A4F";
        e.currentTarget.style.backgroundColor = "#EAF3EE";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5E4E0";
        e.currentTarget.style.color = "#6B7280";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────
   About page
   ──────────────────────────────────────────────────────── */

export default function About() {
  return (
    <>
    <section
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      {/* ═══════════════════════════════════════════════════
          SECTION 1 — "THE STRATEGIST"
          ═══════════════════════════════════════════════════ */}

      {/* Section label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        style={{ marginBottom: 12 }}
      >
        <Badge variant="default">Player Card</Badge>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        style={{
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: 40,
          color: "#111110",
          lineHeight: 1.15,
          margin: "0 0 40px 0",
        }}
      >
        About Me
      </motion.h1>

      {/* Two-column grid: Bio + Player Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: 48,
        }}
        className="about-grid"
      >
        {/* LEFT — Bio */}
        <div>
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 14,
              color: "#3D3D3A",
              lineHeight: 1.8,
              margin: "0 0 20px 0",
            }}
          >
            4 years in fintech, from Standard Chartered to co-founding Addivity
            (edtech) to leading PM work on payments, risk, and AI. IIT Delhi MBA.
            I treat product strategy like a board game — resource constraints,
            multi-player dynamics, and long-term positioning.
          </p>
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 14,
              color: "#3D3D3A",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            I specialise in 0→1 builds in regulated financial environments — where
            you have to ship fast but break nothing. My edge is combining deep
            fintech domain knowledge with technical fluency and stakeholder
            management across engineering, design, risk, and compliance teams.
          </p>
        </div>

        {/* RIGHT — Player Card */}
        <div
          style={{
            backgroundColor: "#F9F8F6",
            border: "1px solid #E5E4E0",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
          }}
        >
          {/* Avatar */}
          {/* TODO: replace with real photo */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#EAF3EE",
              border: "2px solid #2D6A4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <span
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 22,
                color: "#2D6A4F",
                lineHeight: 1,
              }}
            >
              BP
            </span>
          </div>

          {/* Name */}
          <p
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 17,
              color: "#111110",
              margin: "0 0 2px 0",
            }}
          >
            Bhautik Patel
          </p>

          {/* Title */}
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 11,
              color: "#6B7280",
              margin: "0 0 16px 0",
            }}
          >
            Product Manager · Fintech
          </p>

          {/* Trait badges */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {TRAITS.map((trait) => (
              <span
                key={trait}
                style={{
                  display: "block",
                  backgroundColor: "#EAF3EE",
                  color: "#2D6A4F",
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  borderRadius: 4,
                  padding: "6px 12px",
                  textAlign: "center",
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — "RESOURCE BOARD"
          ═══════════════════════════════════════════════════ */}

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #E5E4E0",
          margin: "56px 0 40px",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        custom={0.1}
      >
        <div style={{ marginBottom: 8 }}>
          <Badge variant="default">Resource Board</Badge>
        </div>

        <h2
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 32,
            color: "#111110",
            lineHeight: 1.15,
            margin: "0 0 8px 0",
          }}
        >
          Skills
        </h2>

        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 14,
            color: "#6B7280",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Tools and frameworks I use to build and ship products.
        </p>
      </motion.div>

      {/* Skill panels 2×2 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 24,
        }}
        className="skills-grid"
      >
        {SKILL_PANELS.map((panel, i) => (
          <motion.div
            key={panel.title}
            variants={staggerPanel}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={i}
            style={{
              backgroundColor: "#F9F8F6",
              border: "1px solid #E5E4E0",
              borderRadius: 10,
              padding: 18,
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>{panel.icon}</span>
              <span
                style={{
                  fontFamily: '"DM Mono", "Courier New", monospace',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                }}
              >
                {panel.title}
              </span>
            </div>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {panel.tags.map((tag) => (
                <SkillTag key={tag}>{tag}</SkillTag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Domain Expertise highlight band */}
      <motion.div
        variants={staggerPanel}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        custom={4}
        style={{
          marginTop: 16,
          background: "#F9F8F6",
          border: "1px solid #E5E4E0",
          borderRadius: 10,
          padding: 18,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          alignItems: "center",
        }}
        className="domain-band"
      >
        {/* Left side */}
        <div>
          <p
            style={{
              fontFamily: '"DM Mono", "Courier New", monospace',
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6B7280",
              margin: "0 0 4px 0",
            }}
          >
            Core Domain
          </p>
          <h3
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 18,
              color: "#111110",
              lineHeight: 1.15,
              margin: "0 0 6px 0",
            }}
          >
            Credit Risk Management
          </h3>
          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 13,
              color: "#6B7280",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            5+ years specialising in credit risk within banking — Nostro products, Risk Appetite
            frameworks, Large Exposure monitoring, and regulatory reporting for SCB.
          </p>
        </div>

        {/* Right side — inline tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "flex-end",
          }}
        >
          {DOMAIN_TAGS.map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — "OFF THE CLOCK"
          ═══════════════════════════════════════════════════ */}

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #E5E4E0",
          margin: "48px 0 32px",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        custom={0.1}
      >
        <div style={{ marginBottom: 8 }}>
          <Badge variant="default">Off the Clock</Badge>
        </div>

        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 13,
            color: "#6B7280",
            margin: "0 0 12px 0",
            lineHeight: 1.6,
          }}
        >
          When not shipping products, I'm strategising at the table.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>🎲</span>
          {GAMES.map((game) => (
            <span
              key={game}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: 11,
                fontWeight: 500,
                color: "#6B7280",
                border: "1px solid #E5E4E0",
                borderRadius: 4,
                padding: "4px 10px",
                backgroundColor: "transparent",
              }}
            >
              {game}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 640px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .domain-band {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
    </>
  );
}
