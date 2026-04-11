import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { RESUME_URL } from "../config/site";

/* ── Count-up hook ── */
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) * (1 - t) * (1 - t);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

/* ── Stagger variants ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.03, 0.26, 1] as const } },
};

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const wordUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

/* ── Headline words (italic flag for emphasis) ── */
const HEADLINE_WORDS: { text: string; italic?: boolean }[] = [
  { text: "I" },
  { text: "build" },
  { text: "products" },
  { text: "that" },
  { text: "make" },
  { text: "financial", italic: true },
  { text: "decisions", italic: true },
  { text: "easier." },
];

/* ── Stats data ── */
const STATS = [
  { value: 4, suffix: "+", label: "YEARS IN FINTECH" },
  { value: 6, suffix: "+", label: "PRODUCTS SHIPPED" },
  { value: 30, suffix: "%", label: "FASTER REPORTING" },
  { value: 100, suffix: "%", label: "COMPLIANCE RATE" },
] as const;

function StatItem({ stat, inView }: { stat: typeof STATS[number]; inView: boolean }) {
  const count = useCountUp(stat.value, 1400, inView);
  return (
    <div className="py-5 text-center">
      <p
        className="font-display leading-none"
        style={{ fontSize: "clamp(26px, 4vw, 32px)", color: "#3B6B4F" }}
      >
        {count}
        {stat.suffix}
      </p>
      <p
        className="font-sans mt-2"
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "#9B9590",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      id="about"
      className="relative flex items-center"
      style={{ minHeight: "100vh", paddingTop: 72 }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-sans font-medium"
          style={{
            fontSize: 12,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3B6B4F",
            marginBottom: 20,
          }}
        >
          Product Manager
        </motion.p>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          variants={headlineContainer}
          className="font-display"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.15,
            color: "#1A1A1A",
            marginBottom: 20,
          }}
        >
          {HEADLINE_WORDS.map((w, i) => (
            <motion.span
              key={i}
              variants={wordUp}
              style={{
                display: "inline-block",
                marginRight: "0.28em",
                fontStyle: w.italic ? "italic" : "normal",
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#6B6560",
            maxWidth: 500,
            marginBottom: 32,
          }}
        >
          4+ years in credit risk at Standard Chartered Bank. MBA from IIT Delhi.
          Now building AI-powered products that solve real problems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-16">
          <button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-sans font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              fontSize: 14,
              backgroundColor: "#3B6B4F",
              borderRadius: 100,
              padding: "12px 28px",
            }}
          >
            View my work →
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium transition-all duration-200 hover:opacity-70"
            style={{
              fontSize: 14,
              color: "#1A1A1A",
              borderRadius: 100,
              padding: "11px 28px",
              border: "1px solid #DDD8D2",
              textDecoration: "none",
            }}
          >
            Download resume
          </a>
        </motion.div>

        {/* Stats bar — 2×2 grid on mobile, 4-col row on tablet+.
            Grid gap + dark bg renders as thin 1px separators. */}
        <motion.div
          ref={statsRef}
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{
            backgroundColor: "#DDD8D2",
            borderTop: "0.5px solid #DDD8D2",
            borderBottom: "0.5px solid #DDD8D2",
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "#F5F0EB" }}>
              <StatItem stat={stat} inView={statsInView} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
