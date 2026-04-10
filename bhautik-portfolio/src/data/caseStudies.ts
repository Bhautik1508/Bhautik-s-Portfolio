/* ── Case study data for all projects ── */

export interface CaseStudySection {
  id: string;
  title: string;
  content: string[];
}

export interface CaseStudyData {
  slug: string;
  category: string;
  name: string;
  problem: string;
  outcome: string;
  tools: string[];
  sections: CaseStudySection[];
}

export interface ProjectCardData {
  slug: string;
  category: string;
  name: string;
  problem: string;
  outcome: string;
  tools: string[];
  link: string;
  liveUrl?: string;
}

/* ── Project cards for the grid ── */
export const PROJECT_CARDS: ProjectCardData[] = [
  {
    slug: "giftsense",
    category: "AI Product · 0-to-1",
    name: "GiftSense",
    problem:
      "₹65K Cr gifting market with zero smart recommendation layer — users default to generic gifts",
    outcome:
      "78% intent-to-use · Live product shipped in 3 weeks · Affiliate revenue model validated",
    tools: ["AI/LLM", "Next.js", "Vercel"],
    link: "/case-study/giftsense",
    liveUrl: "https://giftsense-rust.vercel.app",
  },
  {
    slug: "stocksage",
    category: "AI Product · Multi-agent",
    name: "StockSage AI",
    problem:
      "Retail investors in India lack access to institutional-grade stock analysis",
    outcome:
      "3-agent AI system shipped · Groq + Gemini orchestrated via LangGraph · Full-stack live",
    tools: ["LangGraph", "FastAPI", "Next.js"],
    link: "/case-study/stocksage",
  },
  {
    slug: "scb-reporting",
    category: "Fintech · Internal Tool",
    name: "Risk Appetite Reporting Automation",
    problem:
      "Country-level risk pack creation took 3 days of manual analyst work",
    outcome:
      "87% time reduction (3 days → 4 hrs) · 12 countries served · AI-generated commentary",
    tools: ["Python", "SQL", "Anthropic API"],
    link: "/case-study/scb-reporting",
  },
  {
    slug: "kyc-automation",
    category: "Fintech · Process Innovation",
    name: "KYC Onboarding Automation",
    problem:
      "Manual KYC review was the bottleneck in customer onboarding at SCB",
    outcome:
      "40% reduction in manual effort · Compliance SLA improved · Tiered auto-review system",
    tools: ["SQL", "Tableau", "Process Design"],
    link: "/case-study/kyc-automation",
  },
];

/* ── Full case study content ── */
export const CASE_STUDIES: Record<string, CaseStudyData> = {
  giftsense: {
    slug: "giftsense",
    category: "AI Product · 0-to-1",
    name: "GiftSense",
    problem:
      "₹65K Cr gifting market with zero smart recommendation layer — users default to generic gifts",
    outcome:
      "78% intent-to-use · Live product shipped in 3 weeks · Affiliate revenue model validated",
    tools: ["AI/LLM", "Next.js", "Vercel"],
    sections: [
      {
        id: "the-objective",
        title: "The Objective",
        content: [
          "The Indian gifting market is valued at over ₹65,000 crore — yet there is no smart recommendation layer. Users default to generic gifts because they lack context about the recipient's preferences, the occasion's expectations, and the cultural nuances of gifting in India.",
          "GiftSense was conceived to solve this by acting as an AI-powered gifting assistant that understands relationships, budgets, and occasions to recommend the perfect gift every time.",
        ],
      },
      {
        id: "the-map",
        title: "The Map",
        content: [
          "Conducted a 30-response survey on Indian gifting behaviours across demographics — uncovering that 72% of respondents felt stressed about choosing the 'right' gift, and 85% defaulted to generic options (wallets, sweets, gift cards).",
          "Built user segmentation by relationship type: close family vs. extended family vs. colleagues vs. friends — each with distinct budget ranges, gift preferences, and emotional expectations.",
          "Completed competitive analysis of Ferns & Petals, Amazon Gifting, and Myntra gift sections — none offered personalised recommendation engines. The gap was clear.",
        ],
      },
      {
        id: "moves-made",
        title: "Moves Made",
        content: [
          "Direction-before-products UX: Instead of showing a product catalogue upfront, GiftSense asks 'Who is this gift for?' and 'What's the occasion?' before serving recommendations. This reduced choice paralysis and improved engagement.",
          "Removed gender as a form field after survey analysis revealed it added friction without improving recommendation quality for most categories.",
          "Chose affiliate links (Amazon, Myntra) as the first revenue stream — zero inventory risk, fastest path to revenue validation.",
          "Identified GiftSense Pro (corporate HR gifting for employee milestones) as the highest-ceiling B2B opportunity in the roadmap.",
        ],
      },
      {
        id: "victory-condition",
        title: "Victory Condition",
        content: [
          "Shipped a live product at giftsense-rust.vercel.app — from concept to deployment in 3 weeks.",
          "Validated demand through a 30-response survey with strong signal: 78% said they would use such a tool.",
          "Created a full PM case study package — PRD, user journey maps, competitive analysis, and go-to-market plan — demonstrating end-to-end product thinking.",
        ],
      },
      {
        id: "next-turn",
        title: "Next Turn",
        content: [
          "Build a personalisation layer using past gift history and recipient preference profiles — moving from one-shot recommendations to a gifting relationship manager.",
          "Expand into the corporate B2B segment (GiftSense Pro) targeting HR teams for employee birthday, anniversary, and milestone gifting at scale.",
          "Explore integrations with WhatsApp for conversational gift discovery — meeting users where they already communicate.",
        ],
      },
    ],
  },
  stocksage: {
    slug: "stocksage",
    category: "AI Product · Multi-agent",
    name: "StockSage AI",
    problem:
      "Retail investors in India lack access to institutional-grade stock analysis",
    outcome:
      "Multi-agent LangGraph system · Groq + Gemini APIs · Full-stack shipped",
    tools: ["LangGraph", "FastAPI", "Next.js"],
    sections: [
      {
        id: "the-objective",
        title: "The Objective",
        content: [
          "Retail investors in India rely on tips from social media or basic screeners, while institutional investors have access to multi-layered analysis covering fundamentals, technicals, and sentiment. StockSage aimed to democratise this with AI agents.",
        ],
      },
      {
        id: "the-map",
        title: "The Map",
        content: [
          "Researched how institutional analysts structure their research — identifying that coverage typically spans fundamental analysis, technical chart patterns, news sentiment, and peer comparison.",
          "Evaluated multi-agent orchestration frameworks and selected LangGraph for its ability to coordinate specialised AI agents with shared state.",
        ],
      },
      {
        id: "moves-made",
        title: "Moves Made",
        content: [
          "Designed a multi-agent architecture: separate agents for fundamental analysis (financial ratios), technical analysis (moving averages, RSI), and news sentiment — orchestrated via LangGraph.",
          "Used Groq for low-latency inference and Gemini for deep reasoning tasks. Built a FastAPI backend with a Next.js frontend for the full-stack experience.",
        ],
      },
      {
        id: "victory-condition",
        title: "Victory Condition",
        content: [
          "Shipped a working full-stack product demonstrating multi-agent AI orchestration with real-time stock analysis capabilities.",
        ],
      },
      {
        id: "next-turn",
        title: "Next Turn",
        content: [
          "Add portfolio-level analysis and risk assessment. Integrate real-time market data feeds for live analysis.",
        ],
      },
    ],
  },
  "scb-reporting": {
    slug: "scb-reporting",
    category: "Fintech · Internal Tool",
    name: "Risk Appetite Reporting Automation",
    problem:
      "Country-level risk pack creation took 3 days of manual analyst work",
    outcome:
      "Reduced to 4 hours · Python-pptx + AI commentary · 12 countries served",
    tools: ["Python", "SQL", "Anthropic API"],
    sections: [
      {
        id: "the-objective",
        title: "The Objective",
        content: [
          "Standard Chartered's risk appetite reporting process required analysts to manually compile data from multiple sources, create PowerPoint decks, and write commentary for each of the 12 countries — taking approximately 3 full working days per reporting cycle.",
        ],
      },
      {
        id: "the-map",
        title: "The Map",
        content: [
          "Mapped the end-to-end reporting workflow: data extraction from risk databases → manual Excel aggregation → slide creation → commentary writing → review cycle. Identified that 70% of time was spent on repetitive formatting and data-wrangling.",
        ],
      },
      {
        id: "moves-made",
        title: "Moves Made",
        content: [
          "Built a Python pipeline using python-pptx to auto-generate templated slides with live data from SQL queries.",
          "Integrated the Anthropic API to generate first-draft commentary based on data trends — allowing analysts to review and edit rather than write from scratch.",
          "Designed the system to be country-configurable — adding a new country required only a config file change, not code.",
        ],
      },
      {
        id: "victory-condition",
        title: "Victory Condition",
        content: [
          "Reduced reporting time from 3 days to 4 hours — an 87% reduction in effort.",
          "Scaled to serve 12 countries with consistent quality and formatting. Freed analysts to focus on insight generation rather than slide production.",
        ],
      },
      {
        id: "next-turn",
        title: "Next Turn",
        content: [
          "Extend to other reporting verticals (credit risk, market risk). Build a self-service web interface for analysts to trigger and customise reports on demand.",
        ],
      },
    ],
  },
  "kyc-automation": {
    slug: "kyc-automation",
    category: "Fintech · Process Innovation",
    name: "KYC Onboarding Automation",
    problem:
      "Manual KYC review was the bottleneck in customer onboarding at SCB",
    outcome: "40% reduction in manual effort · Improved compliance SLA",
    tools: ["SQL", "Tableau", "Process Design"],
    sections: [
      {
        id: "the-objective",
        title: "The Objective",
        content: [
          "Standard Chartered's customer onboarding process was bottlenecked by manual KYC (Know Your Customer) reviews. Each application required analyst verification of identity documents, address proofs, and sanctions screening — creating delays and compliance risk.",
        ],
      },
      {
        id: "the-map",
        title: "The Map",
        content: [
          "Audited the existing KYC workflow end-to-end — from application submission to final approval. Identified that 60% of applications were straightforward cases that could be automated with rule-based screening.",
        ],
      },
      {
        id: "moves-made",
        title: "Moves Made",
        content: [
          "Designed a tiered review system: auto-approve low-risk applications meeting defined criteria, flag medium-risk for expedited review, and route high-risk cases to senior analysts.",
          "Built Tableau dashboards for real-time monitoring of KYC pipeline health, bottlenecks, and SLA compliance across regions.",
        ],
      },
      {
        id: "victory-condition",
        title: "Victory Condition",
        content: [
          "Achieved a 40% reduction in manual review effort while maintaining (and improving) compliance standards.",
          "Improved onboarding SLAs — average time-to-approval decreased significantly, improving customer experience at scale.",
        ],
      },
      {
        id: "next-turn",
        title: "Next Turn",
        content: [
          "Integrate ML-based document verification for identity documents. Expand automation to cover ongoing monitoring and periodic KYC renewal.",
        ],
      },
    ],
  },
};
