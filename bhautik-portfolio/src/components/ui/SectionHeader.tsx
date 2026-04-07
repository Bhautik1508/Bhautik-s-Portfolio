import Badge from "./Badge";

interface SectionHeaderProps {
  label: string;
  heading: string;
  subtext?: string;
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  subtext,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={className}
      style={{
        textAlign: "center",
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      {/* Overline label */}
      <div style={{ marginBottom: 16 }}>
        <Badge variant="default">{label}</Badge>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: "clamp(36px, 5vw, 48px)",
          color: "#111110",
          lineHeight: 1.15,
          margin: 0,
        }}
      >
        {heading}
      </h2>

      {/* Subtext */}
      {subtext && (
        <p
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: 16,
            color: "#6B7280",
            lineHeight: 1.7,
            marginTop: 12,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
