import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

const ALL_PROJECTS = [
  {
    slug: "giftsense",
    title: "GiftSense",
    category: "AI Product · 0-to-1",
    tagline: "AI-powered gifting assistant for the ₹65K Cr Indian gifting market",
    metric: "78% intent-to-use · Shipped in 3 weeks",
    tags: ["AI/LLM", "Next.js", "Vercel"],
  },
  {
    slug: "stocksage",
    title: "StockSage AI",
    category: "AI Product · Multi-agent",
    tagline: "Democratizing institutional-grade stock analysis for retail investors",
    metric: "3-agent system · Full-stack shipped",
    tags: ["LangGraph", "FastAPI", "Next.js"],
  },
];

export default function Projects() {
  return (
    <div className="page-wrapper pt-28 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-[11px] font-medium text-sage tracking-[0.15em] uppercase mb-3">
            Projects
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,52px)] text-ink tracking-tight mb-4">
            Things I've Built
          </h1>
          <p className="text-[16px] text-charcoal/60 mb-16 max-w-lg">
            From AI-powered consumer products to fintech automation at scale — 
            here's a selection of work I'm proud of.
          </p>
        </ScrollReveal>

        <div className="grid gap-8">
          {ALL_PROJECTS.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link
                to={`/projects/${project.slug}`}
                className="group block border border-divider rounded-xl p-8 bg-surface hover:border-sage/30 hover:shadow-[0_8px_32px_rgba(74,109,92,0.06)] transition-all duration-300"
              >
                {/* Category */}
                <span className="text-[11px] font-medium text-sage tracking-[0.06em] bg-sage/5 px-3 py-1 rounded-full">
                  {project.category}
                </span>

                {/* Title */}
                <h2 className="font-display text-[28px] text-ink group-hover:text-sage transition-colors duration-200 mt-4 mb-2">
                  {project.title}
                </h2>

                {/* Tagline */}
                <p className="text-[15px] text-charcoal/60 mb-4">
                  {project.tagline}
                </p>

                {/* Metric */}
                <p className="text-[13px] font-semibold text-sage mb-5">
                  {project.metric}
                </p>

                {/* Tags + arrow */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-muted border border-divider rounded px-2.5 py-0.5 bg-cream"
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
      </div>
    </div>
  );
}
