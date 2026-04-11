import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 0.03, 0.26, 1] as const }}
          className="fixed z-40 font-sans font-medium flex items-center gap-1.5 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            right: 20,
            bottom: 20,
            fontSize: 12,
            color: "#FFFFFF",
            backgroundColor: "#3B6B4F",
            borderRadius: 100,
            padding: "10px 16px",
            boxShadow:
              "0 10px 28px -14px rgba(59,107,79,0.5), 0 2px 6px -2px rgba(26,26,26,0.12)",
            border: "none",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          Top
        </motion.button>
      )}
    </AnimatePresence>
  );
}
