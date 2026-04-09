import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import type {
  WorkEntry,
  EducationEntry,
  SkillCategory,
  DomainExpertise,
} from "./useResume";

const COLLECTION = "resume";

/**
 * Replace the entire workExperience document.
 */
export async function updateWorkExperience(
  entries: WorkEntry[]
): Promise<void> {
  await setDoc(doc(db, COLLECTION, "workExperience"), { entries });
}

/**
 * Replace the entire education document.
 */
export async function updateEducation(
  entries: EducationEntry[]
): Promise<void> {
  await setDoc(doc(db, COLLECTION, "education"), { entries });
}

/**
 * Replace the entire skills document (including domain expertise).
 */
export async function updateSkills(
  entries: SkillCategory[],
  domainExpertise?: DomainExpertise
): Promise<void> {
  await setDoc(doc(db, COLLECTION, "skills"), {
    entries,
    ...(domainExpertise ? { domainExpertise } : {}),
  });
}
