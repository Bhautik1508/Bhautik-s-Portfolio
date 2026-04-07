import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Navbar from "@/components/layout/Navbar";

describe("Navbar", () => {
  it("renders the site wordmark", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Bhautik Patel")).toBeInTheDocument();
  });

  it("renders all 5 navigation links", () => {
    renderWithProviders(<Navbar />);
    const navLinks = ["Home", "About", "Projects", "Resume", "Contact"];
    for (const label of navLinks) {
      // There may be both desktop and mobile copies
      const links = screen.getAllByText(label);
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("wordmark links to home", () => {
    renderWithProviders(<Navbar />);
    const wordmark = screen.getByLabelText("Home");
    expect(wordmark).toHaveAttribute("href", "/");
  });

  it("renders 'Available' badge when OPEN_TO_WORK is true", () => {
    renderWithProviders(<Navbar />);
    // siteConfig.openToWork is true in config
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders admin lock icon link to /admin/login", () => {
    renderWithProviders(<Navbar />);
    const adminLink = screen.getByLabelText("Admin");
    expect(adminLink).toHaveAttribute("href", "/admin/login");
  });

  it("renders mobile hamburger button", () => {
    renderWithProviders(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle navigation");
    expect(hamburger).toBeInTheDocument();
    expect(hamburger.tagName).toBe("BUTTON");
  });

  it("is rendered as a <header> element", () => {
    const { container } = renderWithProviders(<Navbar />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});
