import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RESUME_URL } from "../config/site";

/* ── Timeline entry data ── */
interface TimelineEntry {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

const ENTRIES: TimelineEntry[] = [
  {
    company: "Standard Chartered Bank",
    role: "Product Manager / Senior Analyst",
    duration: "2021 – 2024",
    bullets: [
      "Automated KYC onboarding pipeline, reducing manual effort by 40%",
      "Built risk appetite reporting infrastructure serving 12 countries",
      "Led data-to-PPT automation reducing reporting time from 3 days to 4 hours",
    ],
  },
  {
    company: "Addivity (Co-founder)",
    role: "Product & Strategy Lead",
    duration: "2020 – 2021",
    bullets: [
      "Co-founded edtech startup, took product from 0-to-1",
      "Defined MVP scope, ran user interviews with 50+ students",
      "Built initial growth loop reaching 1,000+ users",
    ],
  },
  {
    company: "IIT Delhi",
    role: "MBA, Strategy & Operations",
    duration: "2018 – 2020",
    bullets: [
      "Top-tier MBA with focus on product strategy and operations",
    ],
  },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const entryVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.03, 0.26, 1] },
  },
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ── Timeline node (hex-shaped) ── */
function TimelineNode() {
  return (
    <motion.div
      variants={nodeVariants}
      style={{
        position: "absolute",
        left: -6,
        top: 6,
        width: 12,
        height: 12,
        zIndex: 2,
      }}
    >
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <polygon
          points="6,0.5 11.5,3.5 11.5,10.5 6,13.5 0.5,10.5 0.5,3.5"
          fill="#3B6D11"
        />
      </svg>
    </motion.div>
  );
}

/* ── Single timeline entry ── */
function TimelineEntryCard({ entry }: { entry: TimelineEntry }) {
  return (
    <motion.div
      variants={entryVariants}
      style={{
        position: "relative",
        paddingLeft: 28,
        paddingBottom: 40,
      }}
    >
      {/* Hex node on the timeline line */}
      <TimelineNode />

      {/* Company name */}
      <h3
        className="font-display"
        style={{
          fontSize: "clamp(20px, 3vw, 26px)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "#1A1A18",
          margin: "0 0 4px 0",
        }}
      >
        {entry.company}
      </h3>

      {/* Role */}
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#3B6D11",
          margin: "0 0 4px 0",
          letterSpacing: "-0.01em",
        }}
      >
        {entry.role}
      </p>

      {/* Duration */}
      <p
        className="font-sans"
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: "#6B7280",
          margin: "0 0 14px 0",
          letterSpacing: "0.02em",
        }}
      >
        {entry.duration}
      </p>

      {/* Bullets */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {entry.bullets.map((bullet, i) => (
          <li
            key={i}
            className="font-sans"
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "#3D3D3A",
              paddingLeft: 16,
              position: "relative",
            }}
          >
            {/* Custom bullet */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "0.45em",
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#E5E2D9",
              }}
            />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="campaign-log"
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
          variants={entryVariants}
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
          Campaign Log
        </motion.p>

        {/* Section heading */}
        <motion.h2
          variants={entryVariants}
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1A1A18",
            margin: "0 0 48px 0",
          }}
        >
          Experience
        </motion.h2>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            borderLeft: "1px solid #E5E2D9",
            marginLeft: 6,
          }}
        >
          {ENTRIES.map((entry) => (
            <TimelineEntryCard key={entry.company} entry={entry} />
          ))}
        </div>

        {/* Download Full Resume CTA */}
        <motion.div
          variants={entryVariants}
          style={{
            marginTop: 16,
            paddingTop: 32,
            borderTop: "1px solid #E5E2D9",
            textAlign: "center",
          }}
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 28px",
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Full Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
