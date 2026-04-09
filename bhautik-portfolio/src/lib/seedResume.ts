import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const WORK_EXPERIENCE = {
  entries: [
    {
      company: "Standard Chartered Bank",
      location: "Bengaluru",
      role: "Product Manager",
      period: "Sept 2022 – Present",
      turnLabel: "Turn 2022–Present",
      bullets: [
        "Spearheaded 4+ credit risk projects from requirements gathering to implementation, ensuring 100% regulatory compliance and on-time delivery",
        "Designed and deployed interactive dashboards for Nostro products, Risk Appetite, and Large Exposure — reducing manual reporting time by 30%",
        "Directed a Hadoop data store project ensuring 90%+ data quality across 20+ upstream and downstream systems",
        "Executed 10+ reconciliation activities using SQL across large datasets, leading to minimal financial discrepancies",
        "Managed stakeholder relationships across 5+ business units for regulatory reporting and risk management",
      ],
      tags: ["Credit Risk", "SQL", "Dashboards", "Regulatory", "Hadoop"],
      order: 1,
    },
    {
      company: "Prodapt Solutions",
      location: "Chennai",
      role: "Presales Consultant",
      period: "May 2021 – Aug 2022",
      turnLabel: "Turn 2021–2022",
      bullets: [
        "Developed winning RFP/RFI responses contributing to $3M in new revenue for FAANG industry clients",
        "Conducted market research leading to Go-To-Market strategies driving 15% revenue growth",
        "Built financial models and pipeline trackers improving deal closure rates by 20%",
        "Received multiple Spot Awards for contributions to business development",
      ],
      tags: ["Presales", "RFP/RFI", "GTM", "Financial Modeling"],
      order: 2,
    },
    {
      company: "Addivity",
      location: "Ahmedabad",
      role: "Co-founder & Head of Product",
      period: "Mar 2020 – Apr 2021",
      turnLabel: "Turn 2020–2021",
      bullets: [
        "Led 0→1 product build: created PRD documents, user flows, and UI/UX designs, launching MVP within 6 months",
        "Led a team of 80+ across product development, sales, and marketing",
        "Established corporate partnerships with 65+ companies and onboarded 15+ industry experts and 6 university faculty",
      ],
      tags: ["0→1", "EdTech", "Co-founder", "PRD", "Startup"],
      order: 3,
    },
  ],
};

const EDUCATION = {
  entries: [
    {
      institution: "IIT Delhi",
      degree: "Master of Business Administration",
      period: "June 2019 – April 2021",
      featured: true,
      order: 1,
    },
    {
      institution: "LDRP-ITR, Gandhinagar",
      degree: "Bachelor of Engineering",
      period: "June 2014 – May 2018",
      featured: false,
      order: 2,
    },
  ],
};

const SKILLS = {
  entries: [
    {
      icon: "📊",
      category: "Data & Analytics",
      items: ["SQL", "Tableau", "Microsoft Office", "Hadoop"],
      order: 1,
    },
    {
      icon: "🎨",
      category: "Design & Prototyping",
      items: ["Figma", "JIRA", "Confluence", "Wireframing"],
      order: 2,
    },
    {
      icon: "⚙",
      category: "Product Management",
      items: [
        "Roadmaps",
        "Prioritization",
        "Agile",
        "Scrum",
        "Stakeholder Engagement",
      ],
      order: 3,
    },
    {
      icon: "💡",
      category: "Domain",
      items: [
        "Credit Risk Management",
        "Regulatory Reporting",
        "Go-to-Market",
        "User Research",
      ],
      order: 4,
    },
  ],
  domainExpertise: {
    title: "Credit Risk Management",
    description:
      "5+ years specialising in credit risk within banking — Nostro products, Risk Appetite frameworks, Large Exposure monitoring, and regulatory reporting for SCB.",
    tags: ["Nostro", "Risk Appetite", "Large Exposure", "Regulatory", "Hadoop"],
  },
};

/**
 * Seed the Firestore "resume" collection with real CV data.
 *
 * Usage (browser console, dev only):
 *   window.seedResume()
 */
export async function seedResume(): Promise<void> {
  await Promise.all([
    setDoc(doc(db, "resume", "workExperience"), WORK_EXPERIENCE),
    setDoc(doc(db, "resume", "education"), EDUCATION),
    setDoc(doc(db, "resume", "skills"), SKILLS),
  ]);

  console.log("✅ Seeded resume data (3 documents) into Firestore.");
}

// Expose on window for manual dev usage
if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).seedResume = seedResume;
}
