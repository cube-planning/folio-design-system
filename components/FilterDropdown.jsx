// FilterDropdown — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Filter dropdown (node 185:28117, Search & Filter page)
//
// Judgment call: get_metadata on this Figma node showed it only contains the trigger button's
// Default/Hover/Focused states across Default/One item selected/Multiple selected types — there is
// no panel/options content in the frame itself (the "dropdown" part is implied, not drawn). So this
// component reuses components/Filter.jsx verbatim as the trigger chip (it already renders the
// label/value/count-badge/chevron exactly as this node's trigger states do) and adds the options
// panel that a real dropdown needs, styled with the repo's existing card/shadow conventions
// (rounded-xl, gray-300 border, shadow) rather than duplicating Filter's chip markup.
//
//   label / value / count : forwarded to the Filter trigger chip
//   options                : [{ label, value, selected }] — rendered as checkboxes in the panel
//   open                   : controlled visibility of the panel (parent owns open/close state,
//                             same pattern as Modal.jsx's `open` prop)
//   onToggle               : called when the trigger chip is clicked (open/close)
//   onOptionToggle         : (value) => void — a checkbox was toggled
//   onApply / onClear      : footer actions

import { Filter } from "./Filter.jsx";
import { Button } from "./Button.jsx";

const COLORS = {
  gray900: "#222B3A",
  gray300: "#E3E8EF",
  white:   "#FFFFFF",
};

export function FilterDropdown({
  label,
  value = "All",
  count = 0,
  options = [],
  open = false,
  onToggle,
  onOptionToggle,
  onApply,
  onClear,
}) {
  return (
    <div style={{ position: "relative", display: "inline-block", fontFamily: "'DM Sans', sans-serif" }}>
      <Filter label={label} value={value} count={count} onClick={onToggle} />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: 220,
            background: COLORS.white,
            border: `1px solid ${COLORS.gray300}`,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(16, 24, 40, 0.10)",
            padding: 12,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 240, overflowY: "auto" }}>
            {options.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: COLORS.gray900,
                  cursor: "pointer",
                  padding: "4px 4px",
                  borderRadius: 6,
                }}
              >
                <input
                  type="checkbox"
                  checked={!!opt.selected}
                  onChange={() => onOptionToggle?.(opt.value)}
                  style={{ width: 14, height: 14, accentColor: "#173D82" }}
                />
                {opt.label}
              </label>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              paddingTop: 8,
              borderTop: `1px solid ${COLORS.gray300}`,
            }}
          >
            <Button variant="plain-blue" size="small" onClick={onClear}>Clear</Button>
            <Button variant="primary" size="small" onClick={onApply}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}
