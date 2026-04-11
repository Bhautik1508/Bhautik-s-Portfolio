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

const BEFORE_AFTER = [
  { label: "Data extraction", before: "Manual SQL + Excel", after: "Automated pipelines" },
  { label: "Slide creation", before: "3 days per pack", after: "4 hours per pack" },
  { label: "Commentary", before: "Written from scratch", after: "Claude-drafted, human-edited" },
  { label: "Country scaling", before: "Code changes", after: "Config file updates" },
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
              Enterprise · Automation
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
              Risk reporting <em>automation</em>
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
              Automated country/cluster risk appetite packs at Standard
              Chartered using python-pptx, pandas, and the Claude API.
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
              Internal tool — no public link
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
            <Block number="01" title="The Problem">
              <p>
                Standard Chartered's risk appetite reporting required analysts
                to manually compile data from{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  20+ upstream systems
                </span>
                , create PowerPoint decks, and write commentary for each of the{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  12 countries
                </span>{" "}
                — roughly 3 full working days per reporting cycle.
              </p>
            </Block>

            <Block number="02" title="Workflow Audit">
              <p>
                Mapped the end-to-end process: data extraction → Excel
                aggregation → slide creation → commentary → review. Identified
                that{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  70% of the time
                </span>{" "}
                was spent on repetitive formatting and data-wrangling, not
                analysis. The insight work was buried under mechanical toil.
              </p>
            </Block>

            <Block number="03" title="Solution">
              <p>
                Built a Python pipeline using{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  python-pptx
                </span>{" "}
                to auto-generate templated slides with live SQL data. Integrated
                the Claude API to draft first-pass commentary. Designed
                country-configurable templates so new markets only need a
                config file change.
              </p>

              {/* Before / after grid */}
              <div className="mt-6 overflow-hidden" style={{ border: "0.5px solid #DDD8D2", borderRadius: 10 }}>
                <div
                  className="grid grid-cols-3 py-3 px-4"
                  style={{
                    backgroundColor: "#EDE8E1",
                    borderBottom: "0.5px solid #DDD8D2",
                  }}
                >
                  <span
                    className="font-sans font-medium"
                    style={{ fontSize: 11, color: "#9B9590", textTransform: "uppercase", letterSpacing: "1px" }}
                  >
                    Step
                  </span>
                  <span
                    className="font-sans font-medium"
                    style={{ fontSize: 11, color: "#9B9590", textTransform: "uppercase", letterSpacing: "1px" }}
                  >
                    Before
                  </span>
                  <span
                    className="font-sans font-medium"
                    style={{ fontSize: 11, color: "#3B6B4F", textTransform: "uppercase", letterSpacing: "1px" }}
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
                      style={{ fontSize: 12, color: "#1A1A1A" }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: 12, color: "#9B9590" }}
                    >
                      {row.before}
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: 12, color: "#3B6B4F", fontWeight: 500 }}
                    >
                      {row.after}
                    </span>
                  </div>
                ))}
              </div>
            </Block>

            <Block number="04" title="Outcome">
              <p>
                Reporting time fell from 3 days to 4 hours —{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
                  30% faster
                </span>{" "}
                end-to-end. Scaled to all 12 countries with consistent quality.
                Freed analysts to focus on insight generation rather than slide
                production. Delivered with 100% regulatory compliance.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { value: "30%", label: "Faster" },
                  { value: "12", label: "Countries" },
                  { value: "20+", label: "Systems" },
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
                        fontSize: 28,
                        color: "#3B6B4F",
                        marginBottom: 4,
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: 11, color: "#9B9590" }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            <Block number="05" title="Next Turn">
              <p>
                Extend the pattern to credit risk and market risk reporting
                verticals. Build a self-service web interface so analysts can
                trigger and customise packs on demand without engineer
                involvement.
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
