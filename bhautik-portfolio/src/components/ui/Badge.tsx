import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: "#F9F8F6",
    color: "#6B7280",
    border: "1px solid transparent",
  },
  accent: {
    backgroundColor: "#EAF3EE",
    color: "#2D6A4F",
    border: "1px solid transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#6B7280",
    border: "1px solid #E5E4E0",
  },
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: '"DM Mono", "Courier New", monospace',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 4,
        lineHeight: 1.4,
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
