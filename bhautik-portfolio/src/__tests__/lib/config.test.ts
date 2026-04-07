import { describe, it, expect } from "vitest";
import * as libConfig from "@/lib/config";
import * as site from "@/config/site";

describe("lib/config", () => {
  it("re-exports the same values as config/site", () => {
    expect(libConfig.OPEN_TO_WORK).toBe(site.OPEN_TO_WORK);
    expect(libConfig.RESUME_URL).toBe(site.RESUME_URL);
    expect(libConfig.SITE_TITLE).toBe(site.SITE_TITLE);
    expect(libConfig.SOCIAL_LINKS).toBe(site.SOCIAL_LINKS);
    expect(libConfig.siteConfig).toBe(site.siteConfig);
  });
});
