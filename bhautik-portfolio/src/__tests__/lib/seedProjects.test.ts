import { describe, it, expect, vi, beforeEach } from "vitest";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { seedProjects } from "@/lib/seedProjects";

const mockAddDoc = vi.mocked(addDoc);
const mockServerTimestamp = vi.mocked(serverTimestamp);

describe("seedProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockServerTimestamp.mockReturnValue("mock-ts" as unknown as ReturnType<typeof serverTimestamp>);
    mockAddDoc.mockResolvedValue({ id: "seed-id" } as unknown as Awaited<ReturnType<typeof addDoc>>);
  });

  it("adds exactly 3 sample projects", async () => {
    await seedProjects();

    expect(mockAddDoc).toHaveBeenCalledTimes(3);
  });

  it("sets createdAt to serverTimestamp for each", async () => {
    await seedProjects();

    for (let i = 0; i < 3; i++) {
      const data = mockAddDoc.mock.calls[i][1] as Record<string, unknown>;
      expect(data.createdAt).toBe("mock-ts");
    }
  });

  it("includes the correct project titles", async () => {
    await seedProjects();

    const titles = mockAddDoc.mock.calls.map(
      (call) => (call[1] as Record<string, unknown>).title
    );

    expect(titles).toContain("GiftSense — AI Gifting Confidence Engine");
    expect(titles).toContain("StockSage AI");
    expect(titles).toContain("KYC Automation — SCB");
  });

  it("sets order values 1, 2, 3", async () => {
    await seedProjects();

    const orders = mockAddDoc.mock.calls.map(
      (call) => (call[1] as Record<string, unknown>).order
    );

    expect(orders).toEqual([1, 2, 3]);
  });

  it("sets GiftSense as featured", async () => {
    await seedProjects();

    const giftSenseCall = mockAddDoc.mock.calls.find(
      (call) =>
        (call[1] as Record<string, unknown>).title ===
        "GiftSense — AI Gifting Confidence Engine"
    );

    expect(giftSenseCall).toBeDefined();
    expect((giftSenseCall![1] as Record<string, unknown>).featured).toBe(true);
  });

  it("sets correct categories", async () => {
    await seedProjects();

    const categories = mockAddDoc.mock.calls.map(
      (call) => (call[1] as Record<string, unknown>).category
    );

    expect(categories).toEqual(["0→1 Build", "Research", "Ops"]);
  });

  it("logs success message", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await seedProjects();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Seeded 3 projects")
    );

    consoleSpy.mockRestore();
  });
});
