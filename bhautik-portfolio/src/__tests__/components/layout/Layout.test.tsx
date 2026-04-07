import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Layout from "@/components/layout/Layout";

describe("Layout", () => {
  it("renders header nav, outlet content, and footer", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<div data-testid="page-slot">Page body</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const banner = screen.getByRole("banner");
    expect(within(banner).getByText("About")).toBeInTheDocument();
    expect(screen.getByTestId("page-slot")).toHaveTextContent("Page body");
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
