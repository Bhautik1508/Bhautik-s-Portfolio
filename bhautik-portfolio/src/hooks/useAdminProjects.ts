import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Project } from "./useProjects";

const COLLECTION = "projects";

/**
 * Add a new project document to Firestore.
 * Sets `createdAt` to serverTimestamp() and `order` to max(order) + 1.
 * @returns The new document ID.
 */
export async function addProject(
  data: Omit<Project, "id" | "createdAt">
): Promise<string> {
  // Determine the next order value
  const maxQuery = query(
    collection(db, COLLECTION),
    orderBy("order", "desc"),
    limit(1)
  );
  const snapshot = await getDocs(maxQuery);
  const maxOrder = snapshot.empty
    ? 0
    : (snapshot.docs[0].data().order as number);

  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    order: maxOrder + 1,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Partially update an existing project document.
 */
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, data);
}

/**
 * Delete a project document.
 * NOTE: Does NOT delete associated imageUrl from storage.
 */
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Toggle the `featured` flag on a project.
 */
export async function toggleFeatured(
  id: string,
  current: boolean
): Promise<void> {
  await updateProject(id, { featured: !current });
}
