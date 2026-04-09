import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

/* ── Firestore document shapes ── */

export interface WorkEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  turnLabel: string;
  bullets: string[];
  tags: string[];
  order: number;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  featured: boolean;
  order: number;
}

export interface SkillCategory {
  icon: string;
  category: string;
  items: string[];
  order: number;
}

export interface DomainExpertise {
  title: string;
  description: string;
  tags: string[];
}

interface ResumeData {
  workExperience: WorkEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
  domainExpertise: DomainExpertise | null;
  loading: boolean;
  error: string | null;
}

const COLLECTION = "resume";

/**
 * Real-time Firestore hook that fetches all resume documents.
 * Listens to "workExperience", "education", and "skills" docs.
 */
export function useResume(): ResumeData {
  const [workExperience, setWorkExperience] = useState<WorkEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [domainExpertise, setDomainExpertise] =
    useState<DomainExpertise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let loadedCount = 0;
    const totalDocs = 3;

    const markLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalDocs) setLoading(false);
    };

    const handleError = (err: Error) => {
      console.error("useResume snapshot error:", err);
      setError(err.message);
      setLoading(false);
    };

    // 1. workExperience
    const unsubWork = onSnapshot(
      doc(db, COLLECTION, "workExperience"),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const entries = (data.entries ?? []) as WorkEntry[];
          setWorkExperience(entries.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
        markLoaded();
      },
      handleError
    );

    // 2. education
    const unsubEdu = onSnapshot(
      doc(db, COLLECTION, "education"),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const entries = (data.entries ?? []) as EducationEntry[];
          setEducation(entries.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
        markLoaded();
      },
      handleError
    );

    // 3. skills
    const unsubSkills = onSnapshot(
      doc(db, COLLECTION, "skills"),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const entries = (data.entries ?? []) as SkillCategory[];
          setSkills(entries.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

          // Domain expertise stored in same doc
          if (data.domainExpertise) {
            setDomainExpertise(data.domainExpertise as DomainExpertise);
          }
        }
        markLoaded();
      },
      handleError
    );

    return () => {
      unsubWork();
      unsubEdu();
      unsubSkills();
    };
  }, []);

  return { workExperience, education, skills, domainExpertise, loading, error };
}
