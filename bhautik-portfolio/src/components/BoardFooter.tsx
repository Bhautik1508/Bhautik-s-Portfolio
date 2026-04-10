export default function BoardFooter() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-testid="board-footer"
      style={{
        backgroundColor: "#1A1A18",
        padding: "40px 24px 32px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Main line */}
        <p
          className="font-sans"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 8px 0",
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
            Bhautik Patel
          </span>
          {" · Built with React + caffeine · © 2025"}
        </p>

        {/* Tagline */}
        <p
          className="font-display"
          style={{
            fontSize: 14,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.3)",
            margin: "0 0 20px 0",
          }}
        >
          Thanks for playing.
        </p>

        {/* Back to top */}
        <button
          type="button"
          onClick={handleBackToTop}
          className="font-sans"
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "rgba(255,255,255,0.4)",
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
            padding: "6px 14px",
            cursor: "pointer",
            transition: "all 0.15s ease",
            minHeight: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
