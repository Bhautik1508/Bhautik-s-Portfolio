import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Home from "@/pages/Home";

describe("Home page", () => {
  it("renders the name 'Bhautik' in the heading", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Bhautik")).toBeInTheDocument();
  });

  it("renders the name 'Patel' in the heading", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Patel")).toBeInTheDocument();
  });

  it("renders the overline text", () => {
    renderWithProviders(<Home />);
    expect(
      screen.getByText(/Product Manager.*Fintech.*IIT Delhi MBA/)
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    renderWithProviders(<Home />);
    expect(
      screen.getByText(/build 0→1 fintech products/)
    ).toBeInTheDocument();
  });

  it("renders 'View Projects' CTA link", () => {
    renderWithProviders(<Home />);
    const link = screen.getByText("View Projects →");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders 'Download Resume' CTA link", () => {
    renderWithProviders(<Home />);
    const link = screen.getByText("↓ Download Resume");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders all 4 stat cards", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Yrs Experience")).toBeInTheDocument();
    expect(screen.getByText("Products Launched")).toBeInTheDocument();
    expect(screen.getByText("Revenue Impact")).toBeInTheDocument();
    expect(screen.getByText("Delhi MBA")).toBeInTheDocument();
  });

  it("renders the hex grid background", () => {
    const { container } = renderWithProviders(<Home />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
