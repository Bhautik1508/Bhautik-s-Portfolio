import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { onSnapshot } from "firebase/firestore";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/hooks/useProjects";

// Type the mock
const mockOnSnapshot = vi.mocked(onSnapshot);

// Helper to build a fake Firestore doc snapshot
function fakeDoc(id: string, data: Partial<Project>) {
  return { id, data: () => data };
}

describe("useProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in loading state", () => {
    // onSnapshot never calls back → stays loading
    mockOnSnapshot.mockImplementation(() => vi.fn());

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);
    expect(result.current.projects).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("returns projects from snapshot", async () => {
    const sampleDocs = [
      fakeDoc("p1", { title: "Project A", order: 1 }),
      fakeDoc("p2", { title: "Project B", order: 2 }),
    ];

    mockOnSnapshot.mockImplementation((_q: unknown, onNext: unknown) => {
      // Simulate Firestore calling onNext with a snapshot
      (onNext as (snapshot: { docs: typeof sampleDocs }) => void)({
        docs: sampleDocs,
      });
      return vi.fn(); // unsubscribe
    });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toHaveLength(2);
    expect(result.current.projects[0]).toMatchObject({
      id: "p1",
      title: "Project A",
    });
    expect(result.current.projects[1]).toMatchObject({
      id: "p2",
      title: "Project B",
    });
    expect(result.current.error).toBeNull();
  });

  it("sets error on snapshot failure", async () => {
    mockOnSnapshot.mockImplementation(
      (_q: unknown, _onNext: unknown, onError: unknown) => {
        (onError as (err: Error) => void)(new Error("permission-denied"));
        return vi.fn();
      }
    );

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("permission-denied");
    expect(result.current.projects).toEqual([]);
  });

  it("unsubscribes on unmount", () => {
    const unsubscribe = vi.fn();
    mockOnSnapshot.mockImplementation(() => unsubscribe);

    const { unmount } = renderHook(() => useProjects());
    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("updates projects when snapshot fires again", async () => {
    let capturedOnNext: ((snapshot: { docs: ReturnType<typeof fakeDoc>[] }) => void) | null = null;

    mockOnSnapshot.mockImplementation((_q: unknown, onNext: unknown) => {
      capturedOnNext = onNext as typeof capturedOnNext;
      // Fire initial snapshot
      capturedOnNext!({ docs: [fakeDoc("p1", { title: "Initial" })] });
      return vi.fn();
    });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.projects).toHaveLength(1);
    });

    // Simulate a real-time update
    act(() => {
      capturedOnNext!({
        docs: [
          fakeDoc("p1", { title: "Updated" }),
          fakeDoc("p2", { title: "New" }),
        ],
      });
    });

    await waitFor(() => {
      expect(result.current.projects).toHaveLength(2);
    });

    expect(result.current.projects[0].title).toBe("Updated");
    expect(result.current.projects[1].title).toBe("New");
  });
});
