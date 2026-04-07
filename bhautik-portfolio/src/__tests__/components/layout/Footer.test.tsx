import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Footer from "@/components/layout/Footer";

/* ── Helpers ── */

// Spy on window.scrollTo for "Back to top" tests
const scrollToSpy = vi.fn();

beforeEach(() => {
  window.scrollTo = scrollToSpy;
  scrollToSpy.mockClear();
});

describe("Footer", () => {
  /* ── Structure ── */

  it("renders a <footer> element", () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("has the data-testid 'footer'", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  /* ── Brand block ── */

  it("renders the brand name 'Bhautik Patel'", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Bhautik Patel")).toBeInTheDocument();
  });

  it("renders the brand tagline text", () => {
    renderWithProviders(<Footer />);
    expect(
      screen.getByText(/Product Manager · Fintech · IIT Delhi MBA/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Building products that move money and reduce risk/)
    ).toBeInTheDocument();
  });

  /* ── Navigation links ── */

  it("renders all 5 nav links", () => {
    renderWithProviders(<Footer />);
    const nav = screen.getByLabelText("Footer navigation");
    expect(nav).toBeInTheDocument();

    const links = nav.querySelectorAll("a");
    expect(links).toHaveLength(5);
  });

  it("renders Home, About, Projects, Resume, Contact links", () => {
    renderWithProviders(<Footer />);
    ["Home", "About", "Projects", "Resume", "Contact"].forEach((label) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
    });
  });

  it("nav links point to correct routes", () => {
    renderWithProviders(<Footer />);
    const routes: Record<string, string> = {
      Home: "/",
      About: "/about",
      Projects: "/projects",
      Resume: "/resume",
      Contact: "/contact",
    };
    Object.entries(routes).forEach(([label, path]) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", path);
    });
  });

  /* ── Social links ── */

  it("renders the 'Connect' label", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Connect")).toBeInTheDocument();
  });

  it("renders LinkedIn social link", () => {
    renderWithProviders(<Footer />);
    const link = screen.getByLabelText("LinkedIn");
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com")
    );
  });

  it("renders GitHub social link", () => {
    renderWithProviders(<Footer />);
    const link = screen.getByLabelText("GitHub");
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("github.com")
    );
  });

  it("renders Email social link", () => {
    renderWithProviders(<Footer />);
    const link = screen.getByLabelText("Email");
    expect(link).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("opens external links in new tab", () => {
    renderWithProviders(<Footer />);
    const linkedin = screen.getByLabelText("LinkedIn");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("email link does not open in new tab", () => {
    renderWithProviders(<Footer />);
    const email = screen.getByLabelText("Email");
    expect(email).not.toHaveAttribute("target", "_blank");
  });

  /* ── Availability badge ── */

  it("renders 'Open to Work' badge when openToWork is true", () => {
    renderWithProviders(<Footer />);
    // siteConfig.openToWork is true by default in config
    expect(screen.getByText("Open to Work")).toBeInTheDocument();
  });

  /* ── Lower section ── */

  it("renders the copyright text", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("© 2025 Bhautik Patel")).toBeInTheDocument();
  });

  it("renders 'Built with React + Firebase' text", () => {
    renderWithProviders(<Footer />);
    expect(
      screen.getByText(/Built with React \+ Firebase/)
    ).toBeInTheDocument();
  });

  it("renders the 'Back to top ↑' button", () => {
    renderWithProviders(<Footer />);
    const btn = screen.getByText("Back to top ↑");
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("scrolls to top on 'Back to top' click", () => {
    renderWithProviders(<Footer />);
    const btn = screen.getByText("Back to top ↑");
    fireEvent.click(btn);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  /* ── Accessibility ── */

  it("social icon buttons have aria-labels", () => {
    renderWithProviders(<Footer />);
    ["LinkedIn", "GitHub", "Email"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("footer nav has proper aria-label", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
  });
});
