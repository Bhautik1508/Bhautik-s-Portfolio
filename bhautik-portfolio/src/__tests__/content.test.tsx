import { describe, it, expect } from "vitest";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Capabilities from "../components/Capabilities";
import Marquee from "../components/Marquee";
import { render, textOf, boldedRuns } from "./helpers";

describe("Hero", () => {
  const html = render(<Hero />);
  const text = textOf(html);

  it("leads with the current Brillio role", () => {
    expect(text).toContain("AI Product Manager on ADAM");
    expect(text).toContain("Brillio");
  });

  it("keeps Standard Chartered as prior experience and retains IIT Delhi", () => {
    expect(text).toContain("Previously credit risk at Standard Chartered");
    expect(text).toContain("MBA from IIT Delhi");
  });

  it("never describes Standard Chartered as current", () => {
    expect(text).not.toContain("Currently at Standard Chartered");
  });

  it("renders four stats, one carrying the IIT Delhi credential", () => {
    for (const label of [
      "AGENT TRIAGE TIME",
      "ENTERPRISE WIN",
      "MARKETS SHIPPED",
      "YEARS IN AI × FINTECH",
    ]) {
      expect(text).toContain(label);
    }
    expect(text).toContain("Brillio · IIT Delhi MBA");
  });

  it("renders the currency prefix flush against the counter", () => {
    // The count-up starts at 0 server-side; what matters is that prefix,
    // value and suffix concatenate with no whitespace between them.
    expect(html).toMatch(/\$<!-- -->0<!-- -->K|\$0K/);
  });
});

describe("Experience", () => {
  const html = render(<Experience />);
  const text = textOf(html);

  it("lists four roles with Brillio first", () => {
    expect(text.indexOf("Brillio")).toBeLessThan(text.indexOf("Standard Chartered Bank"));
    expect(text.indexOf("Standard Chartered Bank")).toBeLessThan(text.indexOf("Prodapt"));
    expect(text.indexOf("Prodapt")).toBeLessThan(text.indexOf("Addivity"));
  });

  it("renders a timeline dot per role and a connector between each pair", () => {
    expect((html.match(/border-radius:50%/g) ?? []).length).toBe(4);
    expect((html.match(/background-color:#DDD8D2/g) ?? []).length).toBe(3);
  });

  it("marks exactly one role as current", () => {
    expect((text.match(/Present/g) ?? []).length).toBe(1);
    expect(text).toContain("Jul 2026 – Present");
  });

  it("closes out Standard Chartered at Jun 2026", () => {
    expect(text).toContain("Sep 2022 – Jun 2026");
    expect(text).not.toContain("Sep 2022 – Present");
  });

  it("bolds every declared highlight across all four roles", () => {
    // 6 Brillio + 5 SCB + 3 Prodapt + 4 Addivity
    expect(boldedRuns(html)).toEqual([
      "7 dimensions",
      "hours to under 30 minutes",
      "~25%",
      "~30%",
      "~35%",
      "$800K",
      "3 days to 4 hours",
      "12 markets",
      "100%",
      "20+",
      "90%+",
      "$3M",
      "20%",
      "15%",
      "6 months",
      "80+",
      "65+",
      "15+",
    ]);
  });

  it("keeps the original Standard Chartered, Prodapt and Addivity copy", () => {
    expect(text).toContain("python-pptx, pandas and Claude API");
    expect(text).toContain("Turned cold RFPs into $3M of new revenue");
    expect(text).toContain("80+ person cross-functional team");
  });
});

describe("Education", () => {
  const text = textOf(render(<Education />));

  it("names the MBA specialisation", () => {
    expect(text).toContain("MBA, Product Management");
  });

  it("retains IIT Delhi", () => {
    expect(text).toContain("Indian Institute of Technology, Delhi");
  });
});

describe("Capabilities", () => {
  const html = render(<Capabilities />);
  const text = textOf(html);
  const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)];

  it("keeps three cards of six items each", () => {
    expect(items).toHaveLength(18);
    for (const t of ["Product management", "AI & agentic systems", "Fintech domain"]) {
      expect(text).toContain(t);
    }
  });

  it("replaced the data card with agentic AI coverage", () => {
    expect(text).not.toContain("Data & analytics");
    expect(text).toContain("Agentic AI & multi-agent systems");
    expect(text).toContain("AI observability & governance");
  });

  it("adds the fintech breadth from the resume", () => {
    expect(text).toContain("Payments, lending & cards");
    expect(text).toContain("Digital onboarding & KYC/AML");
  });
});

describe("Marquee", () => {
  const html = render(<Marquee />);
  const chips = [...html.matchAll(/padding:0 22px[^>]*>(?:<[^>]*>)*([^<]+)</g)].map(
    (m) => m[1].trim(),
  );

  it("duplicates the list so the loop is seamless", () => {
    expect(chips.length % 2).toBe(0);
    const half = chips.length / 2;
    expect(chips.slice(0, half)).toEqual(chips.slice(half));
  });

  it("has no duplicate skills within one pass", () => {
    const half = chips.length / 2;
    const pass = chips.slice(0, half);
    expect(new Set(pass).size).toBe(pass.length);
  });

  it("scales animation duration to hold the original 2s-per-item speed", () => {
    const match = html.match(/--marquee-duration:\s*([\d.]+)s/);
    expect(match).not.toBeNull();
    const seconds = Number(match![1]);
    const half = chips.length / 2;
    expect(seconds / half).toBe(2);
  });

  it("carries the new AI vocabulary", () => {
    const half = chips.length / 2;
    const pass = chips.slice(0, half);
    for (const s of ["Agentic AI", "LangGraph", "RAG", "AI Governance", "KYC/AML"]) {
      expect(pass).toContain(s);
    }
  });
});
