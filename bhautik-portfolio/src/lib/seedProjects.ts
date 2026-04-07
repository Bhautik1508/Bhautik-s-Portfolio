import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const SAMPLE_PROJECTS = [
  {
    title: "GiftSense — AI Gifting Confidence Engine",
    tagline:
      "An AI-powered platform that analyses WhatsApp chats to recommend personalised gifts.",
    description:
      "GiftSense uses LLM-based chat analysis to understand relationship dynamics and recommend gifts with confidence scores. Built from 0→1 with a survey-backed market-sizing approach targeting India's ₹65,000 Cr gifting market.",
    category: "0→1 Build" as const,
    tags: ["AI", "0→1", "India", "Gifting"],
    metrics: [
      { label: "Market Size", value: "₹65K Cr" },
      { label: "Survey Responses", value: "30+" },
    ],
    status: "Live" as const,
    caseStudyUrl: "https://giftsense-rust.vercel.app",
    liveUrl: "",
    imageUrl: "",
    featured: true,
    order: 1,
  },
  {
    title: "StockSage AI",
    tagline:
      "Multi-agent AI research system for Indian equity markets using LangGraph.",
    description:
      "StockSage orchestrates five specialised AI agents — fundamentals, technicals, sentiment, macro, and risk — to produce holistic equity research reports for NSE/BSE-listed stocks.",
    category: "Research" as const,
    tags: ["AI", "LangGraph", "Fintech"],
    metrics: [
      { label: "AI Agents", value: "5" },
      { label: "Markets", value: "NSE/BSE" },
    ],
    status: "Case Study" as const,
    caseStudyUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
    order: 2,
  },
  {
    title: "KYC Automation — SCB",
    tagline:
      "Streamlined KYC on-boarding flow that reduced drop-off by 34% across 3 markets.",
    description:
      "Led the redesign of Standard Chartered's KYC automation pipeline, integrating OCR and liveness checks to cut manual review time and improve conversion across compliance-heavy markets.",
    category: "Ops" as const,
    tags: ["KYC", "Compliance", "Fintech"],
    metrics: [
      { label: "Drop-off ↓", value: "34%" },
      { label: "Markets", value: "3" },
    ],
    status: "In Progress" as const,
    caseStudyUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
    order: 3,
  },
];

/**
 * Seed the Firestore "projects" collection with sample data.
 *
 * Usage (browser console, dev only):
 *   window.seedProjects()
 */
export async function seedProjects(): Promise<void> {
  const col = collection(db, "projects");

  for (const project of SAMPLE_PROJECTS) {
    await addDoc(col, {
      ...project,
      createdAt: serverTimestamp(),
    });
  }

  console.log(
    `✅ Seeded ${SAMPLE_PROJECTS.length} projects into Firestore.`
  );
}

// Expose on window for manual dev usage
if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).seedProjects = seedProjects;
}
