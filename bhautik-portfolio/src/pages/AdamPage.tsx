import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ControlTowerDiagram from "../components/diagrams/ControlTowerDiagram";

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

function Strong({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#1A1A1A", fontWeight: 500 }}>{children}</span>;
}

/* ── Semantic Fabric: what the layer supplies ── */
const FABRIC = [
  {
    id: "01",
    title: "Governed ontology",
    body: "A shared definition of the business objects agents reason over, owned centrally instead of re-implemented inside every agent prompt.",
  },
  {
    id: "02",
    title: "Knowledge graph",
    body: "Relationships between those objects, so an agent can traverse context rather than retrieve isolated chunks.",
  },
  {
    id: "03",
    title: "Trusted context supply",
    body: "One place agents draw business context from, which is what makes retrieval quality a platform property rather than a per-agent accident.",
  },
];

/* ── UX rebuild: before / after ── */
const UX_BEFORE_AFTER = [
  {
    label: "Structure",
    before: "Capabilities scattered",
    after: "One platform taxonomy",
  },
  {
    label: "Journeys",
    before: "Per-module, ad hoc",
    after: "7 modules × 5 personas",
  },
  {
    label: "Task completion",
    before: "Baseline",
    after: "~35% faster",
  },
  {
    label: "Clicks to first agent run",
    before: "Baseline",
    after: "Cut by half",
  },
];

export default function AdamPage() {
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
              Brillio · Agentic AI · Enterprise
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
              ADAM: making agents <em>observable</em>
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
              Core platform capabilities on an enterprise agentic AI platform:
              a governance and observability surface for every deployed agent,
              the semantic layer that feeds them trusted context, and a
              platform-wide UX rebuild.
            </p>
          </div>
        </section>

        {/* ── Sticky bar (no live link — enterprise platform) ── */}
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
            <span className="font-sans" style={{ fontSize: 12, color: "#9B9590" }}>
              ADAM platform case study
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
              Enterprise platform, no public link
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
                Enterprises were deploying agents faster than they could see
                them. Once an agent was live, nobody could answer basic
                operational questions: what is it costing, which model is it
                calling, what prompt is in production, is it exposed. Triage
                meant reconstructing an incident by hand across logs and
                owners, which took{" "}
                <Strong>hours</Strong>. Cost sat in one aggregate bill with{" "}
                <Strong>no per-agent attribution at all</Strong>, so nobody
                could tell an expensive agent from a cheap one.
              </p>
            </Block>

            {/* 02 – Control Tower */}
            <Block number="02" title="Control Tower: one surface for every agent">
              <p>
                I built the Control Tower as a single observability and
                governance surface covering{" "}
                <Strong>every deployed agent</Strong> across{" "}
                <Strong>7 dimensions</Strong>, including cost, model, prompt
                and security. The design bet was that scattered per-agent
                dashboards would never produce governance, because governance
                is a property of the whole fleet, not of one agent at a time.
              </p>

              <ControlTowerDiagram />

              <p>
                Incident triage dropped from{" "}
                <Strong>hours to under 30 minutes</Strong>, and platform owners
                got <Strong>per-agent cost attribution for the first time</Strong>
                {" "}— which changed the conversation from &ldquo;is the platform
                expensive?&rdquo; to &ldquo;which agents earn their cost?&rdquo;
              </p>
            </Block>

            {/* 03 – Semantic Fabric */}
            <Block number="03" title="Semantic Fabric: context as a platform service">
              <p>
                Agents were each carrying their own idea of what the business
                meant. Semantic Fabric is the platform&rsquo;s governed ontology
                and knowledge graph layer, supplying{" "}
                <Strong>trusted business context</Strong> to every agent from
                one place:
              </p>

              <div className="grid grid-cols-1 gap-3 mt-5">
                {FABRIC.map((c) => (
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

              <p style={{ marginTop: 20 }}>
                Retrieval accuracy rose <Strong>~25%</Strong> in internal evals,
                and onboarding effort for a new agent use case fell{" "}
                <Strong>~30%</Strong> — the second number mattering more
                commercially, because it is what makes the platform cheaper to
                adopt with each additional use case.
              </p>
            </Block>

            {/* 04 – UX rebuild */}
            <Block number="04" title="Reimagining the platform UX">
              <p>
                Capabilities had accumulated across the product without a
                shared structure. I led the end-to-end reimagining: defined a
                new <Strong>platform-wide taxonomy</Strong> and rebuilt user
                journeys for <Strong>7 modules</Strong> against{" "}
                <Strong>5 personas</Strong>.
              </p>

              <div
                className="overflow-x-auto mt-5"
                style={{ border: "0.5px solid #DDD8D2", borderRadius: 10 }}
              >
                <div style={{ minWidth: 480 }}>
                  <div
                    className="grid grid-cols-3 py-3 px-4"
                    style={{
                      backgroundColor: "#EDE8E1",
                      borderBottom: "0.5px solid #DDD8D2",
                    }}
                  >
                    {["Dimension", "Before", "After"].map((h, i) => (
                      <span
                        key={h}
                        className="font-sans font-medium"
                        style={{
                          fontSize: 12,
                          color: i === 2 ? "#3B6B4F" : "#9B9590",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  {UX_BEFORE_AFTER.map((row, i) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-3 py-3 px-4"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderBottom:
                          i < UX_BEFORE_AFTER.length - 1
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

            {/* 05 – Agentic onboarding */}
            <Block number="05" title="Agentic onboarding, with the gates kept">
              <p>
                I redesigned commercial banking onboarding as an agentic to-be
                flow with{" "}
                <Strong>human-in-the-loop gates at each control point</Strong>.
                The constraint was the interesting part: in a regulated
                onboarding process the controls are not overhead to be
                automated away, they are the product. So the agents compress
                the work between gates rather than removing the gates.
              </p>
              <p style={{ marginTop: 16 }}>
                A <Strong>3 to 7 day</Strong> multi-step process compressed to{" "}
                <Strong>2 to 3 days</Strong> with{" "}
                <Strong>no loss of governance coverage</Strong>. The same
                pattern then extended to lending, cards and payments as
                proof-of-concept workflows.
              </p>
            </Block>

            {/* 06 – Outcome */}
            <Block number="06" title="Outcome">
              <p>
                Beyond the platform work, I drove an enterprise pursuit for a{" "}
                <Strong>large US commercial bank</Strong> end to end: ran client
                working sessions, built the capability-to-ROI narrative, and
                directed engineering on demos for organization-wide
                vulnerability fix ranking and an agentic development lifecycle
                (ADLC) — contributing to an <Strong>$800K win</Strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                {[
                  { value: "hrs → 30min", label: "Incident triage" },
                  { value: "~25%", label: "Retrieval accuracy" },
                  { value: "~35%", label: "Task completion" },
                  { value: "7", label: "Agent dimensions" },
                  { value: "3–7d → 2–3d", label: "Onboarding cycle" },
                  { value: "$800K", label: "Enterprise win" },
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
                      style={{ fontSize: 22, color: "#3B6B4F", marginBottom: 4 }}
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

            {/* 07 – PM lessons */}
            <Block number="07" title="PM lessons that transferred">
              <p>Three things this platform taught me:</p>
              <ul
                className="mt-3 flex flex-col gap-2 pl-4"
                style={{ listStyle: "disc" }}
              >
                <li>
                  <Strong>
                    Observability is what turns a demo into a platform.
                  </Strong>{" "}
                  Agents are easy to deploy and hard to operate. The unglamorous
                  surface that shows cost, model and prompt is what let owners
                  actually run the fleet.
                </li>
                <li>
                  <Strong>Put the shared meaning in a layer, not in prompts.</Strong>{" "}
                  Semantic Fabric exists because context duplicated inside every
                  agent is context nobody governs.
                </li>
                <li>
                  <Strong>
                    In regulated flows, compress between the gates, never
                    through them.
                  </Strong>{" "}
                  Onboarding got roughly twice as fast while keeping every
                  human control point intact.
                </li>
              </ul>
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
