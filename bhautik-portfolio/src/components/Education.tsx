import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Degree {
  institution: string;
  degree: string;
  location: string;
  dates: string;
}

const DEGREES: Degree[] = [
  {
    institution: "Indian Institute of Technology, Delhi",
    degree: "MBA, Management",
    location: "New Delhi",
    dates: "2019 \u2013 2021",
  },
  {
    institution: "LDRP Institute of Technology & Research",
    degree: "B.E., Mechanical Engineering",
    location: "Gandhinagar",
    dates: "2014 \u2013 2018",
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

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
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
          Education
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
          Where I studied
        </motion.h2>

        {/* Degrees with timeline */}
        <div className="relative">
          {DEGREES.map((deg, i) => (
            <motion.div
              key={deg.institution}
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
                {i < DEGREES.length - 1 && (
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
                    i < DEGREES.length - 1
                      ? "0.5px solid #DDD8D2"
                      : undefined,
                  marginBottom: i < DEGREES.length - 1 ? 32 : 0,
                }}
              >
                {/* Institution name */}
                <p
                  className="font-sans font-medium"
                  style={{ fontSize: 17, color: "#1A1A1A", marginBottom: 2 }}
                >
                  {deg.institution}
                </p>

                {/* Degree + meta on same line */}
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1"
                  style={{ marginBottom: 12 }}
                >
                  <p
                    className="font-sans font-medium"
                    style={{ fontSize: 15, color: "#3B6B4F" }}
                  >
                    {deg.degree}
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
                    {deg.location}
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
                    {deg.dates}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
