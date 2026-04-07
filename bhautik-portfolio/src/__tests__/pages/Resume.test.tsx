import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Resume from "@/pages/Resume";

describe("Resume page", () => {
  it("renders 'Experience' heading", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders 'Campaign History' badge", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Campaign History")).toBeInTheDocument();
  });

  it("renders all three work experience entries", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Standard Chartered Bank")).toBeInTheDocument();
    expect(screen.getByText(/Addivity/)).toBeInTheDocument();
    expect(screen.getByText("Prodapt Solutions")).toBeInTheDocument();
  });

  it("renders job roles", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
    expect(screen.getByText("Co-founder & Product Lead")).toBeInTheDocument();
    expect(screen.getByText("Business Analyst")).toBeInTheDocument();
  });

  it("renders experience bullets for Standard Chartered", () => {
    renderWithProviders(<Resume />);
    expect(
      screen.getByText(/Led 0→1 build of payments feature/)
    ).toBeInTheDocument();
  });

  it("renders tags for experience entries", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.getByText("KYC")).toBeInTheDocument();
    expect(screen.getByText("Startup")).toBeInTheDocument();
  });

  it("renders 'Education' section", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Achievements")).toBeInTheDocument();
  });

  it("renders IIT Delhi MBA education card", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Master of Business Administration")).toBeInTheDocument();
    expect(screen.getByText("2019 – 2021")).toBeInTheDocument();
  });

  it("renders certifications section", () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });

  it("renders download resume CTA", () => {
    renderWithProviders(<Resume />);
    expect(
      screen.getByText(/Download Full Resume/)
    ).toBeInTheDocument();
  });

  it("download link has target _blank", () => {
    renderWithProviders(<Resume />);
    const link = screen.getByText(/Download Full Resume/);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
