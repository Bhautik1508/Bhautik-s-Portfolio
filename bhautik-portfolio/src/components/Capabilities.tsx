import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CARDS = [
  {
    title: "Product management",
    items: [
      "Roadmaps & PRDs",
      "RICE prioritization",
      "User research & surveys",
      "Agile / Scrum",
      "Stakeholder management",
      "Go-to-Market",
    ],
  },
  {
    title: "Data & analytics",
    items: [
      "SQL & Hadoop",
      "Tableau dashboards",
      "KPI frameworks",
      "A/B testing",
      "Reconciliation & QA",
    ],
  },
  {
    title: "Tools & tech",
    items: [
      "JIRA & Confluence",
      "Figma",
      "Python (pandas)",
      "Prompt engineering",
      "LLM integration (Gemini, Claude)",
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="py-20 md:py-28 px-6"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-sans font-medium"
          style={{
            fontSize: 12,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3B6B4F",
            marginBottom: 12,
          }}
        >
          Capabilities
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            color: "#1A1A1A",
            marginBottom: 12,
          }}
        >
          What I bring to the table
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "#6B6560",
            maxWidth: 520,
            marginBottom: 40,
          }}
        >
          From regulated banking systems to 0-to-1 AI products — I operate
          across the full product lifecycle.
        </motion.p>

        {/* 3-column cards grid */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              style={{
                backgroundColor: "#FFFFFF",
                border: "0.5px solid #DDD8D2",
                borderRadius: 10,
                padding: 24,
              }}
            >
              {/* Card title */}
              <h3
                className="font-sans font-medium"
                style={{
                  fontSize: 13,
                  color: "#3B6B4F",
                  marginBottom: 16,
                }}
              >
                {card.title}
              </h3>

              {/* List items */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="font-sans flex items-start gap-2.5"
                    style={{ fontSize: 12, lineHeight: 1.5, color: "#6B6560" }}
                  >
                    {/* Bullet dot */}
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "#DDD8D2",
                        marginTop: 5,
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
