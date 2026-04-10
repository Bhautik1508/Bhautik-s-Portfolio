import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Projects from "@/components/Projects";

describe("Projects / Mission Cards", () => {
  it("renders as a <section> with id='mission-cards'", () => {
    const { container } = renderWithProviders(<Projects />);
    const section = container.querySelector("section#mission-cards");
    expect(section).toBeInTheDocument();
  });

  it("renders the section eyebrow 'Mission Cards'", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("Mission Cards")).toBeInTheDocument();
  });

  it("renders the section heading 'Featured Projects'", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("renders all 4 project names", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("GiftSense")).toBeInTheDocument();
    expect(screen.getByText("StockSage AI")).toBeInTheDocument();
    expect(
      screen.getByText("Risk Appetite Reporting Automation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("KYC Onboarding Automation")
    ).toBeInTheDocument();
  });

  it("renders category badges for each project", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("AI Product · 0-to-1")).toBeInTheDocument();
    expect(
      screen.getByText("AI Product · Multi-agent")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fintech · Internal Tool")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fintech · Process Innovation")
    ).toBeInTheDocument();
  });

  it("renders problem statements", () => {
    renderWithProviders(<Projects />);
    expect(
      screen.getByText(/gifting market with zero smart recommendation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Retail investors in India/i)
    ).toBeInTheDocument();
  });

  it("renders outcome metrics in bold green", () => {
    renderWithProviders(<Projects />);
    const outcome = screen.getByText(
      /78% intent-to-use/
    );
    expect(outcome).toBeInTheDocument();
    expect(outcome).toHaveStyle({ fontWeight: 600 });
  });

  it("renders tool chips for GiftSense", () => {
    renderWithProviders(<Projects />);
    expect(screen.getAllByText("AI/LLM").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Next.js").length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Vercel").length
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders 'Read Case Study →' links for each project", () => {
    renderWithProviders(<Projects />);
    const links = screen.getAllByText("Read Case Study →");
    expect(links).toHaveLength(4);
  });

  it("case study links point to correct routes", () => {
    renderWithProviders(<Projects />);
    const links = screen.getAllByText("Read Case Study →");
    const hrefs = links.map(
      (el) => el.closest("a")?.getAttribute("href")
    );
    expect(hrefs).toContain("/case-study/giftsense");
    expect(hrefs).toContain("/case-study/stocksage");
    expect(hrefs).toContain("/case-study/scb-reporting");
    expect(hrefs).toContain("/case-study/kyc-automation");
  });

  it("project names use Instrument Serif (font-display)", () => {
    renderWithProviders(<Projects />);
    const name = screen.getByText("GiftSense");
    expect(name.className).toContain("font-display");
  });
});
