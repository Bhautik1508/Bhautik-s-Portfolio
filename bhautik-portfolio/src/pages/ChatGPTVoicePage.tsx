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

/* ── Bar chart for blockers ── */
const BLOCKERS = [
  { label: "Habit: already typing", value: 68 },
  { label: "Social awkwardness in public", value: 54 },
  { label: "Privacy concerns", value: 47 },
  { label: "Accuracy doubts", value: 31 },
  { label: "Don't know when to use it", value: 25 },
];

function BlockerChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-4 mt-6 mb-2">
      {BLOCKERS.map((d) => (
        <div key={d.label}>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-sans" style={{ fontSize: 14, color: "#3E3935" }}>
              {d.label}
            </span>
            <span
              className="font-sans font-medium"
              style={{ fontSize: 14, color: "#0D7C5F" }}
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
                backgroundColor: "#0D7C5F",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Personas ── */
const PERSONAS = [
  {
    name: "Priya",
    age: 24,
    label: "Commute multitasker",
    chosen: true,
    body: "Uses ChatGPT daily on her commute. Types one-handed on crowded trains. Has tried voice once, found it useful but never built the habit. High latent intent, low activation.",
  },
  {
    name: "Arjun",
    age: 30,
    label: "Power user",
    chosen: false,
    body: "Heavy ChatGPT user for work tasks. Prefers typing for precision. Needs a clear reason voice would be faster or better than text input.",
  },
  {
    name: "Meera",
    age: 19,
    label: "Casual explorer",
    chosen: false,
    body: "Uses ChatGPT occasionally for homework and curiosity. Unaware voice input exists. Discovery, not conversion, is the bottleneck.",
  },
];

/* ── Hypotheses ── */
const HYPOTHESES: { h: string; verdict: "validated" | "invalidated" }[] = [
  { h: "Most users have tried voice at least once", verdict: "validated" },
  { h: "Habit (defaulting to typing) is the #1 blocker", verdict: "validated" },
  { h: "Users would use voice more if nudged at the right moment", verdict: "validated" },
  { h: "Privacy/social awkwardness peaks in public settings", verdict: "validated" },
  { h: "Voice accuracy concerns prevent adoption", verdict: "invalidated" },
  { h: "Users prefer voice for long-form inputs over short queries", verdict: "validated" },
];

/* ── Nudge types ── */
const NUDGES = [
  {
    id: "01",
    name: "Contextual inline nudge",
    desc: "Appears after the user types 50+ characters, suggesting a switch to voice for faster input. Non-intrusive, dismissible, with a one-tap voice activation.",
  },
  {
    id: "02",
    name: "Empty-state voice prompt",
    desc: "On fresh conversation start, surface a \"Try asking with voice\" suggestion with a sample prompt. Targets discovery for users who haven't tried voice.",
  },
  {
    id: "03",
    name: "Post-session feedback loop",
    desc: "After a voice interaction, ask \"Was voice helpful here?\" to build habit through positive reinforcement and feed data back into nudge targeting.",
  },
];

/* ── Metric framework ── */
const METRICS = [
  {
    tier: "North Star",
    metric: "Weekly voice session rate",
    why: "Measures sustained habit formation, not one-time trials.",
    color: "#0D7C5F",
  },
  {
    tier: "L0",
    metric: "Nudge → voice activation rate",
    why: "Did the contextual nudge actually trigger a voice session?",
  },
  {
    tier: "L1",
    metric: "Voice session completion rate",
    why: "Are users finishing their voice query or abandoning mid-sentence?",
  },
  {
    tier: "L2",
    metric: "Repeat voice usage (7-day)",
    why: "Habit stickiness: did they come back to voice within a week?",
  },
  {
    tier: "Guardrail",
    metric: "Nudge dismissal rate · Typing regression",
    why: "If dismissals spike or typing speed drops, the nudge is annoying, not helpful.",
  },
];

/* ── Risks ── */
const RISKS = [
  {
    risk: "Nudge fatigue: users start ignoring or resenting the prompts",
    mit: "Frequency caps (max 2/day), smart suppression after 3 consecutive dismissals, and A/B test nudge-free control group.",
  },
  {
    risk: "Voice input fails in noisy environments, eroding trust",
    mit: "Detect ambient noise levels and suppress voice nudges in high-noise contexts. Show accuracy confidence indicator during transcription.",
  },
  {
    risk: "Privacy backlash from always-listening perception",
    mit: "Voice is strictly push-to-talk. No background listening. Clear visual indicator when mic is active. Transparent data handling disclosure.",
  },
];

export default function ChatGPTVoicePage() {
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
              &larr; Back to home
            </Link>

            <p
              className="font-sans font-medium"
              style={{
                fontSize: 14,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#0D7C5F",
                marginBottom: 14,
              }}
            >
              Growth PM &middot; User Research &middot; ChatGPT
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
              Increase voice usage on{" "}
              <em>ChatGPT mobile</em>
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
              Designed contextual voice nudges to convert India&rsquo;s
              81% &ldquo;tried-once&rdquo; users into regular voice adopters
              , targeting a $1B voice-tech market growing at 35.7% CAGR.
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
              ChatGPT Voice case study
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://www.figma.com/make/iGxSO2TFLYeZ708eBjU6s9/Design-Inline-Voice-Nudge"
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
                Prototype
              </a>
              <a
                href="https://assets.nextleap.app/submissions/Bhautik_Milestone3_IncreasingvoiceusageonChatGPT-6aa5614d-5dd6-4b54-a794-400605aedbb4.pdf"
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
                PRD
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
            {/* 01 – Problem */}
            <Block number="01" title="The Problem">
              <p>
                India&rsquo;s voice technology market is projected to reach{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  $1 billion by 2030
                </span>{" "}
                at a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  35.7% CAGR
                </span>
                . ChatGPT mobile has a voice input feature, but adoption tells a
                paradoxical story:{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>81%</span> of
                users have tried voice at least once, yet only{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>26%</span>{" "}
                use it regularly. The gap isn&rsquo;t awareness or capability
                . It&rsquo;s activation and habit formation.
              </p>
            </Block>

            {/* 02 – Market context */}
            <Block number="02" title="Market Context">
              <p>
                India is the fastest-growing market for conversational AI, with
                smartphone penetration exceeding 750M users and voice search
                growing at 270% year-over-year. Yet voice input on productivity
                tools remains underutilised. Users default to typing out
                of habit, not preference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                {[
                  { id: "Market", value: "$1B", body: "India voice-tech market by 2030 at 35.7% CAGR." },
                  { id: "Tried", value: "81%", body: "Users who have tried voice input at least once." },
                  { id: "Regular", value: "26%", body: "Users who use voice input on a weekly basis." },
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
                      style={{ fontSize: 22, color: "#0D7C5F", marginBottom: 6 }}
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
            <Block number="03" title="Research & Blockers">
              <p>
                Conducted user interviews and surveys with ChatGPT mobile users
                in India to understand the gap between trial and regular usage.
                The core finding: the problem isn&rsquo;t that voice
                doesn&rsquo;t work. It&rsquo;s that{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  nothing triggers users to switch from typing
                </span>
                . The top blockers:
              </p>
              <BlockerChart />
            </Block>

            {/* 04 – Personas */}
            <Block number="04" title="Personas & Chosen Segment">
              <p>
                Three personas emerged from research. I chose{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  Priya, the Commute Multitasker
                </span>{" "}
                as the wedge: highest frequency, clearest pain point (typing
                one-handed), and already has positive voice trial experience.
                Convert her first, then expand.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                {PERSONAS.map((p) => (
                  <div
                    key={p.name}
                    className="p-4"
                    style={{
                      backgroundColor: p.chosen ? "#E6F4F0" : "#FFFFFF",
                      border: p.chosen
                        ? "1.5px solid #0D7C5F"
                        : "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h4
                        className="font-sans font-medium"
                        style={{
                          fontSize: 15,
                          color: p.chosen ? "#0D7C5F" : "#1A1A1A",
                        }}
                      >
                        {p.name}, {p.age}
                      </h4>
                      <span
                        className="font-sans"
                        style={{
                          fontSize: 11,
                          color: p.chosen ? "#0D7C5F" : "#9B9590",
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
            <Block number="05" title="Hypothesis Matrix">
              <p>
                Six hypotheses tested against user research. Five validated,
                one invalidated. Voice accuracy concerns ranked lower
                than expected, confirming the problem is behavioural, not
                technical.
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
                          h.verdict === "validated" ? "#0D7C5F" : "#B36A6A",
                        backgroundColor:
                          h.verdict === "validated"
                            ? "#E6F4F0"
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

            {/* 06 – Solution */}
            <Block number="06" title="Solution: Contextual Voice Nudges">
              <p>
                Rather than redesigning the voice UI or adding new features, the
                insight was simpler:{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  nudge users at the right moment
                </span>
                . Three nudge patterns designed to break the typing-default
                habit:
              </p>

              <div className="grid grid-cols-1 gap-3 mt-5">
                {NUDGES.map((n) => (
                  <div
                    key={n.id}
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
                        {n.id}
                      </span>
                      <h4
                        className="font-sans font-medium"
                        style={{ fontSize: 15, color: "#0D7C5F" }}
                      >
                        {n.name}
                      </h4>
                    </div>
                    <p
                      className="font-sans"
                      style={{ fontSize: 15, lineHeight: 1.65, color: "#3E3935" }}
                    >
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 07 – Prototype */}
            <Block number="07" title="Prototype">
              <p>
                Built a high-fidelity Figma prototype demonstrating the inline
                voice nudge flow, from the contextual trigger (long text
                input detected) through voice activation, transcription, and
                the post-session feedback loop. The prototype was tested with
                users to validate that the nudge felt helpful rather than
                intrusive.
              </p>

              <div className="mt-5 text-center">
                <a
                  href="https://www.figma.com/make/iGxSO2TFLYeZ708eBjU6s9/Design-Inline-Voice-Nudge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium inline-block transition-opacity hover:opacity-80"
                  style={{
                    fontSize: 15,
                    color: "#FFFFFF",
                    backgroundColor: "#3B6B4F",
                    borderRadius: 100,
                    padding: "12px 28px",
                    textDecoration: "none",
                  }}
                >
                  View Figma prototype &rarr;
                </a>
              </div>
            </Block>

            {/* 08 – Metric framework */}
            <Block number="08" title="Metric Framework">
              <p>
                One North Star focused on sustained habit, three supporting
                tiers, plus guardrails to ensure nudges help rather than annoy:
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {METRICS.map((m) => (
                  <div
                    key={m.tier}
                    className="p-4"
                    style={{
                      backgroundColor:
                        m.tier === "North Star" ? "#E6F4F0" : "#FFFFFF",
                      border:
                        m.tier === "North Star"
                          ? "1.5px solid #0D7C5F"
                          : "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span
                        className="font-sans font-medium"
                        style={{
                          fontSize: 12,
                          color: m.tier === "North Star" ? "#0D7C5F" : "#9B9590",
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
                          color: m.tier === "North Star" ? "#0D7C5F" : "#1A1A1A",
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

            {/* 09 – Risks */}
            <Block number="09" title="Risks & Mitigations">
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
                      <span style={{ color: "#0D7C5F", fontWeight: 500 }}>
                        Mitigation:{" "}
                      </span>
                      {r.mit}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 10 – PM lessons */}
            <Block number="10" title="PM Lessons That Transferred">
              <ul className="flex flex-col gap-2 pl-4" style={{ listStyle: "disc" }}>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    The gap between trial and habit is a behaviour design
                    problem, not a feature problem.
                  </span>{" "}
                  81% tried voice. The product works. The missing piece
                  was a contextual trigger.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Guardrail metrics matter more than growth metrics in nudge
                    design.
                  </span>{" "}
                  If dismissal rates spike, the nudge is destroying trust
                  faster than it&rsquo;s building habit.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Pick the persona where activation energy is lowest.
                  </span>{" "}
                  The commute multitasker already had a reason to switch;
                  she just needed a prompt at the right moment.
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
                  color: "#0D7C5F",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                &larr; See other projects
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
