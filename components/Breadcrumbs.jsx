// Breadcrumbs — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Navigation page ›
// "Breadcrumbs" (node 183:32990, type=Add On | Portal)
//
//   type="addOn"  : plain text crumb trail (Level 1 > Level 2 > ... > current),
//                   blue-500 links, gray-900 current (non-link) crumb.
//   type="portal" : first crumb renders as a pill chip with a leading icon
//                   (e.g. "Workflows"), remaining crumbs are plain text.
//
// items: [{ label, icon?, onClick? }] — the last item is always rendered as
// the current (non-clickable) crumb regardless of whether it has an onClick.
// `icon` (a Font Awesome <i/>) is only rendered on type="portal"'s first item,
// matching Figma (Add On crumbs never carry icons).

const COLORS = {
  gray900: "#222B3A",
  gray700: "#4A5567",
  gray600: "#677489",
  blue500: "#2667D8",
};

function Chevron() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        fontSize: 12,
        color: COLORS.gray600,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <i className="fa-solid fa-chevron-right" />
    </span>
  );
}

export function Breadcrumbs({ type = "addOn", items = [], style }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isFirst = i === 0;
        const isClickable = Boolean(item.onClick) && !isLast;
        const showAsChip = type === "portal" && isFirst;

        return (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            {showAsChip ? (
              <button
                type="button"
                onClick={item.onClick}
                disabled={!isClickable}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  height: 32,
                  padding: "4px 12px 4px 8px",
                  border: "none",
                  background: "transparent",
                  borderRadius: 9999,
                  color: COLORS.blue500,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isClickable ? "pointer" : "default",
                }}
              >
                {item.icon && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      fontSize: 16,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ) : isClickable ? (
              <button
                type="button"
                onClick={item.onClick}
                style={{
                  height: 28,
                  padding: "5px 8px",
                  border: "none",
                  background: "transparent",
                  borderRadius: 4,
                  color: COLORS.blue500,
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ) : (
              <span
                style={{
                  height: 28,
                  padding: "5px 8px",
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  color: isLast ? COLORS.gray900 : COLORS.gray700,
                }}
              >
                {item.label}
              </span>
            )}
            {!isLast && <Chevron />}
          </span>
        );
      })}
    </nav>
  );
}
