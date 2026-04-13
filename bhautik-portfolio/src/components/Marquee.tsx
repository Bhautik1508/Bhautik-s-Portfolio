const SKILLS = [
  "SQL",
  "Figma",
  "JIRA",
  "Tableau",
  "Hadoop",
  "PRDs",
  "RICE Framework",
  "User Research",
  "Agile / Scrum",
  "Prompt Engineering",
  "Go-to-Market",
  "LLM Integration",
  "Credit Risk",
  "Confluence",
];

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
      <div className="marquee-track">
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
