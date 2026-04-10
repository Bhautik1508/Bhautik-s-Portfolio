import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import About from "@/components/About";

describe("About / Opening Move", () => {
  it("renders as a <section> with id='opening-move'", () => {
    const { container } = renderWithProviders(<About />);
    const section = container.querySelector("section#opening-move");
    expect(section).toBeInTheDocument();
  });

  it("renders the section eyebrow 'Opening Move'", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Opening Move")).toBeInTheDocument();
  });

  it("renders the section heading 'Who I Am'", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Who I Am")).toBeInTheDocument();
  });

  it("renders the avatar with initials 'BP'", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("BP")).toBeInTheDocument();
  });

  it("renders the bio paragraph with key phrases", () => {
    renderWithProviders(<About />);
    expect(
      screen.getByText(/Product Manager with 4\+ years in fintech/i)
    ).toBeInTheDocument();
  });

  it("mentions Wingspan in the bio", () => {
    renderWithProviders(<About />);
    expect(
      screen.getByText(/play Wingspan on weekends/i)
    ).toBeInTheDocument();
  });

  it("renders all 3 PM Superpower cards", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Discovery First")).toBeInTheDocument();
    expect(screen.getByText("Data-Backed Decisions")).toBeInTheDocument();
    expect(screen.getByText("0-to-1 Builder")).toBeInTheDocument();
  });

  it("renders superpower descriptions", () => {
    renderWithProviders(<About />);
    expect(
      screen.getByText("I start with user research, not features")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Every tradeoff has a number attached")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Two products launched from scratch")
    ).toBeInTheDocument();
  });

  it("heading uses Instrument Serif (font-display class)", () => {
    renderWithProviders(<About />);
    const heading = screen.getByText("Who I Am");
    expect(heading.className).toContain("font-display");
  });
});
