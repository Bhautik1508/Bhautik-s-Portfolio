import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Experience from "@/components/Experience";

describe("Experience / Campaign Log", () => {
  it("renders as a <section> with id='campaign-log'", () => {
    const { container } = renderWithProviders(<Experience />);
    const section = container.querySelector("section#campaign-log");
    expect(section).toBeInTheDocument();
  });

  it("renders the section eyebrow 'Campaign Log'", () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText("Campaign Log")).toBeInTheDocument();
  });

  it("renders the section heading 'Experience'", () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders all 3 company names", () => {
    renderWithProviders(<Experience />);
    expect(
      screen.getByText("Standard Chartered Bank")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Addivity (Co-founder)")
    ).toBeInTheDocument();
    expect(screen.getByText("IIT Delhi")).toBeInTheDocument();
  });

  it("renders all 3 role titles", () => {
    renderWithProviders(<Experience />);
    expect(
      screen.getByText("Product Manager / Senior Analyst")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Product & Strategy Lead")
    ).toBeInTheDocument();
    expect(
      screen.getByText("MBA, Strategy & Operations")
    ).toBeInTheDocument();
  });

  it("renders duration labels", () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText("2021 – 2024")).toBeInTheDocument();
    expect(screen.getByText("2020 – 2021")).toBeInTheDocument();
    expect(screen.getByText("2018 – 2020")).toBeInTheDocument();
  });

  it("renders key impact bullets for Standard Chartered", () => {
    renderWithProviders(<Experience />);
    expect(
      screen.getByText(/Automated KYC onboarding pipeline/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/risk appetite reporting infrastructure/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/data-to-PPT automation/i)
    ).toBeInTheDocument();
  });

  it("renders key bullets for Addivity", () => {
    renderWithProviders(<Experience />);
    expect(
      screen.getByText(/Co-founded edtech startup/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/user interviews with 50\+ students/i)
    ).toBeInTheDocument();
  });

  it("renders 'Download Full Resume' CTA", () => {
    renderWithProviders(<Experience />);
    const cta = screen.getByText("Download Full Resume");
    expect(cta).toBeInTheDocument();
    expect(cta.closest("a")).toHaveAttribute("href", "/bhautik-patel-resume.pdf");
  });

  it("'Download Full Resume' opens in a new tab", () => {
    renderWithProviders(<Experience />);
    const cta = screen.getByText("Download Full Resume");
    const link = cta.closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has a vertical timeline border line", () => {
    const { container } = renderWithProviders(<Experience />);
    const timeline = container.querySelector(
      'div[style*="border-left"]'
    );
    expect(timeline).toBeInTheDocument();
  });

  it("company names use Instrument Serif (font-display)", () => {
    renderWithProviders(<Experience />);
    const companyName = screen.getByText("Standard Chartered Bank");
    expect(companyName.className).toContain("font-display");
  });
});
