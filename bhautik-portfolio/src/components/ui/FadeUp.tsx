import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reusable viewport-triggered fade-up animation wrapper.
 *
 * Animates from { opacity: 0, y: 20 } → { opacity: 1, y: 0 }
 * Triggers once, slightly before the element enters the viewport.
 */
export default function FadeUp({
  children,
  delay = 0,
  className,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 0.03, 0.26, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
