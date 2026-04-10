import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Minimal page loader — animated hex shape with stroke-dasharray animation.
 * Shows for 800ms on initial load, then fades out.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          data-testid="page-loader"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#F9F7F3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="48"
            height="56"
            viewBox="0 0 48 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="24,2 46,16 46,40 24,54 2,40 2,16"
              stroke="#3B6D11"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="180"
              strokeDashoffset="0"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="180;0;180"
                dur="1.6s"
                repeatCount="indefinite"
                keyTimes="0;0.5;1"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                calcMode="spline"
              />
            </polygon>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
