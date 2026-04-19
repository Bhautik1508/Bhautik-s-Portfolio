import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import GiftSenseFunnel from "../components/diagrams/GiftSenseFunnel";

/* ── Animation variants ── */
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

/* ── Horizontal bar chart ── */
const SURVEY_DATA = [
  { label: "Want it to feel personal", value: 60 },
  { label: "Don't know what they want", value: 45 },
  { label: "Too many options", value: 35 },
  { label: "Afraid they won't like it", value: 20 },
];

function BarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-4 mt-6 mb-2">
      {SURVEY_DATA.map((d) => (
        <div key={d.label}>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-sans" style={{ fontSize: 14, color: "#3E3935" }}>
              {d.label}
            </span>
            <span
              className="font-sans font-medium"
              style={{ fontSize: 14, color: "#3B6B4F" }}
            >
              {d.value}%
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#EDE8E1",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${d.value}%` } : { width: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 0.03, 0.26, 1] as const,
                delay: 0.1,
              }}
              style={{
                height: "100%",
                borderRadius: 4,
                backgroundColor: "#3B6B4F",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Competitive comparison grid ── */
const COMPETITORS = ["IGP", "FNP", "Amazon", "Giftster", "GiftSense"] as const;
const FEATURES = [
  "AI recommendations",
  "Recipient profiling",
  "WhatsApp signals",
  '"Why this gift" explanation',
] as const;

const COMP_DATA: Record<string, boolean[]> = {
  IGP: [false, false, false, false],
  FNP: [false, false, false, false],
  Amazon: [true, false, false, false],
  Giftster: [true, true, false, false],
  GiftSense: [true, true, true, true],
};

function ComparisonGrid() {
  return (
    <div className="overflow-x-auto mt-6 mb-2">
      <table
        className="w-full"
        style={{ minWidth: 480, borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th
              className="font-sans text-left"
              style={{
                fontSize: 11,
                color: "#9B9590",
                fontWeight: 400,
                padding: "8px 12px 8px 0",
                borderBottom: "0.5px solid #DDD8D2",
              }}
            />
            {COMPETITORS.map((comp) => (
              <th
                key={comp}
                className="font-sans text-center"
                style={{
                  fontSize: 13,
                  fontWeight: comp === "GiftSense" ? 600 : 400,
                  color: comp === "GiftSense" ? "#3B6B4F" : "#9B9590",
                  padding: "8px 8px",
                  borderBottom: "0.5px solid #DDD8D2",
                  backgroundColor:
                    comp === "GiftSense"
                      ? "rgba(232,240,235,0.5)"
                      : undefined,
                }}
              >
                {comp}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((feature) => (
            <tr key={feature}>
              <td
                className="font-sans"
                style={{
                  fontSize: 14,
                  color: "#3E3935",
                  padding: "10px 12px 10px 0",
                  borderBottom: "0.5px solid #DDD8D2",
                  whiteSpace: "nowrap",
                }}
              >
                {feature}
              </td>
              {COMPETITORS.map((comp) => {
                const has = COMP_DATA[comp][FEATURES.indexOf(feature)];
                return (
                  <td
                    key={comp}
                    className="text-center"
                    style={{
                      padding: "10px 8px",
                      borderBottom: "0.5px solid #DDD8D2",
                      backgroundColor:
                        comp === "GiftSense"
                          ? "rgba(232,240,235,0.5)"
                          : undefined,
                    }}
                  >
                    {has ? (
                      <span style={{ color: "#3B6B4F", fontSize: 14 }}>
                        &#10003;
                      </span>
                    ) : (
                      <span style={{ color: "#C8A0A0", fontSize: 14 }}>
                        &#10005;
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Personas ── */
const PERSONAS = [
  {
    name: "Shantanu",
    age: 28,
    label: "Partner gifter",
    chosen: true,
    body: "Working professional in a metro. Buys gifts 3\u20115\u00d7 a year for his partner. High intent, high anxiety. Willing to pay for confidence.",
  },
  {
    name: "Aditya",
    age: 35,
    label: "Family gifter",
    chosen: false,
    body: "Married, two kids. Buys for parents and siblings on festivals. Lower frequency, higher familiarity, less acute pain.",
  },
  {
    name: "Roshni",
    age: 19,
    label: "Friend gifter",
    chosen: false,
    body: "College student. Frequent low-value gifts to friends. Highly price sensitive; low willingness to pay.",
  },
  {
    name: "Rakesh",
    age: 45,
    label: "Corporate buyer",
    chosen: false,
    body: "HR / admin in a mid-size firm. Bulk Diwali gifting. Different buying cycle, better suited to a separate B2B motion later.",
  },
];

/* ── Hypothesis matrix ── */
const HYPOTHESES: { h: string; verdict: "validated" | "invalidated" }[] = [
  { h: "Gifters find the experience stressful", verdict: "validated" },
  { h: "Pain peaks for partner / romantic gifting", verdict: "validated" },
  { h: "25\u201134 in Tier-1 cities are the sharpest segment", verdict: "validated" },
  { h: "Users want a single confident recommendation, not a long list", verdict: "validated" },
  { h: "People will share private chat snippets for better suggestions", verdict: "validated" },
  { h: "Users want to buy inside the app", verdict: "invalidated" },
];

/* ── 5-layer system architecture ── */
const ARCH_LAYERS = [
  { id: "L1", name: "UI", role: "React + Next.js front-end. Profile builder, results, 'why this gift' explainer." },
  { id: "L2", name: "API routes", role: "Next.js server functions handling profile, signals, and recommendation requests." },
  { id: "L3", name: "LLM cascade", role: "Gemini-led reasoning with fallback models for resilience and cost control." },
  { id: "L4", name: "Prompt layer", role: "Structured prompt templates that fuse persona, occasion, signals and budget into one ask." },
  { id: "L5", name: "Data", role: "Stateless: no server-side DB. Profiles live client-side; signals are processed in flight." },
];

/* ── Metric framework ── */
const METRICS_FRAMEWORK = [
  {
    tier: "North Star",
    metric: "'Find this' click rate",
    why: "The single moment that proves the recommendation was good enough to act on.",
    color: "#3B6B4F",
  },
  {
    tier: "L0",
    metric: "Session completion",
    why: "Did the user finish building a profile and reach a recommendation?",
  },
  {
    tier: "L1",
    metric: "WhatsApp upload rate \u00b7 Profile save rate",
    why: "Inputs that compound recommendation quality over time.",
  },
  {
    tier: "L2",
    metric: "Time-on-result",
    why: "Engagement proxy: are users actually reading the explanation?",
  },
  {
    tier: "Guardrail",
    metric: "API error rate \u00b7 Step 2 abandonment",
    why: "Safety nets: bail out if quality or trust falls.",
  },
];

/* ── Risks ── */
const RISKS = [
  {
    risk: "LLM hallucinates a product that doesn't exist",
    mit: "Constrain outputs to a curated catalogue + 'find this' link to verified retailers.",
  },
  {
    risk: "Privacy concerns over WhatsApp uploads",
    mit: "On-device parsing, no server storage, explicit consent before each upload.",
  },
  {
    risk: "Cold start: not enough signals on first session",
    mit: "Persona-only fallback path that still produces a confident single recommendation.",
  },
];

/* ── Case study block ── */
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

export default function GiftSensePage() {
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
              0‑to‑1 · AI / LLM · Consumer
            </p>
            <h1
              className="font-serifDisplay"
              style={{
                fontSize: "clamp(36px, 5.5vw, 54px)",
                lineHeight: 1.15,
                color: "#1A1A1A",
                marginBottom: 16,
              }}
            >
              GiftSense: <em>AI gifting engine</em>
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
              Helping Indian gifters move from 73% stress to confident decisions
              using multi-signal AI profiling.
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
              GiftSense case study
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://giftsense-rust.vercel.app/"
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
                Live product
              </a>
              <a
                href="https://drive.google.com/file/d/1c71DlfbqEva7-DVafRnDrgaYC7ynxUFy/view?usp=drive_link"
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
                Presentation
              </a>
            </div>
          </div>
        </div>

        {/* ── Case study content ── */}
        <section className="px-6 py-14 md:py-20">
          <motion.div
            ref={contentRef}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="mx-auto"
            style={{ maxWidth: 640 }}
          >
            {/* 01 – Problem */}
            <Block number="01" title="The Problem">
              <p>
                Gifting in India is a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  ₹6.25 lakh crore market
                </span>
                , but{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>73%</span>{" "}
                of people find the experience stressful. The core issue
                isn&rsquo;t finding gifts, it&rsquo;s choosing
                confidently. Platforms like FNP, IGP and Amazon offer thousands
                of products but zero decision support.
              </p>
            </Block>

            {/* 02 – Market sizing */}
            <Block number="02" title="Market Sizing">
              <p>
                I sized the opportunity from total market down to a credible
                first beachhead, so I could justify why a 0‑to‑1 product was
                worth building rather than a feature inside an existing
                marketplace.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                {[
                  { id: "TAM", value: "\u20B91.65L Cr", body: "Indian personal & corporate gifting market." },
                  { id: "SAM", value: "\u20B924,750 Cr", body: "Online-first, urban, decision-anxious gifters." },
                  { id: "SOM", value: "\u20B9247\u2013495 Cr", body: "Realistic 3-year capture via partner gifting wedge." },
                ].map((m) => (
                  <div
                    key={m.id}
                    className="p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <p
                      className="font-sans font-medium"
                      style={{
                        fontSize: 12,
                        letterSpacing: "1px",
                        color: "#9B9590",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {m.id}
                    </p>
                    <p
                      className="font-display"
                      style={{ fontSize: 22, color: "#3B6B4F", marginBottom: 6 }}
                    >
                      {m.value}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, lineHeight: 1.55, color: "#3E3935" }}
                    >
                      {m.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 03 – Research */}
            <Block number="03" title="Research">
              <p>
                Ran a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  30-respondent survey
                </span>{" "}
                (50% aged 25–34, 80% Tier-1 cities) plus eight follow-up
                interviews. The mean stress score was{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  2.7 / 5
                </span>{" "}
                . Gifters are dissatisfied but not yet outraged enough to
                seek a fix on their own. Top pain points:
              </p>
              <BarChart />
            </Block>

            {/* 04 – Personas */}
            <Block number="04" title="Personas & chosen segment">
              <p>
                Four personas surfaced. Rather than try to serve all of them
                badly, I chose <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                Shantanu, the Partner Gifter</span>, as the wedge: highest
                emotional stakes, highest frequency, and a clear willingness to
                pay for confidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {PERSONAS.map((p) => (
                  <div
                    key={p.name}
                    className="p-4"
                    style={{
                      backgroundColor: p.chosen ? "#E8F0EB" : "#FFFFFF",
                      border: p.chosen
                        ? "1.5px solid #3B6B4F"
                        : "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h4
                        className="font-sans font-medium"
                        style={{
                          fontSize: 15,
                          color: p.chosen ? "#3B6B4F" : "#1A1A1A",
                        }}
                      >
                        {p.name}, {p.age}
                      </h4>
                      <span
                        className="font-sans"
                        style={{
                          fontSize: 11,
                          color: p.chosen ? "#3B6B4F" : "#9B9590",
                          fontWeight: p.chosen ? 600 : 400,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {p.chosen ? "Chosen \u2713" : p.label}
                      </span>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, lineHeight: 1.6, color: "#3E3935" }}
                    >
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 05 – Hypothesis matrix */}
            <Block number="05" title="Hypothesis matrix">
              <p>
                I went into research with six hypotheses and held myself to
                falsifying them. Five held up; one died. That dead hypothesis
                was the most useful piece of data. It pulled the
                roadmap away from being yet another marketplace.
              </p>

              <div
                className="mt-5 overflow-hidden"
                style={{ border: "0.5px solid #DDD8D2", borderRadius: 10 }}
              >
                {HYPOTHESES.map((h, i) => (
                  <div
                    key={h.h}
                    className="flex items-start justify-between gap-3 py-3 px-4"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FBF8F4",
                      borderBottom:
                        i < HYPOTHESES.length - 1
                          ? "0.5px solid #DDD8D2"
                          : undefined,
                    }}
                  >
                    <span
                      className="font-sans"
                      style={{ fontSize: 14, color: "#1A1A1A", lineHeight: 1.5 }}
                    >
                      {h.h}
                    </span>
                    <span
                      className="font-sans font-medium"
                      style={{
                        fontSize: 11,
                        color:
                          h.verdict === "validated" ? "#3B6B4F" : "#B36A6A",
                        backgroundColor:
                          h.verdict === "validated"
                            ? "#E8F0EB"
                            : "#F5E6E6",
                        padding: "3px 10px",
                        borderRadius: 100,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h.verdict}
                    </span>
                  </div>
                ))}
              </div>
            </Block>

            {/* 06 – Competitive moat */}
            <Block number="06" title="Competitive Moat">
              <p style={{ marginBottom: 4 }}>
                No existing platform combines AI recommendations with
                recipient-context signals. GiftSense is the only product
                checking every box:
              </p>
              <ComparisonGrid />
            </Block>

            {/* 07 – Multi-signal funnel — placed after competitive moat (what
                 makes GiftSense different) and before solution detail (how we
                 scored options), to visually show how signals converge into
                 confidence-ranked recommendations */}
            <Block number="07" title="How multi-signal profiling works">
              <p>
                Three signal types collapse into a single confidence-ranked
                recommendation list. The higher the signal overlap, the
                stronger the confidence score:
              </p>
              <GiftSenseFunnel />
            </Block>

            {/* 08 – Solution */}
            <Block number="08" title="Solution: 3 options, RICE-scored">
              <p>
                Evaluated three solution shapes using RICE.{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  GiftSense Full Context Engine scored 80
                </span>{" "}
                vs. Recipient Quiz at 32 and Simple Engine at 24,
                chosen for multi-signal profiling, WhatsApp signal extraction
                and confidence calibration.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                {[
                  { name: "Full Context Engine", score: 80, active: true },
                  { name: "Recipient Quiz", score: 32, active: false },
                  { name: "Simple Engine", score: 24, active: false },
                ].map((opt) => (
                  <div
                    key={opt.name}
                    className="flex-1 text-center py-4 px-3"
                    style={{
                      borderRadius: 10,
                      border: opt.active
                        ? "1.5px solid #3B6B4F"
                        : "0.5px solid #DDD8D2",
                      backgroundColor: opt.active ? "#E8F0EB" : "#FFFFFF",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: 28,
                        color: opt.active ? "#3B6B4F" : "#9B9590",
                        marginBottom: 4,
                      }}
                    >
                      {opt.score}
                    </p>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: 13,
                        color: opt.active ? "#3B6B4F" : "#9B9590",
                        fontWeight: opt.active ? 500 : 400,
                      }}
                    >
                      {opt.name}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 09 – System architecture */}
            <Block number="09" title="System architecture">
              <p>
                Built as five thin layers so I could swap models, prompts or
                signal sources without rewriting the product:
              </p>

              <div
                className="mt-5 overflow-hidden"
                style={{ border: "0.5px solid #DDD8D2", borderRadius: 10 }}
              >
                {ARCH_LAYERS.map((l, i) => (
                  <div
                    key={l.id}
                    className="py-3 px-4"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FBF8F4",
                      borderBottom:
                        i < ARCH_LAYERS.length - 1
                          ? "0.5px solid #DDD8D2"
                          : undefined,
                    }}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 13, color: "#3B6B4F" }}
                      >
                        {l.id}
                      </span>
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 14, color: "#1A1A1A" }}
                      >
                        {l.name}
                      </span>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, color: "#3E3935" }}
                    >
                      {l.role}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 10 – Metric framework */}
            <Block number="10" title="Metric framework">
              <p>
                One North Star, three supporting tiers, plus guardrails so I
                don&rsquo;t optimise quality away in pursuit of clicks:
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {METRICS_FRAMEWORK.map((m) => (
                  <div
                    key={m.tier}
                    className="p-4"
                    style={{
                      backgroundColor:
                        m.tier === "North Star" ? "#E8F0EB" : "#FFFFFF",
                      border:
                        m.tier === "North Star"
                          ? "1.5px solid #3B6B4F"
                          : "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span
                        className="font-sans font-medium"
                        style={{
                          fontSize: 12,
                          color: m.tier === "North Star" ? "#3B6B4F" : "#9B9590",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {m.tier}
                      </span>
                      <span
                        className="font-sans font-medium"
                        style={{
                          fontSize: 15,
                          color: m.tier === "North Star" ? "#3B6B4F" : "#1A1A1A",
                          textAlign: "right",
                        }}
                      >
                        {m.metric}
                      </span>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, lineHeight: 1.55, color: "#3E3935" }}
                    >
                      {m.why}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 11 – Risks */}
            <Block number="11" title="Risks & mitigations">
              <div className="mt-2 flex flex-col gap-3">
                {RISKS.map((r) => (
                  <div
                    key={r.risk}
                    className="p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <p
                      className="font-sans font-medium"
                      style={{ fontSize: 15, color: "#1A1A1A", marginBottom: 4 }}
                    >
                      {r.risk}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, lineHeight: 1.6, color: "#3E3935" }}
                    >
                      <span style={{ color: "#3B6B4F", fontWeight: 500 }}>
                        Mitigation:{" "}
                      </span>
                      {r.mit}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 12 – Revenue & distribution */}
            <Block number="12" title="Revenue model & distribution">
              <p>
                Affiliate commerce on{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  &lsquo;Find this&rsquo;
                </span>{" "}
                clicks (estimated ₹27–45k/mo at 3k sessions) plus
                curated partnerships with FNP / IGP for premium recommendations.
                Distribution strategy: WhatsApp communities for organic word-of-mouth,
                SEO content around occasion queries, and direct HR outreach for
                Diwali corporate gifting (a B2B beachhead with very different
                margins).
              </p>
            </Block>

            {/* 13 – PM lessons */}
            <Block number="13" title="PM lessons that transferred">
              <ul className="flex flex-col gap-2 pl-4" style={{ listStyle: "disc" }}>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Hold yourself to falsifying hypotheses, not validating them.
                  </span>{" "}
                  The dead one rewrote the roadmap.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Pick a wedge persona before sizing the moat.
                  </span>{" "}
                  All four personas could buy gifts; only one was acutely
                  willing to pay for confidence.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Guardrail metrics first.
                  </span>{" "}
                  Clicks are easy to chase if you let recommendation quality slip.
                </li>
              </ul>
            </Block>

            {/* Back to projects link */}
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
