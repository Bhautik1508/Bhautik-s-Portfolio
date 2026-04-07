import { describe, it, expect } from "vitest";
import {
  OPEN_TO_WORK,
  RESUME_URL,
  SITE_TITLE,
  SOCIAL_LINKS,
  siteConfig,
} from "@/config/site";

describe("site config", () => {
  it("exports OPEN_TO_WORK as a boolean", () => {
    expect(typeof OPEN_TO_WORK).toBe("boolean");
  });

  it("exports RESUME_URL as a non-empty string", () => {
    expect(typeof RESUME_URL).toBe("string");
    expect(RESUME_URL.length).toBeGreaterThan(0);
  });

  it("exports SITE_TITLE containing 'Bhautik'", () => {
    expect(SITE_TITLE).toContain("Bhautik");
  });

  it("exports SOCIAL_LINKS with linkedin, github, and email", () => {
    expect(SOCIAL_LINKS).toHaveProperty("linkedin");
    expect(SOCIAL_LINKS).toHaveProperty("github");
    expect(SOCIAL_LINKS).toHaveProperty("email");
    expect(SOCIAL_LINKS.linkedin).toContain("linkedin.com");
    expect(SOCIAL_LINKS.github).toContain("github.com");
    expect(SOCIAL_LINKS.email).toMatch(/^mailto:/);
  });

  it("exports a legacy siteConfig object that mirrors granular exports", () => {
    expect(siteConfig.openToWork).toBe(OPEN_TO_WORK);
    expect(siteConfig.resumeUrl).toBe(RESUME_URL);
    expect(siteConfig.siteTitle).toBe(SITE_TITLE);
    expect(siteConfig.socials).toBe(SOCIAL_LINKS);
  });
});
