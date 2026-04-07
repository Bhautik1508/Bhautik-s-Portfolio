import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/__tests__/test-utils";
import AdminLogin from "@/admin/Login";
import { signInWithEmailAndPassword } from "firebase/auth";

const mockSignIn = vi.mocked(signInWithEmailAndPassword);

describe("Admin Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ── Rendering ── */

  it("renders 'Bhautik Patel' branding", () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByText("Bhautik Patel")).toBeInTheDocument();
  });

  it("renders 'Command Centre' label", () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByText("Command Centre")).toBeInTheDocument();
  });

  it("renders email input with correct type and placeholder", () => {
    renderWithProviders(<AdminLogin />);
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "admin@example.com");
  });

  it("renders password input with correct type and placeholder", () => {
    renderWithProviders(<AdminLogin />);
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("placeholder", "••••••••");
  });

  it("renders submit button with 'Sign In →' text", () => {
    renderWithProviders(<AdminLogin />);
    const button = screen.getByRole("button", { name: "Sign In →" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("email and password inputs are required", () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Password")).toBeRequired();
  });

  it("submit button is not disabled initially", () => {
    renderWithProviders(<AdminLogin />);
    expect(
      screen.getByRole("button", { name: "Sign In →" })
    ).not.toBeDisabled();
  });

  it("renders 'Back to portfolio' link", () => {
    renderWithProviders(<AdminLogin />);
    const link = screen.getByTestId("back-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("← Back to portfolio");
  });

  /* ── Error handling ── */

  it("does not show error message initially", () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.queryByTestId("login-error")).not.toBeInTheDocument();
  });

  it("shows error message on failed login", async () => {
    mockSignIn.mockRejectedValue(new Error("auth/wrong-password"));

    renderWithProviders(<AdminLogin />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Email"), "bad@example.com");
    await user.type(screen.getByLabelText("Password"), "wrongpass");
    await user.click(screen.getByRole("button", { name: "Sign In →" }));

    await waitFor(() => {
      expect(screen.getByTestId("login-error")).toBeInTheDocument();
    });

    expect(screen.getByTestId("login-error")).toHaveTextContent(
      "Invalid credentials. Please try again."
    );
  });

  it("clears password field on failed login", async () => {
    mockSignIn.mockRejectedValue(new Error("auth/wrong-password"));

    renderWithProviders(<AdminLogin />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Email"), "bad@example.com");
    await user.type(screen.getByLabelText("Password"), "wrongpass");
    await user.click(screen.getByRole("button", { name: "Sign In →" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toHaveValue("");
    });
  });

  /* ── Loading state ── */

  it("shows 'Signing in...' and disables button during submission", async () => {
    // Make signIn hang (never resolve)
    mockSignIn.mockImplementation(
      () => new Promise(() => {}) // never resolves
    );

    renderWithProviders(<AdminLogin />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign In →" }));

    await waitFor(() => {
      expect(screen.getByText("Signing in...")).toBeInTheDocument();
    });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
