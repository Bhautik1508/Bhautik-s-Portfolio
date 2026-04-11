import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ── Pill button components ── */
function FilledPill({
  href,
  label,
  external,
  color = "#3B6B4F",
}: {
  href: string;
  label: string;
  external?: boolean;
  color?: string;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              const id = href.replace("#", "");
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            },
          })}
      className="font-sans font-medium transition-opacity hover:opacity-80"
      style={{
        fontSize: 11,
        color: "#FFFFFF",
        backgroundColor: color,
        borderRadius: 100,
        padding: "6px 16px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}

function OutlinedPill({
  href,
  label,
  external,
  borderColor = "#DDD8D2",
  textColor = "#6B6560",
}: {
  href: string;
  label: string;
  external?: boolean;
  borderColor?: string;
  textColor?: string;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              const id = href.replace("#", "");
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            },
          })}
      className="font-sans font-medium transition-opacity hover:opacity-70"
      style={{
        fontSize: 11,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 100,
        padding: "5px 16px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}

function RoutedPill({
  to,
  label,
  borderColor = "#DDD8D2",
  textColor = "#6B6560",
}: {
  to: string;
  label: string;
  borderColor?: string;
  textColor?: string;
}) {
  return (
    <Link
      to={to}
      className="font-sans font-medium transition-opacity hover:opacity-70"
      style={{
        fontSize: 11,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 100,
        padding: "5px 16px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

/* ── Project card data ── */
interface ProjectCard {
  /* Image area */
  gradientFrom: string;
  gradientTo: string;
  watermark: string;
  watermarkFont: "display" | "sans";
  watermarkColor: string;
  watermarkSize: number;
  watermarkLetterSpacing?: string;
  /* Pills */
  pills: { label: string; bg: string; color: string }[];
  /* Content */
  title: string;
  description: string;
  /* Mini stats */
  stats: { value: string; label: string }[];
  /* Action buttons */
  buttons: {
    type: "filled" | "outlined" | "route";
    label: string;
    href?: string;
    to?: string;
    external?: boolean;
    color?: string;
    borderColor?: string;
    textColor?: string;
  }[];
}

const PROJECTS: ProjectCard[] = [
  {
    gradientFrom: "#E8F0EB",
    gradientTo: "#D4E8DA",
    watermark: "GiftSense",
    watermarkFont: "display",
    watermarkColor: "rgba(59,107,79,0.6)",
    watermarkSize: 32,
    pills: [
      { label: "AI/ML", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "User research", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "Live", bg: "#E8F0EB", color: "#3B6B4F" },
    ],
    title: "GiftSense — AI gifting engine",
    description:
      "Helping Indian gifters choose confidently using multi-signal AI profiling. \u20B96.25L Cr market, 73% find gifting stressful.",
    stats: [
      { value: "30", label: "survey responses" },
      { value: "80", label: "RICE score" },
    ],
    buttons: [
      {
        type: "filled",
        label: "Live product \u2192",
        href: "https://giftsense-rust.vercel.app/",
        external: true,
      },
      {
        type: "route",
        label: "Case study",
        to: "/projects/giftsense",
      },
    ],
  },
  {
    gradientFrom: "#1A1A2E",
    gradientTo: "#16213E",
    watermark: "STOCKSAGE AI",
    watermarkFont: "sans",
    watermarkColor: "rgba(255,255,255,0.5)",
    watermarkSize: 22,
    watermarkLetterSpacing: "2px",
    pills: [
      { label: "Multi-agent AI", bg: "#E6EEF8", color: "#1E3C72" },
      { label: "LangGraph", bg: "#E6EEF8", color: "#1E3C72" },
      { label: "Live", bg: "#E6EEF8", color: "#1E3C72" },
    ],
    title: "StockSage AI \u2014 Equity research",
    description:
      "6 AI analysts, 1 verdict. Institution-grade Indian stock analysis using multi-agent architecture in 30 seconds.",
    stats: [
      { value: "6", label: "AI agents" },
      { value: "NSE+BSE", label: "coverage" },
    ],
    buttons: [
      {
        type: "filled",
        label: "Live product \u2192",
        href: "https://agentic-workflow-analysis-for-india.vercel.app/",
        external: true,
        color: "#1E3C72",
      },
      {
        type: "route",
        label: "Case study",
        to: "/projects/stocksage",
        borderColor: "#C8D6E5",
        textColor: "#1E3C72",
      },
    ],
  },
  {
    gradientFrom: "#EDE8E1",
    gradientTo: "#DDD8D0",
    watermark: "SCB Risk Packs",
    watermarkFont: "display",
    watermarkColor: "rgba(155,149,144,0.5)",
    watermarkSize: 26,
    pills: [
      { label: "Enterprise", bg: "#F0EDEA", color: "#6B6560" },
      { label: "Python", bg: "#F0EDEA", color: "#6B6560" },
      { label: "Automation", bg: "#F0EDEA", color: "#6B6560" },
    ],
    title: "Risk reporting automation",
    description:
      "Automated country/cluster risk appetite packs using python-pptx, pandas, and Claude API at Standard Chartered.",
    stats: [
      { value: "30%", label: "faster" },
      { value: "20+", label: "systems" },
    ],
    buttons: [
      {
        type: "route",
        label: "Read more",
        to: "/projects/risk-reporting",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="font-sans font-medium"
            style={{
              fontSize: 12,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#3B6B4F",
              marginBottom: 12,
            }}
          >
            My Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.1,
              color: "#1A1A1A",
              marginBottom: 12,
            }}
          >
            Selected projects
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans"
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "#6B6560",
              maxWidth: 480,
            }}
          >
            Side projects where I applied PM thinking end-to-end — from user
            research to shipped product.
          </motion.p>
        </motion.div>

        {/* Horizontal scroll container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="projects-scroll flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollPaddingLeft: 0 }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="project-card flex-shrink-0 snap-start flex flex-col"
              style={{
                minWidth: 300,
                maxWidth: 340,
                backgroundColor: "#FFFFFF",
                border: "0.5px solid #DDD8D2",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* Top image / gradient area */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: 160,
                  background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                }}
              >
                <span
                  className={
                    project.watermarkFont === "display"
                      ? "font-display"
                      : "font-sans font-medium"
                  }
                  style={{
                    fontSize: project.watermarkSize,
                    color: project.watermarkColor,
                    letterSpacing: project.watermarkLetterSpacing || "normal",
                    userSelect: "none",
                  }}
                >
                  {project.watermark}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                {/* Pill tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.pills.map((pill) => (
                    <span
                      key={pill.label}
                      className="font-sans font-medium"
                      style={{
                        fontSize: 10,
                        color: pill.color,
                        backgroundColor: pill.bg,
                        borderRadius: 100,
                        padding: "3px 10px",
                      }}
                    >
                      {pill.label}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: 17,
                    lineHeight: 1.25,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#6B6560",
                    marginBottom: 14,
                  }}
                >
                  {project.description}
                </p>

                {/* Mini stats row */}
                <div
                  className="flex items-center gap-4 mb-5"
                  style={{
                    borderTop: "0.5px solid #DDD8D2",
                    paddingTop: 12,
                  }}
                >
                  {project.stats.map((stat, i) => (
                    <div key={i} className="flex items-baseline gap-1">
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 12, color: "#3B6B4F" }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: 11, color: "#9B9590" }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.buttons.map((btn) => {
                    if (btn.type === "filled") {
                      return (
                        <FilledPill
                          key={btn.label}
                          href={btn.href!}
                          label={btn.label}
                          external={btn.external}
                          color={btn.color}
                        />
                      );
                    }
                    if (btn.type === "route") {
                      return (
                        <RoutedPill
                          key={btn.label}
                          to={btn.to!}
                          label={btn.label}
                          borderColor={btn.borderColor}
                          textColor={btn.textColor}
                        />
                      );
                    }
                    return (
                      <OutlinedPill
                        key={btn.label}
                        href={btn.href!}
                        label={btn.label}
                        external={btn.external}
                        borderColor={btn.borderColor}
                        textColor={btn.textColor}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
