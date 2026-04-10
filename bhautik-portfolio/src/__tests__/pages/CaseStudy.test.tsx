import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import CaseStudy from "@/pages/CaseStudy";

/* 
 * CaseStudy uses useParams to read :slug, so we must render it
 * inside a <Routes><Route path="/case-study/:slug"> to get params.
 */
function renderCaseStudy(slug: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[`/case-study/${slug}`]}>
        <Routes>
          <Route path="/case-study/:slug" element={<CaseStudy />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("CaseStudy page — GiftSense", () => {
  it("renders the project name as heading", () => {
    renderCaseStudy("giftsense");
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("GiftSense");
  });

  it("renders the category badge", () => {
    renderCaseStudy("giftsense");
    expect(screen.getByText("AI Product · 0-to-1")).toBeInTheDocument();
  });

  it("renders the problem statement", () => {
    renderCaseStudy("giftsense");
    expect(
      screen.getByText(/gifting market with zero smart recommendation/i)
    ).toBeInTheDocument();
  });

  it("renders tool chips", () => {
    renderCaseStudy("giftsense");
    expect(screen.getByText("AI/LLM")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Vercel")).toBeInTheDocument();
  });

  it("renders all 5 board-game-named section headings", () => {
    renderCaseStudy("giftsense");
    const sectionTitles = [
      "The Objective",
      "The Map",
      "Moves Made",
      "Victory Condition",
      "Next Turn",
    ];
    for (const title of sectionTitles) {
      const elements = screen.getAllByText(title);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders The Objective content", () => {
    renderCaseStudy("giftsense");
    expect(
      screen.getByText(/Indian gifting market is valued at over/i)
    ).toBeInTheDocument();
  });

  it("renders The Map content with survey data", () => {
    renderCaseStudy("giftsense");
    expect(
      screen.getByText(/30-response survey on Indian gifting/i)
    ).toBeInTheDocument();
  });

  it("renders Moves Made content", () => {
    renderCaseStudy("giftsense");
    expect(
      screen.getByText(/Direction-before-products UX/i)
    ).toBeInTheDocument();
  });

  it("renders Victory Condition content", () => {
    renderCaseStudy("giftsense");
    expect(
      screen.getByText(/giftsense-rust.vercel.app/i)
    ).toBeInTheDocument();
  });

  it("renders Next Turn content", () => {
    renderCaseStudy("giftsense");
    expect(
      screen.getByText(/personalisation layer/i)
    ).toBeInTheDocument();
  });

  it("renders a table of contents sidebar", () => {
    renderCaseStudy("giftsense");
    const toc = screen.getByLabelText("Table of contents");
    expect(toc).toBeInTheDocument();
  });

  it("renders 'Back to Mission Cards' link", () => {
    renderCaseStudy("giftsense");
    const backLink = screen.getByText("← Back to Mission Cards");
    expect(backLink).toBeInTheDocument();
  });

  it("renders bottom navigation CTAs", () => {
    renderCaseStudy("giftsense");
    expect(screen.getByText("← All Projects")).toBeInTheDocument();
    expect(
      screen.getByText("Let's Work Together →")
    ).toBeInTheDocument();
  });
});

describe("CaseStudy page — 404 state", () => {
  it("renders 'Mission Not Found' for unknown slugs", () => {
    renderCaseStudy("nonexistent");
    expect(screen.getByText("Mission Not Found")).toBeInTheDocument();
  });

  it("shows a back-to-home link", () => {
    renderCaseStudy("nonexistent");
    const link = screen.getByText("← Back to Home");
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});
