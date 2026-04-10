import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Navbar from "@/components/Navbar";

describe("Navbar (Board-game theme)", () => {
  it("renders as a <header> element", () => {
    const { container } = renderWithProviders(<Navbar />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("renders the site wordmark 'Bhautik Patel'", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Bhautik Patel")).toBeInTheDocument();
  });

  it("wordmark links to home", () => {
    renderWithProviders(<Navbar />);
    const wordmark = screen.getByLabelText("Home");
    expect(wordmark).toHaveAttribute("href", "/");
  });

  it("renders all 4 PM-flavored navigation links", () => {
    renderWithProviders(<Navbar />);
    const navLabels = [
      "Opening Move",
      "Campaign Log",
      "Mission Cards",
      "Contact",
    ];
    for (const label of navLabels) {
      const links = screen.getAllByText(label);
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders 'Download Rulebook' button(s)", () => {
    renderWithProviders(<Navbar />);
    const buttons = screen.getAllByText("Download Rulebook");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("'Download Rulebook' links to the resume PDF", () => {
    renderWithProviders(<Navbar />);
    const buttons = screen.getAllByText("Download Rulebook");
    // At least one should have the resume href
    const hasResumeLink = buttons.some(
      (btn) => btn.closest("a")?.getAttribute("href") === "/bhautik-patel-resume.pdf"
    );
    expect(hasResumeLink).toBe(true);
  });

  it("renders mobile hamburger button", () => {
    renderWithProviders(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle navigation");
    expect(hamburger).toBeInTheDocument();
    expect(hamburger.tagName).toBe("BUTTON");
  });

  it("hamburger button has aria-expanded attribute", () => {
    renderWithProviders(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle navigation");
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  it("shows mobile menu when hamburger is clicked", () => {
    renderWithProviders(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle navigation");
    fireEvent.click(hamburger);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("has a <nav> element with aria-label for accessibility", () => {
    const { container } = renderWithProviders(<Navbar />);
    const nav = container.querySelector('nav[aria-label="Main navigation"]');
    expect(nav).toBeInTheDocument();
  });

  it("navigation links use hash-based hrefs for in-page scrolling", () => {
    renderWithProviders(<Navbar />);
    const expectedHrefs = [
      "#opening-move",
      "#campaign-log",
      "#mission-cards",
      "#contact",
    ];
    for (const href of expectedHrefs) {
      const link = screen.getAllByRole("link").find(
        (el) => el.getAttribute("href") === href
      );
      expect(link).toBeDefined();
    }
  });
});
