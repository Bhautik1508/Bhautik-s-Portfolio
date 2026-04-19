import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { track } from "@vercel/analytics";

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
        fontSize: 13,
        color: "#FFFFFF",
        backgroundColor: color,
        borderRadius: 100,
        padding: "8px 18px",
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
  textColor = "#3E3935",
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
        fontSize: 13,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 100,
        padding: "7px 18px",
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
  textColor = "#3E3935",
  onClick,
}: {
  to: string;
  label: string;
  borderColor?: string;
  textColor?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="font-sans font-medium transition-opacity hover:opacity-70"
      style={{
        fontSize: 13,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 100,
        padding: "7px 18px",
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
  screenshot?: string;
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
    gradientFrom: "#EDE8E1",
    gradientTo: "#DDD8D0",
    watermark: "SCB Risk Packs",
    watermarkFont: "display",
    watermarkColor: "rgba(59,107,79,0.55)",
    watermarkSize: 26,
    pills: [
      { label: "Credit Risk", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "Standard Chartered", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "Enterprise", bg: "#E8F0EB", color: "#3B6B4F" },
    ],
    title: "SCB Risk Reporting Automation",
    description:
      "Replaced 3-day manual PPT cycles with a Python + Claude pipeline for country/cluster risk appetite packs across 12 markets. 100% regulatory compliance.",
    stats: [
      { value: "3d → 4h", label: "cycle time" },
      { value: "12", label: "countries" },
    ],
    buttons: [
      {
        type: "route",
        label: "Case study",
        to: "/projects/risk-reporting",
      },
    ],
  },
  {
    screenshot: "/project-giftsense.png",
    gradientFrom: "#E8F0EB",
    gradientTo: "#D4E8DA",
    watermark: "GiftSense",
    watermarkFont: "display",
    watermarkColor: "rgba(59,107,79,0.6)",
    watermarkSize: 32,
    pills: [
      { label: "0\u20111 PM", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "AI/LLM", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "Live", bg: "#E8F0EB", color: "#3B6B4F" },
    ],
    title: "GiftSense: AI gifting engine",
    description:
      "Helped Indian gifters move from 73% stress to confident decisions using multi-signal AI profiling on a \u20B96.25L Cr market.",
    stats: [
      { value: "30", label: "user interviews" },
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
    screenshot: "/project-stocksage.png",
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
    title: "StockSage AI: Equity research",
    description:
      "Compressed institutional-grade equity research from hours to 30 seconds with a 6-agent LangGraph architecture covering NSE + BSE.",
    stats: [
      { value: "hrs \u2192 30s", label: "research time" },
      { value: "6", label: "AI agents" },
    ],
    buttons: [
      {
        type: "filled",
        label: "Live product \u2192",
        href: "https://agentic-workflow-analysis-for-india.vercel.app/",
        external: true,
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
    screenshot: "/project-chatgpt-voice.png",
    gradientFrom: "#1A1A1A",
    gradientTo: "#2D2D2D",
    watermark: "ChatGPT Voice",
    watermarkFont: "sans",
    watermarkColor: "rgba(16,163,127,0.55)",
    watermarkSize: 24,
    watermarkLetterSpacing: "1px",
    pills: [
      { label: "Growth PM", bg: "#E6F4F0", color: "#0D7C5F" },
      { label: "User Research", bg: "#E6F4F0", color: "#0D7C5F" },
      { label: "ChatGPT", bg: "#E6F4F0", color: "#0D7C5F" },
    ],
    title: "Increase voice usage on ChatGPT mobile",
    description:
      "Designed contextual voice nudges to convert India\u2019s 81% \u201ctried-once\u201d users into regular voice adopters, targeting a $1B voice-tech market growing at 35.7% CAGR.",
    stats: [
      { value: "81%", label: "tried voice" },
      { value: "26%", label: "use regularly" },
    ],
    buttons: [
      {
        type: "filled",
        label: "Prototype \u2192",
        href: "https://www.figma.com/make/iGxSO2TFLYeZ708eBjU6s9/Design-Inline-Voice-Nudge",
        external: true,
      },
      {
        type: "outlined",
        label: "PRD",
        href: "https://assets.nextleap.app/submissions/Bhautik_Milestone3_IncreasingvoiceusageonChatGPT-6aa5614d-5dd6-4b54-a794-400605aedbb4.pdf",
        external: true,
        borderColor: "#C4C0B7",
        textColor: "#3E3935",
      },
      {
        type: "route",
        label: "Case study",
        to: "/projects/chatgpt-voice",
        borderColor: "#C4C0B7",
        textColor: "#3E3935",
      },
    ],
  },
  {
    screenshot: "/project-addivity.png",
    gradientFrom: "#EDE8E1",
    gradientTo: "#E2DCD4",
    watermark: "Addivity",
    watermarkFont: "display",
    watermarkColor: "rgba(59,107,79,0.5)",
    watermarkSize: 30,
    pills: [
      { label: "0\u20111 Startup", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "Co-founder", bg: "#E8F0EB", color: "#3B6B4F" },
      { label: "EdTech", bg: "#E8F0EB", color: "#3B6B4F" },
    ],
    title: "Addivity: EdTech startup",
    description:
      "Took an idea from blank PRD to launched MVP in 6 months, building an 80+ person team. Closed 65+ corporate partnerships and impacted 240+ students before exit.",
    stats: [
      { value: "80+", label: "team size" },
      { value: "65+", label: "partnerships" },
    ],
    buttons: [
      {
        type: "route",
        label: "Case study",
        to: "/projects/addivity",
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
              fontSize: 14,
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
              fontSize: "clamp(30px, 4.5vw, 44px)",
              lineHeight: 1.1,
              color: "#1A1A1A",
              marginBottom: 16,
            }}
          >
            Selected projects
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans"
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              color: "#3E3935",
              maxWidth: 580,
            }}
          >
            Side projects where I applied PM thinking end-to-end, from user
            research to shipped product.
          </motion.p>
        </motion.div>

        {/* Grid layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              className="project-card flex flex-col"
              style={{
                backgroundColor: "#FFFFFF",
                border: "0.5px solid #DDD8D2",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* Top image / gradient area */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 180,
                  background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                }}
              >
                {project.screenshot ? (
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
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
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6">
                {/* Pill tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.pills.map((pill) => (
                    <span
                      key={pill.label}
                      className="font-sans font-medium"
                      style={{
                        fontSize: 11,
                        color: pill.color,
                        backgroundColor: pill.bg,
                        borderRadius: 100,
                        padding: "4px 11px",
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
                    fontSize: 21,
                    lineHeight: 1.25,
                    color: "#1A1A1A",
                    marginBottom: 12,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#3E3935",
                    marginBottom: 16,
                  }}
                >
                  {project.description}
                </p>

                {/* Mini stats row */}
                <div
                  className="flex items-center gap-4 mb-5"
                  style={{
                    borderTop: "0.5px solid #DDD8D2",
                    paddingTop: 14,
                  }}
                >
                  {project.stats.map((stat, i) => (
                    <div key={i} className="flex items-baseline gap-1">
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 14, color: "#3B6B4F" }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: 13, color: "#6B6560" }}
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
                          onClick={
                            btn.label === "Case study"
                              ? () => track("case_study_opened", { project: project.title })
                              : undefined
                          }
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
