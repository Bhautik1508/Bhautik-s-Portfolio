import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { onSnapshot } from "firebase/firestore";
import Projects from "@/pages/Projects";
import type { Timestamp } from "firebase/firestore";

const mockOnSnapshot = vi.mocked(onSnapshot);

/* ── Helpers ── */

function fakeProject(overrides: Record<string, unknown> = {}) {
  return {
    id: "p1",
    title: "Test Project",
    tagline: "Short tagline",
    description: "Desc",
    category: "0→1 Build",
    tags: ["AI"],
    metrics: [{ label: "Users", value: "100" }],
    status: "Live",
    caseStudyUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
    order: 1,
    createdAt: { seconds: 0, nanoseconds: 0 } as unknown as Timestamp,
    ...overrides,
  };
}

function fakeDoc(data: ReturnType<typeof fakeProject>) {
  return { id: data.id, data: () => data };
}

function setupSnapshot(projects: ReturnType<typeof fakeProject>[]) {
  mockOnSnapshot.mockImplementation((_q: unknown, onNext: unknown) => {
    (onNext as (snap: { docs: ReturnType<typeof fakeDoc>[] }) => void)({
      docs: projects.map(fakeDoc),
    });
    return vi.fn();
  });
}

/* ── Tests ── */

describe("Projects page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the heading and subtext", () => {
    setupSnapshot([]);
    render(<Projects />);

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A record of products built, problems solved, and bets made."
      )
    ).toBeInTheDocument();
  });

  it("renders the Mission Dossier badge", () => {
    setupSnapshot([]);
    render(<Projects />);

    expect(screen.getByText("Mission Dossier")).toBeInTheDocument();
  });

  it("shows loading skeleton before data arrives", () => {
    // onSnapshot never calls back -> loading stays true
    mockOnSnapshot.mockImplementation(() => vi.fn());
    render(<Projects />);

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("renders project cards once data arrives", () => {
    setupSnapshot([
      fakeProject({ id: "p1", title: "Project Alpha" }),
      fakeProject({ id: "p2", title: "Project Beta" }),
    ]);

    render(<Projects />);

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Project Beta")).toBeInTheDocument();
  });

  it("renders All filter plus dynamic category filters", () => {
    setupSnapshot([
      fakeProject({ id: "p1", category: "0→1 Build" }),
      fakeProject({ id: "p2", category: "Research" }),
    ]);

    render(<Projects />);

    expect(screen.getByTestId("filter-All")).toBeInTheDocument();
    expect(screen.getByTestId("filter-0→1 Build")).toBeInTheDocument();
    expect(screen.getByTestId("filter-Research")).toBeInTheDocument();
  });

  it("filters projects when a category filter is clicked", () => {
    setupSnapshot([
      fakeProject({ id: "p1", title: "Build Proj", category: "0→1 Build" }),
      fakeProject({ id: "p2", title: "Research Proj", category: "Research" }),
    ]);

    render(<Projects />);

    // Both visible initially
    expect(screen.getByText("Build Proj")).toBeInTheDocument();
    expect(screen.getByText("Research Proj")).toBeInTheDocument();

    // Click Research filter
    fireEvent.click(screen.getByTestId("filter-Research"));

    expect(screen.queryByText("Build Proj")).not.toBeInTheDocument();
    expect(screen.getByText("Research Proj")).toBeInTheDocument();
  });

  it("shows All filter returns all projects after filtering", () => {
    setupSnapshot([
      fakeProject({ id: "p1", title: "Build Proj", category: "0→1 Build" }),
      fakeProject({ id: "p2", title: "Research Proj", category: "Research" }),
    ]);

    render(<Projects />);

    // Filter to Research
    fireEvent.click(screen.getByTestId("filter-Research"));
    expect(screen.queryByText("Build Proj")).not.toBeInTheDocument();

    // Back to All
    fireEvent.click(screen.getByTestId("filter-All"));
    expect(screen.getByText("Build Proj")).toBeInTheDocument();
    expect(screen.getByText("Research Proj")).toBeInTheDocument();
  });

  it("shows empty state with no projects", () => {
    setupSnapshot([]);
    render(<Projects />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(
      screen.getByText("No projects in this category yet.")
    ).toBeInTheDocument();
  });

  it("shows error state on snapshot failure", () => {
    mockOnSnapshot.mockImplementation(
      (_q: unknown, _onNext: unknown, onError: unknown) => {
        (onError as (err: Error) => void)(new Error("permission-denied"));
        return vi.fn();
      }
    );

    render(<Projects />);

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to load projects. Please try again later.")
    ).toBeInTheDocument();
  });

  it("sorts featured projects first", () => {
    setupSnapshot([
      fakeProject({
        id: "p1",
        title: "Regular Proj",
        featured: false,
        order: 1,
      }),
      fakeProject({
        id: "p2",
        title: "Featured Proj",
        featured: true,
        order: 2,
      }),
    ]);

    render(<Projects />);

    const cards = screen.getAllByText(/Proj$/);
    expect(cards[0]).toHaveTextContent("Featured Proj");
    expect(cards[1]).toHaveTextContent("Regular Proj");
  });

  it("featured card spans full width via grid-column style", () => {
    setupSnapshot([
      fakeProject({
        id: "p1",
        title: "Featured One",
        featured: true,
        order: 1,
      }),
    ]);

    render(<Projects />);

    const card = screen.getByTestId("mission-card-p1");
    const wrapper = card.parentElement;
    expect(wrapper?.style.gridColumn).toBe("1 / -1");
  });
});
