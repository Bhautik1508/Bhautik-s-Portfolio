const SAGE = "#3B6B4F";
const INK = "#1A1A1A";
const MUTED = "#9B9590";
const BORDER = "#DDD8D2";
const BG = "#FFFFFF";

const LAYERS = [
  {
    id: "L1",
    name: "User Interface",
    owner: "Analysts",
    detail: "Pack selector + run trigger",
  },
  {
    id: "L2",
    name: "Orchestration Layer",
    owner: "Platform team",
    detail: "Sequences slides, pulls data, calls LLM",
  },
  {
    id: "L3",
    name: "Slide Design Library",
    owner: "Design / Dev",
    detail: "Reusable python-pptx components",
  },
  {
    id: "L4",
    name: "Domain Function Catalogue",
    owner: "Risk SMEs",
    detail: "Metric calculations & formatting rules",
  },
  {
    id: "L5",
    name: "Data Layer",
    owner: "Data Eng",
    detail: "Reads from master tables, no direct coupling",
  },
];

export default function PPTLayersDiagram() {
  const pad = 24;
  const rowH = 44;
  const w = 620;
  const titleH = 32;
  const contentH = LAYERS.length * rowH;
  const totalH = titleH + contentH + pad * 2;
  const innerY = titleH + pad;
  const r = 8;

  return (
    <div style={{ marginTop: 20, marginBottom: 8 }}>
      <svg
        viewBox={`0 0 ${w} ${totalH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="5-layer PPT automation architecture: User Interface at top, then Orchestration, Slide Design Library, Domain Function Catalogue, and Data Layer at bottom"
        style={{ width: "100%", height: "auto", fontFamily: "inherit" }}
      >
        {/* Title */}
        <text
          x={w / 2}
          y={18}
          textAnchor="middle"
          fontSize={11}
          fontWeight={500}
          fill={MUTED}
          style={{ textTransform: "uppercase", letterSpacing: "1px" }}
        >
          Phase 3 — PPT Automation Stack
        </text>

        {/* Single outer card */}
        <rect
          x={pad}
          y={innerY}
          width={w - pad * 2}
          height={contentH}
          rx={r}
          fill={BG}
          stroke={BORDER}
          strokeWidth={1}
        />

        {/* Layer rows */}
        {LAYERS.map((layer, i) => {
          const x = pad;
          const rowW = w - pad * 2;
          const y = innerY + i * rowH;
          const isFirst = i === 0;
          const isLast = i === LAYERS.length - 1;

          // Alternating subtle background
          const fillColor = i % 2 === 0 ? BG : "#FAFAF8";

          return (
            <g key={layer.id}>
              {/* Row background — clip to card corners for first/last */}
              {isFirst ? (
                <path
                  d={`M${x + r},${y} h${rowW - r * 2} a${r},${r} 0 0 1 ${r},${r} v${rowH - r} h${-rowW} v${-(rowH - r)} a${r},${r} 0 0 1 ${r},${-r} z`}
                  fill={fillColor}
                />
              ) : isLast ? (
                <path
                  d={`M${x},${y} h${rowW} v${rowH - r} a${r},${r} 0 0 1 ${-r},${r} h${-(rowW - r * 2)} a${r},${r} 0 0 1 ${-r},${-r} v${-(rowH - r)} z`}
                  fill={fillColor}
                />
              ) : (
                <rect x={x} y={y} width={rowW} height={rowH} fill={fillColor} />
              )}

              {/* Divider line */}
              {!isLast && (
                <line
                  x1={x + 12}
                  y1={y + rowH}
                  x2={x + rowW - 12}
                  y2={y + rowH}
                  stroke={BORDER}
                  strokeWidth={0.5}
                />
              )}

              {/* Layer ID badge */}
              <rect
                x={x + 14}
                y={y + rowH / 2 - 9}
                width={26}
                height={18}
                rx={4}
                fill={SAGE}
              />
              <text
                x={x + 27}
                y={y + rowH / 2 + 3.5}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill="#FFFFFF"
              >
                {layer.id}
              </text>

              {/* Layer name */}
              <text
                x={x + 50}
                y={y + rowH / 2 - 4}
                fontSize={12}
                fontWeight={600}
                fill={INK}
              >
                {layer.name}
              </text>

              {/* Detail */}
              <text
                x={x + 50}
                y={y + rowH / 2 + 10}
                fontSize={10}
                fill={MUTED}
              >
                {layer.detail}
              </text>

              {/* Owner — right side */}
              <text
                x={x + rowW - 14}
                y={y + rowH / 2 + 3}
                textAnchor="end"
                fontSize={9.5}
                fontWeight={500}
                fill={SAGE}
              >
                {layer.owner}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3"
        style={{ fontSize: 11, color: MUTED }}
      >
        <span className="font-sans inline-flex items-center gap-1.5">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: SAGE,
              display: "inline-block",
            }}
          />
          Each layer has a single owner
        </span>
        <span className="font-sans inline-flex items-center gap-1.5">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: SAGE,
              display: "inline-block",
            }}
          />
          No cross-layer coupling
        </span>
      </div>
    </div>
  );
}
