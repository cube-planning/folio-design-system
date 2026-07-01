import { useState } from "react";

/** Folio gray + table border tokens — values from tokens.css */
const token = {
  white:           "var(--color-white)",
  gray100:         "var(--color-gray-100)",
  gray500:         "var(--color-gray-500)",
  gray800:         "var(--color-gray-800)",
  borderStrong:    "var(--color-border-strong)",
  borderTableStroke: "var(--border-table-stroke)",
  borderTableHeader: "var(--border-table-header)",
};

function SortIcon({ direction }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: 1, marginLeft: 4 }}>
      <i
        className="fa-solid fa-caret-up"
        style={{ fontSize: 8, color: direction === "asc" ? token.gray800 : token.gray500 }}
        aria-hidden="true"
      />
      <i
        className="fa-solid fa-caret-down"
        style={{ fontSize: 8, color: direction === "desc" ? token.gray800 : token.gray500 }}
        aria-hidden="true"
      />
    </span>
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
      borderRadius: 8,
      padding: 8,
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      color: token.gray800,
      ...style,
    }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: token.gray100 }}>
            {columns.map((col, colIndex) => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                style={{
                  height: 40,
                  padding: "0 8px",
                  textAlign: col.align ?? "left",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: token.gray800,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  cursor: col.sortable !== false ? "pointer" : "default",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  borderBottom: `1px solid ${token.borderTableHeader}`,
                  ...(colIndex === 0 && {
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }),
                  ...(colIndex === columns.length - 1 && {
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }),
                }}
              >
                {col.label}
                {col.sortable !== false && (
                  <SortIcon direction={sortKey === col.key ? sortDir : null} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id ?? i}
              style={{ background: token.white }}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={col.key}
                  style={{
                    height: 48,
                    padding: "0 8px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: token.gray800,
                    textAlign: col.align ?? "left",
                    borderBottom: i < sorted.length - 1 ? `1px solid ${token.borderTableStroke}` : undefined,
                    ...(i === sorted.length - 1 && colIndex === 0 && { borderBottomLeftRadius: 8 }),
                    ...(i === sorted.length - 1 && colIndex === columns.length - 1 && { borderBottomRightRadius: 8 }),
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
