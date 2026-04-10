import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Hero from "@/components/Hero";

describe("Hero (Board-game theme)", () => {
  it("renders the headline 'Bhautik Patel'", () => {
    renderWithProviders(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Bhautik Patel");
  });

  it("renders the subheadline with role keywords", () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText(
        "Product Manager · Fintech · AI Products · IIT Delhi MBA"
      )
    ).toBeInTheDocument();
  });

  it("renders the one-liner tagline", () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText(/I turn ambiguous problems into shipped products/i)
    ).toBeInTheDocument();
  });

  it("renders 'See My Work ↓' primary CTA", () => {
    renderWithProviders(<Hero />);
    const cta = screen.getByText("See My Work ↓");
    expect(cta).toBeInTheDocument();
    expect(cta.closest("a")).toHaveAttribute("href", "#mission-cards");
  });

  it("renders 'Download Resume' secondary CTA", () => {
    renderWithProviders(<Hero />);
    const cta = screen.getByText("Download Resume");
    expect(cta).toBeInTheDocument();
    expect(cta.closest("a")).toHaveAttribute("href", "/bhautik-patel-resume.pdf");
  });

  it("'Download Resume' opens in a new tab", () => {
    renderWithProviders(<Hero />);
    const cta = screen.getByText("Download Resume");
    const link = cta.closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders as a <section> element with id='hero'", () => {
    const { container } = renderWithProviders(<Hero />);
    const section = container.querySelector("section#hero");
    expect(section).toBeInTheDocument();
  });

  it("contains the hex grid SVG background pattern", () => {
    const { container } = renderWithProviders(<Hero />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Check for the hex pattern
    const pattern = container.querySelector("pattern#hero-hex-grid");
    expect(pattern).toBeInTheDocument();
  });

  it("hex grid background is aria-hidden", () => {
    const { container } = renderWithProviders(<Hero />);
    const bgDiv = container.querySelector('[aria-hidden="true"]');
    expect(bgDiv).toBeInTheDocument();
  });

  it("primary CTA has the muted green background color", () => {
    renderWithProviders(<Hero />);
    const cta = screen.getByText("See My Work ↓").closest("a");
    expect(cta).toHaveStyle({ backgroundColor: "#3B6D11" });
  });

  it("secondary CTA has an outline style (border, not filled)", () => {
    renderWithProviders(<Hero />);
    const cta = screen.getByText("Download Resume").closest("a");
    // JSDOM splits shorthand 'border' into sub-properties
    expect(cta).toHaveStyle({ borderStyle: "solid" });
    expect(cta).toHaveStyle({ borderWidth: "1px" });
    // Should NOT have the primary green fill
    expect(cta).not.toHaveStyle({ backgroundColor: "#3B6D11" });
  });

  it("headline uses Instrument Serif font", () => {
    renderWithProviders(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.className).toContain("font-display");
  });
});
