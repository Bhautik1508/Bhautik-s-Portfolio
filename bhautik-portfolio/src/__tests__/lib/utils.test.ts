import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn() utility", () => {
  it("merges class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("deduplicates via clsx behaviour", () => {
    expect(cn("a", "b", "a")).toBe("a b a"); // clsx doesn't dedupe, just joins
  });

  it("handles objects", () => {
    expect(cn({ active: true, disabled: false })).toBe("active");
  });

  it("handles arrays", () => {
    expect(cn(["one", "two"])).toBe("one two");
  });

  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined and null", () => {
    expect(cn(undefined, null, "valid")).toBe("valid");
  });
});
