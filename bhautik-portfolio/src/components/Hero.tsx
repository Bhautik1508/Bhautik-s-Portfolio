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

/* ── Stats data ── */
const STATS = [
  { value: 4, suffix: "h", label: "REPORTING CYCLE", from: "From 3 days" },
  { value: 12, suffix: "", label: "MARKETS SHIPPED", from: "Country + cluster" },
  { value: 20, suffix: "+", label: "DATA FEEDS UNIFIED", from: "20+ sources → 1 table" },
  { value: 4, suffix: "+", label: "YEARS IN FINTECH", from: "SCB · IIT Delhi MBA" },
] as const;

function StatItem({ stat, inView }: { stat: typeof STATS[number]; inView: boolean }) {
  const count = useCountUp(stat.value, 1400, inView);
  return (
    <div className="py-6 px-3 text-center">
      <p
        className="font-sans"
        style={{
          fontSize: 13,
          letterSpacing: "0.04em",
          color: "#6B6560",
          marginBottom: 6,
          minHeight: 18,
        }}
      >
        {stat.from}
      </p>
      <p
        className="font-display leading-none"
        style={{ fontSize: "clamp(30px, 4vw, 38px)", color: "#3B6B4F" }}
      >
        {count}
        {stat.suffix}
      </p>
      <p
        className="font-sans mt-2"
        style={{
          fontSize: 13,
          letterSpacing: "0.08em",
          color: "#6B6560",
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
        className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24"
      >
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left column — eyebrow + big name */}
          <div>
            <motion.p
              variants={fadeUp}
              className="font-sans font-medium"
              style={{
                fontSize: 14,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#6B6560",
                marginBottom: 20,
              }}
            >
              Hey there,
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: "clamp(40px, 5.5vw, 60px)",
                lineHeight: 1.05,
                color: "#1A1A1A",
              }}
            >
              I'm Bhautik
              <br />
              Patel.
            </motion.h1>
          </div>

          {/* Right column — description + CTA */}
          <div className="flex flex-col justify-center md:pt-12">
            <motion.p
              variants={fadeUp}
              className="font-sans"
              style={{
                fontSize: 18,
                lineHeight: 1.75,
                color: "#3E3935",
                marginBottom: 32,
              }}
            >
              A product manager shaping fintech through credit risk automation,
              AI-powered tooling, and data-driven delivery. Currently at
              Standard Chartered Bank. MBA from IIT Delhi.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  fontSize: 16,
                  color: "#FFFFFF",
                  backgroundColor: "#1A1A1A",
                  borderRadius: 100,
                  padding: "14px 32px",
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
                  fontSize: 16,
                  color: "#1A1A1A",
                  borderRadius: 100,
                  padding: "13px 32px",
                  border: "1px solid #DDD8D2",
                  textDecoration: "none",
                }}
              >
                Download resume
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Stats bar — full width below ── */}
        <motion.div
          ref={statsRef}
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-20 md:mt-28"
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
