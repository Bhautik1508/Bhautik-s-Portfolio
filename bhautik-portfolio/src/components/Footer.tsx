import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { track } from "@vercel/analytics";
import { RESUME_URL } from "../config/site";

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
              fontSize: 38,
              lineHeight: 1.15,
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            Let's build something together
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans mx-auto"
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 540,
              marginBottom: 32,
            }}
          >
            Exploring PM roles in fintech. If you're building in payments,
            lending, credit risk or wealth management, let's talk.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Email */}
            <a
              href="mailto:bhautikpatel0015@gmail.com"
              className="inline-flex items-center gap-2.5 font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                fontSize: 15,
                color: "#3B6B4F",
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                padding: "12px 24px",
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B6B4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/bhautikpatel0015/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                fontSize: 15,
                color: "#3B6B4F",
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                padding: "12px 24px",
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#3B6B4F">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            {/* Resume */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("resume_download", { source: "footer" })}
              className="inline-flex items-center gap-2.5 font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                fontSize: 15,
                color: "#3B6B4F",
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                padding: "12px 24px",
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B6B4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Resume
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Bhautik1508"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                fontSize: 15,
                color: "#3B6B4F",
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                padding: "12px 24px",
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#3B6B4F">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer bar ── */}
      <div style={{ borderTop: "0.5px solid #DDD8D2" }}>
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: name + copyright */}
            <p className="font-sans" style={{ fontSize: 13, color: "#6B6560" }}>
              Bhautik Patel © {new Date().getFullYear()}
            </p>

            {/* Right: links */}
            <div className="flex items-center gap-1">
              <a
                href="mailto:bhautikpatel0015@gmail.com"
                className="font-sans transition-colors duration-200 hover:text-ink"
                style={{
                  fontSize: 13,
                  color: "#9B9590",
                  textDecoration: "none",
                }}
              >
                Email
              </a>
              <span className="font-sans" style={{ fontSize: 12, color: "#DDD8D2" }}>
                ·
              </span>
              <a
                href="https://www.linkedin.com/in/bhautikpatel0015/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans transition-colors duration-200 hover:text-ink"
                style={{
                  fontSize: 13,
                  color: "#9B9590",
                  textDecoration: "none",
                }}
              >
                LinkedIn
              </a>
              <span className="font-sans" style={{ fontSize: 12, color: "#DDD8D2" }}>
                ·
              </span>
              <a
                href="https://github.com/Bhautik1508"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans transition-colors duration-200 hover:text-ink"
                style={{
                  fontSize: 13,
                  color: "#9B9590",
                  textDecoration: "none",
                }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
