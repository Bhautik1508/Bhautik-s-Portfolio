interface SectionDividerProps {
  className?: string;
}

/**
 * Standard section divider — 1px #E5E4E0 border with 56px vertical margin.
 */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      className={className}
      style={{
        borderTop: "1px solid #E5E4E0",
        margin: "56px 0",
      }}
    />
  );
}
