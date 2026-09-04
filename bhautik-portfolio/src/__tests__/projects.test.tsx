import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import Projects from "../components/Projects";
import { render, textOf, decode } from "./helpers";

const html = render(
  <MemoryRouter>
    <Projects />
  </MemoryRouter>,
);
const text = textOf(html);
const cards = html.split("project-card").slice(1);

describe("Projects grid", () => {
  it("renders six cards, filling the 3-column grid exactly", () => {
    expect(cards).toHaveLength(6);
  });

  it("leads with ADAM", () => {
    const titles = [...html.matchAll(/font-size:21px[^>]*>([^<]+)</g)].map((m) =>
      decode(m[1]),
    );
    expect(titles[0]).toBe("ADAM: enterprise agentic AI platform");
    expect(titles).toHaveLength(6);
  });

  it("gives the ADAM card its case study link", () => {
    expect(cards[0]).toContain("/projects/adam-control-tower");
  });

  it("renders ADAM through the gradient path, not a missing screenshot", () => {
    expect(cards[0]).not.toContain("<img");
    expect(cards[0]).toContain("ADAM Control Tower");
  });

  it("no longer calls enterprise work a side project", () => {
    expect(text).not.toContain("Side projects where I applied PM thinking");
  });
});

describe("route integrity", () => {
  const app = readFileSync("src/App.tsx", "utf-8");
  const defined = new Set(
    [...app.matchAll(/path="([^"]*)"/g)].map((m) => m[1]).filter((p) => p !== "*"),
  );
  const linked = [...html.matchAll(/href="(\/projects\/[^"]*)"/g)].map((m) => m[1]);

  it("every route the grid links to is defined in App.tsx", () => {
    const dangling = linked.filter((r) => !defined.has(r));
    expect(dangling).toEqual([]);
  });

  it("every case study route is reachable from the grid", () => {
    const projectRoutes = [...defined].filter((r) => r.startsWith("/projects/"));
    const unreachable = projectRoutes.filter((r) => !linked.includes(r));
    expect(unreachable).toEqual([]);
  });

  it("exposes six case study routes", () => {
    expect([...defined].filter((r) => r.startsWith("/projects/"))).toHaveLength(6);
  });
});
