/** Bold highlight numbers/metrics in a description string */
export function renderDescription(text: string, highlights: string[]) {
  if (highlights.length === 0) return text;

  const parts: (string | { bold: string })[] = [];

  const sorted = highlights
    .map((h) => ({ h, idx: text.indexOf(h) }))
    .filter((x) => x.idx >= 0)
    .sort((a, b) => a.idx - b.idx);

  let offset = 0;
  for (const { h } of sorted) {
    const adjustedIdx = text.indexOf(h, offset);
    if (adjustedIdx < 0) continue;
    if (adjustedIdx > offset) {
      parts.push(text.slice(offset, adjustedIdx));
    }
    parts.push({ bold: h });
    offset = adjustedIdx + h.length;
  }
  if (offset < text.length) {
    parts.push(text.slice(offset));
  }

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i} style={{ color: "#1A1A1A", fontWeight: 500 }}>
            {part.bold}
          </span>
        ),
      )}
    </>
  );
}
