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

/* ── 5-component framework ── */
const FRAMEWORK = [
  {
    id: "01",
    title: "Measures, Metrics & Dimensions",
    body: "Standardised the risk vocabulary across countries: what counts as exposure, limit, utilisation, and which dimensions every report must slice on.",
  },
  {
    id: "02",
    title: "Common Portfolio Identifier",
    body: "Single shared key to roll up positions consistently from desk → portfolio → cluster → group, replacing hand-mapped Excel lookups.",
  },
  {
    id: "03",
    title: "Common Template: Portfolio / Segment / Industry",
    body: "Reusable slide-and-table template so segment cuts look identical no matter which analyst or country produces them.",
  },
  {
    id: "04",
    title: "Common Template: Country / Cluster",
    body: "A second template for geography-led packs, configurable per market without forking the codebase.",
  },
  {
    id: "05",
    title: "Self-Service Data Insight",
    body: "Tool layer that lets analysts pull the same source-of-truth data without raising tickets, collapsing the request loop from days to minutes.",
  },
];

/* ── Implementation roadmap ── */
const ROADMAP = [
  { step: "Assess", body: "Audit current landscape, owners and pain points." },
  { step: "Propose", body: "Co-build template with users; align on dimensions and cuts." },
  { step: "Socialise", body: "Walk through with country teams, incorporate feedback." },
  { step: "Master Table", body: "Build the unified master reporting table (single source)." },
  { step: "Templates", body: "Implement two production reporting templates on top." },
  { step: "Self-Service", body: "Ship a self-service tool so analysts run packs on demand." },
];

/* ── 3-phase architecture ── */
const PHASES = [
  {
    id: "Phase 1",
    title: "Ingestion Pipeline",
    body: "Pulls daily slices from 20+ upstream credit and reference systems into a governed staging layer with lineage and quality checks.",
  },
  {
    id: "Phase 2",
    title: "Master Unified Table",
    body: "Joins transactions, limits, mitigants and client reference data into one tranche-level master table. The single source for every downstream report.",
  },
  {
    id: "Phase 3",
    title: "PPT Automation",
    body: "Renders templated decks straight from the master table using python-pptx and Claude-drafted commentary, country by country.",
  },
];

/* ── 5-layer PPT automation ── */
const LAYERS = [
  {
    id: "L1",
    name: "User Interface",
    role: "Pack selector + run trigger for analysts.",
  },
  {
    id: "L2",
    name: "Orchestration",
    role: "Sequences slides, pulls data, calls the LLM, assembles output.",
  },
  {
    id: "L3",
    name: "Slide Design Library",
    role: "Reusable python-pptx components: charts, tables, callouts.",
  },
  {
    id: "L4",
    name: "Domain Function Catalogue",
    role: "Risk-specific metric calculations and formatting rules.",
  },
  {
    id: "L5",
    name: "Data Layer",
    role: "Reads from the master tables. No direct upstream coupling.",
  },
];

const BEFORE_AFTER = [
  { label: "Data extraction", before: "Manual SQL + Excel", after: "Governed pipelines" },
  { label: "Slide creation", before: "3 days per pack", after: "4 hours per pack" },
  { label: "Commentary", before: "Written from scratch", after: "Claude-drafted, human-edited" },
  { label: "Country scaling", before: "Code changes", after: "Config file updates" },
  { label: "Audit trail", before: "Email + screenshots", after: "Versioned, lineage-backed" },
];

export default function RiskReportingPage() {
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
              Standard Chartered · Credit Risk · Enterprise
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
              SCB Risk Reporting <em>Automation</em>
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
              Re-architected country and cluster risk appetite reporting at
              Standard Chartered, from a 3-day manual cycle to a
              4-hour automated pipeline across 12 markets, at 100% regulatory
              compliance.
            </p>
          </div>
        </section>

        {/* ── Sticky bar (no live link — internal tool) ── */}
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
              SCB Risk Reporting case study
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: 11,
                color: "#9B9590",
                backgroundColor: "#EDE8E1",
                borderRadius: 100,
                padding: "5px 12px",
              }}
            >
              Internal tool, no public link
            </span>
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
            {/* 01 – Problem */}
            <Block number="01" title="The Problem">
              <p>
                Risk appetite reporting at Standard Chartered required analysts
                to compile data from{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  20+ upstream systems
                </span>
                , build PowerPoint decks by hand, and write commentary for each
                of{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  12 countries
                </span>
                . A single cycle burned roughly{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  3 full working days
                </span>{" "}
                per pack, and the cycle ran on a fixed regulatory cadence,
                so any slip cascaded into the next.
              </p>
            </Block>

            {/* 02 – Workflow audit */}
            <Block number="02" title="Workflow Audit">
              <p>
                I mapped the end-to-end pipeline: data extraction → Excel
                aggregation → slide creation → commentary → review. The headline
                finding:{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  ~70% of analyst time
                </span>{" "}
                was spent on mechanical formatting and data wrangling, not on
                risk analysis. The insight work was buried under toil,
                and that toil was the real product opportunity.
              </p>
            </Block>

            {/* 03 – 5-component framework */}
            <Block number="03" title="Reframe: a 5-component reporting framework">
              <p>
                Before writing a line of Python, I argued that the problem
                wasn&rsquo;t a tooling gap, it was a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  shared-language gap
                </span>
                . Each country was rebuilding the same wheel slightly
                differently. I proposed a five-component framework so every
                pack downstream could reuse the same primitives:
              </p>

              <div className="grid grid-cols-1 gap-3 mt-5">
                {FRAMEWORK.map((c) => (
                  <div
                    key={c.id}
                    className="p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 12, color: "#9B9590" }}
                      >
                        {c.id}
                      </span>
                      <h4
                        className="font-sans font-medium"
                        style={{ fontSize: 15, color: "#3B6B4F" }}
                      >
                        {c.title}
                      </h4>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 15, lineHeight: 1.65, color: "#3E3935" }}
                    >
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 04 – Implementation roadmap */}
            <Block number="04" title="Implementation Roadmap">
              <p>
                I sequenced delivery to de-risk a politically sensitive change
                programme. Each step had to ship value before unlocking the
                next:
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {ROADMAP.map((r, i) => (
                  <div
                    key={r.step}
                    className="flex items-start gap-3 py-2"
                    style={{
                      borderBottom:
                        i < ROADMAP.length - 1
                          ? "0.5px solid #DDD8D2"
                          : undefined,
                    }}
                  >
                    <span
                      className="font-sans font-medium"
                      style={{
                        fontSize: 12,
                        color: "#3B6B4F",
                        minWidth: 22,
                        marginTop: 2,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <p
                        className="font-sans font-medium"
                        style={{ fontSize: 15, color: "#1A1A1A", marginBottom: 2 }}
                      >
                        {r.step}
                      </p>
                      <p
                        className="font-sans"
                        style={{ fontSize: 15, lineHeight: 1.65, color: "#3E3935" }}
                      >
                        {r.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* 05 – 3-phase architecture */}
            <Block number="05" title="Architecture: 3-phase pipeline">
              <p>
                The system is built as three composable phases. Each phase has
                a clear contract, so Phase 3 doesn&rsquo;t care which upstream
                systems Phase 1 reads from; only that the master table
                exists.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                {PHASES.map((p) => (
                  <div
                    key={p.id}
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
                        color: "#9B9590",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: 4,
                      }}
                    >
                      {p.id}
                    </p>
                    <h4
                      className="font-sans font-medium"
                      style={{ fontSize: 15, color: "#3B6B4F", marginBottom: 6 }}
                    >
                      {p.title}
                    </h4>
                    <p
                      className="font-sans"
                      style={{ fontSize: 15, lineHeight: 1.65, color: "#3E3935" }}
                    >
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 06 – Master table pattern */}
            <Block number="06" title="The Master Unified Table">
              <p>
                The master table is the load-bearing primitive. Transactions,
                limits, mitigants and client reference data are conformed at the{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  tranche level
                </span>
                , so any downstream cut (portfolio, country, segment,
                industry) is just a query against the same governed
                source. No more parallel Excel universes per analyst.
              </p>
            </Block>

            {/* 07 – PPT 5-layer architecture */}
            <Block number="07" title="PPT Automation: 5-layer architecture">
              <p>
                Phase 3 is itself layered, so the people who design slides
                never have to touch SQL, and the people who maintain data
                pipelines never have to touch python-pptx:
              </p>

              <div className="mt-5 overflow-hidden" style={{ border: "0.5px solid #DDD8D2", borderRadius: 10 }}>
                {LAYERS.map((l, i) => (
                  <div
                    key={l.id}
                    className="py-3 px-4"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FBF8F4",
                      borderBottom:
                        i < LAYERS.length - 1
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

            {/* 08 – Before / after */}
            <Block number="08" title="Before / After">
              <div className="overflow-x-auto" style={{ border: "0.5px solid #DDD8D2", borderRadius: 10 }}>
                <div style={{ minWidth: 480 }}>
                  <div
                    className="grid grid-cols-3 py-3 px-4"
                    style={{
                      backgroundColor: "#EDE8E1",
                      borderBottom: "0.5px solid #DDD8D2",
                    }}
                  >
                    <span
                      className="font-sans font-medium"
                      style={{ fontSize: 12, color: "#9B9590", textTransform: "uppercase", letterSpacing: "1px" }}
                    >
                      Step
                    </span>
                    <span
                      className="font-sans font-medium"
                      style={{ fontSize: 12, color: "#9B9590", textTransform: "uppercase", letterSpacing: "1px" }}
                    >
                      Before
                    </span>
                    <span
                      className="font-sans font-medium"
                      style={{ fontSize: 12, color: "#3B6B4F", textTransform: "uppercase", letterSpacing: "1px" }}
                    >
                      After
                    </span>
                  </div>
                  {BEFORE_AFTER.map((row, i) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-3 py-3 px-4"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderBottom:
                          i < BEFORE_AFTER.length - 1
                            ? "0.5px solid #DDD8D2"
                            : undefined,
                      }}
                    >
                      <span
                        className="font-sans font-medium"
                        style={{ fontSize: 14, color: "#1A1A1A" }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: 14, color: "#9B9590" }}
                      >
                        {row.before}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: 14, color: "#3B6B4F", fontWeight: 500 }}
                      >
                        {row.after}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Block>

            {/* 09 – Outcome */}
            <Block number="09" title="Outcome">
              <p>
                Reporting cycle fell from{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  3 days to 4 hours
                </span>{" "}
                end-to-end, an{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  ~85% reduction
                </span>{" "}
                in turnaround. Scaled to all 12 markets at consistent quality.
                Analysts shifted from slide production to actual risk
                interpretation, and the team held{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  100% regulatory compliance
                </span>{" "}
                across the rollout.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                {[
                  { value: "3d \u2192 4h", label: "Cycle time" },
                  { value: "12", label: "Markets" },
                  { value: "20+", label: "Source systems" },
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

            {/* 10 – PM lessons */}
            <Block number="10" title="PM lessons that transferred">
              <p>
                Three things I&rsquo;d carry into any next role:
              </p>
              <ul className="mt-3 flex flex-col gap-2 pl-4" style={{ listStyle: "disc" }}>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Standardise the language before automating the pipes.
                  </span>{" "}
                  Without the 5-component framework, the automation would have
                  hard-coded each country&rsquo;s quirks forever.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Pick a load-bearing primitive (the master table)
                  </span>{" "}
                  and let every downstream surface depend on it. Layered
                  contracts beat heroic glue code.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    LLMs belong inside human review loops, not outside them.
                  </span>{" "}
                  Claude drafts commentary; risk analysts still own the final
                  word and the regulatory accountability.
                </li>
              </ul>
            </Block>

            {/* 11 – Next turn */}
            <Block number="11" title="Next Turn">
              <p>
                Extend the same pattern to market risk and operational risk
                packs. Ship a self-service web layer so analysts can configure
                and trigger packs on demand, closing the last gap between
                question asked and pack delivered.
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
