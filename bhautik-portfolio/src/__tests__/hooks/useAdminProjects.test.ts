import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  addProject,
  updateProject,
  deleteProject,
  toggleFeatured,
} from "@/hooks/useAdminProjects";

const mockAddDoc = vi.mocked(addDoc);
const mockUpdateDoc = vi.mocked(updateDoc);
const mockDeleteDoc = vi.mocked(deleteDoc);
const mockGetDocs = vi.mocked(getDocs);
const mockServerTimestamp = vi.mocked(serverTimestamp);

const baseSampleProject = {
  title: "Test Project",
  tagline: "A tagline",
  description: "A description",
  category: "0→1 Build" as const,
  tags: ["AI"],
  metrics: [{ label: "Users", value: "100" }],
  status: "Live" as const,
  caseStudyUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false,
  order: 1,
};

describe("addProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockServerTimestamp.mockReturnValue("mock-ts" as unknown as ReturnType<typeof serverTimestamp>);
  });

  it("adds a document with order = max + 1 when projects exist", async () => {
    // Simulate existing project with order: 5
    mockGetDocs.mockResolvedValue({
      empty: false,
      docs: [{ data: () => ({ order: 5 }) }],
    } as unknown as Awaited<ReturnType<typeof getDocs>>);

    mockAddDoc.mockResolvedValue({ id: "new-123" } as unknown as Awaited<ReturnType<typeof addDoc>>);

    const id = await addProject(baseSampleProject);

    expect(id).toBe("new-123");

    // Verify addDoc was called with order = 6 (max + 1)
    expect(mockAddDoc).toHaveBeenCalledTimes(1);
    const addedData = mockAddDoc.mock.calls[0][1];
    expect(addedData).toMatchObject({
      title: "Test Project",
      order: 6,
      createdAt: "mock-ts",
    });
  });

  it("adds a document with order = 1 when collection is empty", async () => {
    mockGetDocs.mockResolvedValue({
      empty: true,
      docs: [],
    } as unknown as Awaited<ReturnType<typeof getDocs>>);

    mockAddDoc.mockResolvedValue({ id: "first-id" } as unknown as Awaited<ReturnType<typeof addDoc>>);

    const id = await addProject(baseSampleProject);

    expect(id).toBe("first-id");
    const addedData = mockAddDoc.mock.calls[0][1];
    expect(addedData).toMatchObject({ order: 1 });
  });

  it("throws when addDoc fails", async () => {
    mockGetDocs.mockResolvedValue({
      empty: true,
      docs: [],
    } as unknown as Awaited<ReturnType<typeof getDocs>>);

    mockAddDoc.mockRejectedValue(new Error("Firestore write failed"));

    await expect(addProject(baseSampleProject)).rejects.toThrow(
      "Firestore write failed"
    );
  });
});

describe("updateProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls updateDoc with the correct doc ref and data", async () => {
    mockUpdateDoc.mockResolvedValue(undefined);

    await updateProject("proj-1", { title: "New Title" });

    expect(mockUpdateDoc).toHaveBeenCalledTimes(1);
    // Second argument is the partial data
    expect(mockUpdateDoc.mock.calls[0][1]).toEqual({ title: "New Title" });
  });

  it("throws when updateDoc fails", async () => {
    mockUpdateDoc.mockRejectedValue(new Error("Update failed"));

    await expect(
      updateProject("proj-1", { title: "Fail" })
    ).rejects.toThrow("Update failed");
  });
});

describe("deleteProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls deleteDoc with the correct doc ref", async () => {
    mockDeleteDoc.mockResolvedValue(undefined);

    await deleteProject("proj-to-delete");

    expect(mockDeleteDoc).toHaveBeenCalledTimes(1);
  });

  it("throws when deleteDoc fails", async () => {
    mockDeleteDoc.mockRejectedValue(new Error("Delete failed"));

    await expect(deleteProject("proj-to-delete")).rejects.toThrow(
      "Delete failed"
    );
  });
});

describe("toggleFeatured", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("toggles featured from false to true", async () => {
    mockUpdateDoc.mockResolvedValue(undefined);

    await toggleFeatured("proj-1", false);

    expect(mockUpdateDoc).toHaveBeenCalledTimes(1);
    expect(mockUpdateDoc.mock.calls[0][1]).toEqual({ featured: true });
  });

  it("toggles featured from true to false", async () => {
    mockUpdateDoc.mockResolvedValue(undefined);

    await toggleFeatured("proj-1", true);

    expect(mockUpdateDoc).toHaveBeenCalledTimes(1);
    expect(mockUpdateDoc.mock.calls[0][1]).toEqual({ featured: false });
  });
});
