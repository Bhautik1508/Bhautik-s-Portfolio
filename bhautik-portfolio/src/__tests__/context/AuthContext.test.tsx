import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("AuthContext", () => {
  it("provides a user value (null when unauthenticated)", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    // Wait for loading to finish
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toBeNull();
  });

  it("provides isAdmin as false when no user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.isAdmin).toBe(false);
  });

  it("provides login function", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(typeof result.current.login).toBe("function");
  });

  it("provides logout function", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(typeof result.current.logout).toBe("function");
  });
});
