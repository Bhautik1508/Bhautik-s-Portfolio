import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, act } from "@testing-library/react";
import { renderWithProviders } from "@/__tests__/test-utils";
import Contact from "@/pages/Contact";
import { addDoc } from "firebase/firestore";

const mockAddDoc = vi.mocked(addDoc);

/* ── Helper to fill a required field quickly via fireEvent ── */

function fillField(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillForm() {
  fillField("Your Name *", "Priya");
  fillField("Email *", "priya@example.com");
  fillField("Message *", "Hello!");
}

describe("Contact page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ═══════ Header ═══════ */

  describe("Header", () => {
    it("renders 'Send a Dispatch' badge", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByText("Send a Dispatch")).toBeInTheDocument();
    });

    it("renders 'Get in Touch' heading", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    });

    it("renders subtext about PM roles", () => {
      renderWithProviders(<Contact />);
      expect(
        screen.getByText(
          "Open to PM roles, consulting, and strategic conversations."
        )
      ).toBeInTheDocument();
    });
  });

  /* ═══════ Form Fields ═══════ */

  describe("Form fields", () => {
    it("renders Name input with label and placeholder", () => {
      renderWithProviders(<Contact />);
      const input = screen.getByLabelText("Your Name *");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Priya Mehta");
    });

    it("renders Email input with label and placeholder", () => {
      renderWithProviders(<Contact />);
      const input = screen.getByLabelText("Email *");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "priya@company.com");
    });

    it("renders Subject select with default 'Job Opportunity'", () => {
      renderWithProviders(<Contact />);
      const select = screen.getByLabelText("Subject") as HTMLSelectElement;
      expect(select.value).toBe("Job Opportunity");
    });

    it("renders all 4 subject options", () => {
      renderWithProviders(<Contact />);
      const select = screen.getByLabelText("Subject");
      const options = select.querySelectorAll("option");
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveTextContent("Job Opportunity");
      expect(options[1]).toHaveTextContent("Collaboration");
      expect(options[2]).toHaveTextContent("Feedback on a Project");
      expect(options[3]).toHaveTextContent("Just Saying Hi");
    });

    it("renders Message textarea with placeholder", () => {
      renderWithProviders(<Contact />);
      const textarea = screen.getByLabelText("Message *");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute(
        "placeholder",
        "Tell me what's on your mind..."
      );
    });

    it("renders character counter at 0 / 500", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByTestId("char-counter")).toHaveTextContent("0 / 500");
    });

    it("renders 'Send Dispatch →' submit button", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByTestId("submit-btn")).toHaveTextContent(
        "Send Dispatch →"
      );
    });

    it("renders response time note", () => {
      renderWithProviders(<Contact />);
      expect(
        screen.getByText("Usually responds within 24 hours.")
      ).toBeInTheDocument();
    });
  });

  /* ═══════ Interactions ═══════ */

  describe("Interactions", () => {
    it("allows typing in name field", () => {
      renderWithProviders(<Contact />);
      fillField("Your Name *", "Priya Mehta");
      expect(screen.getByLabelText("Your Name *")).toHaveValue("Priya Mehta");
    });

    it("allows typing in email field", () => {
      renderWithProviders(<Contact />);
      fillField("Email *", "priya@example.com");
      expect(screen.getByLabelText("Email *")).toHaveValue(
        "priya@example.com"
      );
    });

    it("allows changing subject", () => {
      renderWithProviders(<Contact />);
      fireEvent.change(screen.getByLabelText("Subject"), {
        target: { value: "Collaboration" },
      });
      expect(screen.getByLabelText("Subject")).toHaveValue("Collaboration");
    });

    it("allows typing in message field", () => {
      renderWithProviders(<Contact />);
      fillField("Message *", "Hello there!");
      expect(screen.getByLabelText("Message *")).toHaveValue("Hello there!");
    });

    it("updates character counter as user types", () => {
      renderWithProviders(<Contact />);
      fillField("Message *", "Hello");
      expect(screen.getByTestId("char-counter")).toHaveTextContent("5 / 500");
    });

    it("toggles subject to all available values", () => {
      renderWithProviders(<Contact />);
      const subjects = [
        "Collaboration",
        "Feedback on a Project",
        "Just Saying Hi",
        "Job Opportunity",
      ];
      for (const s of subjects) {
        fireEvent.change(screen.getByLabelText("Subject"), {
          target: { value: s },
        });
        expect(screen.getByLabelText("Subject")).toHaveValue(s);
      }
    });
  });

  /* ═══════ Validation ═══════ */

  describe("Validation", () => {
    it("shows error when name is empty on submit", () => {
      renderWithProviders(<Contact />);
      fillField("Email *", "a@b.com");
      fillField("Message *", "Hi");
      fireEvent.click(screen.getByTestId("submit-btn"));

      expect(screen.getByTestId("error-name")).toBeInTheDocument();
      expect(screen.getByTestId("error-name")).toHaveTextContent(
        "Name is required"
      );
    });

    it("shows error when email is empty on submit", () => {
      renderWithProviders(<Contact />);
      fillField("Your Name *", "John");
      fillField("Message *", "Hi");
      fireEvent.click(screen.getByTestId("submit-btn"));

      expect(screen.getByTestId("error-email")).toBeInTheDocument();
      expect(screen.getByTestId("error-email")).toHaveTextContent(
        "Email is required"
      );
    });

    it("shows error when email is invalid", () => {
      renderWithProviders(<Contact />);
      fillField("Your Name *", "John");
      fillField("Email *", "bad-email");
      fillField("Message *", "Hi");
      fireEvent.submit(screen.getByTestId("contact-form"));

      expect(screen.getByTestId("error-email")).toHaveTextContent(
        "Please enter a valid email"
      );
    });

    it("shows error when message is empty on submit", () => {
      renderWithProviders(<Contact />);
      fillField("Your Name *", "John");
      fillField("Email *", "a@b.com");
      fireEvent.click(screen.getByTestId("submit-btn"));

      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Message is required"
      );
    });

    it("does not call addDoc when validation fails", () => {
      renderWithProviders(<Contact />);
      fireEvent.click(screen.getByTestId("submit-btn"));
      expect(mockAddDoc).not.toHaveBeenCalled();
    });

    it("shows multiple errors at once", () => {
      renderWithProviders(<Contact />);
      fireEvent.click(screen.getByTestId("submit-btn"));

      expect(screen.getByTestId("error-name")).toBeInTheDocument();
      expect(screen.getByTestId("error-email")).toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });

    it("does not show errors before submission", () => {
      renderWithProviders(<Contact />);
      expect(screen.queryByTestId("error-name")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-email")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    });
  });

  /* ═══════ Submission ═══════ */

  describe("Submission", () => {
    it("calls addDoc on valid submit", async () => {
      renderWithProviders(<Contact />);
      fillForm();

      await act(async () => {
        fireEvent.submit(screen.getByTestId("contact-form"));
      });

      expect(mockAddDoc).toHaveBeenCalledTimes(1);
    });

    it("shows '✓ Sent!' after successful submission", async () => {
      renderWithProviders(<Contact />);
      fillForm();

      await act(async () => {
        fireEvent.submit(screen.getByTestId("contact-form"));
      });

      expect(screen.getByTestId("submit-btn")).toHaveTextContent(
        "✓ Sent!"
      );
    });

    it("shows 'Sending...' and disables button during submission", async () => {
      // Make addDoc hang
      mockAddDoc.mockImplementation(() => new Promise(() => {}) as never);

      renderWithProviders(<Contact />);
      fillForm();

      await act(async () => {
        fireEvent.submit(screen.getByTestId("contact-form"));
      });

      expect(screen.getByText("Sending...")).toBeInTheDocument();
      expect(screen.getByTestId("submit-btn")).toBeDisabled();
    });

    it("resets form after 3 seconds on success", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      // Use a manually-resolved promise so we control timing
      let resolveAddDoc!: (v: unknown) => void;
      mockAddDoc.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveAddDoc = resolve;
          }) as never
      );

      renderWithProviders(<Contact />);
      fillForm();

      // Submit — puts form into "Sending..." state
      await act(async () => {
        fireEvent.submit(screen.getByTestId("contact-form"));
      });

      expect(screen.getByText("Sending...")).toBeInTheDocument();

      // Now resolve the addDoc promise → triggers "✓ Sent!"
      await act(async () => {
        resolveAddDoc({ id: "mock-id" });
      });

      expect(screen.getByTestId("submit-btn")).toHaveTextContent(
        "✓ Sent!"
      );

      // Fast-forward 3 seconds → form resets
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      expect(screen.getByTestId("submit-btn")).toHaveTextContent(
        "Send Dispatch →"
      );
      expect(screen.getByLabelText("Your Name *")).toHaveValue("");
      expect(screen.getByLabelText("Email *")).toHaveValue("");
      expect(screen.getByLabelText("Message *")).toHaveValue("");

      vi.useRealTimers();
    });

    it("button is disabled in sent state", async () => {
      renderWithProviders(<Contact />);
      fillForm();

      await act(async () => {
        fireEvent.submit(screen.getByTestId("contact-form"));
      });

      expect(screen.getByTestId("submit-btn")).toBeDisabled();
    });
  });

  /* ═══════ Info Panel ═══════ */

  describe("Info panel", () => {
    it("renders availability badge with 'Open to Opportunities'", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByTestId("availability-badge")).toBeInTheDocument();
      expect(
        screen.getByText("Open to Opportunities")
      ).toBeInTheDocument();
    });

    it("renders 'Direct Links' heading", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByText("Direct Links")).toBeInTheDocument();
    });

    it("renders LinkedIn link", () => {
      renderWithProviders(<Contact />);
      const link = screen.getByTestId("link-linkedin");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveTextContent("LinkedIn");
    });

    it("renders GitHub link", () => {
      renderWithProviders(<Contact />);
      const link = screen.getByTestId("link-github");
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("GitHub");
    });

    it("renders Email link", () => {
      renderWithProviders(<Contact />);
      const link = screen.getByTestId("link-email");
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("Email");
    });

    it("renders Portfolio link", () => {
      renderWithProviders(<Contact />);
      const link = screen.getByTestId("link-portfolio");
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("Portfolio");
    });

    it("renders 4 link rows in the panel", () => {
      renderWithProviders(<Contact />);
      const panel = screen.getByTestId("direct-links-panel");
      const links = panel.querySelectorAll("a");
      expect(links).toHaveLength(4);
    });

    it("each link has ↗ arrow", () => {
      renderWithProviders(<Contact />);
      const arrows = screen.getAllByText("↗");
      expect(arrows.length).toBe(4);
    });

    it("links have rel=noopener noreferrer", () => {
      renderWithProviders(<Contact />);
      const link = screen.getByTestId("link-linkedin");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  /* ═══════ Accessibility ═══════ */

  describe("Accessibility", () => {
    it("all form inputs have associated labels", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByLabelText("Your Name *")).toBeInTheDocument();
      expect(screen.getByLabelText("Email *")).toBeInTheDocument();
      expect(screen.getByLabelText("Subject")).toBeInTheDocument();
      expect(screen.getByLabelText("Message *")).toBeInTheDocument();
    });

    it("submit button has type submit", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByTestId("submit-btn")).toHaveAttribute(
        "type",
        "submit"
      );
    });

    it("contact form has data-testid", () => {
      renderWithProviders(<Contact />);
      expect(screen.getByTestId("contact-form")).toBeInTheDocument();
    });
  });
});
