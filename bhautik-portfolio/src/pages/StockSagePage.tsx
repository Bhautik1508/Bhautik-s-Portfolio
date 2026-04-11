import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

function Block({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} className="mb-14">
      <p
        className="font-sans font-medium"
        style={{
          fontSize: 11,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#9B9590",
          marginBottom: 6,
        }}
      >
        {number}
      </p>
      <h3
        className="font-display"
        style={{ fontSize: 22, color: "#1A1A1A", marginBottom: 14 }}
      >
        {title}
      </h3>
      <div
        className="font-sans"
        style={{ fontSize: 14, lineHeight: 1.7, color: "#6B6560" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

const AGENTS = [
  { name: "Fundamental Analyst", role: "Financial ratios, valuation, earnings quality" },
  { name: "Technical Analyst", role: "Moving averages, RSI, chart patterns" },
  { name: "News Sentiment", role: "Real-time news classification and impact" },
  { name: "Peer Comparison", role: "Sector benchmarking and relative strength" },
  { name: "Risk Assessor", role: "Volatility, drawdown, beta calibration" },
  { name: "Synthesis Agent", role: "Consolidates into a single verdict" },
];

export default function StockSagePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-60px" });

  return (
    <>
      <main style={{ paddingTop: 72 }}>
        {/* ── Page header ── */}
        <section className="px-6 pt-10 md:pt-16 pb-8">
          <div className="mx-auto" style={{ maxWidth: 640 }}>
            <Link
              to="/"
              className="font-sans inline-flex items-center gap-1.5 mb-8 transition-opacity hover:opacity-70"
              style={{ fontSize: 13, color: "#6B6560", textDecoration: "none" }}
            >
              ← Back to home
            </Link>

            <p
              className="font-sans font-medium"
              style={{
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#3B6B4F",
                marginBottom: 12,
              }}
            >
              Multi-agent AI · LangGraph
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 1.15,
                color: "#1A1A1A",
                marginBottom: 14,
              }}
            >
              StockSage AI — <em>Equity research</em>
            </h1>
            <p
              className="font-sans"
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "#6B6560",
                marginBottom: 24,
              }}
            >
              6 AI analysts, 1 verdict. Institution-grade Indian stock analysis
              using multi-agent architecture in 30 seconds.
            </p>
          </div>
        </section>

        {/* ── Sticky link bar ── */}
        <div
          className="sticky z-40"
          style={{
            top: 72,
            backgroundColor: "rgba(245,240,235,0.92)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderTop: "0.5px solid #DDD8D2",
            borderBottom: "0.5px solid #DDD8D2",
          }}
        >
          <div
            className="mx-auto flex items-center justify-between px-6 py-3"
            style={{ maxWidth: 640 }}
          >
            <span
              className="font-sans"
              style={{ fontSize: 12, color: "#9B9590" }}
            >
              StockSage case study
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://agentic-workflow-analysis-for-india.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-medium transition-opacity hover:opacity-80"
                style={{
                  fontSize: 11,
                  color: "#FFFFFF",
                  backgroundColor: "#3B6B4F",
                  borderRadius: 100,
                  padding: "6px 14px",
                  textDecoration: "none",
                }}
              >
                🔗 Live product
              </a>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-6 py-14 md:py-20">
          <motion.div
            ref={contentRef}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="mx-auto"
            style={{ maxWidth: 640 }}
          >
            <Block number="01" title="The Problem">
              <p>
                Retail investors in India rely on WhatsApp tips and basic
                screeners, while institutional investors have access to{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  multi-layered research
                </span>{" "}
                covering fundamentals, technicals, sentiment, and peer
                comparison. The 8 crore retail investor base lacks tools that
                democratise this rigor.
              </p>
            </Block>

            <Block number="02" title="Research">
              <p>
                Mapped how institutional analysts structure equity research —
                identifying 6 distinct lenses that rarely come together in
                retail tools. Studied platforms like Screener, Tickertape, and
                MoneyControl: they each solve one slice, none synthesise a
                unified verdict.
              </p>
            </Block>

            <Block number="03" title="Multi-agent Architecture">
              <p>
                Designed a LangGraph orchestration where 6 specialised agents
                run in parallel, share state, and feed into a synthesis agent
                that produces a single actionable verdict:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {AGENTS.map((agent, i) => (
                  <div
                    key={agent.name}
                    className="p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 10, color: "#9B9590" }}
                      >
                        0{i + 1}
                      </span>
                      <h4
                        className="font-sans font-medium"
                        style={{ fontSize: 13, color: "#3B6B4F" }}
                      >
                        {agent.name}
                      </h4>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 12, lineHeight: 1.5, color: "#6B6560" }}
                    >
                      {agent.role}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            <Block number="04" title="Tech Stack">
              <p>
                Built with{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  LangGraph
                </span>{" "}
                for orchestration,{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>Groq</span>{" "}
                for low-latency inference on time-sensitive agents, and{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>Gemini</span>{" "}
                for deep reasoning on synthesis. FastAPI backend, Next.js
                frontend, deployed on Vercel.
              </p>
            </Block>

            <Block number="05" title="Outcome">
              <p>
                Shipped a working full-stack product covering{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  NSE + BSE
                </span>{" "}
                equities. End-to-end analysis in under 30 seconds versus the
                manual equivalent that takes analysts hours.
              </p>
            </Block>

            <Block number="06" title="Next Turn">
              <p>
                Portfolio-level analysis and risk assessment. Integrate
                real-time market feeds for live monitoring. Expand to sector
                rotation signals and options flow analysis.
              </p>
            </Block>

            <motion.div
              variants={fadeUp}
              className="pt-8"
              style={{ borderTop: "0.5px solid #DDD8D2" }}
            >
              <Link
                to="/#projects"
                className="font-sans inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
                style={{
                  fontSize: 13,
                  color: "#3B6B4F",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                ← See other projects
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
