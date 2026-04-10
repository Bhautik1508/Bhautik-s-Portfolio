import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";

/* ── Skills data ── */
const SKILL_GROUPS = [
  {
    label: "Product Management",
    skills: [
      "Roadmaps & PRDs",
      "RICE Prioritization",
      "User Research & Surveys",
      "Agile / Scrum",
      "Stakeholder Management",
      "Go-to-Market Strategy",
    ],
  },
  {
    label: "Data & Analytics",
    skills: [
      "SQL",
      "Tableau",
      "Hadoop",
      "A/B Testing",
      "KPI Frameworks",
    ],
  },
  {
    label: "Tools & Tech",
    skills: [
      "JIRA",
      "Figma",
      "Confluence",
      "Python (pandas)",
      "Prompt Engineering",
      "LLM Integration (Gemini, Claude API)",
    ],
  },
];

/* ── Experience data ── */
const EXPERIENCE = [
  {
    role: "Product Manager",
    company: "Standard Chartered Bank",
    period: "Sep 2022 – Present",
    location: "Bengaluru",
    bullets: [
      "Led 4+ credit risk projects end-to-end with 100% regulatory compliance",
      "Designed dashboards reducing manual reporting time by 30%",
      "Directed Hadoop data store with 90%+ data quality across 20+ systems",
    ],
    side: "left" as const,
  },
  {
    role: "Presales Consultant",
    company: "Prodapt Solutions",
    period: "May 2021 – Aug 2022",
    location: "Chennai",
    bullets: [
      "Developed RFP responses contributing to $3M new revenue",
      "Built GTM strategies driving 15% revenue growth",
      "Improved deal closure rates by 20%",
    ],
    side: "right" as const,
  },
  {
    role: "Co-founder & Head of Product",
    company: "Addivity",
    period: "Mar 2020 – Apr 2021",
    location: "Ahmedabad",
    bullets: [
      "Built MVP from PRD to launch in 6 months",
      "Led 80+ person team across product, sales, marketing",
      "Established 65+ corporate partnerships",
    ],
    side: "left" as const,
  },
];

const EDUCATION = [
  { degree: "MBA", institution: "IIT Delhi", period: "2019 – 2021" },
  { degree: "B.E.", institution: "LDRP-ITR", period: "2014 – 2018" },
];

/* ── Staggered skills grid ── */
function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-10"
    >
      {SKILL_GROUPS.map((group) => (
        <div key={group.label}>
          <h3 className="text-[12px] font-semibold text-ink mb-5 tracking-[0.08em] uppercase">
            {group.label}
          </h3>
          <ul className="space-y-2.5">
            {group.skills.map((skill) => (
              <motion.li
                key={skill}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                }}
                className="text-[14px] text-charcoal/70 flex items-center gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage/30 flex-shrink-0" />
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Timeline card with directional slide ── */
function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = exp.side === "left";

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0 md:gap-6 mb-0`}
    >
      {/* Left content (or empty) */}
      <div className={`${isLeft ? "" : "hidden md:block"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.03, 0.26, 1] }}
            className="md:text-right"
          >
            <CardContent exp={exp} alignRight />
          </motion.div>
        )}
      </div>

      {/* Center line + dot */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-sage border-[3px] border-cream z-10 flex-shrink-0" />
        {index < EXPERIENCE.length - 1 && (
          <div className="w-px flex-1 bg-divider" />
        )}
      </div>

      {/* Right content (or card on mobile) */}
      <div className={`${!isLeft ? "" : "hidden md:block"}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.03, 0.26, 1] }}
          >
            <CardContent exp={exp} />
          </motion.div>
        )}
      </div>

      {/* Mobile fallback — always show card in single column */}
      <div className="md:hidden pl-6 border-l border-divider relative">
        <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-sage border-[3px] border-cream" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <CardContent exp={exp} />
        </motion.div>
      </div>
    </div>
  );
}

function CardContent({
  exp,
  alignRight = false,
}: {
  exp: (typeof EXPERIENCE)[0];
  alignRight?: boolean;
}) {
  return (
    <div className={`border border-divider rounded-xl p-6 bg-surface mb-8 ${alignRight ? "md:ml-auto" : ""}`}>
      <div className={`flex flex-col ${alignRight ? "md:items-end" : ""} gap-0.5 mb-3`}>
        <h3 className="text-[16px] font-semibold text-ink">{exp.role}</h3>
        <p className="text-[14px] text-sage font-medium">{exp.company}</p>
        <p className="text-[12px] text-muted">
          {exp.period} · {exp.location}
        </p>
      </div>
      <ul className={`space-y-2 ${alignRight ? "md:text-right" : ""}`}>
        {exp.bullets.map((b, i) => (
          <li
            key={i}
            className={`text-[14px] leading-relaxed text-charcoal/70 flex items-start gap-2.5 ${alignRight ? "md:flex-row-reverse md:text-right" : ""}`}
          >
            <span className="text-sage/40 mt-1.5 text-[8px] flex-shrink-0">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main About Page ── */
export default function AboutPage() {
  return (
    <div className="page-wrapper pt-28 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        {/* ═══════════════════════════════
            SECTION 1: ABOUT ME
           ═══════════════════════════════ */}
        <ScrollReveal>
          <p className="text-[11px] font-medium text-sage tracking-[0.15em] uppercase mb-3">
            About
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,52px)] text-ink tracking-tight mb-8">
            A little context.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-5 mb-6">
            <p className="text-[16px] leading-[1.8] text-charcoal/75">
              I'm a Product Manager who thrives at the intersection of data,
              design, and business strategy. At Standard Chartered Bank, I've
              spent 3+ years leading credit risk products — designing dashboards
              that cut manual reporting by 30%, directing Hadoop data pipelines
              across 20+ systems, and ensuring 100% regulatory compliance across
              4+ major projects. I was promoted within 2 years for high-impact
              delivery.
            </p>
            <p className="text-[16px] leading-[1.8] text-charcoal/75">
              Before banking, I co-founded Addivity, an edtech startup where I
              led an 80+ person team, built the MVP from scratch in 6 months,
              and established 65+ corporate partnerships. I hold an MBA from IIT
              Delhi and a B.E. from LDRP-ITR.
            </p>
            <p className="text-[16px] leading-[1.8] text-charcoal/75">
              Outside of work, I build AI-powered side projects to stay close to
              emerging technology — GiftSense (AI gifting engine) and StockSage
              AI (multi-agent stock analysis) are both live and deployed.
            </p>
          </div>
        </ScrollReveal>

        {/* ═══════════════════════════════
            SECTION 2: SKILLS
           ═══════════════════════════════ */}
        <div className="h-px bg-divider my-16" />

        <ScrollReveal>
          <p className="text-[11px] font-medium text-sage tracking-[0.15em] uppercase mb-3">
            Skills
          </p>
          <h2 className="font-display text-[32px] text-ink tracking-tight mb-10">
            What I work with
          </h2>
        </ScrollReveal>

        <SkillsGrid />

        {/* ═══════════════════════════════
            SECTION 3: EXPERIENCE
           ═══════════════════════════════ */}
        <div className="h-px bg-divider my-16" />

        <section id="experience">
          <ScrollReveal>
            <p className="text-[11px] font-medium text-sage tracking-[0.15em] uppercase mb-3">
              Experience
            </p>
            <h2 className="font-display text-[32px] text-ink tracking-tight mb-12">
              Where I've been
            </h2>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {EXPERIENCE.map((exp, i) => (
              <TimelineCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>

          {/* Education */}
          <ScrollReveal>
            <div className="mt-8 border border-divider rounded-xl p-6 bg-surface">
              <h3 className="text-[12px] font-semibold text-ink tracking-[0.08em] uppercase mb-4">
                Education
              </h3>
              <div className="space-y-3">
                {EDUCATION.map((edu) => (
                  <div key={edu.institution} className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="text-[15px] font-medium text-ink">{edu.degree}</span>
                      <span className="text-[14px] text-charcoal/60 ml-2">— {edu.institution}</span>
                    </div>
                    <span className="text-[12px] text-muted whitespace-nowrap">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
