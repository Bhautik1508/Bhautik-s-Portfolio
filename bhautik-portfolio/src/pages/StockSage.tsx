import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

export default function StockSage() {
  return (
    <div className="page-wrapper pt-28 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <ScrollReveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-sage transition-colors mb-8"
          >
            ← Back to Projects
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal>
          <span className="text-[11px] font-medium text-sage tracking-[0.06em] bg-sage/5 px-3 py-1 rounded-full">
            AI Product · Multi-agent
          </span>
          <h1 className="font-display text-[clamp(36px,6vw,56px)] text-ink tracking-tight mt-5 mb-4">
            StockSage AI
          </h1>
          <p className="text-[17px] text-charcoal/60 mb-6 max-w-xl">
            A multi-agent AI system that gives retail investors access to institutional-grade
            stock analysis — powered by LangGraph, Groq, and Gemini.
          </p>
          <div className="flex gap-2 mb-12">
            {["LangGraph", "FastAPI", "Next.js", "Groq", "Gemini"].map((t) => (
              <span key={t} className="text-[11px] text-muted border border-divider rounded px-2.5 py-0.5 bg-cream">
                {t}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="h-px bg-divider mb-12" />

        {/* The Objective */}
        <ScrollReveal>
          <section className="mb-16">
            <h2 className="font-display text-[28px] text-ink mb-4">The Objective</h2>
            <p className="text-[15px] leading-relaxed text-charcoal/80">
              Retail investors in India rely on tips from social media or basic screeners, 
              while institutional investors have access to multi-layered analysis covering 
              fundamentals, technicals, and sentiment. StockSage aimed to democratise this 
              gap using coordinated AI agents.
            </p>
          </section>
        </ScrollReveal>

        {/* Architecture */}
        <ScrollReveal>
          <section className="mb-16">
            <h2 className="font-display text-[28px] text-ink mb-4">System Architecture</h2>
            <p className="text-[15px] leading-relaxed text-charcoal/80 mb-4">
              Designed a multi-agent architecture with separate agents for:
            </p>
            <ul className="space-y-3">
              {[
                "Fundamental analysis — financial ratios and company health scoring",
                "Technical analysis — moving averages, RSI, and chart pattern detection",
                "News sentiment — real-time sentiment analysis across financial news",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-charcoal/80">
                  <span className="text-sage mt-1.5 text-[10px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed text-charcoal/80 mt-4">
              All agents are orchestrated via LangGraph with shared state management. 
              Groq handles low-latency inference while Gemini powers deep reasoning tasks.
            </p>
          </section>
        </ScrollReveal>

        {/* Tech decisions */}
        <ScrollReveal>
          <section className="mb-16">
            <h2 className="font-display text-[28px] text-ink mb-4">Key Decisions</h2>
            <ul className="space-y-3">
              {[
                "LangGraph over CrewAI — better state management and agent coordination for financial workflows",
                "Dual-LLM strategy (Groq + Gemini) — optimising for both speed and reasoning depth",
                "FastAPI backend with Next.js frontend — clean separation for the full-stack experience",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-charcoal/80">
                  <span className="text-sage mt-1.5 text-[10px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        {/* Outcomes */}
        <ScrollReveal>
          <section className="mb-16">
            <h2 className="font-display text-[28px] text-ink mb-4">Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "3", label: "Specialised AI agents" },
                { value: "2", label: "LLM providers orchestrated" },
                { value: "Full-stack", label: "End-to-end shipped" },
              ].map((m) => (
                <div key={m.label} className="border border-divider rounded-lg p-5 bg-surface text-center">
                  <p className="font-display text-[28px] text-sage">{m.value}</p>
                  <p className="text-[12px] text-muted mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* What's Next */}
        <ScrollReveal>
          <section className="mb-12">
            <h2 className="font-display text-[28px] text-ink mb-4">What's Next</h2>
            <p className="text-[15px] leading-relaxed text-charcoal/80">
              Add portfolio-level analysis and risk assessment. Integrate real-time market 
              data feeds for live analysis. Explore paper-trading integration for backtesting recommendations.
            </p>
          </section>
        </ScrollReveal>

        {/* Bottom nav */}
        <div className="pt-8 border-t border-divider flex items-center justify-between">
          <Link to="/projects/giftsense" className="text-[13px] text-sage font-medium hover:text-sage-dark transition-colors">
            ← Prev: GiftSense
          </Link>
          <Link to="/projects" className="text-[13px] text-muted hover:text-sage transition-colors">
            All Projects →
          </Link>
        </div>
      </div>
    </div>
  );
}
