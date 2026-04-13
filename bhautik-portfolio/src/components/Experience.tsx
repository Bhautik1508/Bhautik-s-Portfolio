import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { renderDescription } from "../utils/renderDescription";

interface Role {
  company: string;
  title: string;
  location: string;
  dates: string;
  description: string;
  highlights: string[];
}

const ROLES: Role[] = [
  {
    company: "Standard Chartered Bank",
    title: "Product Manager, Credit Risk",
    location: "Bengaluru",
    dates: "Sep 2022 \u2013 Present",
    description:
      "Cut country/cluster risk appetite reporting from 3 days to 4 hours by replacing manual SQL+Excel pipelines with python-pptx, pandas and Claude API, freeing analysts for insight work across 12 markets. Led 4 credit risk programmes end-to-end at 100% regulatory compliance, owning 20+ upstream data feeds at 90%+ data quality. Promoted within 2 years for delivery impact.",
    highlights: ["3 days to 4 hours", "12 markets", "100%", "20+", "90%+"],
  },
  {
    company: "Prodapt Solutions",
    title: "Presales Consultant",
    location: "Chennai",
    dates: "May 2021 \u2013 Aug 2022",
    description:
      "Turned cold RFPs into $3M of new revenue by rebuilding the response motion around customer pain rather than capability dumps. Lifted close rate by 20% and pushed annual GTM growth to 15% through tighter qualification and partner co-selling.",
    highlights: ["$3M", "20%", "15%"],
  },
  {
    company: "Addivity",
    title: "Co-founder & Head of Product",
    location: "Ahmedabad",
    dates: "Mar 2020 \u2013 Apr 2021",
    description:
      "Took an idea from blank PRD to launched MVP in 6 months by building and leading an 80+ person cross-functional team. Closed 65+ corporate partnerships and onboarded 15+ industry experts, validating the marketplace before exit.",
    highlights: ["6 months", "80+", "65+", "15+"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 0.03, 0.26, 1] as const },
  },
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-28 px-6"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        {/* Section header */}
        <motion.p
          variants={slideIn}
          className="font-sans font-medium"
          style={{
            fontSize: 14,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#3B6B4F",
            marginBottom: 12,
          }}
        >
          Experience
        </motion.p>
        <motion.h2
          variants={slideIn}
          className="font-display"
          style={{
            fontSize: "clamp(30px, 4.5vw, 44px)",
            lineHeight: 1.1,
            color: "#1A1A1A",
            marginBottom: 48,
          }}
        >
          My work experience
        </motion.h2>

        {/* Roles with timeline */}
        <div className="relative">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.company}
              variants={slideIn}
              className="relative flex gap-6 md:gap-10"
            >
              {/* Timeline column */}
              <div
                className="relative flex-shrink-0 flex flex-col items-center"
                style={{ width: 20 }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: "#3B6B4F",
                    border: "3px solid #E8F0EB",
                    marginTop: 4,
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                {/* Vertical line */}
                {i < ROLES.length - 1 && (
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
              <div
                className="flex-1 pb-10"
                style={{
                  borderBottom:
                    i < ROLES.length - 1
                      ? "0.5px solid #DDD8D2"
                      : undefined,
                  marginBottom: i < ROLES.length - 1 ? 32 : 0,
                }}
              >
                {/* Company name */}
                <p
                  className="font-sans font-medium"
                  style={{ fontSize: 17, color: "#1A1A1A", marginBottom: 2 }}
                >
                  {role.company}
                </p>

                {/* Title + meta on same line */}
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1"
                  style={{ marginBottom: 12 }}
                >
                  <p
                    className="font-sans font-medium"
                    style={{ fontSize: 15, color: "#3B6B4F" }}
                  >
                    {role.title}
                  </p>
                  <span
                    className="font-sans"
                    style={{ fontSize: 14, color: "#9B9590" }}
                  >
                    ·
                  </span>
                  <p
                    className="font-sans"
                    style={{ fontSize: 14, color: "#6B6560" }}
                  >
                    {role.location}
                  </p>
                  <span
                    className="font-sans"
                    style={{ fontSize: 14, color: "#9B9590" }}
                  >
                    ·
                  </span>
                  <p
                    className="font-sans"
                    style={{ fontSize: 14, color: "#6B6560" }}
                  >
                    {role.dates}
                  </p>
                </div>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{ fontSize: 16, lineHeight: 1.8, color: "#3E3935" }}
                >
                  {renderDescription(role.description, role.highlights)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
