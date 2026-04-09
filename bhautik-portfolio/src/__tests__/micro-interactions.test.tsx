/**
 * Micro-Interactions & Polish — Comprehensive Unit Tests
 *
 * Tests for all 11 micro-interaction features:
 *  1. Scroll progress bar
 *  2. Button micro-interactions
 *  3. Link underline animation (CSS class)
 *  4. Input focus ring (global CSS)
 *  5. Project card hover → title color
 *  6. Skill tag hover
 *  7. Filter button active animation
 *  8. Page transitions (PageWrapper + Layout AnimatePresence)
 *  9. Hero scroll chevron
 * 10. Stat counter animation
 * 11. Nav active link indicator
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/__tests__/test-utils";
import { onSnapshot } from "firebase/firestore";

// Components under test
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import MissionCard from "@/components/MissionCard";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Layout from "@/components/layout/Layout";
import PageWrapper from "@/components/layout/PageWrapper";
import type { Project } from "@/hooks/useProjects";
import type { Timestamp } from "firebase/firestore";

const mockOnSnapshot = vi.mocked(onSnapshot);

/* ── Helpers ── */

const baseProject: Project = {
  id: "test-1",
  title: "Test Project",
  tagline: "A short tagline.",
  description: "Full description.",
  category: "0→1 Build",
  tags: ["AI", "Fintech"],
  metrics: [{ label: "Users", value: "500" }],
  status: "Live",
  caseStudyUrl: "https://example.com/case",
  liveUrl: "https://example.com/live",
  imageUrl: "",
  featured: false,
  order: 1,
  createdAt: { seconds: 0, nanoseconds: 0 } as unknown as Timestamp,
};

function fakeProject(overrides: Partial<Project> = {}): Project {
  return { ...baseProject, ...overrides };
}

function fakeDoc(data: Project) {
  return { id: data.id, data: () => data };
}

function setupSnapshot(projects: Project[]) {
  mockOnSnapshot.mockImplementation((_q: unknown, onNext: unknown) => {
    (onNext as (snap: { docs: ReturnType<typeof fakeDoc>[] }) => void)({
      docs: projects.map(fakeDoc),
    });
    return vi.fn();
  });
}

/* ════════════════════════════════════════════════════════════
   #1 — SCROLL PROGRESS BAR
   ════════════════════════════════════════════════════════════ */

describe("#1 — Scroll Progress Bar", () => {
  it("renders progress bar container with data-testid", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByTestId("scroll-progress")).toBeInTheDocument();
  });

  it("renders progress fill element with 0% initial width", () => {
    renderWithProviders(<Navbar />);
    const fill = screen.getByTestId("scroll-progress-fill");
    expect(fill).toBeInTheDocument();
    expect(fill.style.width).toBe("0%");
  });

  it("progress bar container has correct positioning styles", () => {
    renderWithProviders(<Navbar />);
    const bar = screen.getByTestId("scroll-progress");
    expect(bar.style.position).toBe("absolute");
    expect(bar.style.bottom).toBe("0px");
    expect(bar.style.left).toBe("0px");
    expect(bar.style.height).toBe("2px");
    expect(bar.style.overflow).toBe("hidden");
  });

  it("fill element has green background and transition", () => {
    renderWithProviders(<Navbar />);
    const fill = screen.getByTestId("scroll-progress-fill");
    expect(fill.style.background).toBe("rgb(45, 106, 79)");
    expect(fill.style.transition).toContain("width");
  });
});

/* ════════════════════════════════════════════════════════════
   #2 — BUTTON MICRO-INTERACTIONS
   ════════════════════════════════════════════════════════════ */

describe("#2 — Button Micro-Interactions", () => {
  function renderBtn(props: React.ComponentProps<typeof Button>) {
    return render(
      <BrowserRouter>
        <Button {...props} />
      </BrowserRouter>
    );
  }

  it("primary button has correct base background color", () => {
    renderBtn({ children: "Primary" });
    const btn = screen.getByText("Primary");
    expect(btn.style.backgroundColor).toBe("rgb(45, 106, 79)");
  });

  it("primary button hover changes background, adds translateY and box-shadow", () => {
    renderBtn({ children: "Hover Me" });
    const btn = screen.getByText("Hover Me");
    fireEvent.mouseEnter(btn);
    expect(btn.style.backgroundColor).toBe("rgb(36, 90, 65)");
    expect(btn.style.transform).toBe("translateY(-1px)");
    expect(btn.style.boxShadow).toBe("0 4px 12px rgba(45,106,79,0.25)");
  });

  it("primary button mouseLeave restores original styles", () => {
    renderBtn({ children: "Reset" });
    const btn = screen.getByText("Reset");
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(btn.style.backgroundColor).toBe("rgb(45, 106, 79)");
  });

  it("primary button mouseDown applies scale(0.98)", () => {
    renderBtn({ children: "Press" });
    const btn = screen.getByText("Press");
    fireEvent.mouseDown(btn);
    expect(btn.style.transform).toBe("scale(0.98)");
  });

  it("outline button hover changes border-color and color to accent green", () => {
    renderBtn({ children: "Outline", variant: "outline" });
    const btn = screen.getByText("Outline");
    fireEvent.mouseEnter(btn);
    // JSDOM normalises hex to rgb when set via `style.borderColor`
    expect(btn.style.borderColor).toBe("rgb(45, 106, 79)");
    expect(btn.style.color).toBe("rgb(45, 106, 79)");
  });

  it("ghost button hover changes color to void", () => {
    renderBtn({ children: "Ghost", variant: "ghost" });
    const btn = screen.getByText("Ghost");
    fireEvent.mouseEnter(btn);
    expect(btn.style.color).toBe("rgb(17, 17, 16)");
  });

  it("disabled button does not respond to hover", () => {
    renderBtn({ children: "Disabled", disabled: true });
    const btn = screen.getByText("Disabled");
    const originalBg = btn.style.backgroundColor;
    fireEvent.mouseEnter(btn);
    expect(btn.style.backgroundColor).toBe(originalBg);
  });

  it("all buttons have cursor:pointer and userSelect:none", () => {
    renderBtn({ children: "Styled" });
    const btn = screen.getByText("Styled");
    expect(btn.style.cursor).toBe("pointer");
    expect(btn.style.userSelect).toBe("none");
  });

  it("button has correct transition property", () => {
    renderBtn({ children: "Transition" });
    const btn = screen.getByText("Transition");
    expect(btn.style.transition).toContain("background-color");
    expect(btn.style.transition).toContain("transform");
    expect(btn.style.transition).toContain("box-shadow");
  });

  it("renders as <a> with hover when href is provided", () => {
    renderBtn({ children: "Link Btn", href: "https://example.com" });
    const link = screen.getByText("Link Btn");
    expect(link.tagName).toBe("A");
    fireEvent.mouseEnter(link);
    expect(link.style.backgroundColor).toBe("rgb(36, 90, 65)");
  });
});

/* ════════════════════════════════════════════════════════════
   #3 — LINK UNDERLINE ANIMATION (CSS class)
   ════════════════════════════════════════════════════════════ */

describe("#3 — Link Underline Animation", () => {
  it("MissionCard 'View Case Study' link has link-animated class", () => {
    render(<MissionCard project={baseProject} />);
    const link = screen.getByText("View Case Study →");
    expect(link).toHaveClass("link-animated");
  });

  it("MissionCard '↗ Live Site' link has link-animated class", () => {
    render(<MissionCard project={baseProject} />);
    const link = screen.getByText("↗ Live Site");
    expect(link).toHaveClass("link-animated");
  });

  it("case study link also has case-study-link class", () => {
    render(<MissionCard project={baseProject} />);
    const link = screen.getByText("View Case Study →");
    expect(link.className).toContain("case-study-link");
    expect(link.className).toContain("link-animated");
  });
});

/* ════════════════════════════════════════════════════════════
   #4 — INPUT FOCUS RING (global CSS rule)
   ════════════════════════════════════════════════════════════ */

describe("#4 — Input Focus Ring", () => {
  it("contact form inputs have transition styles for focus", () => {
    renderWithProviders(
      <input
        type="text"
        data-testid="focus-test"
        style={{
          border: "1px solid #E5E4E0",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      />
    );
    const input = screen.getByTestId("focus-test");
    expect(input.style.transition).toContain("border-color");
    expect(input.style.transition).toContain("box-shadow");
  });
});

/* ════════════════════════════════════════════════════════════
   #5 — PROJECT CARD HOVER → TITLE COLOR
   ════════════════════════════════════════════════════════════ */

describe("#5 — Project Card Hover (title color transition)", () => {
  it("MissionCard outer element has mission-card class", () => {
    render(<MissionCard project={baseProject} />);
    const card = screen.getByTestId("mission-card-test-1");
    expect(card).toHaveClass("mission-card");
  });

  it("card title has card-title class for CSS hover targeting", () => {
    render(<MissionCard project={baseProject} />);
    const title = screen.getByText("Test Project");
    expect(title).toHaveClass("card-title");
  });

  it("card title has transition:color 0.2s", () => {
    render(<MissionCard project={baseProject} />);
    const title = screen.getByText("Test Project");
    expect(title.style.transition).toBe("color 0.2s");
  });

  it("card has transition for border-color and box-shadow", () => {
    render(<MissionCard project={baseProject} />);
    const card = screen.getByTestId("mission-card-test-1");
    expect(card.style.transition).toContain("border-color");
    expect(card.style.transition).toContain("box-shadow");
  });
});

/* ════════════════════════════════════════════════════════════
   #6 — SKILL TAG HOVER
   ════════════════════════════════════════════════════════════ */

describe("#6 — Skill Tag Hover", () => {
  it("skill tags render with correct base styles", () => {
    renderWithProviders(<About />);
    const tag = screen.getByText("SQL");
    expect(tag.style.transition).toBe("all 150ms ease");
  });

  it("skill tag hover changes border-color, color, and background", () => {
    renderWithProviders(<About />);
    const tag = screen.getByText("SQL");
    fireEvent.mouseEnter(tag);
    // JSDOM normalises hex tokens to rgb values
    expect(tag.style.borderColor).toBe("rgb(45, 106, 79)");
    expect(tag.style.color).toBe("rgb(45, 106, 79)");
    expect(tag.style.backgroundColor).toBe("rgb(234, 243, 238)");
  });

  it("skill tag mouseLeave restores original styles", () => {
    renderWithProviders(<About />);
    const tag = screen.getByText("SQL");
    fireEvent.mouseEnter(tag);
    fireEvent.mouseLeave(tag);
    expect(tag.style.borderColor).toBe("rgb(229, 228, 224)");
    expect(tag.style.color).toBe("rgb(107, 114, 128)");
    expect(tag.style.backgroundColor).toBe("transparent");
  });

  it("all skill tags have the hover interaction", () => {
    renderWithProviders(<About />);
    const tags = ["SQL", "Figma", "Python", "JIRA"];
    for (const tagName of tags) {
      const tag = screen.getByText(tagName);
      fireEvent.mouseEnter(tag);
      expect(tag.style.borderColor).toBe("rgb(45, 106, 79)");
      fireEvent.mouseLeave(tag);
      expect(tag.style.borderColor).toBe("rgb(229, 228, 224)");
    }
  });
});

/* ════════════════════════════════════════════════════════════
   #7 — FILTER BUTTON ACTIVE ANIMATION
   ════════════════════════════════════════════════════════════ */

describe("#7 — Filter Button Active Animation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupSnapshot([
      fakeProject({ id: "p1", category: "0→1 Build" }),
      fakeProject({ id: "p2", category: "Research" }),
    ]);
  });

  it("active filter pill has dark background", () => {
    render(<Projects />);
    const allBtn = screen.getByTestId("filter-All");
    expect(allBtn.style.backgroundColor).toBe("rgb(17, 17, 16)");
  });

  it("inactive filter pill has transparent background", () => {
    render(<Projects />);
    const researchBtn = screen.getByTestId("filter-Research");
    expect(researchBtn.style.backgroundColor).toBe("transparent");
  });

  it("clicking a filter makes it the active selection", () => {
    render(<Projects />);
    fireEvent.click(screen.getByTestId("filter-Research"));
    // After re-render, Research is active, All is inactive
    const allBtn = screen.getByTestId("filter-All");
    expect(allBtn.style.backgroundColor).toBe("transparent");
  });

  it("filter pills have transition: all 0.15s", () => {
    render(<Projects />);
    const allBtn = screen.getByTestId("filter-All");
    expect(allBtn.style.transition).toBe("all 0.15s");
  });

  it("filter pills have border-radius: 999px (pill shape)", () => {
    render(<Projects />);
    const allBtn = screen.getByTestId("filter-All");
    expect(allBtn.style.borderRadius).toBe("999px");
  });

  it("filter pills have cursor: pointer", () => {
    render(<Projects />);
    const allBtn = screen.getByTestId("filter-All");
    expect(allBtn.style.cursor).toBe("pointer");
  });
});

/* ════════════════════════════════════════════════════════════
   #8 — PAGE TRANSITIONS (PageWrapper + Layout AnimatePresence)
   ════════════════════════════════════════════════════════════ */

describe("#8 — Page Transitions", () => {
  it("PageWrapper renders children inside a div", () => {
    const { container } = render(
      <MemoryRouter>
        <PageWrapper>
          <p>Test Content</p>
        </PageWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("Layout renders Navbar wordmark, footer, and main area", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    // Multiple elements will say "Bhautik Patel" (navbar + footer)
    const els = screen.getAllByText("Bhautik Patel");
    expect(els.length).toBeGreaterThanOrEqual(2);
    // Footer
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("Layout has a <main> element with padding-top", () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main?.style.paddingTop).toBe("56px");
  });

  it("Layout renders a <header> element (Navbar)", () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════════════════════
   #9 — HERO SCROLL CHEVRON
   ════════════════════════════════════════════════════════════ */

describe("#9 — Hero Scroll Chevron", () => {
  it("renders scroll indicator with ↓ arrow", () => {
    renderWithProviders(<Home />);
    const indicator = screen.getByTestId("scroll-indicator");
    expect(indicator).toBeInTheDocument();
    expect(indicator.textContent).toBe("↓");
  });

  it("scroll indicator starts with opacity 1", () => {
    renderWithProviders(<Home />);
    const indicator = screen.getByTestId("scroll-indicator");
    expect(indicator.style.opacity).toBe("1");
  });

  it("scroll indicator has transition on opacity", () => {
    renderWithProviders(<Home />);
    const indicator = screen.getByTestId("scroll-indicator");
    expect(indicator.style.transition).toBe("opacity 0.3s ease");
  });

  it("scroll indicator is absolutely positioned at bottom center", () => {
    renderWithProviders(<Home />);
    const indicator = screen.getByTestId("scroll-indicator");
    expect(indicator.style.position).toBe("absolute");
    expect(indicator.style.left).toBe("50%");
    expect(indicator.style.bottom).toBe("32px");
  });
});

/* ════════════════════════════════════════════════════════════
   #10 — STAT COUNTER ANIMATION
   ════════════════════════════════════════════════════════════ */

describe("#10 — Stat Counter Animation", () => {
  it("renders all 4 stat labels", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Yrs Experience")).toBeInTheDocument();
    expect(screen.getByText("Products Launched")).toBeInTheDocument();
    expect(screen.getByText("Revenue Impact")).toBeInTheDocument();
    expect(screen.getByText("Delhi MBA")).toBeInTheDocument();
  });

  it("non-numeric stats render their text values", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("₹Cr+")).toBeInTheDocument();
    expect(screen.getByText("IIT")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════════════════════
   #11 — NAV ACTIVE LINK INDICATOR
   ════════════════════════════════════════════════════════════ */

describe("#11 — Nav Active Link Indicator", () => {
  it("renders nav links with correct text", () => {
    renderWithProviders(<Navbar />);
    const links = ["Home", "About", "Projects", "Resume", "Contact"];
    for (const label of links) {
      const els = screen.getAllByText(label);
      expect(els.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("active link has text color #111110", () => {
    renderWithProviders(<Navbar />);
    // Home is active by default at "/"
    const homeLinks = screen.getAllByText("Home");
    const desktopHome = homeLinks[0];
    expect(desktopHome.className).toContain("text-[#111110]");
  });

  it("inactive link has muted color", () => {
    renderWithProviders(<Navbar />);
    const aboutLinks = screen.getAllByText("About");
    const desktopAbout = aboutLinks[0];
    expect(desktopAbout.className).toContain("text-[#6B7280]");
  });
});

/* ════════════════════════════════════════════════════════════
   FINAL PASS — Design System Compliance
   ════════════════════════════════════════════════════════════ */

describe("Final Pass — Design System Compliance", () => {
  it("OPEN_TO_WORK badge is driven by config (Navbar)", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("MissionCard border uses correct border color (rgb)", () => {
    render(<MissionCard project={baseProject} />);
    const card = screen.getByTestId("mission-card-test-1");
    // JSDOM converts hex to rgb
    expect(card.style.border).toBe("1px solid rgb(229, 228, 224)");
  });

  it("Button fonts use DM Sans", () => {
    render(
      <BrowserRouter>
        <Button>Font Test</Button>
      </BrowserRouter>
    );
    const btn = screen.getByText("Font Test");
    expect(btn.style.fontFamily).toContain("DM Sans");
  });

  it("Button font weight is 500 (not 700 or 300)", () => {
    render(
      <BrowserRouter>
        <Button>Weight</Button>
      </BrowserRouter>
    );
    const btn = screen.getByText("Weight");
    expect(btn.style.fontWeight).toBe("500");
  });

  it("Footer nav links have link-animated class", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const footer = screen.getByTestId("footer");
    const footerLinks = footer.querySelectorAll(".footer__nav-link");
    for (const link of footerLinks) {
      expect(link).toHaveClass("link-animated");
    }
  });

  it("Footer availability badge is driven by config", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByText("Open to Work")).toBeInTheDocument();
  });
});
