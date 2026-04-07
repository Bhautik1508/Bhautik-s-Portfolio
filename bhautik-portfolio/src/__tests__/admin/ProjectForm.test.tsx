import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, renderWithMemoryRouter } from "@/__tests__/test-utils";
import { Route, Routes } from "react-router-dom";
import ProjectForm from "@/admin/ProjectForm";
import { getDoc, addDoc, updateDoc } from "firebase/firestore";

const mockGetDoc = vi.mocked(getDoc);
const mockAddDoc = vi.mocked(addDoc);
const mockUpdateDoc = vi.mocked(updateDoc);

/* ── Helpers ── */

function renderNew() {
  return renderWithProviders(<ProjectForm />);
}

function renderEdit(id = "abc123") {
  return renderWithMemoryRouter(
    <Routes>
      <Route path="/admin/projects/:id" element={<ProjectForm />} />
    </Routes>,
    { initialEntries: [`/admin/projects/${id}`] }
  );
}

function fakeProjectData() {
  return {
    title: "GiftSense",
    tagline: "AI Gifting Engine",
    description: "Full description",
    category: "0→1 Build",
    tags: ["AI", "Fintech"],
    metrics: [{ label: "Users", value: "1000" }],
    status: "Live",
    caseStudyUrl: "https://case.study",
    liveUrl: "https://live.site",
    imageUrl: "https://img.com/pic.jpg",
    featured: true,
    order: 1,
  };
}

/* ── Tests ── */

describe("ProjectForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ═══════ Rendering — New Mode ═══════ */

  describe("New mode", () => {
    it("renders 'Add New Project' heading", () => {
      renderNew();
      expect(screen.getByText("Add New Project")).toBeInTheDocument();
    });

    it("renders 'Command Centre' in top bar", () => {
      renderNew();
      expect(screen.getByText("Command Centre")).toBeInTheDocument();
    });

    it("renders '← Back to Dashboard' link", () => {
      renderNew();
      expect(screen.getByTestId("back-link")).toHaveTextContent(
        "← Back to Dashboard"
      );
    });

    it("renders Title input with correct placeholder", () => {
      renderNew();
      const input = screen.getByLabelText("Title *");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute(
        "placeholder",
        "e.g. GiftSense — AI Gifting Engine"
      );
    });

    it("renders Tagline input", () => {
      renderNew();
      expect(screen.getByLabelText("Tagline *")).toBeInTheDocument();
    });

    it("renders Description textarea", () => {
      renderNew();
      expect(screen.getByLabelText("Description")).toBeInTheDocument();
    });

    it("renders Category select with default '0→1 Build'", () => {
      renderNew();
      const select = screen.getByLabelText("Category *") as HTMLSelectElement;
      expect(select.value).toBe("0→1 Build");
    });

    it("renders all 4 category options", () => {
      renderNew();
      const select = screen.getByLabelText("Category *");
      const options = select.querySelectorAll("option");
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveTextContent("0→1 Build");
      expect(options[1]).toHaveTextContent("Growth");
      expect(options[2]).toHaveTextContent("Ops");
      expect(options[3]).toHaveTextContent("Research");
    });

    it("renders 3 status radio buttons", () => {
      renderNew();
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("has 'In Progress' status selected by default", () => {
      renderNew();
      const radio = screen.getByLabelText("In Progress");
      expect(radio).toBeChecked();
    });

    it("renders Tags input with placeholder", () => {
      renderNew();
      const input = screen.getByLabelText("Tags");
      expect(input).toHaveAttribute(
        "placeholder",
        "AI, Fintech, India (comma separated)"
      );
    });

    it("renders Image URL input", () => {
      renderNew();
      expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    });

    it("renders Case Study URL input", () => {
      renderNew();
      expect(screen.getByLabelText("Case Study URL")).toBeInTheDocument();
    });

    it("renders Live Site URL input", () => {
      renderNew();
      expect(screen.getByLabelText("Live Site URL")).toBeInTheDocument();
    });

    it("renders Featured toggle", () => {
      renderNew();
      expect(screen.getByTestId("featured-toggle")).toBeInTheDocument();
    });

    it("Featured toggle is off by default", () => {
      renderNew();
      expect(screen.getByTestId("featured-toggle")).toHaveAttribute(
        "aria-checked",
        "false"
      );
    });

    it("renders 'Save Project →' button", () => {
      renderNew();
      expect(screen.getByTestId("save-btn")).toHaveTextContent(
        "Save Project →"
      );
    });

    it("renders Cancel button", () => {
      renderNew();
      expect(screen.getByTestId("cancel-btn")).toHaveTextContent("Cancel");
    });

    it("renders + Add Metric button", () => {
      renderNew();
      expect(screen.getByTestId("add-metric-btn")).toHaveTextContent(
        "+ Add Metric"
      );
    });

    it("does not show draft indicator initially", () => {
      renderNew();
      expect(screen.queryByTestId("draft-dot")).not.toBeInTheDocument();
    });
  });

  /* ═══════ Rendering — Edit Mode ═══════ */

  describe("Edit mode", () => {
    it("shows loading spinner while fetching", () => {
      // getDoc never resolves
      mockGetDoc.mockReturnValue(new Promise(() => {}) as never);
      renderEdit();
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("renders 'Edit Project' heading after fetch", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByText("Edit Project")).toBeInTheDocument();
      });
    });

    it("pre-fills title from Firestore", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByLabelText("Title *")).toHaveValue("GiftSense");
      });
    });

    it("pre-fills tagline from Firestore", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByLabelText("Tagline *")).toHaveValue(
          "AI Gifting Engine"
        );
      });
    });

    it("pre-fills tags as chips", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByTestId("tag-chips")).toBeInTheDocument();
        expect(screen.getByText("AI")).toBeInTheDocument();
        expect(screen.getByText("Fintech")).toBeInTheDocument();
      });
    });

    it("pre-fills metrics", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByTestId("metric-row-0")).toBeInTheDocument();
      });
    });

    it("selects correct status radio", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByLabelText("Live")).toBeChecked();
      });
    });

    it("sets featured toggle to on when featured=true", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      renderEdit();

      await waitFor(() => {
        expect(screen.getByTestId("featured-toggle")).toHaveAttribute(
          "aria-checked",
          "true"
        );
      });
    });
  });

  /* ═══════ Interactions ═══════ */

  describe("Interactions", () => {
    it("allows typing in title field", async () => {
      const user = userEvent.setup();
      renderNew();
      await user.type(screen.getByLabelText("Title *"), "My Project");
      expect(screen.getByLabelText("Title *")).toHaveValue("My Project");
    });

    it("allows typing in tagline field", async () => {
      const user = userEvent.setup();
      renderNew();
      await user.type(screen.getByLabelText("Tagline *"), "Quick summary");
      expect(screen.getByLabelText("Tagline *")).toHaveValue("Quick summary");
    });

    it("allows typing in description field", async () => {
      const user = userEvent.setup();
      renderNew();
      await user.type(screen.getByLabelText("Description"), "Long desc");
      expect(screen.getByLabelText("Description")).toHaveValue("Long desc");
    });

    it("allows changing category", async () => {
      const user = userEvent.setup();
      renderNew();
      await user.selectOptions(screen.getByLabelText("Category *"), "Growth");
      expect(screen.getByLabelText("Category *")).toHaveValue("Growth");
    });

    it("allows changing status via radio", async () => {
      const user = userEvent.setup();
      renderNew();
      await user.click(screen.getByLabelText("Live"));
      expect(screen.getByLabelText("Live")).toBeChecked();
    });

    it("toggles featured on/off", async () => {
      const user = userEvent.setup();
      renderNew();
      const toggle = screen.getByTestId("featured-toggle");
      expect(toggle).toHaveAttribute("aria-checked", "false");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-checked", "true");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-checked", "false");
    });

    it("shows draft indicator after editing a field", async () => {
      const user = userEvent.setup();
      renderNew();
      expect(screen.queryByTestId("draft-dot")).not.toBeInTheDocument();

      await user.type(screen.getByLabelText("Title *"), "X");
      expect(screen.getByTestId("draft-dot")).toBeInTheDocument();
      expect(screen.getByText("Draft saved")).toBeInTheDocument();
    });
  });

  /* ═══════ Tags ═══════ */

  describe("Tags", () => {
    it("parses comma-separated tags on blur", async () => {
      const user = userEvent.setup();
      renderNew();

      const input = screen.getByLabelText("Tags");
      await user.type(input, "AI, Fintech");
      await user.tab(); // blur

      expect(screen.getByTestId("tag-chips")).toBeInTheDocument();
      expect(screen.getByText("AI")).toBeInTheDocument();
      expect(screen.getByText("Fintech")).toBeInTheDocument();
      expect(input).toHaveValue(""); // cleared
    });

    it("parses tags on Enter key", async () => {
      const user = userEvent.setup();
      renderNew();

      const input = screen.getByLabelText("Tags");
      await user.type(input, "React{Enter}");

      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("removes a tag when × is clicked", async () => {
      const user = userEvent.setup();
      renderNew();

      // Add tags first
      const input = screen.getByLabelText("Tags");
      await user.type(input, "AI, Fintech");
      await user.tab();

      expect(screen.getByText("AI")).toBeInTheDocument();

      await user.click(screen.getByTestId("remove-tag-AI"));
      expect(screen.queryByText("AI")).not.toBeInTheDocument();
      expect(screen.getByText("Fintech")).toBeInTheDocument();
    });

    it("does not add duplicate tags", async () => {
      const user = userEvent.setup();
      renderNew();

      const input = screen.getByLabelText("Tags");
      await user.type(input, "AI");
      await user.tab();
      await user.type(input, "AI");
      await user.tab();

      const chips = screen.getAllByText("AI");
      expect(chips).toHaveLength(1);
    });

    it("trims whitespace from tags", async () => {
      const user = userEvent.setup();
      renderNew();

      const input = screen.getByLabelText("Tags");
      await user.type(input, "  React  ,  Vue  ");
      await user.tab();

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Vue")).toBeInTheDocument();
    });
  });

  /* ═══════ Metrics ═══════ */

  describe("Metrics", () => {
    it("adds a metric row when '+ Add Metric' is clicked", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.click(screen.getByTestId("add-metric-btn"));
      expect(screen.getByTestId("metric-row-0")).toBeInTheDocument();
    });

    it("allows editing metric label and value", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.click(screen.getByTestId("add-metric-btn"));
      const labelInput = screen.getByLabelText("Metric 1 label");
      const valueInput = screen.getByLabelText("Metric 1 value");

      await user.type(labelInput, "Users");
      await user.type(valueInput, "1000");

      expect(labelInput).toHaveValue("Users");
      expect(valueInput).toHaveValue("1000");
    });

    it("removes a metric row when × is clicked", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.click(screen.getByTestId("add-metric-btn"));
      expect(screen.getByTestId("metric-row-0")).toBeInTheDocument();

      await user.click(screen.getByTestId("remove-metric-0"));
      expect(screen.queryByTestId("metric-row-0")).not.toBeInTheDocument();
    });

    it("hides '+ Add Metric' button when 4 metrics added", async () => {
      const user = userEvent.setup();
      renderNew();

      for (let i = 0; i < 4; i++) {
        await user.click(screen.getByTestId("add-metric-btn"));
      }

      expect(screen.queryByTestId("add-metric-btn")).not.toBeInTheDocument();
      expect(screen.getByTestId("metric-row-0")).toBeInTheDocument();
      expect(screen.getByTestId("metric-row-1")).toBeInTheDocument();
      expect(screen.getByTestId("metric-row-2")).toBeInTheDocument();
      expect(screen.getByTestId("metric-row-3")).toBeInTheDocument();
    });

    it("shows '+ Add Metric' again after removing a metric from 4", async () => {
      const user = userEvent.setup();
      renderNew();

      for (let i = 0; i < 4; i++) {
        await user.click(screen.getByTestId("add-metric-btn"));
      }
      expect(screen.queryByTestId("add-metric-btn")).not.toBeInTheDocument();

      await user.click(screen.getByTestId("remove-metric-0"));
      expect(screen.getByTestId("add-metric-btn")).toBeInTheDocument();
    });
  });

  /* ═══════ Image Preview ═══════ */

  describe("Image preview", () => {
    it("does not show image preview when URL is empty", () => {
      renderNew();
      expect(screen.queryByTestId("image-preview")).not.toBeInTheDocument();
    });

    it("shows image preview when URL is filled", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.type(
        screen.getByLabelText("Image URL"),
        "https://example.com/pic.jpg"
      );

      expect(screen.getByTestId("image-preview")).toBeInTheDocument();
      expect(screen.getByTestId("image-preview")).toHaveAttribute(
        "src",
        "https://example.com/pic.jpg"
      );
    });
  });

  /* ═══════ Validation ═══════ */

  describe("Validation", () => {
    it("shows error when title is empty on submit", async () => {
      const user = userEvent.setup();
      renderNew();

      // Fill tagline but leave title empty
      await user.type(screen.getByLabelText("Tagline *"), "Some tagline");
      await user.click(screen.getByTestId("save-btn"));

      await waitFor(() => {
        expect(screen.getByTestId("error-title")).toBeInTheDocument();
      });
    });

    it("shows error when title is less than 3 chars", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.type(screen.getByLabelText("Title *"), "AB");
      await user.type(screen.getByLabelText("Tagline *"), "Some tagline");
      await user.click(screen.getByTestId("save-btn"));

      await waitFor(() => {
        expect(screen.getByTestId("error-title")).toHaveTextContent(
          "Title is required (min 3 characters)"
        );
      });
    });

    it("shows error when tagline is empty", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.type(screen.getByLabelText("Title *"), "Valid Title");
      await user.click(screen.getByTestId("save-btn"));

      await waitFor(() => {
        expect(screen.getByTestId("error-tagline")).toBeInTheDocument();
      });
    });

    it("does not submit when validation fails", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.click(screen.getByTestId("save-btn"));

      expect(mockAddDoc).not.toHaveBeenCalled();
    });
  });

  /* ═══════ Submit — New Mode ═══════ */

  describe("Submit (new)", () => {
    it("calls addProject and shows success toast on valid submit", async () => {
      const user = userEvent.setup();
      renderNew();

      await user.type(
        screen.getByLabelText("Title *"),
        "GiftSense — AI Gifting Engine"
      );
      await user.type(screen.getByLabelText("Tagline *"), "AI gifting engine");
      await user.click(screen.getByTestId("save-btn"));

      await waitFor(() => {
        // addDoc should be called (addProject wraps addDoc)
        expect(mockAddDoc).toHaveBeenCalled();
      });
    });

    it("shows 'Saving...' and disables button during submission", async () => {
      // Make addDoc hang
      mockAddDoc.mockImplementation(() => new Promise(() => {}) as never);

      const user = userEvent.setup();
      renderNew();

      await user.type(screen.getByLabelText("Title *"), "Valid Title");
      await user.type(screen.getByLabelText("Tagline *"), "Valid tagline");
      await user.click(screen.getByTestId("save-btn"));

      await waitFor(() => {
        expect(screen.getByText("Saving...")).toBeInTheDocument();
      });

      const btn = screen.getByTestId("save-btn");
      expect(btn).toBeDisabled();
    });
  });

  /* ═══════ Submit — Edit Mode ═══════ */

  describe("Submit (edit)", () => {
    it("calls updateProject on valid edit submit", async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => fakeProjectData(),
      } as never);

      const user = userEvent.setup();
      renderEdit();

      // Wait for form to load
      await waitFor(() => {
        expect(screen.getByLabelText("Title *")).toHaveValue("GiftSense");
      });

      await user.click(screen.getByTestId("save-btn"));

      await waitFor(() => {
        expect(mockUpdateDoc).toHaveBeenCalled();
      });
    });
  });

  /* ═══════ Footer ═══════ */

  describe("Footer", () => {
    it("renders sticky footer", () => {
      renderNew();
      expect(screen.getByTestId("form-footer")).toBeInTheDocument();
    });

    it("Cancel button is present", () => {
      renderNew();
      expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
    });

    it("Save button is present and not disabled", () => {
      renderNew();
      const btn = screen.getByTestId("save-btn");
      expect(btn).toBeInTheDocument();
      expect(btn).not.toBeDisabled();
    });
  });
});
