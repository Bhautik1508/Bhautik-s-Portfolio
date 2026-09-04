import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdamPage from "../pages/AdamPage";
import RiskReportingPage from "../pages/RiskReportingPage";
import { render, textOf, blockNumbers, headings } from "./helpers";

const adam = render(
  <MemoryRouter>
    <AdamPage />
  </MemoryRouter>,
);
const risk = render(
  <MemoryRouter>
    <RiskReportingPage />
  </MemoryRouter>,
);

/** "01","02",... with no gaps or repeats. */
function isSequential(nums: string[]): boolean {
  return nums.every((n, i) => n === String(i + 1).padStart(2, "0"));
}

describe("ADAM case study", () => {
  const text = textOf(adam);

  it("numbers its seven sections sequentially", () => {
    const nums = blockNumbers(adam);
    expect(nums).toHaveLength(7);
    expect(isSequential(nums)).toBe(true);
    expect(headings(adam)).toHaveLength(7);
  });

  it("renders the Control Tower diagram in both responsive variants", () => {
    expect((adam.match(/role="img"/g) ?? []).length).toBe(2);
    expect(adam).toContain('aria-label="Architecture diagram');
  });

  it("keeps the enterprise client anonymous", () => {
    expect(text).toContain("large US commercial bank");
  });

  it("carries the headline outcomes", () => {
    for (const s of [
      "hours to under 30 minutes",
      "7 dimensions",
      "~25%",
      "~30%",
      "$800K",
      "2 to 3 days",
    ]) {
      expect(text).toContain(s);
    }
  });

  it("signals there is no public link", () => {
    expect(text).toContain("Enterprise platform, no public link");
  });
});

describe("SCB risk reporting case study", () => {
  const text = textOf(risk);

  it("numbers its eleven sections sequentially", () => {
    const nums = blockNumbers(risk);
    expect(nums).toHaveLength(11);
    expect(isSequential(nums)).toBe(true);
  });

  it("reads as completed work, not work in progress", () => {
    expect(text).toContain("Where it landed");
    expect(text).toContain("June 2026");
    expect(text).not.toContain("Next Turn");
    expect(text).not.toContain("Ship a self-service web layer");
    expect(text).not.toContain("The system is built as");
    expect(text).not.toContain("Claude drafts commentary");
  });

  it("shows six outcome tiles including the freed analyst capacity", () => {
    const tiles = [...risk.matchAll(/font-size:22px[^>]*>([^<]+)</g)].map((m) => m[1]);
    expect(tiles).toHaveLength(6);
    expect(tiles).toContain("~15h");
    expect(tiles).toContain("70→92%");
  });

  it("keeps the original headline claims", () => {
    for (const s of ["3 days to 4 hours", "100% regulatory compliance", "~85% reduction"]) {
      expect(text).toContain(s);
    }
  });
});
