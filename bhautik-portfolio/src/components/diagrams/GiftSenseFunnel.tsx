const SAGE = "#3B6B4F";
const INK = "#1A1A1A";
const MUTED = "#9B9590";
const BORDER = "#DDD8D2";
const BG = "#FFFFFF";
const AMBER = "#B8860B";

const SIGNALS = ["WhatsApp context", "Stated preferences", "Social signals"];

const RECS = [
  { name: "Personal experience", pct: 92 },
  { name: "Coffee subscription", pct: 78 },
  { name: "Jewellery set", pct: 61 },
];

function pctColor(p: number) {
  if (p >= 90) return SAGE;
  if (p >= 70) return AMBER;
  return MUTED;
}

function pctBg(p: number) {
  if (p >= 90) return "#E8F0EB";
  if (p >= 70) return "#FDF4E3";
  return "#F0EDEA";
}

export default function GiftSenseFunnel() {
  /* ── Desktop constants ── */
  const dW = 620;
  const boxW = 155;
  const boxH = 46;
  const boxGap = 6;
  const aiW = 148;
  const aiH = 54;
  const signalX = 16;
  const sigRight = signalX + boxW;
  const gapSize = (dW - 32 - boxW * 2 - aiW) / 2;
  const aiX = sigRight + gapSize;
  const recX = aiX + aiW + gapSize;
  const mergeX = sigRight + 12;
  const forkX = recX - 12;

  const boxStartY = 32;
  const rows = [0, 1, 2].map((i) => {
    const y = boxStartY + i * (boxH + boxGap);
    return { y, cy: y + boxH / 2 };
  });
  const midCY = rows[1].cy;
  const aiY = midCY - aiH / 2;
  const dH = rows[2].y + boxH + 18;

  /* ── Mobile constants ── */
  const mW = 220;
  const mBoxW = 190;
  const mX = 15;
  const mSigH = 34;
  const mSigGap = 5;
  const mAiH = 40;
  const mRecH = 38;
  const mRecGap = 5;
  const mArrowGap = 24;

  const mStartY = 8;
  const mSigs = [0, 1, 2].map((i) => {
    const y = mStartY + i * (mSigH + mSigGap);
    return { y, cy: y + mSigH / 2 };
  });
  const mSigBottom = mSigs[2].y + mSigH;

  const mAiY = mSigBottom + mArrowGap;
  const mAiBottom = mAiY + mAiH;

  const mRecStartY = mAiBottom + mArrowGap;
  const mRecs = [0, 1, 2].map((i) => {
    const y = mRecStartY + i * (mRecH + mRecGap);
    return { y, cy: y + mRecH / 2 };
  });
  const mH = mRecs[2].y + mRecH + 8;

  return (
    <div style={{ marginTop: 20, marginBottom: 8 }}>
      {/* ── Desktop: horizontal funnel ── */}
      <div className="hidden sm:block">
        <svg
          viewBox={`0 0 ${dW} ${dH}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Multi-signal profiling funnel: WhatsApp context, stated preferences, and social signals flow into AI profiling engine, producing confidence-ranked recommendations"
          style={{ width: "100%", height: "auto", fontFamily: "inherit" }}
        >
          {/* Column labels */}
          <text
            x={signalX + boxW / 2}
            y={18}
            textAnchor="middle"
            fontSize={10}
            fontWeight={500}
            fill={MUTED}
            style={{ textTransform: "uppercase", letterSpacing: "1px" }}
          >
            Signals
          </text>
          <text
            x={aiX + aiW / 2}
            y={18}
            textAnchor="middle"
            fontSize={10}
            fontWeight={500}
            fill={MUTED}
            style={{ textTransform: "uppercase", letterSpacing: "1px" }}
          >
            Engine
          </text>
          <text
            x={recX + boxW / 2}
            y={18}
            textAnchor="middle"
            fontSize={10}
            fontWeight={500}
            fill={MUTED}
            style={{ textTransform: "uppercase", letterSpacing: "1px" }}
          >
            Ranked output
          </text>

          {/* Signal boxes */}
          {SIGNALS.map((s, i) => (
            <g key={s}>
              <rect
                x={signalX}
                y={rows[i].y}
                width={boxW}
                height={boxH}
                rx={8}
                fill={BG}
                stroke={BORDER}
                strokeWidth={1}
              />
              <text
                x={signalX + boxW / 2}
                y={rows[i].cy + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={500}
                fill={INK}
              >
                {s}
              </text>
            </g>
          ))}

          {/* ── Merge wiring: stubs → vertical bar → arrow ── */}
          {rows.map((r) => (
            <line
              key={`ms-${r.cy}`}
              x1={sigRight}
              y1={r.cy}
              x2={mergeX}
              y2={r.cy}
              stroke={SAGE}
              strokeWidth={1.5}
            />
          ))}
          <line
            x1={mergeX}
            y1={rows[0].cy}
            x2={mergeX}
            y2={rows[2].cy}
            stroke={SAGE}
            strokeWidth={1.5}
          />
          <line
            x1={mergeX}
            y1={midCY}
            x2={aiX - 7}
            y2={midCY}
            stroke={SAGE}
            strokeWidth={1.5}
          />
          <polygon
            points={`${aiX - 7},${midCY - 4} ${aiX},${midCY} ${aiX - 7},${midCY + 4}`}
            fill={SAGE}
          />

          {/* AI node */}
          <rect
            x={aiX}
            y={aiY}
            width={aiW}
            height={aiH}
            rx={8}
            fill={SAGE}
          />
          <text
            x={aiX + aiW / 2}
            y={midCY - 3}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill="#FFFFFF"
          >
            AI Profiling
          </text>
          <text
            x={aiX + aiW / 2}
            y={midCY + 12}
            textAnchor="middle"
            fontSize={9.5}
            fill="rgba(255,255,255,0.6)"
          >
            Multi-signal engine
          </text>

          {/* ── Fork wiring: line → vertical bar → arrows ── */}
          <line
            x1={aiX + aiW}
            y1={midCY}
            x2={forkX}
            y2={midCY}
            stroke={SAGE}
            strokeWidth={1.5}
          />
          <line
            x1={forkX}
            y1={rows[0].cy}
            x2={forkX}
            y2={rows[2].cy}
            stroke={SAGE}
            strokeWidth={1.5}
          />
          {rows.map((r) => (
            <g key={`fa-${r.cy}`}>
              <line
                x1={forkX}
                y1={r.cy}
                x2={recX - 7}
                y2={r.cy}
                stroke={SAGE}
                strokeWidth={1.5}
              />
              <polygon
                points={`${recX - 7},${r.cy - 4} ${recX},${r.cy} ${recX - 7},${r.cy + 4}`}
                fill={SAGE}
              />
            </g>
          ))}

          {/* Recommendation boxes */}
          {RECS.map((rec, i) => {
            const color = pctColor(rec.pct);
            const bg = pctBg(rec.pct);
            return (
              <g key={rec.name}>
                <rect
                  x={recX}
                  y={rows[i].y}
                  width={boxW}
                  height={boxH}
                  rx={8}
                  fill={BG}
                  stroke={BORDER}
                  strokeWidth={1}
                />
                <text
                  x={recX + 10}
                  y={rows[i].cy + 4}
                  fontSize={10}
                  fontWeight={500}
                  fill={INK}
                >
                  {rec.name}
                </text>
                {/* Confidence pill */}
                <rect
                  x={recX + boxW - 42}
                  y={rows[i].cy - 8}
                  width={32}
                  height={16}
                  rx={8}
                  fill={bg}
                />
                <text
                  x={recX + boxW - 26}
                  y={rows[i].cy + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={600}
                  fill={color}
                >
                  {rec.pct}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Mobile: vertical funnel ── */}
      <div className="sm:hidden">
        <svg
          viewBox={`0 0 ${mW} ${mH}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Multi-signal profiling funnel: WhatsApp context, stated preferences, and social signals flow into AI profiling engine, producing confidence-ranked recommendations"
          style={{ width: "100%", height: "auto", fontFamily: "inherit" }}
        >
          {/* Signal boxes */}
          {SIGNALS.map((s, i) => (
            <g key={s}>
              <rect
                x={mX}
                y={mSigs[i].y}
                width={mBoxW}
                height={mSigH}
                rx={6}
                fill={BG}
                stroke={BORDER}
                strokeWidth={1}
              />
              <text
                x={mX + mBoxW / 2}
                y={mSigs[i].cy + 4}
                textAnchor="middle"
                fontSize={10}
                fontWeight={500}
                fill={INK}
              >
                {s}
              </text>
            </g>
          ))}

          {/* Down arrow: signals → AI */}
          <line
            x1={mW / 2}
            y1={mSigBottom + 3}
            x2={mW / 2}
            y2={mAiY - 6}
            stroke={SAGE}
            strokeWidth={1.5}
          />
          <polygon
            points={`${mW / 2 - 4},${mAiY - 6} ${mW / 2},${mAiY} ${mW / 2 + 4},${mAiY - 6}`}
            fill={SAGE}
          />

          {/* AI node */}
          <rect
            x={mX}
            y={mAiY}
            width={mBoxW}
            height={mAiH}
            rx={6}
            fill={SAGE}
          />
          <text
            x={mX + mBoxW / 2}
            y={mAiY + mAiH / 2 - 2}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill="#FFFFFF"
          >
            AI Profiling
          </text>
          <text
            x={mX + mBoxW / 2}
            y={mAiY + mAiH / 2 + 11}
            textAnchor="middle"
            fontSize={8.5}
            fill="rgba(255,255,255,0.6)"
          >
            Multi-signal engine
          </text>

          {/* Down arrow: AI → recs */}
          <line
            x1={mW / 2}
            y1={mAiBottom + 3}
            x2={mW / 2}
            y2={mRecStartY - 6}
            stroke={SAGE}
            strokeWidth={1.5}
          />
          <polygon
            points={`${mW / 2 - 4},${mRecStartY - 6} ${mW / 2},${mRecStartY} ${mW / 2 + 4},${mRecStartY - 6}`}
            fill={SAGE}
          />

          {/* Recommendation boxes */}
          {RECS.map((rec, i) => {
            const color = pctColor(rec.pct);
            const bg = pctBg(rec.pct);
            return (
              <g key={rec.name}>
                <rect
                  x={mX}
                  y={mRecs[i].y}
                  width={mBoxW}
                  height={mRecH}
                  rx={6}
                  fill={BG}
                  stroke={BORDER}
                  strokeWidth={1}
                />
                <text
                  x={mX + 10}
                  y={mRecs[i].cy + 4}
                  fontSize={10}
                  fontWeight={500}
                  fill={INK}
                >
                  {rec.name}
                </text>
                <rect
                  x={mX + mBoxW - 44}
                  y={mRecs[i].cy - 8}
                  width={34}
                  height={16}
                  rx={8}
                  fill={bg}
                />
                <text
                  x={mX + mBoxW - 27}
                  y={mRecs[i].cy + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={600}
                  fill={color}
                >
                  {rec.pct}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

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
          High confidence (90%+)
        </span>
        <span className="font-sans inline-flex items-center gap-1.5">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: AMBER,
              display: "inline-block",
            }}
          />
          Medium (70–89%)
        </span>
        <span className="font-sans inline-flex items-center gap-1.5">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: MUTED,
              display: "inline-block",
            }}
          />
          Lower (&lt;70%)
        </span>
      </div>
    </div>
  );
}
