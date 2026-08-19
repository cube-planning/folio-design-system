// Filter — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Filter (node 185:32652, Search & Filter page)
//
//   label : e.g. "Status"
//   value : e.g. "All"
//   count : number of active filters — renders a cobalt-500 count badge when > 0
//   onClick
//
// Figma's count badge used Lato — rendered in DM Sans here instead,
// per this system's "DM Sans only" rule (CLAUDE.md §4).

const COLORS = {
  cobalt500: "#173D82",
  gray800:   "#353F4F",
  gray600:   "#677489",
  gray400:   "#CDD5E0",
  white:     "#FFFFFF",
};

export function Filter({ label, value, count = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 32,
        padding: "4px 8px",
        borderRadius: 8,
        border: `1px solid ${COLORS.gray400}`,
        background: COLORS.white,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span style={{ fontSize: 14, color: COLORS.gray800, whiteSpace: "nowrap" }}>
        {label}{value != null ? `: ${value}` : ""}
      </span>
      {count > 0 && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 16,
            paddingInline: 5,
            borderRadius: 9999,
            background: COLORS.cobalt500,
            color: COLORS.white,
            fontSize: 10,
            fontWeight: 600,
            lineHeight: "16px",
          }}
        >
          {count}
        </span>
      )}
      <i className="fa-solid fa-chevron-down" style={{ fontSize: 12, color: COLORS.gray600 }} aria-hidden="true" />
    </button>
  );
}
