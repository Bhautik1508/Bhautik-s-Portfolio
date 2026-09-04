const SAGE = "#3B6B4F";
const INK = "#1A1A1A";
const MUTED = "#9B9590";
const BORDER = "#DDD8D2";
const BG = "#FFFFFF";

/* TODO(bhautik): the resume names 4 of the 7 monitored dimensions — cost,
   model, prompt, security. Swap "+3 more" below for the remaining three once
   you confirm them. */
const STAGES = [
  {
    label: "Input",
    title: "Deployed Agents",
    items: ["Every agent in production", "Across all use cases", "Previously unobserved"],
  },
  {
    label: "Surface",
    title: "Control Tower",
    items: ["Cost · Model · Prompt", "Security · +3 more", "7 dimensions per agent"],
  },
  {
    label: "Outcome",
    title: "Triage & Attribution",
    items: ["Hours → under 30 min", "Per-agent cost attribution", "Governance in one place"],
  },
];

const ARIA =
  "Architecture diagram: every deployed agent feeds the Control Tower, a single surface monitoring 7 dimensions including cost, model, prompt and security, which produces sub-30-minute incident triage and per-agent cost attribution";

function StageBox({
  stage,
  x,
  y,
  w,
  h,
}: {
  stage: (typeof STAGES)[number];
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={BG}
        stroke={BORDER}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + 22}
        textAnchor="middle"
        fontSize={11}
        fontWeight={500}
        fill={MUTED}
        style={{ textTransform: "uppercase", letterSpacing: "1px" }}
      >
        {stage.label}
      </text>
      <text
        x={x + w / 2}
        y={y + 42}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        fill={SAGE}
      >
        {stage.title}
      </text>
      <line
        x1={x + 16}
        y1={y + 54}
        x2={x + w - 16}
        y2={y + 54}
        stroke={BORDER}
        strokeWidth={0.5}
      />
      {stage.items.map((item, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={y + 74 + i * 20}
          textAnchor="middle"
          fontSize={12}
          fill={INK}
        >
          {item}
        </text>
      ))}
    </g>
  );
}

function HorizontalArrow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + 28} y2={y} stroke={SAGE} strokeWidth={1.5} />
      <polygon
        points={`${x + 28},${y - 5} ${x + 38},${y} ${x + 28},${y + 5}`}
        fill={SAGE}
      />
    </g>
  );
}

function VerticalArrow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 20} stroke={SAGE} strokeWidth={1.5} />
      <polygon
        points={`${x - 5},${y + 20} ${x},${y + 30} ${x + 5},${y + 20}`}
        fill={SAGE}
      />
    </g>
  );
}

export default function ControlTowerDiagram() {
  const boxW = 180;
  const boxH = 130;
  const hGap = 38;
  const vGap = 34;

  const hTotal = boxW * 3 + hGap * 2;
  const hSvgW = hTotal + 32;
  const hSvgH = boxH + 50;

  const vSvgW = boxW + 32;
  const vTotal = boxH * 3 + vGap * 2;
  const vSvgH = vTotal + 50;

  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      {/* Desktop: horizontal flow */}
      <div className="hidden sm:block">
        <svg
          viewBox={`0 0 ${hSvgW} ${hSvgH}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={ARIA}
          style={{ width: "100%", height: "auto", fontFamily: "inherit" }}
        >
          {STAGES.map((stage, i) => (
            <StageBox
              key={stage.label}
              stage={stage}
              x={16 + i * (boxW + hGap)}
              y={8}
              w={boxW}
              h={boxH}
            />
          ))}
          <HorizontalArrow x={16 + boxW} y={8 + boxH / 2} />
          <HorizontalArrow x={16 + boxW * 2 + hGap} y={8 + boxH / 2} />
        </svg>
      </div>

      {/* Mobile: vertical flow */}
      <div className="sm:hidden">
        <svg
          viewBox={`0 0 ${vSvgW} ${vSvgH}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={ARIA}
          style={{ width: "100%", height: "auto", fontFamily: "inherit" }}
        >
          {STAGES.map((stage, i) => (
            <StageBox
              key={stage.label}
              stage={stage}
              x={16}
              y={8 + i * (boxH + vGap)}
              w={boxW}
              h={boxH}
            />
          ))}
          <VerticalArrow x={16 + boxW / 2} y={8 + boxH} />
          <VerticalArrow x={16 + boxW / 2} y={8 + boxH * 2 + vGap} />
        </svg>
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3"
        style={{ fontSize: 12, color: MUTED }}
      >
        {["Agent telemetry", "7 monitored dimensions", "Human triage loop"].map(
          (item) => (
            <span
              key={item}
              className="font-sans inline-flex items-center gap-1.5"
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: SAGE,
                  display: "inline-block",
                }}
              />
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
