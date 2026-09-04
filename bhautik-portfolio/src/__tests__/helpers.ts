import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#x2019;": "’",
  "&#x2018;": "‘",
  "&#x201C;": "“",
  "&#x201D;": "”",
  "&#x2192;": "→",
  "&#x2014;": "—",
  "&#x2013;": "–",
  "&#x2011;": "‑",
  "&#xD7;": "×",
  "&#x20B9;": "₹",
  "&#xB7;": "·",
};

export function decode(s: string): string {
  return s.replace(/&(?:amp|lt|gt|quot|#x[0-9A-Fa-f]+);/g, (m) => ENTITIES[m] ?? m);
}

/** Render a component tree to static HTML. */
export function render(node: ReactElement): string {
  return renderToStaticMarkup(node);
}

/**
 * Strip tags and decode entities, leaving readable text. Tags become spaces so
 * adjacent blocks don't run together — good for searching, lossy for exact
 * prose (use textExact for that).
 */
export function textOf(html: string): string {
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/**
 * Concatenate text across tag boundaries with nothing inserted. Use when the
 * markup splits one sentence into adjacent spans, as renderDescription does.
 */
export function textExact(html: string): string {
  return decode(html.replace(/<!--.*?-->/g, "").replace(/<[^>]+>/g, ""));
}

/**
 * Substrings that renderDescription wrapped in its bold span.
 * Matches the exact inline style that util emits.
 */
export function boldedRuns(html: string): string[] {
  return [...html.matchAll(/color:#1A1A1A;font-weight:500"[^>]*>([^<]*)</g)].map(
    (m) => decode(m[1]),
  );
}

/** Text of every <h3> — the case-study section titles. */
export function headings(html: string): string[] {
  return [...html.matchAll(/<h3[^>]*>([^<]+)</g)].map((m) => decode(m[1]));
}

/** The uppercase tracked "01".."11" labels above each case-study section. */
export function blockNumbers(html: string): string[] {
  return [...html.matchAll(/letter-spacing:1\.5px[^>]*>(\d\d)</g)].map((m) => m[1]);
}
