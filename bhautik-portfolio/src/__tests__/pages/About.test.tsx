import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import About from "@/pages/About";

describe("About page", () => {
  it("renders 'About Me' heading", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders 'Player Card' badge", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Player Card")).toBeInTheDocument();
  });

  it("renders bio text mentioning fintech experience", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/4 years in fintech/)).toBeInTheDocument();
  });

  it("renders the player card with initials 'BP'", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("BP")).toBeInTheDocument();
  });

  it("renders player card name", () => {
    renderWithProviders(<About />);
    // Multiple elements may have this text
    const els = screen.getAllByText("Bhautik Patel");
    expect(els.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all three traits", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Strategic Thinker")).toBeInTheDocument();
    expect(screen.getByText("Data-Driven")).toBeInTheDocument();
    expect(screen.getByText("0→1 Builder")).toBeInTheDocument();
  });

  it("renders 'Resource Board' skills section", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Resource Board")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("renders all 4 skill panels", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Data & Analytics")).toBeInTheDocument();
    expect(screen.getByText("Design & Prototyping")).toBeInTheDocument();
    expect(screen.getByText("Technical")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  it("renders skill tags like SQL and Figma", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("SQL")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders 'Off the Clock' section with games", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("Off the Clock")).toBeInTheDocument();
    expect(screen.getByText("Wingspan")).toBeInTheDocument();
    expect(screen.getByText("Gloomhaven")).toBeInTheDocument();
    expect(screen.getByText("Dune Imperium")).toBeInTheDocument();
    expect(screen.getByText("Terraforming Mars")).toBeInTheDocument();
  });
});
