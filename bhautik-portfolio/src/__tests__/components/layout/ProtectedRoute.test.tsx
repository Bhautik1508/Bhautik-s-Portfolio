import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const mockUseAuth = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
  });

  it("shows a loading spinner while auth is loading", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
      isAdmin: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("redirects to home when not admin", async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      isAdmin: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
          </Route>
          <Route path="/" element={<div>Public home</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Public home")).toBeInTheDocument();
    });
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("renders nested routes when admin", () => {
    mockUseAuth.mockReturnValue({
      user: { uid: "x" } as never,
      loading: false,
      isAdmin: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
