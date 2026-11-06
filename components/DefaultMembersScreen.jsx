// DefaultMembersScreen — Folio Design System (Feature, Cube Add-on)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) or "Add-Ons" (kmQDBYBQPuG9bt90qedB6A) — an add-on
// specific screen, confirmed intentional. Built from: Button.
//
// Where admins manage default filter members: one row per dimension showing
// its company default (star, blue) or "Automatic: <member>" (gray), with who
// set it. The whole row opens that dimension's DefaultMemberPicker; admins
// also get a hover "Reset" on set rows. Viewers get a lock and a "View only"
// note, and rows still open, read-only.
//
//   dimensions : [{ key, label, defaultName?, automaticName, meta? }]
//                defaultName set => the dimension has a company default
//   canEdit    : may change defaults
//   onSelect(key) / onReset(key) / onBack()

import { useState } from "react";
import { Button } from "./Button.jsx";

const COLORS = {
  gray900: "#222B3A",
  gray600: "#677489",
  gray500: "#97A3B6",
  gray300: "#E3E8EF",
  gray200: "#F2F5F9",
  cobalt500: "#173D82",
  blue500: "#2667D8",
  blue200: "#BFD4F7",
  white: "#FFFFFF",
};

export function DefaultMembersScreen({ dimensions = [], canEdit = true, onSelect, onReset, onBack }) {
  const [hovered, setHovered] = useState(null);
  const setCount = dimensions.filter((d) => d.defaultName).length;

  return (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: 0, background: COLORS.white, border: `1px solid ${COLORS.gray300}`,
      borderRadius: 12, overflow: "hidden", fontFamily: "'DM Sans', sans-serif", color: COLORS.gray900,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px 4px" }}>
        <Button icon={<i className="fa-regular fa-chevron-left" />} aria-label="Back" variant="ghost-gray" size="small" onClick={onBack} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Default filter members</div>
          <div style={{ fontSize: 12, lineHeight: "18px", color: COLORS.gray600 }}>{setCount} of {dimensions.length} set · applies to everyone</div>
        </div>
        {!canEdit && (
          <span title="Only users with the Manage Dimension Members, Formulas & Tags permission can change defaults" style={{ display: "inline-flex", fontSize: 12, color: COLORS.gray600 }}>
            <i className="fa-regular fa-lock" aria-label="View only" />
          </span>
        )}
      </div>
      <div style={{ margin: "0 12px 8px", fontSize: 12, lineHeight: "18px", color: COLORS.gray600 }}>
        {canEdit ? "" : "View only. "}Where each filter opens in Excel and Google Sheets. People can still pick another member for their own range.
      </div>

      <div style={{ padding: "0 8px 8px" }}>
        {dimensions.map((d) => {
          const isSet = !!d.defaultName;
          const showReset = canEdit && isSet && hovered === d.key;
          return (
            <div
              key={d.key}
              role="button"
              tabIndex={0}
              onClick={() => onSelect?.(d.key)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(d.key); } }}
              onMouseEnter={() => setHovered(d.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(d.key)}
              onBlur={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: 10, minHeight: 56, padding: 8, borderRadius: 8, cursor: "pointer",
                borderBottom: `1px solid ${COLORS.gray200}`, background: hovered === d.key ? "#F1F5FB" : "transparent",
              }}
            >
              <i className="fa-regular fa-table-cells" aria-hidden="true" style={{ width: 14, textAlign: "center", fontSize: 12, color: COLORS.gray600 }} />
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{d.label}</span>
                <span style={{
                  display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: isSet ? COLORS.cobalt500 : COLORS.gray600,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {isSet && <i className="fa-solid fa-star" aria-hidden="true" style={{ fontSize: 9 }} />}
                  {isSet ? d.defaultName : `Automatic: ${d.automaticName}`}
                </span>
                {isSet && d.meta && <span style={{ fontSize: 11, color: COLORS.gray500 }}>{d.meta}</span>}
              </div>
              {showReset && (
                <button
                  type="button"
                  title="Reset to automatic"
                  onClick={(e) => { e.stopPropagation(); onReset?.(d.key); }}
                  style={{
                    height: 24, padding: "0 8px", borderRadius: 9999, background: COLORS.white, color: COLORS.blue500, cursor: "pointer",
                    border: `1px solid ${COLORS.blue200}`, font: "500 11px 'DM Sans', sans-serif",
                  }}
                >
                  Reset
                </button>
              )}
              <i className="fa-regular fa-chevron-right" aria-hidden="true" style={{ fontSize: 10, color: COLORS.gray500 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
