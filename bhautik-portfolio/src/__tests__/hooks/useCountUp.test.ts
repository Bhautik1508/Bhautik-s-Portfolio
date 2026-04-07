import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/hooks/useCountUp";

describe("useCountUp", () => {
  it("starts at 0", () => {
    const { result } = renderHook(() => useCountUp(10));
    expect(result.current).toBe(0);
  });

  it("reaches target value after animation completes", async () => {
    // Mock requestAnimationFrame to simulate time progression
    let rafCallback: ((time: number) => void) | null = null;
    const mockRaf = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    const startTime = 1000;
    vi.spyOn(performance, "now").mockReturnValue(startTime);

    const { result } = renderHook(() => useCountUp(5, 100));

    // Simulate animation progressing past the duration
    act(() => {
      if (rafCallback) {
        vi.spyOn(performance, "now").mockReturnValue(startTime + 200);
        rafCallback(startTime + 200);
      }
    });

    expect(result.current).toBe(5);

    mockRaf.mockRestore();
  });

  it("does not count when startOnMount is false", () => {
    const { result } = renderHook(() => useCountUp(10, 600, false));
    expect(result.current).toBe(0);
  });

  it("returns a number type", () => {
    const { result } = renderHook(() => useCountUp(42));
    expect(typeof result.current).toBe("number");
  });

  it("applies easeOutQuad — value > linear halfway through", () => {
    let rafCallback: ((time: number) => void) | null = null;
    const mockRaf = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    const startTime = 1000;
    vi.spyOn(performance, "now").mockReturnValue(startTime);

    const { result } = renderHook(() => useCountUp(100, 1000));

    // At 50% time, easeOutQuad should give 75% of target (1 - (1 - 0.5)^2 = 0.75)
    act(() => {
      if (rafCallback) {
        vi.spyOn(performance, "now").mockReturnValue(startTime + 500);
        rafCallback(startTime + 500);
      }
    });

    // easeOutQuad at t=0.5 => eased=0.75 => 75
    expect(result.current).toBe(75);

    mockRaf.mockRestore();
  });
});
