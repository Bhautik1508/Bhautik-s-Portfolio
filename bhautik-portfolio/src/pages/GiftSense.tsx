import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

export default function GiftSense() {
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
            AI Product · 0-to-1
          </span>
          <h1 className="font-display text-[clamp(36px,6vw,56px)] text-ink tracking-tight mt-5 mb-4">
            GiftSense
          </h1>
          <p className="text-[17px] text-charcoal/60 mb-6 max-w-xl">
            An AI-powered gifting assistant solving choice paralysis in the ₹65,000 Cr Indian gifting market.
          </p>
          <div className="flex gap-2 mb-12">
            {["AI/LLM", "Next.js", "Vercel"].map((t) => (
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
            <p className="text-[15px] leading-relaxed text-charcoal/80 mb-4">
              The Indian gifting market is valued at over ₹65,000 crore — yet there is no smart recommendation layer. 
              Users default to generic gifts because they lack context about the recipient's preferences, the occasion's 
              expectations, and the cultural nuances of gifting in India.
            </p>
            <p className="text-[15px] leading-relaxed text-charcoal/80">
              GiftSense was conceived to act as an AI-powered gifting assistant that understands relationships, 
              budgets, and occasions to recommend the perfect gift every time.
            </p>
          </section>
        </ScrollReveal>

        {/* Discovery */}
        <ScrollReveal>
          <section className="mb-16">
            <h2 className="font-display text-[28px] text-ink mb-4">Discovery & Research</h2>
            <p className="text-[15px] leading-relaxed text-charcoal/80 mb-4">
              Conducted a 30-response survey on Indian gifting behaviours — uncovering that 72% of respondents 
              felt stressed about choosing the "right" gift, and 85% defaulted to generic options.
            </p>
            <p className="text-[15px] leading-relaxed text-charcoal/80 mb-4">
              Built user segmentation by relationship type — close family vs. extended family vs. colleagues vs. friends — 
              each with distinct budget ranges, gift preferences, and emotional expectations.
            </p>
            <p className="text-[15px] leading-relaxed text-charcoal/80">
              Competitive analysis of Ferns & Petals, Amazon Gifting, and Myntra gift sections revealed none offered 
              personalised recommendation engines. The gap was clear.
            </p>
          </section>
        </ScrollReveal>

        {/* What I Built */}
        <ScrollReveal>
          <section className="mb-16">
            <h2 className="font-display text-[28px] text-ink mb-4">What I Built</h2>
            <ul className="space-y-3">
              {[
                "Direction-before-products UX: asks 'Who is this for?' and 'What's the occasion?' before serving recommendations",
                "Removed gender as a form field after analysis revealed it added friction without improving quality",
                "Chose affiliate links (Amazon, Myntra) as first revenue stream — zero inventory risk",
                "Identified GiftSense Pro (corporate HR gifting) as highest-ceiling B2B opportunity",
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { value: "78%", label: "Intent-to-use from survey" },
                { value: "3 wks", label: "Concept to live product" },
                { value: "Live", label: "Deployed on Vercel" },
              ].map((m) => (
                <div key={m.label} className="border border-divider rounded-lg p-5 bg-surface text-center">
                  <p className="font-display text-[28px] text-sage">{m.value}</p>
                  <p className="text-[12px] text-muted mt-1">{m.label}</p>
                </div>
              ))}
            </div>
            <a
              href="https://giftsense-rust.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-sage font-medium hover:text-sage-dark transition-colors"
            >
              Visit live site ↗
            </a>
          </section>
        </ScrollReveal>

        {/* What's Next */}
        <ScrollReveal>
          <section className="mb-12">
            <h2 className="font-display text-[28px] text-ink mb-4">What's Next</h2>
            <p className="text-[15px] leading-relaxed text-charcoal/80 mb-3">
              Build a personalisation layer using past gift history and recipient profiles.
              Expand into B2B with GiftSense Pro for HR teams. Explore WhatsApp integration
              for conversational gift discovery.
            </p>
          </section>
        </ScrollReveal>

        {/* Bottom nav */}
        <div className="pt-8 border-t border-divider flex items-center justify-between">
          <Link to="/projects" className="text-[13px] text-muted hover:text-sage transition-colors">
            ← All Projects
          </Link>
          <Link to="/projects/stocksage" className="text-[13px] text-sage font-medium hover:text-sage-dark transition-colors">
            Next: StockSage AI →
          </Link>
        </div>
      </div>
    </div>
  );
}
