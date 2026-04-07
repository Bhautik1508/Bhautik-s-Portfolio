interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <hr
      className={className}
      style={{
        border: "none",
        borderTop: "1px solid #E5E4E0",
        margin: 0,
      }}
    />
  );
}
