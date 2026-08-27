// RangeSelector — Folio Design System (Composite)
// Built from: Button, ListItem — the range/drilldown context picker used
// atop the Cube Add-on's Build panel.
//
// Two pieces, used together:
//   RangeSelectorTrigger — the collapsed header row, e.g. "Range 1 (A1:E14)"
//                           or "Accounts Payable (Drilldown)"
//   RangeSelectorTree    — the expanded multi-select tree (Sheet › Range)
//                           with an Apply footer, opened by the trigger
//
// `nodes` items: { id, label, level, checked: "unchecked"|"checked"|"mixed" }
// — same tri-state shape ListItem already uses for multi-select rows.

import { ListItem } from "./ListItem.jsx";
import { Button } from "./Button.jsx";

// Colors/sizes verified against Figma "Add-Ons" (node 6399:17463, "Select"
// input under Build): 12px throughout, border Gray/400 #CDD5E0, label in
// Caption 1/SemiBold (DM Sans 600) Gray/900 #222B3A, meta in Caption 1/
// Regular (DM Sans 400) Gray/500 #97A3B6.
const COLORS = {
  gray900: "#222B3A",
  gray500: "#97A3B6",
  gray600: "#677489",
  gray400: "#CDD5E0",
  gray200: "#F2F5F9",
  white:   "#FFFFFF",
};

export function RangeSelectorTrigger({ label, meta, open = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        height: 32,
        padding: "0 12px",
        borderRadius: 8,
        border: `1px solid ${COLORS.gray400}`,
        background: COLORS.white,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      <span style={{
        flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.gray900,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {label}
        {meta && <span style={{ fontWeight: 400, color: COLORS.gray500 }}> ({meta})</span>}
      </span>
      <i
        className={`fa-solid fa-chevron-${open ? "up" : "down"}`}
        style={{ fontSize: 12, color: COLORS.gray600, flexShrink: 0 }}
        aria-hidden="true"
      />
    </button>
  );
}

export function RangeSelectorTree({ nodes = [], onToggle, onApply, applyLabel = "Apply" }) {
  return (
    <div style={{
      border: `1px solid ${COLORS.gray200}`,
      borderRadius: 12,
      background: COLORS.white,
      padding: 8,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ padding: "4px 8px 8px", fontSize: 12, color: COLORS.gray600 }}>
        Select multiple ranges for bulk actions
      </div>
      {nodes.map((n) => (
        <ListItem
          key={n.id}
          label={n.label}
          level={n.level ?? 0}
          multi
          checked={n.checked ?? "unchecked"}
          onClick={() => onToggle?.(n.id)}
        />
      ))}
      <div style={{ padding: "8px 4px 4px" }}>
        <Button variant="primary" style={{ width: "100%" }} onClick={onApply}>
          {applyLabel}
        </Button>
      </div>
    </div>
  );
}
