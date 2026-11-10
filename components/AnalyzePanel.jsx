// AnalyzePanel — Folio Design System (Feature)
// Checked against Figma "Add-Ons" (kmQDBYBQPuG9bt90qedB6A, node 6399:17463)
// — the actual source file for the addon. This panel's underlying frame is
// literally named "Product Newsletter Card" (id 6399:17490) there — a
// leftover copy-paste name from an unrelated task-management template
// (internal layer names like "Task Management"/"Add Task" confirm this),
// not a deliberate component name worth adopting. Confirmed intentional to
// keep `AnalyzePanel`, which actually describes what it does.
// Built from: Button, Toggle, ExpandCollapseControl — the Cube Add-on's
// "Analyze" section: AI analysis, drilldown/expand controls over the
// fetched range, and a validation shortcut.
//
// Presentational and fully controlled, same pattern as BuildPanel.
//
// Colors/sizes verified against Figma "Add-Ons" (node 6399:17463): all
// labels here are Caption 1 (12px), gray text is Gray/900 #222B3A (this
// screen's own gray ramp; the #101828 ramp some components still use is stale
// and slated for conversion — tokens/tokens.css is authoritative), and
// "Validate" is Purple 900 #3E1C96, not cobalt.

import { Button } from "./Button.jsx";
import { Toggle } from "./Toggle.jsx";
import { ExpandCollapseControl } from "./ExpandCollapseControl.jsx";

const COLORS = {
  gray900: "#222B3A",
  gray600: "#677489",
  gray200: "#F2F5F9",
  purple900: "#3E1C96",
};

export function AnalyzePanel({
  onAnalyzeForYou,
  onDrilldown,
  excludeZeroRow = true,
  onExcludeZeroRowChange,
  expandMode,
  onExpand,
  onExpandAll,
  onCollapse,
  collapseDisabled = true,
  onValidate,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
      <Button
        variant="subtle-purple"
        size="small"
        style={{ width: "100%" }}
        leadingIcon={<i className="fa-solid fa-sparkles" />}
        onClick={onAnalyzeForYou}
      >
        Let Cube Analyze for You
      </Button>

      <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>Data Drilldown &amp; Expand</div>

      <Button
        variant="secondary"
        size="small"
        style={{ width: "100%" }}
        leadingIcon={<i className="fa-regular fa-magnifying-glass-chart" />}
        onClick={onDrilldown}
      >
        Drilldown
      </Button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>Exclude zero row</span>
        <Toggle checked={excludeZeroRow} onChange={onExcludeZeroRowChange} />
      </div>

      <ExpandCollapseControl
        mode={expandMode}
        onExpand={onExpand}
        onExpandAll={onExpandAll}
        onCollapse={onCollapse}
        collapseDisabled={collapseDisabled}
      />

      <div style={{ height: 1, background: COLORS.gray200 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>Validate</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 12, color: COLORS.gray900 }}>Check unrecognized dimensions</span>
          <button
            type="button"
            onClick={onValidate}
            style={{
              background: "none", border: "none", padding: 0, cursor: "pointer",
              color: COLORS.purple900, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap",
            }}
          >
            Validate
          </button>
        </div>
      </div>
    </div>
  );
}
