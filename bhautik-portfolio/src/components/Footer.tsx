import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

export default function Footer() {
  const ctaRef = useRef<HTMLElement>(null);
  const isInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <footer>
      {/* ── CTA Section — sage green background ── */}
      <section
        id="contact"
        ref={ctaRef}
        className="py-20 md:py-28 px-6"
        style={{ backgroundColor: "#3B6B4F" }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 28,
              lineHeight: 1.2,
              color: "#FFFFFF",
              marginBottom: 14,
            }}
          >
            Let's build something together
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans mx-auto"
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 480,
              marginBottom: 28,
            }}
          >
            Exploring PM roles in fintech. If you're building in payments,
            lending, or wealth management — let's talk.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="mailto:bhautikpatel0015@gmail.com"
              className="inline-flex items-center font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                fontSize: 14,
                color: "#3B6B4F",
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                padding: "12px 32px",
                textDecoration: "none",
              }}
            >
              Get in touch →
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer bar ── */}
      <div style={{ borderTop: "0.5px solid #DDD8D2" }}>
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: name + copyright */}
            <p className="font-sans" style={{ fontSize: 11, color: "#9B9590" }}>
              Bhautik Patel © {new Date().getFullYear()}
            </p>

            {/* Right: links */}
            <div className="flex items-center gap-1">
              <a
                href="mailto:bhautikpatel0015@gmail.com"
                className="font-sans transition-colors duration-200 hover:text-ink"
                style={{
                  fontSize: 11,
                  color: "#9B9590",
                  textDecoration: "none",
                }}
              >
                bhautikpatel0015@gmail.com
              </a>
              <span className="font-sans" style={{ fontSize: 11, color: "#DDD8D2" }}>
                ·
              </span>
              <a
                href="https://linkedin.com/in/bhautikpatel0015"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans transition-colors duration-200 hover:text-ink"
                style={{
                  fontSize: 11,
                  color: "#9B9590",
                  textDecoration: "none",
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
