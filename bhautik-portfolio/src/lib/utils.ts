import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names — thin wrapper around clsx.
 * If you later add tailwind-merge, swap the implementation here.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
