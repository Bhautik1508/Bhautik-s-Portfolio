import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MissionCard from "@/components/MissionCard";
import type { Project } from "@/hooks/useProjects";
import type { Timestamp } from "firebase/firestore";

/* ── Helpers ── */

const baseProject: Project = {
  id: "test-1",
  title: "Test Project",
  tagline: "A short tagline for the project.",
  description: "Full description text.",
  category: "0→1 Build",
  tags: ["AI", "Fintech", "India", "Gifting"],
  metrics: [
    { label: "Users", value: "500" },
    { label: "Revenue", value: "$10K" },
  ],
  status: "Live",
  caseStudyUrl: "https://example.com/case",
  liveUrl: "https://example.com/live",
  imageUrl: "",
  featured: false,
  order: 1,
  createdAt: { seconds: 0, nanoseconds: 0 } as unknown as Timestamp,
};

function renderCard(overrides: Partial<Project> = {}, featured = false) {
  const project = { ...baseProject, ...overrides };
  return render(<MissionCard project={project} featured={featured} />);
}

/* ── Tests ── */

describe("MissionCard", () => {
  it("renders the project title", () => {
    renderCard();
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    renderCard();
    expect(
      screen.getByText("A short tagline for the project.")
    ).toBeInTheDocument();
  });

  it("renders status badge with correct text", () => {
    renderCard({ status: "Live" });
    expect(screen.getByTestId("status-badge")).toHaveTextContent("Live");
  });

  it("renders 'Case Study' status badge", () => {
    renderCard({ status: "Case Study" });
    expect(screen.getByTestId("status-badge")).toHaveTextContent("Case Study");
  });

  it("renders 'In Progress' status badge", () => {
    renderCard({ status: "In Progress" });
    expect(screen.getByTestId("status-badge")).toHaveTextContent("In Progress");
  });

  it("renders metric values and labels", () => {
    renderCard();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("$10K")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("does not render metrics section when metrics array is empty", () => {
    renderCard({ metrics: [] });
    expect(screen.queryByText("Users")).not.toBeInTheDocument();
  });

  it("renders all tags", () => {
    renderCard();
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("Fintech")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByText("Gifting")).toBeInTheDocument();
  });

  it("does not render tags section when tags array is empty", () => {
    renderCard({ tags: [] });
    // No tag elements should be rendered
    expect(screen.queryByText("AI")).not.toBeInTheDocument();
  });

  it("renders 'View Case Study →' link when caseStudyUrl is set", () => {
    renderCard({ caseStudyUrl: "https://example.com/case" });
    const link = screen.getByText("View Case Study →");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/case");
  });

  it("renders '↗ Live Site' link when liveUrl is set", () => {
    renderCard({ liveUrl: "https://example.com/live" });
    const link = screen.getByText("↗ Live Site");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/live");
  });

  it("does not render action links when both URLs are empty", () => {
    renderCard({ caseStudyUrl: "", liveUrl: "" });
    expect(screen.queryByText("View Case Study →")).not.toBeInTheDocument();
    expect(screen.queryByText("↗ Live Site")).not.toBeInTheDocument();
  });

  it("renders featured image placeholder when featured=true and no imageUrl", () => {
    renderCard({ imageUrl: "", category: "Research" }, true);
    const imageBox = screen.getByTestId("featured-image");
    expect(imageBox).toBeInTheDocument();
    // Research emoji placeholder
    expect(imageBox).toHaveTextContent("🔬");
  });

  it("does not render featured image box when featured=false", () => {
    renderCard({}, false);
    expect(screen.queryByTestId("featured-image")).not.toBeInTheDocument();
  });

  it("renders actual image when imageUrl is set and featured", () => {
    renderCard({ imageUrl: "https://example.com/img.png" }, true);
    const img = screen.getByAltText("Test Project");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/img.png");
  });

  it("uses correct category emoji for 0→1 Build", () => {
    renderCard({ category: "0→1 Build", imageUrl: "" }, true);
    expect(screen.getByTestId("featured-image")).toHaveTextContent("🎯");
  });

  it("uses correct category emoji for Growth", () => {
    renderCard({ category: "Growth", imageUrl: "" }, true);
    expect(screen.getByTestId("featured-image")).toHaveTextContent("📈");
  });

  it("uses correct category emoji for Ops", () => {
    renderCard({ category: "Ops", imageUrl: "" }, true);
    expect(screen.getByTestId("featured-image")).toHaveTextContent("⚙");
  });

  it("renders the card as a link when caseStudyUrl exists", () => {
    renderCard({ caseStudyUrl: "https://example.com/case", liveUrl: "" });
    const card = screen.getByTestId("mission-card-test-1");
    expect(card.tagName).toBe("A");
    expect(card).toHaveAttribute("href", "https://example.com/case");
  });

  it("renders the card as a div when no URLs exist", () => {
    renderCard({ caseStudyUrl: "", liveUrl: "" });
    const card = screen.getByTestId("mission-card-test-1");
    expect(card.tagName).toBe("DIV");
  });
});
