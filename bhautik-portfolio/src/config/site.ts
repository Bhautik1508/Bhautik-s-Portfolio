/** Site-wide configuration — single source of truth */

/** Show the "Available" / open-to-work badge in the navbar */
export const OPEN_TO_WORK = true;

/** Path to downloadable resume PDF */
export const RESUME_URL = "/assets/resume.pdf";

/** Default page title / meta */
export const SITE_TITLE = "Bhautik Patel — Product Manager";

/** Social links used in Navbar and Footer */
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/bhautikpatel",
  github: "https://github.com/Bhautik1508",
  email: "mailto:hello@bhautikpatel.com",
  portfolio: "https://nextleap.app/portfolio/bhautik-patel",
} as const;

/**
 * Legacy siteConfig export — consumed by Navbar and Footer.
 * Kept in sync with the granular exports above.
 */
export const siteConfig = {
  openToWork: OPEN_TO_WORK,
  resumeUrl: RESUME_URL,
  siteTitle: SITE_TITLE,
  socials: SOCIAL_LINKS,
} as const;
