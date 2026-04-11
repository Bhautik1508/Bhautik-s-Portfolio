import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
  { label: "Afraid they own it", value: 20 },
];

function BarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-4 mt-6 mb-2">
      {SURVEY_DATA.map((d) => (
        <div key={d.label}>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-sans" style={{ fontSize: 12, color: "#6B6560" }}>
              {d.label}
            </span>
            <span
              className="font-sans font-medium"
              style={{ fontSize: 12, color: "#3B6B4F" }}
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
                  fontSize: 11,
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
                  fontSize: 12,
                  color: "#6B6560",
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
              AI/ML · 0-to-1
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
              GiftSense — <em>AI gifting engine</em>
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
              Helping Indian gifters choose confidently using multi-signal AI
              profiling.
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
            <div className="flex items-center gap-2">
              <a
                href="https://giftsense-rust.vercel.app/"
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
              <a
                href="https://drive.google.com/file/d/1c71DlfbqEva7-DVafRnDrgaYC7ynxUFy/view?usp=drive_link"
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
                📎 Presentation deck
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
            <Block number="01" title="The Problem">
              <p>
                Gifting in India is a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  ₹6.25 lakh crore market
                </span>
                , but{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>73%</span>{" "}
                of people find the experience stressful. The core issue isn't
                finding gifts — it's choosing confidently. Platforms like FNP,
                IGP, and Amazon offer thousands of products but zero decision
                support.
              </p>
            </Block>

            <Block number="02" title="Research">
              <p>
                Conducted a{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  30-respondent survey
                </span>{" "}
                (50% aged 25-34, 80% Tier-1 cities). Key pain points surfaced:
              </p>
              <BarChart />
            </Block>

            <Block number="03" title="Competitive Moat">
              <p style={{ marginBottom: 4 }}>
                No existing platform combines AI recommendations with recipient
                context signals. GiftSense is the only product checking every
                box:
              </p>
              <ComparisonGrid />
            </Block>

            <Block number="04" title="Solution">
              <p>
                Evaluated 3 solutions using RICE scoring.{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  GiftSense Full Context Engine scored 80
                </span>{" "}
                (vs. Recipient Quiz at 32, Simple Engine at 24). Chosen for its
                multi-signal profiling, WhatsApp extraction, and confidence
                calibration.
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
                        fontSize: 11,
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

            <Block number="05" title="Metrics">
              <p>
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  North Star:
                </span>{" "}
                'Find this' click rate.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Session completion",
                  "WhatsApp upload rate",
                  "Profile save rate",
                  "Time-on-result",
                ].map((metric) => (
                  <span
                    key={metric}
                    className="font-sans"
                    style={{
                      fontSize: 12,
                      color: "#3B6B4F",
                      backgroundColor: "#E8F0EB",
                      borderRadius: 100,
                      padding: "5px 14px",
                    }}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </Block>

            <Block number="06" title="Revenue Model">
              <p>
                Affiliate commerce on{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  'Find this'
                </span>{" "}
                (₹27-45k/mo at 3k sessions) + curated partnerships with FNP/IGP.
                Distribution via WhatsApp communities, SEO content, and direct
                HR outreach for Diwali corporate gifting.
              </p>
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
