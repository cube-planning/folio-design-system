// Stepper — Folio Design System
// Source of truth: prototypes/stepper-3-prototype.html (3.0), checked against
// Figma "Folio Design System Beta" › Stepper (node 519:8848) on 2026-08-19.
//
// A horizontal progress track of steps, each "completed" | "active" | "upcoming".
// Used standalone (e.g. page-level wizards) or embedded inside a TaskCard.
//
// Figma's Stepper primitive is circle+track only. The labels follow the Tables
// file spec (see below), a deliberate addition kept for standalone use.
//
// Layout modes:
//   - fill (default): track stretches to its container. Right for narrow
//     hosts like TaskCard's drawer, where labels wrap inside a fixed box.
//   - pitch: pass `pitch` (distance between node centers, px) and the track
//     becomes a fixed width, labels stay on one line. Right for page-level
//     wizards ("New Table" etc.) — a 3- or 4-step flow keeps the same step
//     spacing instead of stretching to the full content width. Add
//     `align="center"` to center the track under the page title block.

// Spec: Tables Figma file CIJqxgO9nptYHnrbmZoqXR, nodes 2316:74225 (active/upcoming)
// and 2316:74261 (all completed). Circle geometry is read from the exported node
// SVGs: completed = cobalt-50 disc + cobalt-500 check; active = 2px cobalt-500 ring
// with a 10px cobalt-500 dot; upcoming = 2px gray-300 ring, empty.
//
// status: "completed" | "active" | "upcoming". Legacy "done" / "inactive" are still
// accepted so existing callers keep working.
//
// Connector after a step is cobalt-200 only when that step is completed.
// Labels use one style in every state (caption-1 medium, gray-900).
// No hover style: the Figma component set bakes hover into image assets.

const COLORS = {
  cobalt500: "var(--color-cobalt-500, #173D82)",
  cobalt200: "var(--color-cobalt-200, #8EA8E1)",
  cobalt50:  "var(--color-cobalt-50, #E6EBF4)",
  gray900:   "var(--color-gray-900, #222B3A)",
  gray300:   "var(--color-gray-300, #E3E8EF)",
};

// gap = distance from the node row to the label box (Figma: 21px, 18px label box).
const SIZE = {
  md: { circle: 32, font: 12, dot: 10, gap: 21, labelWidth: 88 },
  sm: { circle: 24, font: 11, dot: 7,  gap: 6,  labelWidth: 64 },
};

const STATUS_ALIAS = { done: "completed", inactive: "upcoming" };
const normalize = (status) => STATUS_ALIAS[status] ?? status;

const SR_ONLY = {
  position: "absolute", width: 1, height: 1, margin: -1, padding: 0,
  overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
};

function Circle({ status, size }) {
  const s = SIZE[size] ?? SIZE.md;
  const base = {
    width: s.circle,
    height: s.circle,
    borderRadius: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  };

  if (status === "completed") {
    return (
      <span style={{ ...base, background: COLORS.cobalt50, color: COLORS.cobalt500 }}>
        <i className="fa-regular fa-check" style={{ fontSize: s.font }} aria-hidden="true" />
      </span>
    );
  }
  if (status === "active") {
    return (
      <span style={{ ...base, border: `2px solid ${COLORS.cobalt500}` }}>
        <span style={{ width: s.dot, height: s.dot, borderRadius: 9999, background: COLORS.cobalt500 }} />
      </span>
    );
  }
  return <span style={{ ...base, border: `2px solid ${COLORS.gray300}` }} />;
}

export function Stepper({ steps, size = "md", pitch, align = "start", "aria-label": ariaLabel = "Progress", style }) {
  const s = SIZE[size] ?? SIZE.md;
  const fixed = typeof pitch === "number";
  // In pitch mode labels never wrap, so one line of height is all the track
  // needs below the circle; in fill mode reserve two lines for wrapped labels.
  const labelLines = fixed ? 1 : 2;

  return (
    <nav aria-label={ariaLabel} style={{ maxWidth: "100%", ...(align === "center" ? { margin: "0 auto", width: "fit-content" } : null) }}>
      <ol
        style={{
          display: "flex",
          alignItems: "flex-start",
          listStyle: "none",
          margin: 0,
          padding: 0,
          paddingBottom: s.gap + s.font * 1.5 * labelLines,
          width: fixed ? pitch * (steps.length - 1) + s.circle : "100%",
          maxWidth: "100%",
          fontFamily: "'DM Sans', sans-serif",
          ...style,
        }}
      >
        {steps.map((step, i) => {
          const status = normalize(step.status);
          return (
            <li
              key={step.key ?? i}
              aria-current={status === "active" ? "step" : undefined}
              style={{ display: "flex", alignItems: "flex-start", flex: i < steps.length - 1 ? 1 : "0 0 auto" }}
            >
              {/* Node is fixed-width (= circle diameter) so the circle's horizontal
                  position never shifts to accommodate a wider label; the label is
                  positioned absolutely so it can't affect the track's geometry. */}
              <div style={{ position: "relative", flex: "0 0 auto", width: s.circle }}>
                <Circle status={status} size={size} />
                <span style={{
                  position: "absolute",
                  top: s.circle + s.gap,
                  left: "50%",
                  transform: "translateX(-50%)",
                  ...(fixed ? { whiteSpace: "nowrap" } : { width: s.labelWidth, wordBreak: "break-word" }),
                  fontSize: s.font,
                  fontWeight: 500,
                  color: COLORS.gray900,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}>
                  {step.label}
                  {status === "completed" && <span style={SR_ONLY}>, completed</span>}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div aria-hidden="true" style={{
                  height: 2,
                  flex: 1,
                  minWidth: 24,
                  marginTop: s.circle / 2 - 1,
                  borderRadius: 9999,
                  background: status === "completed" ? COLORS.cobalt200 : COLORS.gray300,
                }} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
