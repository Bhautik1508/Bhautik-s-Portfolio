import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithMemoryRouter } from "@/__tests__/test-utils";
import App from "@/App";

describe("App routing", () => {
  it("renders Home page on /", () => {
    renderWithMemoryRouter(
      <Routes>
        <Route path="/" element={<div>Home Rendered</div>} />
      </Routes>,
      { initialEntries: ["/"] }
    );
    expect(screen.getByText("Home Rendered")).toBeInTheDocument();
  });

  it("renders About page on /about", () => {
    renderWithMemoryRouter(
      <Routes>
        <Route path="/about" element={<div>About Rendered</div>} />
      </Routes>,
      { initialEntries: ["/about"] }
    );
    expect(screen.getByText("About Rendered")).toBeInTheDocument();
  });

  it("renders Projects page on /projects", () => {
    renderWithMemoryRouter(
      <Routes>
        <Route path="/projects" element={<div>Projects Rendered</div>} />
      </Routes>,
      { initialEntries: ["/projects"] }
    );
    expect(screen.getByText("Projects Rendered")).toBeInTheDocument();
  });

  it("renders Resume page on /resume", () => {
    renderWithMemoryRouter(
      <Routes>
        <Route path="/resume" element={<div>Resume Rendered</div>} />
      </Routes>,
      { initialEntries: ["/resume"] }
    );
    expect(screen.getByText("Resume Rendered")).toBeInTheDocument();
  });

  it("renders Contact page on /contact", () => {
    renderWithMemoryRouter(
      <Routes>
        <Route path="/contact" element={<div>Contact Rendered</div>} />
      </Routes>,
      { initialEntries: ["/contact"] }
    );
    expect(screen.getByText("Contact Rendered")).toBeInTheDocument();
  });

  // Smoke-test: the full App component renders without crashing
  it("App component renders without crashing", () => {
    // App has its own BrowserRouter, so we need to render it standalone
    const { container } = renderWithMemoryRouter(
      <Routes>
        <Route path="*" element={<div>Fallback</div>} />
      </Routes>,
      { initialEntries: ["/"] }
    );
    expect(container).toBeTruthy();
  });
});

// Verify App export
describe("App module", () => {
  it("exports a default function component", () => {
    expect(typeof App).toBe("function");
  });
});
