import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 1.6, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, inView]);
  return count;
}

/* ── Single stat card ── */
function StatCard({
  value,
  suffix,
  prefix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCounter(value, 1.6, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 0.03, 0.26, 1], delay }}
      className="text-center"
    >
      <p className="font-display text-[clamp(32px,5vw,44px)] text-sage leading-none">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="text-[12px] text-muted mt-2 tracking-wide">{label}</p>
    </motion.div>
  );
}

/* ── Project card data ── */
const PROJECTS = [
  {
    slug: "giftsense",
    title: "GiftSense",
    tagline: "AI-powered gifting assistant for the Indian market",
    tags: ["AI/LLM", "0-to-1", "Next.js"],
    metric: "78% intent-to-use",
  },
  {
    slug: "stocksage",
    title: "StockSage AI",
    tagline: "Multi-agent stock analysis for retail investors",
    tags: ["LangGraph", "Multi-agent", "FastAPI"],
    metric: "3-agent system shipped",
  },
];

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* ═══════════════════════════════════════════
          HERO — Full viewport height
         ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center pt-[72px] pb-16 px-6">
        <div className="mx-auto max-w-3xl w-full">
          {/* Eyebrow */}
          <ScrollReveal>
            <p className="text-[13px] font-medium text-sage tracking-wider uppercase mb-5">
              Product Manager · Fintech · IIT Delhi MBA
            </p>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-[clamp(40px,6.5vw,64px)] leading-[1.08] tracking-tight text-ink mb-7">
              I build products that make financial decisions{" "}
              <span className="italic text-sage">easier.</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.2}>
            <p className="text-[18px] leading-[1.7] text-charcoal/65 max-w-[580px] mb-10">
              Product Manager with 4+ years in credit risk at Standard Chartered
              Bank. MBA from IIT Delhi. Now building AI-powered products that
              solve real problems.
            </p>
          </ScrollReveal>

          {/* CTA buttons */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-sage text-white text-[14px] font-medium rounded-lg hover:bg-sage-dark transition-all duration-200 hover:-translate-y-0.5"
              >
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a
                href="/bhautik-patel-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-sage/30 text-sage text-[14px] font-medium rounded-lg hover:bg-sage/5 hover:border-sage/50 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </ScrollReveal>

          {/* ── Stat counters ── */}
          <div className="mt-20 pt-10 border-t border-divider">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <StatCard value={4} suffix="+" label="Years in Fintech" delay={0} />
              <StatCard value={6} suffix="+" label="Products Shipped" delay={0.1} />
              <StatCard value={30} suffix="%" label="Reporting Speed ↑" delay={0.2} />
              <StatCard value={625} prefix="₹" suffix="L Cr" label="Market Researched" delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-divider" />
      </div>

      {/* ═══════════════════════════════════════════
          FEATURED PROJECTS
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-[11px] font-medium text-sage tracking-[0.15em] uppercase mb-3">
              Featured Work
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] text-ink tracking-tight mb-12">
              Selected Projects
            </h2>
          </ScrollReveal>

          <div className="grid gap-6">
            {PROJECTS.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block border border-divider rounded-xl p-6 bg-surface hover:border-sage/30 hover:shadow-[0_4px_24px_rgba(74,109,92,0.06)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-[24px] text-ink group-hover:text-sage transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-[12px] font-semibold text-sage bg-sage/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {project.metric}
                    </span>
                  </div>
                  <p className="text-[14px] text-charcoal/60 mb-4">
                    {project.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-muted bg-cream border border-divider rounded px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[13px] text-sage font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Read case study →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                to="/projects"
                className="text-[14px] text-sage font-medium hover:text-sage-dark transition-colors"
              >
                View all projects →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BOTTOM CTA
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-divider">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] text-ink tracking-tight mb-4">
              Let's build something great.
            </h2>
            <p className="text-[15px] text-charcoal/60 mb-8 max-w-md mx-auto">
              Whether it's a product role, a collaboration, or just a good PM
              conversation — I'm always open.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-sage text-white text-[14px] font-medium rounded-lg hover:bg-sage-dark transition-all duration-200 hover:-translate-y-0.5"
            >
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
