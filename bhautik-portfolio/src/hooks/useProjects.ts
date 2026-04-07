import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/* ── Firestore document shape ── */

export interface ProjectMetric {
  label: string;
  value: string;
}

export type ProjectStatus = "Live" | "Case Study" | "In Progress";
export type ProjectCategory = "0→1 Build" | "Growth" | "Ops" | "Research";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  metrics: ProjectMetric[];
  status: ProjectStatus;
  caseStudyUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  order: number;
  createdAt: Timestamp;
}

/* ── Public hook ── */

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      orderBy("order", "asc"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(docs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("useProjects snapshot error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { projects, loading, error };
}
