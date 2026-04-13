import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CARDS = [
  {
    title: "Product management",
    items: [
      "Roadmaps, PRDs & specs",
      "RICE / North Star metrics",
      "User research & surveys",
      "Stakeholder management",
      "0\u20111 and scale-up GTM",
      "AI / LLM product design",
    ],
  },
  {
    title: "Fintech domain",
    items: [
      "Credit risk & risk appetite",
      "Basel III / IV \u00b7 IFRS 9",
      "Regulatory reporting",
      "Hadoop data lake & lineage",
      "Model & data quality controls",
      "Audit and compliance evidencing",
    ],
  },
  {
    title: "Data & analytics",
    items: [
      "SQL, Python (pandas)",
      "Tableau & dashboarding",
      "KPI design & A/B testing",
      "Reconciliation & data QA",
      "python-pptx, Claude / Gemini API",
      "Prompt engineering & LangGraph",
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
            fontSize: 14,
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
            fontSize: "clamp(30px, 4.5vw, 42px)",
            lineHeight: 1.15,
            color: "#1A1A1A",
            marginBottom: 16,
          }}
        >
          What I bring to the table
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 18,
            lineHeight: 1.75,
            color: "#3E3935",
            maxWidth: 600,
            marginBottom: 48,
          }}
        >
          From regulated banking systems to 0‑to‑1 AI products. Deep fintech
          domain knowledge paired with hands-on data and product craft.
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
                  fontSize: 17,
                  color: "#3B6B4F",
                  marginBottom: 20,
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
                  gap: 12,
                }}
              >
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="font-sans flex items-start gap-2.5"
                    style={{ fontSize: 15, lineHeight: 1.6, color: "#3E3935" }}
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
