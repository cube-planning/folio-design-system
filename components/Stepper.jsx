// Stepper — Folio Design System
// Source of truth: prototypes/stepper-3-prototype.html (3.0), checked against
// Figma "Folio Design System Beta" › Stepper (node 519:8848) on 2026-08-19.
//
// A horizontal progress track of steps, each "done" | "active" | "inactive".
// Used standalone (e.g. onboarding) or embedded inside a TaskCard.
//
// Figma's Stepper primitive is circle+track only — no label. The label here
// is a deliberate addition on top of the Figma primitive, kept because this
// component is documented for standalone use where an unlabeled track isn't
// very useful. Figma's "done" fill and Hover state are baked into image
// assets with no extractable color value, and this repo skips hover-state
// variants elsewhere (Radio, Checkbox) for the same reason — left unchanged.

const COLORS = {
  cobalt500: "#173D82",
  cobalt200: "#8EA8E1",
  cobalt50:  "#E6EBF4",
  gray900:   "#101828",
  gray300:   "#E4E7EC",
};

const SIZE = {
  md: { circle: 32, font: 12, dot: 10, gap: 8, labelWidth: 88 },
  sm: { circle: 24, font: 11, dot: 7,  gap: 6, labelWidth: 64 },
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

  if (status === "done") {
    return (
      <span style={{ ...base, background: COLORS.cobalt50, color: COLORS.cobalt500 }}>
        <i className="fa-regular fa-check" style={{ fontSize: s.font }} aria-hidden="true" />
      </span>
    );
  }
  if (status === "active") {
    return (
      <span style={{ ...base, background: "#fff", border: `2px solid ${COLORS.cobalt500}` }}>
        <span style={{ width: s.dot, height: s.dot, borderRadius: 9999, background: COLORS.cobalt500 }} />
      </span>
    );
  }
  // inactive
  return (
    <span style={{ ...base, background: "#fff", border: `2px solid ${COLORS.gray300}` }}>
      <span style={{ width: s.dot - 2, height: s.dot - 2, borderRadius: 9999, background: COLORS.gray300 }} />
    </span>
  );
}

function labelColor(status) {
  if (status === "done") return COLORS.gray900;
  if (status === "active") return COLORS.cobalt500;
  return COLORS.gray300;
}

export function Stepper({ steps, size = "md", style }) {
  const s = SIZE[size] ?? SIZE.md;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", width: "100%", paddingBottom: s.font * 1.5 * 2 + 12, fontFamily: "'DM Sans', sans-serif", ...style }}>
      {steps.map((step, i) => (
        <div key={step.key ?? i} style={{ display: "flex", alignItems: "flex-start", flex: i < steps.length - 1 ? 1 : "0 0 auto" }}>
          {/* Node is fixed-width (= circle diameter) so the circle's horizontal
              position never shifts to accommodate a wider label — the label is
              positioned absolutely so it can't affect the track's geometry. */}
          <div style={{ position: "relative", flex: "0 0 auto", width: s.circle }}>
            <Circle status={step.status} size={size} />
            <span style={{
              position: "absolute",
              top: s.circle + s.gap,
              left: "50%",
              transform: "translateX(-50%)",
              width: s.labelWidth,
              fontSize: s.font,
              fontWeight: step.status === "active" ? 600 : 500,
              color: labelColor(step.status),
              textAlign: "center",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              height: 2,
              flex: 1,
              minWidth: 24,
              marginTop: s.circle / 2 - 1,
              background: steps[i + 1].status === "inactive" ? COLORS.gray300 : COLORS.cobalt200,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
