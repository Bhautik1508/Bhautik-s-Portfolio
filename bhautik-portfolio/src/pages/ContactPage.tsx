import ScrollReveal from "../components/ScrollReveal";

export default function ContactPage() {
  return (
    <div className="page-wrapper pt-28 pb-24 px-6">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-[11px] font-medium text-sage tracking-[0.15em] uppercase mb-3">
            Contact
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,52px)] text-ink tracking-tight mb-4">
            Let's connect.
          </h1>
          <p className="text-[17px] leading-relaxed text-charcoal/60 mb-12 max-w-md">
            Whether it's a product role, a project collaboration, or just a good 
            conversation about AI and fintech — I'd love to hear from you.
          </p>
        </ScrollReveal>

        {/* Contact cards */}
        <div className="space-y-4">
          <ScrollReveal delay={0.1}>
            <a
              href="mailto:bhautikpatel0015@gmail.com"
              className="group flex items-center gap-5 border border-divider rounded-xl p-6 bg-surface hover:border-sage/30 hover:shadow-[0_4px_24px_rgba(74,109,92,0.06)] transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sage/5 text-sage group-hover:bg-sage/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-ink group-hover:text-sage transition-colors">
                  Email
                </p>
                <p className="text-[14px] text-charcoal/50">
                  bhautikpatel0015@gmail.com
                </p>
              </div>
              <svg className="ml-auto text-muted/30 group-hover:text-sage/50 transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href="https://linkedin.com/in/bhautikpatel0015"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 border border-divider rounded-xl p-6 bg-surface hover:border-sage/30 hover:shadow-[0_4px_24px_rgba(74,109,92,0.06)] transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sage/5 text-sage group-hover:bg-sage/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-ink group-hover:text-sage transition-colors">
                  LinkedIn
                </p>
                <p className="text-[14px] text-charcoal/50">
                  linkedin.com/in/bhautikpatel0015
                </p>
              </div>
              <svg className="ml-auto text-muted/30 group-hover:text-sage/50 transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <a
              href="https://github.com/Bhautik1508"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 border border-divider rounded-xl p-6 bg-surface hover:border-sage/30 hover:shadow-[0_4px_24px_rgba(74,109,92,0.06)] transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sage/5 text-sage group-hover:bg-sage/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-ink group-hover:text-sage transition-colors">
                  GitHub
                </p>
                <p className="text-[14px] text-charcoal/50">
                  github.com/Bhautik1508
                </p>
              </div>
              <svg className="ml-auto text-muted/30 group-hover:text-sage/50 transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Availability */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 flex items-center gap-3 px-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage/40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage" />
            </span>
            <p className="text-[13px] text-muted">
              Currently open to full-time PM roles and project collaborations.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
