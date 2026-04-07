import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * PageWrapper — uniform enter/exit animation for every page.
 * Wrap each page's root element in this component.
 */
export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 0.03, 0.26, 1] }}
    >
      {children}
    </motion.div>
  );
}
