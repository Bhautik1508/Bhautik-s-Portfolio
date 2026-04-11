import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Role {
  company: string;
  title: string;
  location: string;
  dates: string;
  description: string;
  highlights: string[];
}

const ROLES: Role[] = [
  {
    company: "Standard Chartered Bank",
    title: "Product Manager",
    location: "Bengaluru",
    dates: "Sep 2022 — Present",
    description:
      "Led 4+ credit risk projects end-to-end with 100% regulatory compliance. Designed dashboards reducing manual reporting by 30%. Directed Hadoop data store with 90%+ data quality across 20+ systems. Promoted within 2 years for high-impact delivery.",
    highlights: ["100%", "30%", "90%+", "20+"],
  },
  {
    company: "Prodapt Solutions",
    title: "Presales Consultant",
    location: "Chennai",
    dates: "May 2021 — Aug 2022",
    description:
      "Developed RFP responses contributing to $3M in new revenue. Built GTM strategies driving 15% revenue growth. Improved deal closure rates by 20%.",
    highlights: ["$3M", "15%", "20%"],
  },
  {
    company: "Addivity",
    title: "Co-founder & Head of Product",
    location: "Ahmedabad",
    dates: "Mar 2020 — Apr 2021",
    description:
      "Built MVP from PRD to launch in 6 months. Led 80+ person team across product, sales, marketing. Established 65+ corporate partnerships and onboarded 15+ industry experts.",
    highlights: ["80+", "65+", "15+"],
  },
  {
    company: "Education",
    title: "IIT Delhi — MBA",
    location: "",
    dates: "2019 — 2021",
    description:
      "Master of Business Administration from IIT Delhi. B.E. from LDRP-ITR, Gandhinagar (2014-2018).",
    highlights: [],
  },
];

/** Bold highlight numbers/metrics in a description string */
function renderDescription(text: string, highlights: string[]) {
  if (highlights.length === 0) return text;

  const parts: (string | { bold: string })[] = [];

  // Sort highlights by their first occurrence so we walk the string left-to-right.
  const sorted = highlights
    .map((h) => ({ h, idx: text.indexOf(h) }))
    .filter((x) => x.idx >= 0)
    .sort((a, b) => a.idx - b.idx);

  let offset = 0;
  for (const { h } of sorted) {
    const adjustedIdx = text.indexOf(h, offset);
    if (adjustedIdx < 0) continue;
    if (adjustedIdx > offset) {
      parts.push(text.slice(offset, adjustedIdx));
    }
    parts.push({ bold: h });
    offset = adjustedIdx + h.length;
  }
  if (offset < text.length) {
    parts.push(text.slice(offset));
  }

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i} style={{ color: "#1A1A1A", fontWeight: 500 }}>
            {part.bold}
          </span>
        ),
      )}
    </>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-28 px-6"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        {/* Section header */}
        <motion.p
          variants={slideIn}
          className="font-sans font-medium"
          style={{
            fontSize: 12,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3B6B4F",
            marginBottom: 12,
          }}
        >
          Experience
        </motion.p>
        <motion.h2
          variants={slideIn}
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            color: "#1A1A1A",
            marginBottom: 48,
          }}
        >
          My work experience
        </motion.h2>

        {/* Roles */}
        <div className="flex flex-col">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.company}
              variants={slideIn}
              className="flex flex-col md:flex-row gap-4 md:gap-10 py-7"
              style={{
                borderTop: i === 0 ? "0.5px solid #DDD8D2" : undefined,
                borderBottom: "0.5px solid #DDD8D2",
              }}
            >
              {/* Left column */}
              <div className="flex-shrink-0" style={{ minWidth: 140, maxWidth: 180 }}>
                <p
                  className="font-sans font-medium"
                  style={{ fontSize: 14, color: "#1A1A1A", marginBottom: 2 }}
                >
                  {role.company}
                </p>
                <p
                  className="font-sans font-medium"
                  style={{ fontSize: 12, color: "#3B6B4F", marginBottom: 4 }}
                >
                  {role.title}
                </p>
                <p className="font-sans" style={{ fontSize: 11, color: "#9B9590" }}>
                  {role.location && `${role.location} · `}{role.dates}
                </p>
              </div>

              {/* Right column */}
              <div className="flex-1">
                <p
                  className="font-sans"
                  style={{ fontSize: 13, lineHeight: 1.6, color: "#6B6560" }}
                >
                  {renderDescription(role.description, role.highlights)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
