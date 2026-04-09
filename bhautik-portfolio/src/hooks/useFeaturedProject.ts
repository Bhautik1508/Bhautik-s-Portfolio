import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Project } from "./useProjects";

/**
 * Fetch the first project where `featured === true` from Firestore.
 * Returns live data via onSnapshot so the UI stays in sync with the DB.
 */
export function useFeaturedProject() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      where("featured", "==", true),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setProject({ id: doc.id, ...doc.data() } as Project);
        } else {
          setProject(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("useFeaturedProject snapshot error:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { project, loading };
}
