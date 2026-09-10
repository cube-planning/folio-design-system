// FilterField — Folio Design System (Composite)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional, generic addition (not
// the same thing as the kit's "Filter dropdown" family — see FilterDropdown.jsx).
// Built from: Icon, Text — a full-width labeled dropdown row.
//
// Distinct from `Filter` (an inline chip used on Search & Filter pages):
// FilterField spans the full width of its container, which is the shape
// used for the Cube Add-on's Column/Row/Filter list (Time, Department,
// Scenario, Entity…) but is generic enough for any full-width form-style
// dropdown trigger.
//
//   icon  : optional leading Font Awesome <i/>
//   label : field name, e.g. "Time"
//   value : current selection, e.g. "Oct-25" — rendered as "Time: Oct-25"

// Colors match the addon-specific gray ramp verified against Figma "Add-Ons"
// (node 6399:17463) — Gray/900 #222B3A, Gray/600 #677489, Gray/400 #CDD5E0 —
// which is tokens/tokens.css, the authoritative ramp. The
// #101828/#98A2B3/#E4E7EC values still found in some components are stale
// (Untitled UI) and slated for conversion — formerly used by Badge/
// ListItem/Checkbox elsewhere in Folio. Match this screen's own tokens
// rather than the other ramp.
const COLORS = {
  gray900: "#222B3A",
  gray600: "#677489",
  gray400: "#CDD5E0",
  gray200: "#F2F5F9",
  white:   "#FFFFFF",
};

export function FilterField({ icon, label, value, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        height: 32,
        padding: "0 8px",
        borderRadius: 8,
        border: `1px solid ${COLORS.gray400}`,
        background: disabled ? COLORS.gray200 : COLORS.white,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      {icon && (
        <span style={{ display: "inline-flex", fontSize: 12, color: COLORS.gray600, flexShrink: 0 }} aria-hidden="true">
          {icon}
        </span>
      )}
      <span style={{
        flex: 1, fontSize: 12, color: COLORS.gray900,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {label}{value != null && value !== "" ? `: ${value}` : ""}
      </span>
      <i className="fa-solid fa-chevron-down" style={{ fontSize: 12, color: COLORS.gray600, flexShrink: 0 }} aria-hidden="true" />
    </button>
  );
}
