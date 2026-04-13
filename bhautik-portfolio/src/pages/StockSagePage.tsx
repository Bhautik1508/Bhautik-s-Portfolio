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
    <motion.div variants={fadeUp} className="mb-16">
      <p
        className="font-sans font-medium"
        style={{
          fontSize: 12,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#6B6560",
          marginBottom: 8,
        }}
      >
        {number}
      </p>
      <h3
        className="font-display"
        style={{ fontSize: 28, color: "#1A1A1A", marginBottom: 16 }}
      >
        {title}
      </h3>
      <div
        className="font-sans"
        style={{ fontSize: 17, lineHeight: 1.8, color: "#3E3935" }}
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
              style={{ fontSize: 15, color: "#3E3935", textDecoration: "none" }}
            >
              ← Back to home
            </Link>

            <p
              className="font-sans font-medium"
              style={{
                fontSize: 14,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#3B6B4F",
                marginBottom: 14,
              }}
            >
              Multi-agent AI · LangGraph
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(36px, 5.5vw, 54px)",
                lineHeight: 1.15,
                color: "#1A1A1A",
                marginBottom: 16,
              }}
            >
              StockSage AI: <em>Equity research</em>
            </h1>
            <p
              className="font-sans"
              style={{
                fontSize: 20,
                lineHeight: 1.75,
                color: "#3E3935",
                marginBottom: 24,
              }}
            >
              6 AI analysts, 1 verdict. Compressed institution-grade Indian
              stock research from hours to 30 seconds using multi-agent AI.
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
                  fontSize: 12,
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
                India&rsquo;s 8 crore retail investors rely on WhatsApp tips
                and basic screeners while institutions enjoy{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  multi-layered research
                </span>{" "}
                across fundamentals, technicals, sentiment and peer comparison.
                The result: a structurally uneven decision-making field where
                retail moves on noise and institutions move on signal.
              </p>
            </Block>

            <Block number="02" title="Research">
              <p>
                Mapped how institutional analysts structure equity research,
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
                        style={{ fontSize: 12, color: "#9B9590" }}
                      >
                        0{i + 1}
                      </span>
                      <h4
                        className="font-sans font-medium"
                        style={{ fontSize: 15, color: "#3B6B4F" }}
                      >
                        {agent.name}
                      </h4>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, lineHeight: 1.55, color: "#3E3935" }}
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
                equities. Compressed end-to-end research from{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  hours of manual analyst work to under 30 seconds
                </span>{" "}
                , putting institution-grade context within reach of any retail
                investor with a stock ticker.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { value: "hrs → 30s", label: "Research time" },
                  { value: "6", label: "AI agents" },
                  { value: "NSE+BSE", label: "Coverage" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="text-center py-4 px-3"
                    style={{
                      borderRadius: 10,
                      border: "0.5px solid #DDD8D2",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: 22,
                        color: "#3B6B4F",
                        marginBottom: 4,
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: 12, color: "#9B9590" }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
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
