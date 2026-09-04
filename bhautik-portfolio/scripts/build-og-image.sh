#!/usr/bin/env bash
# Renders public/og-image.svg -> public/og-image.png at exactly 1200x630.
#
# The OG card is the image LinkedIn/Twitter/Slack show when the site is shared,
# and meta tags in index.html point at the PNG, not the SVG. So edit the SVG,
# then run this to regenerate the PNG.
#
# DM Sans isn't installed system-wide, so we fetch the TTF from Google Fonts and
# inline it as base64 into a temp SVG before rendering. Without this the card
# falls back to Helvetica and stops looking like the site.
#
# macOS only: uses qlmanage (render) + sips (crop). Needs network for the font.
set -euo pipefail

cd "$(dirname "$0")/.."
PUBLIC="$PWD/public"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "→ fetching DM Sans 400"
curl -sS -m 30 \
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap" \
  -o "$TMP/fonts.css"
FONT_URL="$(grep -o 'https://[^)]*\.ttf' "$TMP/fonts.css" | head -1)"
[ -n "$FONT_URL" ] || { echo "could not resolve DM Sans TTF url" >&2; exit 1; }
curl -sS -m 30 "$FONT_URL" -o "$TMP/dmsans.ttf"

echo "→ inlining font into a temp SVG"
python3 - "$PUBLIC/og-image.svg" "$TMP/dmsans.ttf" "$TMP/og.svg" <<'PY'
import base64, re, sys
svg_path, ttf_path, out_path = sys.argv[1:4]
svg = open(svg_path, encoding="utf-8").read()
b64 = base64.b64encode(open(ttf_path, "rb").read()).decode()
face = (
    "<defs><style>@font-face{font-family:'DM Sans';font-style:normal;"
    "font-weight:400;src:url(data:font/ttf;base64,%s) format('truetype');}"
    "</style></defs>" % b64
)

def fix_root(m):
    tag = m.group(0)
    # Quick Look scales SVGs that declare width/height, which clips the render.
    # viewBox alone makes it letterbox cleanly inside a square canvas.
    tag = re.sub(r'\s(?:width|height)="[^"]*"', "", tag)
    return tag + face

svg = re.sub(r"<svg\b[^>]*>", fix_root, svg, count=1)
open(out_path, "w", encoding="utf-8").write(svg)
PY

echo "→ rendering"
# qlmanage always outputs a square canvas, so render at 1200 wide then crop
# the centred 630 rows back out.
qlmanage -t -s 1200 -o "$TMP" "$TMP/og.svg" >/dev/null 2>&1
[ -f "$TMP/og.svg.png" ] || { echo "qlmanage produced no thumbnail" >&2; exit 1; }

echo "→ cropping to 1200x630"
sips -c 630 1200 "$TMP/og.svg.png" --out "$PUBLIC/og-image.png" >/dev/null

sips -g pixelWidth -g pixelHeight "$PUBLIC/og-image.png" | tail -2
echo "✓ wrote public/og-image.png"
