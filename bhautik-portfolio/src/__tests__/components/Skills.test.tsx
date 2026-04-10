import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Skills from "@/components/Skills";

describe("Skills / Resource Board", () => {
  it("renders as a <section> with id='resource-board'", () => {
    const { container } = renderWithProviders(<Skills />);
    const section = container.querySelector("section#resource-board");
    expect(section).toBeInTheDocument();
  });

  it("renders the section eyebrow 'Resource Board'", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("Resource Board")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    renderWithProviders(<Skills />);
    // The heading contains &amp; so we match with regex
    expect(screen.getByText(/Skills/)).toBeInTheDocument();
  });

  it("renders all 5 category labels", () => {
    renderWithProviders(<Skills />);
    const categories = [
      "Product Strategy",
      "Discovery & Research",
      "Data & Analytics",
      "Delivery",
      "Technical",
    ];
    for (const cat of categories) {
      expect(screen.getByText(cat)).toBeInTheDocument();
    }
  });

  it("renders skill tags for Product Strategy", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("Roadmapping")).toBeInTheDocument();
    expect(screen.getByText("PRDs")).toBeInTheDocument();
    expect(screen.getByText("OKRs")).toBeInTheDocument();
    expect(
      screen.getByText("Prioritization (RICE/MoSCoW)")
    ).toBeInTheDocument();
  });

  it("renders skill tags for Discovery & Research", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("User Interviews")).toBeInTheDocument();
    expect(screen.getByText("Jobs-to-be-Done")).toBeInTheDocument();
  });

  it("renders skill tags for Data & Analytics", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("SQL")).toBeInTheDocument();
    expect(screen.getByText("Tableau")).toBeInTheDocument();
    expect(screen.getByText("A/B Testing")).toBeInTheDocument();
  });

  it("renders skill tags for Delivery", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("Agile / Scrum")).toBeInTheDocument();
    expect(screen.getByText("JIRA")).toBeInTheDocument();
  });

  it("renders skill tags for Technical", () => {
    renderWithProviders(<Skills />);
    expect(screen.getByText("APIs")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Firebase")).toBeInTheDocument();
    expect(screen.getByText("LangGraph (conceptual)")).toBeInTheDocument();
  });

  it("each category has a colored dot indicator", () => {
    const { container } = renderWithProviders(<Skills />);
    // There should be 5 dot elements (one per cluster)
    const dots = container.querySelectorAll(
      'span[style*="border-radius: 50%"]'
    );
    expect(dots.length).toBe(5);
  });
});
