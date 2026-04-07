import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonBaseProps {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md";
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

/* When href is set, render <a>; otherwise render <button> */
type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
    onClick?: () => void;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ── Style maps ── */

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "#2D6A4F",
    color: "#ffffff",
    border: "none",
    boxShadow: "none",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#6B7280",
    border: "none",
    boxShadow: "none",
  },
  outline: {
    backgroundColor: "#ffffff",
    color: "#3D3D3A",
    border: "1px solid #E5E4E0",
    boxShadow: "none",
  },
};

const hoverVariantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "#245A41",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(45,106,79,0.25)",
  },
  ghost: { color: "#111110" },
  outline: { borderColor: "#2D6A4F", color: "#2D6A4F" },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: 13 },
  md: { padding: "8px 16px", fontSize: 14 },
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Inter", system-ui, sans-serif',
    fontWeight: 500,
    borderRadius: 6,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background-color 0.15s, transform 0.1s, box-shadow 0.15s, border-color 0.15s, color 0.15s",
    textDecoration: "none",
    lineHeight: 1,
    userSelect: "none",
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const hover = hoverVariantStyles[variant];
    Object.assign(e.currentTarget.style, hover);
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const original = variantStyles[variant];
    /* Reset only the hovered properties */
    const hover = hoverVariantStyles[variant];
    const style = e.currentTarget.style as unknown as Record<string, unknown>;
    const orig = original as unknown as Record<string, unknown>;
    for (const key of Object.keys(hover)) {
      style[key] = orig[key] ?? "";
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    e.currentTarget.style.transform = "scale(0.98)";
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    // Restore hover transform if still hovering, otherwise remove
    e.currentTarget.style.transform = "";
  };

  if ("href" in rest && rest.href) {
    const { href, target, rel, ...aRest } = rest as ButtonAsLink;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={base}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...aRest}
      >
        {children}
      </a>
    );
  }

  const { onClick, ...btnRest } = rest as ButtonAsButton;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={base}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...btnRest}
    >
      {children}
    </button>
  );
}
