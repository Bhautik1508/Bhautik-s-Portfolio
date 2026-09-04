/* Interleaved across AI / product / fintech / tools so the ticker reads varied
   rather than clustered by category. */
const SKILLS = [
  "Agentic AI",
  "SQL",
  "Multi-Agent Systems",
  "Credit Risk",
  "LangGraph",
  "PRDs",
  "RAG",
  "Regulatory Reporting",
  "Knowledge Graphs",
  "Figma",
  "Evals",
  "User Research",
  "AI Governance",
  "KYC/AML",
  "Prompt Engineering",
  "Python",
  "Human-in-the-Loop",
  "Payments & Lending",
  "LLM Product Design",
  "JIRA",
  "RICE Framework",
  "Tableau",
  "Go-to-Market",
  "Hadoop",
  "Agile / Scrum",
];

/* The track scrolls one full copy of the list (translateX(-50%)) per cycle, so
   duration must scale with the item count to hold the speed steady. The
   original 14 skills ran at 28s — 2s per item. */
const MARQUEE_DURATION = `${SKILLS.length * 2}s`;

export default function Marquee() {
  /* Duplicate for seamless loop */
  const items = [...SKILLS, ...SKILLS];

  return (
    <section
      style={{
        backgroundColor: "#EDE8E1",
        borderTop: "0.5px solid #DDD8D2",
        borderBottom: "0.5px solid #DDD8D2",
        overflow: "hidden",
      }}
      className="py-4"
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": MARQUEE_DURATION } as React.CSSProperties}
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="font-sans whitespace-nowrap inline-flex items-center"
            style={{ fontSize: 14, color: "#6B6560", padding: "0 22px" }}
          >
            {/* Sage green dot */}
            <span
              aria-hidden="true"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#3B6B4F",
                opacity: 0.4,
                marginRight: 10,
                flexShrink: 0,
              }}
            />
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
