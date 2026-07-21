import { useState } from "react";

/** Folio table tokens — values from tokens.css. Matches Figma "Table" (2026 UI Refresh). */
const token = {
  white:             "var(--color-white)",
  gray200:           "var(--color-gray-200)",   // header fill + row divider
  gray500:           "var(--color-gray-500)",   // resting sort glyph
  gray700:           "var(--color-gray-700)",   // header label + active sort
  gray900:           "var(--color-gray-900)",   // body text
  borderStrong:      "var(--color-border-strong)",   // gray-300 — outer border
  borderTableStroke: "var(--border-table-stroke)",   // gray-200 — row divider
};

// Single Font Awesome sort glyph (fa-sort resting, fa-sort-up/down when active) per Figma.
function SortIcon({ direction }) {
  const name = direction === "asc" ? "fa-sort-up" : direction === "desc" ? "fa-sort-down" : "fa-sort";
  return (
    <i
      className={`fa-solid ${name}`}
      style={{ fontSize: 14, color: direction ? token.gray700 : token.gray500, marginLeft: 4 }}
      aria-hidden="true"
    />
  );
}

export function Table({ columns = [], rows = [], style }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  function handleSort(key) {
    if (!key) return;
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = sortKey
    ? [...rows].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = typeof av === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      })
    : rows;

  return (
    <div style={{
      border: `1px solid ${token.borderStrong}`,
      borderRadius: 16,
      padding: 16,
      overflow: "hidden",
      background: token.white,
      fontFamily: "'DM Sans', sans-serif",
      color: token.gray900,
      ...style,
    }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                style={{
                  height: 40,
                  padding: "0 8px",
                  textAlign: col.align ?? "left",
                  background: token.gray200,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: token.gray700,
                  textTransform: "uppercase",
                  cursor: col.sortable !== false ? "pointer" : "default",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  ...(colIndex === 0 && { borderTopLeftRadius: 8 }),
                  ...(colIndex === columns.length - 1 && { borderTopRightRadius: 8 }),
                }}
              >
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                }}>
                  {col.label}
                  {col.sortable !== false && (
                    <SortIcon direction={sortKey === col.key ? sortDir : null} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.id ?? i} style={{ background: token.white }}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    height: 48,
                    padding: "0 8px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: token.gray900,
                    textAlign: col.align ?? "left",
                    borderBottom: i < sorted.length - 1 ? `1px solid ${token.borderTableStroke}` : undefined,
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
