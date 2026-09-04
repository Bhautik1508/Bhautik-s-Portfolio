import { describe, it, expect } from "vitest";
import { renderDescription } from "../utils/renderDescription";
import { render, boldedRuns, textExact } from "./helpers";

/**
 * renderDescription walks highlights greedily left-to-right and SILENTLY DROPS
 * any it cannot place. A highlight that doesn't literally occur in the text —
 * or one already consumed by an earlier match — just fails to bold, with no
 * error. These tests pin that behaviour so the Experience data can rely on it.
 */
describe("renderDescription", () => {
  it("bolds every highlight and preserves the full text", () => {
    const text = "Cut reporting from 3 days to 4 hours across 12 markets.";
    const html = render(<>{renderDescription(text, ["3 days to 4 hours", "12 markets"])}</>);

    expect(boldedRuns(html)).toEqual(["3 days to 4 hours", "12 markets"]);
    expect(textExact(html)).toBe(text);
  });

  it("returns the raw string when there are no highlights", () => {
    expect(renderDescription("plain text", [])).toBe("plain text");
  });

  it("drops a highlight that does not occur in the text (documented failure mode)", () => {
    const html = render(<>{renderDescription("only this", ["absent"])}</>);
    expect(boldedRuns(html)).toEqual([]);
  });

  it("bolds only the first occurrence when a highlight repeats", () => {
    const html = render(<>{renderDescription("20+ feeds and 20+ systems", ["20+"])}</>);
    expect(boldedRuns(html)).toEqual(["20+"]);
  });

  it("orders bolded runs by position, not by array order", () => {
    const html = render(
      <>{renderDescription("alpha then beta", ["beta", "alpha"])}</>,
    );
    expect(boldedRuns(html)).toEqual(["alpha", "beta"]);
  });

  it("never loses characters, whatever the highlights", () => {
    const text = "Led 4 programmes at 100% compliance across 20+ feeds.";
    const html = render(
      <>{renderDescription(text, ["100%", "20+", "4 programmes"])}</>,
    );
    expect(textExact(html)).toBe(text);
  });
});
