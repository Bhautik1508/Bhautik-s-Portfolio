import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Degree {
  institution: string;
  degree: string;
  location: string;
  dates: string;
  description: string;
  highlights: string[];
}

const DEGREES: Degree[] = [
  {
    institution: "Indian Institute of Technology, Delhi",
    degree: "MBA, Management",
    location: "New Delhi",
    dates: "2020 \u2013 2022",
    description:
      "Specialised in product management and technology strategy. Built GiftSense as a capstone, taking the product from blank PRD to live MVP, covering user research, market sizing, LLM architecture and go-to-market.",
    highlights: ["product management", "GiftSense"],
  },
  {
    institution: "LDRP Institute of Technology & Research",
    degree: "B.E., Information Technology",
    location: "Ahmedabad",
    dates: "2015 \u2013 2019",
    description:
      "Core curriculum in data structures, databases, networking and software engineering. Founded Addivity during this period, leading an 80+ person team and closing 65+ corporate partnerships before graduating.",
    highlights: ["Addivity", "80+", "65+"],
  },
];

function renderDescription(text: string, highlights: string[]) {
  if (highlights.length === 0) return text;

  const parts: (string | { bold: string })[] = [];
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

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
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
            fontSize: 14,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3B6B4F",
            marginBottom: 12,
          }}
        >
          Education
        </motion.p>
        <motion.h2
          variants={slideIn}
          className="font-display"
          style={{
            fontSize: "clamp(30px, 4.5vw, 44px)",
            lineHeight: 1.1,
            color: "#1A1A1A",
            marginBottom: 48,
          }}
        >
          Where I studied
        </motion.h2>

        {/* Degrees with timeline */}
        <div className="relative">
          {DEGREES.map((deg, i) => (
            <motion.div
              key={deg.institution}
              variants={slideIn}
              className="relative flex gap-6 md:gap-10"
            >
              {/* Timeline column */}
              <div
                className="relative flex-shrink-0 flex flex-col items-center"
                style={{ width: 20 }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: "#3B6B4F",
                    border: "3px solid #E8F0EB",
                    marginTop: 4,
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                {/* Vertical line */}
                {i < DEGREES.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      backgroundColor: "#DDD8D2",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className="flex-1 pb-10"
                style={{
                  borderBottom:
                    i < DEGREES.length - 1
                      ? "0.5px solid #DDD8D2"
                      : undefined,
                  marginBottom: i < DEGREES.length - 1 ? 32 : 0,
                }}
              >
                {/* Institution name */}
                <p
                  className="font-sans font-medium"
                  style={{ fontSize: 17, color: "#1A1A1A", marginBottom: 2 }}
                >
                  {deg.institution}
                </p>

                {/* Degree + meta on same line */}
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1"
                  style={{ marginBottom: 12 }}
                >
                  <p
                    className="font-sans font-medium"
                    style={{ fontSize: 15, color: "#3B6B4F" }}
                  >
                    {deg.degree}
                  </p>
                  <span
                    className="font-sans"
                    style={{ fontSize: 14, color: "#9B9590" }}
                  >
                    ·
                  </span>
                  <p
                    className="font-sans"
                    style={{ fontSize: 14, color: "#6B6560" }}
                  >
                    {deg.location}
                  </p>
                  <span
                    className="font-sans"
                    style={{ fontSize: 14, color: "#9B9590" }}
                  >
                    ·
                  </span>
                  <p
                    className="font-sans"
                    style={{ fontSize: 14, color: "#6B6560" }}
                  >
                    {deg.dates}
                  </p>
                </div>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{ fontSize: 16, lineHeight: 1.8, color: "#3E3935" }}
                >
                  {renderDescription(deg.description, deg.highlights)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
