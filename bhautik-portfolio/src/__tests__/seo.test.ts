import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf-8");
const sitemap = readFileSync("public/sitemap.xml", "utf-8");
const app = readFileSync("src/App.tsx", "utf-8");

function metaContent(pattern: RegExp): string {
  const m = html.match(pattern);
  if (!m) throw new Error(`meta not found: ${pattern}`);
  return m[1];
}

const DESCRIPTION =
  /name="description"\s*\n?\s*content="([^"]+)"/;

describe("index.html meta", () => {
  it("titles on the AI-first positioning", () => {
    expect(html).toContain(
      "<title>Bhautik Patel — Product Manager | AI × Fintech</title>",
    );
  });

  it("keeps the description inside Google's truncation limit", () => {
    const desc = metaContent(DESCRIPTION);
    expect(desc.length).toBeLessThanOrEqual(160);
  });

  it("keeps IIT Delhi inside the description so it survives truncation", () => {
    expect(metaContent(DESCRIPTION)).toContain("IIT Delhi");
  });

  it("uses the same description for page, OG and Twitter", () => {
    const desc = metaContent(DESCRIPTION);
    expect(html.split(desc).length - 1).toBe(3);
  });

  it("describes the current employer, not the former one", () => {
    const desc = metaContent(DESCRIPTION);
    expect(desc).toContain("Brillio");
    expect(desc).not.toContain("4+ years in credit risk at Standard Chartered");
  });

  it("declares absolute social image URLs so scrapers can resolve them", () => {
    for (const prop of ["og:image", "twitter:image"]) {
      const m = html.match(new RegExp(`"${prop}" content="([^"]+)"`));
      expect(m, `${prop} missing`).not.toBeNull();
      expect(m![1]).toMatch(/^https:\/\//);
    }
  });

  it("declares a canonical URL and og:url", () => {
    expect(html).toContain('rel="canonical" href="https://www.bhautikpatel.com/"');
    expect(html).toContain('property="og:url" content="https://www.bhautikpatel.com/"');
  });
});

describe("structured data", () => {
  const raw = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];

  it("is valid JSON", () => {
    expect(raw).toBeDefined();
    expect(() => JSON.parse(raw!)).not.toThrow();
  });

  it("names the current employer and title", () => {
    const person = JSON.parse(raw!).mainEntity;
    expect(person.jobTitle).toBe("AI Product Manager");
    expect(person.worksFor.name).toBe("Brillio");
  });

  it("retains IIT Delhi as alumniOf", () => {
    expect(JSON.parse(raw!).mainEntity.alumniOf.name).toBe("IIT Delhi");
  });

  it("lists the agentic AI expertise", () => {
    const knows: string[] = JSON.parse(raw!).mainEntity.knowsAbout;
    expect(knows).toContain("Agentic AI");
    expect(knows).toContain("Fintech");
  });
});

describe("sitemap", () => {
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map(
    (l) => l.replace("https://www.bhautikpatel.com", "") || "/",
  );
  const routes = [...app.matchAll(/path="([^"]*)"/g)]
    .map((m) => m[1])
    .filter((p) => p !== "*");

  it("is well-formed and non-empty", () => {
    expect(sitemap).toContain("<urlset");
    expect(locs.length).toBeGreaterThan(0);
    expect(sitemap.match(/<url>/g)?.length).toBe(locs.length);
  });

  it("lists every application route", () => {
    expect(routes.filter((r) => !paths.includes(r))).toEqual([]);
  });

  it("lists no route that does not exist", () => {
    expect(paths.filter((p) => !routes.includes(p))).toEqual([]);
  });

  it("includes the ADAM case study", () => {
    expect(paths).toContain("/projects/adam-control-tower");
  });

  it("uses ISO dates throughout", () => {
    for (const d of [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)]) {
      expect(d[1]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
