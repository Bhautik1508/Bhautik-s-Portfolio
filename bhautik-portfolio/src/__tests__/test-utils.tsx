import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import type { ReactElement, ReactNode } from "react";

/* ---------- Providers wrapper ---------- */

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthProvider>
  );
}

/**
 * Custom render that wraps component in AuthProvider + BrowserRouter.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

/**
 * Render with MemoryRouter — useful for testing specific routes.
 */
export function renderWithMemoryRouter(
  ui: ReactElement,
  routerProps?: MemoryRouterProps,
  options?: Omit<RenderOptions, "wrapper">
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AuthProvider>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </AuthProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
