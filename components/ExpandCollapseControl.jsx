// ExpandCollapseControl — Folio Design System (Composite)
// Built from: Button, Tooltip — the "Expand / Expand All / Collapse" trio
// used in the Cube Add-on's Analyze panel.
//
// Colors/sizes verified against Figma "Add-Ons" (node 6399:17463): all
// three buttons are size="small" (28px, not the 32px default), and idle/
// disabled Collapse isn't a faded "secondary" button — it's a flat
// Gray/200 #F2F5F9 fill with no border and Gray/900 #222B3A text, so it's
// rendered directly rather than through Button's disabled state.
//
//   mode            : "expand" | "expandAll" | null — which action is
//                      currently the active one (renders as primary)
//   collapseDisabled: Collapse has nothing to do until something is expanded
//   tooltip         : help text behind the info icon next to the label

import { Button } from "./Button.jsx";
import { Tooltip } from "./Tooltip.jsx";

const COLORS = {
  gray900: "#222B3A",
  gray500: "#97A3B6",
  gray200: "#F2F5F9",
};

export function ExpandCollapseControl({
  label = "Expand/ Collapse",
  tooltip = "Expand opens one level, Expand All shows all levels, and Collapse closes them",
  mode,
  onExpand,
  onExpandAll,
  onCollapse,
  collapseDisabled = true,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>{label}</span>
        {tooltip && (
          <Tooltip content={tooltip}>
            <i className="fa-solid fa-circle-question" style={{ fontSize: 14, color: COLORS.gray500 }} aria-hidden="true" />
          </Tooltip>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Button variant={mode === "expand" ? "primary" : "secondary"} size="small" style={{ flex: 1 }} onClick={onExpand}>
          Expand
        </Button>
        <Button variant={mode === "expandAll" ? "primary" : "secondary"} size="small" style={{ flex: 1 }} onClick={onExpandAll}>
          Expand All
        </Button>
      </div>

      {collapseDisabled ? (
        <div
          aria-disabled="true"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", width: "100%",
            height: 28, borderRadius: 9999, background: COLORS.gray200,
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: COLORS.gray900,
          }}
        >
          Collapse
        </div>
      ) : (
        <Button variant="secondary" size="small" style={{ width: "100%" }} onClick={onCollapse}>
          Collapse
        </Button>
      )}
    </div>
  );
}
