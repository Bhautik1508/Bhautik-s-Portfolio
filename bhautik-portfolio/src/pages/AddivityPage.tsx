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

/* ── Timeline milestones ── */
const MILESTONES = [
  { month: "Mar 2020", event: "Idea inception", detail: "Identified the gap between academic learning and industry exposure for MBA and engineering students." },
  { month: "Apr 2020", event: "Team formation", detail: "Recruited founding team across product, tech, design, and business development during the COVID lockdown." },
  { month: "Jun 2020", event: "MVP launch", detail: "Shipped the first version of the platform connecting students with industry mentors and corporate projects." },
  { month: "Sep 2020", event: "First corporate cohort", detail: "Onboarded 10+ corporates for the first structured mentorship programme. Validated the two-sided marketplace model." },
  { month: "Jan 2021", event: "Scale phase", detail: "Expanded to 65+ corporate partnerships and 15+ industry experts. Team grew to 80+ members across functions." },
  { month: "Apr 2021", event: "Exit", detail: "Handed off operations after validating the marketplace model. Joined Prodapt Solutions for the next chapter." },
];

/* ── Team structure ── */
const TEAMS = [
  { name: "Product & Tech", size: "15+", role: "Platform development, UX design, QA, and infrastructure." },
  { name: "Business Development", size: "20+", role: "Corporate outreach, partnership management, and deal closure." },
  { name: "Operations", size: "15+", role: "Programme delivery, mentor coordination, and student success." },
  { name: "Marketing & Content", size: "15+", role: "Brand building, social media, content strategy, and community." },
  { name: "Campus Ambassadors", size: "15+", role: "On-ground presence across engineering and MBA campuses." },
];

/* ── Key metrics ── */
const METRICS_CARDS = [
  { value: "80+", label: "Team size", detail: "Cross-functional team across 5 verticals" },
  { value: "65+", label: "Corporate partners", detail: "Companies onboarded for mentorship programmes" },
  { value: "15+", label: "Industry experts", detail: "Senior professionals as mentors and advisors" },
  { value: "240+", label: "Students impacted", detail: "Across engineering and MBA programmes" },
  { value: "6 mo", label: "Idea to MVP", detail: "From blank PRD to launched product" },
  { value: "13 mo", label: "Total tenure", detail: "Full lifecycle from inception to exit" },
];

/* ── Challenges ── */
const CHALLENGES = [
  {
    challenge: "Building during COVID lockdown",
    solution: "Turned the constraint into an advantage: fully remote operations from day one. No office overhead, nationwide talent access, and async-first workflows.",
  },
  {
    challenge: "Cold-start on both sides of the marketplace",
    solution: "Started with supply (corporate partners) before demand (students). Landed 10 anchor corporates, then used their brand credibility to attract students.",
  },
  {
    challenge: "Managing 80+ people with no prior leadership experience",
    solution: "Built vertical leads early. Delegated execution, retained product and strategy decisions. Weekly all-hands for alignment, daily standups within verticals.",
  },
  {
    challenge: "Monetisation before product-market fit",
    solution: "Deferred monetisation. Focused on engagement metrics (sessions completed, NPS) to prove value before introducing paid tiers.",
  },
];

export default function AddivityPage() {
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
                color: "#3B6B4F",
                marginBottom: 14,
              }}
            >
              0&#8209;to&#8209;1 Startup &middot; Co-founder &middot; EdTech
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
              Addivity: <em>EdTech startup</em>
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
              Co-founded and led product for an EdTech marketplace bridging
              students with corporates and industry mentors, from blank
              PRD to 80+ person team in 6 months.
            </p>
          </div>
        </section>

        {/* ── Sticky bar ── */}
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
              Addivity case study
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
              Exited &middot; Mar 2020 &ndash; Apr 2021
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
                Engineering and MBA students in India face a fundamental gap:
                academic curricula teach theory, but{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  industry exposure is almost entirely left to personal networks
                </span>
                . Students from Tier-2 and Tier-3 colleges have minimal access to
                corporate mentors, real-world projects, or structured
                industry interaction, creating an uneven playing field
                before careers even begin.
              </p>
            </Block>

            {/* 02 – Vision */}
            <Block number="02" title="The Vision">
              <p>
                Build a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  two-sided marketplace
                </span>{" "}
                that connects students with corporates and industry experts
                through structured mentorship programmes, live projects, and
                skill-building workshops. The goal: democratise industry access
                so a student in Ahmedabad has the same exposure as one in
                Mumbai or Delhi.
              </p>
            </Block>

            {/* 03 – Key metrics */}
            <Block number="03" title="What We Built">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {METRICS_CARDS.map((m) => (
                  <div
                    key={m.label}
                    className="p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <p
                      className="font-display"
                      style={{ fontSize: 22, color: "#3B6B4F", marginBottom: 4 }}
                    >
                      {m.value}
                    </p>
                    <p
                      className="font-sans font-medium"
                      style={{ fontSize: 14, color: "#1A1A1A", marginBottom: 4 }}
                    >
                      {m.label}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: 13, lineHeight: 1.5, color: "#6B6560" }}
                    >
                      {m.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 04 – My role */}
            <Block number="04" title="My Role: Co-founder & Head of Product">
              <p>
                As co-founder and product lead, I owned three domains
                end-to-end:
              </p>
              <ul className="mt-3 flex flex-col gap-2 pl-4" style={{ listStyle: "disc" }}>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Product strategy &amp; roadmap
                  </span>{" "}
                  : defined the MVP scope, prioritised features using
                  RICE, and sequenced delivery to prove value on both sides of
                  the marketplace.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Team building &amp; leadership
                  </span>{" "}
                  : recruited and managed an 80+ person cross-functional
                  team across product, BD, ops, marketing, and campus
                  ambassadors.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Partnerships &amp; GTM
                  </span>{" "}
                  : personally closed 65+ corporate partnerships and
                  onboarded 15+ industry mentors through cold outreach and
                  network building.
                </li>
              </ul>
            </Block>

            {/* 05 – Team structure */}
            <Block number="05" title="Team Structure">
              <p>
                Built five verticals to maintain speed and accountability as
                the team scaled:
              </p>

              <div className="grid grid-cols-1 gap-3 mt-5">
                {TEAMS.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-start gap-4 p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.5px solid #DDD8D2",
                      borderRadius: 10,
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        fontSize: 20,
                        color: "#3B6B4F",
                        minWidth: 40,
                        textAlign: "center",
                        flexShrink: 0,
                      }}
                    >
                      {t.size}
                    </span>
                    <div>
                      <h4
                        className="font-sans font-medium"
                        style={{ fontSize: 15, color: "#1A1A1A", marginBottom: 2 }}
                      >
                        {t.name}
                      </h4>
                      <p
                        className="font-sans"
                        style={{ fontSize: 14, lineHeight: 1.55, color: "#3E3935" }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* 06 – Journey */}
            <Block number="06" title="The Journey: 13-Month Timeline">
              <div className="mt-2 flex flex-col">
                {MILESTONES.map((m, i) => (
                  <div
                    key={m.month}
                    className="relative flex gap-4"
                  >
                    {/* Timeline column */}
                    <div
                      className="relative flex-shrink-0 flex flex-col items-center"
                      style={{ width: 16 }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: "#3B6B4F",
                          border: "2.5px solid #E8F0EB",
                          marginTop: 5,
                          flexShrink: 0,
                          zIndex: 1,
                        }}
                      />
                      {i < MILESTONES.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            backgroundColor: "#DDD8D2",
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6">
                      <p
                        className="font-sans"
                        style={{ fontSize: 12, color: "#9B9590", marginBottom: 2 }}
                      >
                        {m.month}
                      </p>
                      <p
                        className="font-sans font-medium"
                        style={{ fontSize: 15, color: "#1A1A1A", marginBottom: 4 }}
                      >
                        {m.event}
                      </p>
                      <p
                        className="font-sans"
                        style={{ fontSize: 15, lineHeight: 1.65, color: "#3E3935" }}
                      >
                        {m.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* 07 – Challenges */}
            <Block number="07" title="Challenges & How I Solved Them">
              <div className="mt-2 flex flex-col gap-3">
                {CHALLENGES.map((c) => (
                  <div
                    key={c.challenge}
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
                      {c.challenge}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: 14, lineHeight: 1.6, color: "#3E3935" }}
                    >
                      <span style={{ color: "#3B6B4F", fontWeight: 500 }}>
                        Solution:{" "}
                      </span>
                      {c.solution}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 08 – PM lessons */}
            <Block number="08" title="PM Lessons That Transferred">
              <ul className="flex flex-col gap-2 pl-4" style={{ listStyle: "disc" }}>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Solve supply before demand in a marketplace.
                  </span>{" "}
                  Corporate partners gave us credibility. Students followed
                  once the value proposition was backed by real brand names.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Build vertical leads before you need them.
                  </span>{" "}
                  At 20 people I could manage directly. At 80, I needed
                  lieutenants, but the right move was empowering them at
                  30, not scrambling at 60.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Constraints force focus.
                  </span>{" "}
                  COVID, zero funding, no office. Each constraint
                  eliminated a class of decisions and forced us to ship faster
                  with fewer dependencies.
                </li>
                <li>
                  <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                    Know when to exit.
                  </span>{" "}
                  Validated the model, proved traction, and handed off
                  cleanly. The hardest PM skill is recognising when a chapter
                  is complete.
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
