import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const WORK_EXPERIENCE = {
  entries: [
    {
      company: "Standard Chartered Bank",
      location: "Bengaluru",
      role: "Product Manager",
      period: "September 2022 – Present",
      turnLabel: "Turn 2022–Present",
      bullets: [
        "Spearheaded 4+ credit risk projects from requirements gathering to implementation and monitoring, ensuring 100% regulatory compliance and on-time delivery",
        "Designed and deployed multiple interactive dashboards for Nostro products, Risk Appetite, and Large Exposure, reducing manual reporting time by 30% and providing critical insights into portfolio performance",
        "Directed a Hadoop data store project, ensuring 90%+ data quality and seamless data flow between 20+ upstream and downstream systems",
        "Executed 10+ reconciliation activities with large datasets, utilizing SQL to ensure data accuracy and consistency across systems leading to minimal financial discrepancies",
        "Developed and maintained strong relationships with stakeholders across 5+ business units, gathering requirements to build data solutions for regulatory reporting and risk management",
      ],
      tags: ["Credit Risk", "SQL", "Dashboards", "Regulatory", "Hadoop"],
      order: 1,
    },
    {
      company: "Prodapt Solutions",
      location: "Chennai",
      role: "Presales Consultant",
      period: "May 2021 – August 2022",
      turnLabel: "Turn 2021–2022",
      bullets: [
        "Developed winning RFP/RFI responses, contributing to $3M in new revenue by strategizing high-impact product offerings for FAANG industry clients",
        "Conducted in-depth market research, leading to the introduction of multiple Go-To-Market strategies, driving 15% revenue growth",
        "Built financial models and pipeline trackers to optimize business forecasting, improving deal closure rates by 20%; received multiple 'Spot Awards' for contributions",
      ],
      tags: ["Presales", "RFP/RFI", "GTM", "Financial Modeling"],
      order: 2,
    },
    {
      company: "Addivity",
      location: "Ahmedabad",
      role: "Co-founder & Head of Product",
      period: "March 2020 – April 2021",
      turnLabel: "Turn 2020–2021",
      bullets: [
        "Led the development of a new product from scratch by creating PRD documents, user flows, and UI/UX designs, streamlining the MVP launch within 6 months",
        "Led a team of 80+ candidates to execute strategies essential for product development, sales, and marketing",
        "Established Corporate Partnership with 65+ companies, onboarded 15+ Industry Experts and 6 faculties from leading universities across India",
      ],
      tags: ["0→1", "EdTech", "Co-founder", "PRD", "Startup"],
      order: 3,
    },
  ],
};

const EDUCATION = {
  entries: [
    {
      institution: "IIT-Delhi, Delhi",
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
      icon: "📋",
      category: "Product Management",
      items: [
        "Roadmaps",
        "Prioritization",
        "Agile",
        "Scrum",
        "Stakeholder Engagement",
      ],
      order: 1,
    },
    {
      icon: "📊",
      category: "Data Analytics & Tools",
      items: ["SQL", "Tableau", "Microsoft Office"],
      order: 2,
    },
    {
      icon: "🛠",
      category: "Tools",
      items: ["JIRA", "Figma", "Confluence"],
      order: 3,
    },
    {
      icon: "🏦",
      category: "Credit Risk Management",
      items: [
        "Nostro Products",
        "Risk Appetite",
        "Large Exposure",
        "Regulatory Reporting",
      ],
      order: 4,
    },
    {
      icon: "🚀",
      category: "Growth & Monetization",
      items: ["Go-to-Market", "User Research"],
      order: 5,
    },
  ],
  domainExpertise: {
    title: "Credit Risk Management",
    description:
      "4+ years of experience in credit risk and product development within banking, including significant contributions at Standard Chartered Bank. Promoted within 2 years for leading high-impact projects that optimized risk processes and automated manual workflows.",
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
