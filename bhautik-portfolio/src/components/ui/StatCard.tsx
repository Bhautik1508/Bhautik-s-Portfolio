interface StatCardProps {
  value: string;
  label: string;
  variant?: "dark" | "light";
  className?: string;
}

export default function StatCard({
  value,
  label,
  variant = "light",
  className = "",
}: StatCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={className}
      style={{
        backgroundColor: isDark ? "#111110" : "#F9F8F6",
        borderRadius: 8,
        padding: "16px 20px",
        border: isDark ? "none" : "1px solid #E5E4E0",
      }}
    >
      <p
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 28,
          fontWeight: 500,
          color: isDark ? "#ffffff" : "#111110",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: '"DM Mono", "Courier New", monospace',
          fontSize: 11,
          fontWeight: 500,
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginTop: 6,
          marginBottom: 0,
        }}
      >
        {label}
      </p>
    </div>
  );
}
