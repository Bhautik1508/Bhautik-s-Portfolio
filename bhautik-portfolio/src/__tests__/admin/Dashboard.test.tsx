import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { onSnapshot } from "firebase/firestore";
import { renderWithProviders } from "@/__tests__/test-utils";
import AdminDashboard from "@/admin/Dashboard";
import type { Timestamp } from "firebase/firestore";

const mockOnSnapshot = vi.mocked(onSnapshot);

/* ── Helpers ── */

function fakeProject(overrides: Record<string, unknown> = {}) {
  return {
    id: "p1",
    title: "Test Project",
    tagline: "A tagline",
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

describe("Admin Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ── Top bar ── */

  it("renders 'Command Centre' in the top bar", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);
    expect(screen.getByText("Command Centre")).toBeInTheDocument();
  });

  it("renders logout button", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);
    expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
    expect(screen.getByTestId("logout-btn")).toHaveTextContent("Logout");
  });

  /* ── Page header ── */

  it("renders 'Projects' heading", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders subtitle text", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);
    expect(
      screen.getByText(
        "Manage what recruiters and visitors see on your portfolio."
      )
    ).toBeInTheDocument();
  });

  /* ── Stats row ── */

  it("renders 4 stat cards", () => {
    setupSnapshot([
      fakeProject({ id: "p1", featured: true, status: "Live" }),
      fakeProject({ id: "p2", featured: false, status: "In Progress" }),
      fakeProject({ id: "p3", featured: false, status: "Live" }),
    ]);

    renderWithProviders(<AdminDashboard />);

    expect(screen.getByTestId("stat-Total")).toHaveTextContent("3");
    expect(screen.getByTestId("stat-Featured")).toHaveTextContent("1");
    expect(screen.getByTestId("stat-Live")).toHaveTextContent("2");
    expect(screen.getByTestId("stat-In Progress")).toHaveTextContent("1");
  });

  it("shows all zeros when no projects", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByTestId("stat-Total")).toHaveTextContent("0");
    expect(screen.getByTestId("stat-Featured")).toHaveTextContent("0");
    expect(screen.getByTestId("stat-Live")).toHaveTextContent("0");
    expect(screen.getByTestId("stat-In Progress")).toHaveTextContent("0");
  });

  /* ── Table header ── */

  it("renders 'All Projects' label and '+ Add Project' button", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText("All Projects")).toBeInTheDocument();
    expect(screen.getByTestId("add-project-btn")).toHaveTextContent(
      "+ Add Project"
    );
  });

  it("renders table column headers", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    // "Category", "Status" appear only in the table header when empty
    expect(screen.getByText("Actions")).toBeInTheDocument();
    // "Featured" appears in both stats row and table header
    expect(screen.getAllByText("Featured").length).toBeGreaterThanOrEqual(2);
  });

  /* ── Loading state ── */

  it("shows skeleton rows when loading", () => {
    mockOnSnapshot.mockImplementation(() => vi.fn());
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByTestId("table-loading")).toBeInTheDocument();
  });

  /* ── Empty state ── */

  it("shows empty state when no projects", () => {
    setupSnapshot([]);
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(
      screen.getByText("No projects yet. Add your first one.")
    ).toBeInTheDocument();
  });

  /* ── Data rows ── */

  it("renders project rows with title and category", () => {
    setupSnapshot([
      fakeProject({ id: "p1", title: "GiftSense", category: "0→1 Build" }),
    ]);

    renderWithProviders(<AdminDashboard />);

    expect(screen.getByTestId("project-row-p1")).toBeInTheDocument();
    expect(screen.getByText("GiftSense")).toBeInTheDocument();
  });

  it("renders status badge in project row", () => {
    setupSnapshot([
      fakeProject({ id: "p1", status: "Live" }),
    ]);

    renderWithProviders(<AdminDashboard />);

    // The status text should appear inside the row
    const row = screen.getByTestId("project-row-p1");
    expect(row).toHaveTextContent("Live");
  });

  it("renders featured toggle as checked when featured=true", () => {
    setupSnapshot([
      fakeProject({ id: "p1", featured: true }),
    ]);

    renderWithProviders(<AdminDashboard />);

    const toggle = screen.getByTestId("toggle-featured-p1");
    expect(toggle).toHaveTextContent("✓");
    expect(toggle).toHaveAttribute("aria-label", "Remove from featured");
  });

  it("renders featured toggle as empty when featured=false", () => {
    setupSnapshot([
      fakeProject({ id: "p1", featured: false }),
    ]);

    renderWithProviders(<AdminDashboard />);

    const toggle = screen.getByTestId("toggle-featured-p1");
    expect(toggle).toHaveTextContent("");
    expect(toggle).toHaveAttribute("aria-label", "Mark as featured");
  });

  it("renders edit and delete buttons for each project", () => {
    setupSnapshot([
      fakeProject({ id: "p1", title: "Test" }),
    ]);

    renderWithProviders(<AdminDashboard />);

    expect(screen.getByTestId("edit-p1")).toBeInTheDocument();
    expect(screen.getByTestId("delete-p1")).toBeInTheDocument();
  });

  /* ── Delete confirmation ── */

  it("calls window.confirm before deleting", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

    setupSnapshot([
      fakeProject({ id: "p1", title: "My Project" }),
    ]);

    renderWithProviders(<AdminDashboard />);

    fireEvent.click(screen.getByTestId("delete-p1"));

    expect(confirmSpy).toHaveBeenCalledWith(
      'Delete "My Project"? This action cannot be undone.'
    );

    confirmSpy.mockRestore();
  });

  it("does not delete when confirm is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);

    setupSnapshot([
      fakeProject({ id: "p1", title: "My Project" }),
    ]);

    renderWithProviders(<AdminDashboard />);

    fireEvent.click(screen.getByTestId("delete-p1"));

    // The project row should still be present
    expect(screen.getByTestId("project-row-p1")).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  /* ── Multiple projects sorted by order ── */

  it("sorts projects by order field", () => {
    setupSnapshot([
      fakeProject({ id: "p2", title: "Second", order: 2 }),
      fakeProject({ id: "p1", title: "First", order: 1 }),
      fakeProject({ id: "p3", title: "Third", order: 3 }),
    ]);

    renderWithProviders(<AdminDashboard />);

    const rows = screen.getAllByTestId(/^project-row-/);
    expect(rows[0]).toHaveAttribute("data-testid", "project-row-p1");
    expect(rows[1]).toHaveAttribute("data-testid", "project-row-p2");
    expect(rows[2]).toHaveAttribute("data-testid", "project-row-p3");
  });

  /* ── Featured toggle calls toggleFeatured ── */

  it("calls toggleFeatured when featured checkbox is clicked", async () => {
    const { updateDoc } = await import("firebase/firestore");
    const mockUpdateDoc = vi.mocked(updateDoc);
    mockUpdateDoc.mockResolvedValue(undefined);

    setupSnapshot([
      fakeProject({ id: "p1", featured: false }),
    ]);

    renderWithProviders(<AdminDashboard />);

    fireEvent.click(screen.getByTestId("toggle-featured-p1"));

    await waitFor(() => {
      expect(mockUpdateDoc).toHaveBeenCalled();
    });
  });
});
