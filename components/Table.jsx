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

// ── Tree support ────────────────────────────────────────────────────────────
// A row with a `children` array is a group row. Nested rows indent by `indent` px per level and the
// tree column (first column unless `treeColumn` says otherwise) gets a caret on group rows.
// Rows need a stable `id` in a tree; ids are what the expanded state is keyed on.
const rowKey = (row, path) => row.id ?? path;
const hasChildren = (row) => Array.isArray(row.children) && row.children.length > 0;

function collectGroupIds(rows, path = "") {
  const out = [];
  rows.forEach((r, i) => {
    const p = `${path}${i}`;
    if (hasChildren(r)) {
      out.push({ id: rowKey(r, p), collapsed: r.defaultExpanded === false });
      out.push(...collectGroupIds(r.children, `${p}.`));
    }
  });
  return out;
}

function Caret({ open, label, onToggle }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={`${open ? "Collapse" : "Expand"} ${label ?? "row"}`}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        width: 24, height: 24, padding: 0, border: "none", background: "none",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: token.gray900, cursor: "pointer", flexShrink: 0,
      }}
    >
      <i className={`fa-solid fa-caret-${open ? "down" : "right"}`} style={{ fontSize: 12 }} aria-hidden="true" />
    </button>
  );
}

export function Table({
  columns = [],
  rows = [],
  style,
  treeColumn,
  defaultExpanded = "all",
  expandedIds,
  onExpandedChange,
  indent = 24,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const isTree = rows.some(hasChildren);
  const treeKey = treeColumn ?? columns[0]?.key;

  // Uncontrolled expansion: every group open unless defaultExpanded says otherwise, and a group row's own
  // `defaultExpanded: false` collapses just that group. Pass `expandedIds` to control it from outside.
  const [innerExpanded, setInnerExpanded] = useState(() => {
    const groups = isTree ? collectGroupIds(rows) : [];
    if (Array.isArray(defaultExpanded)) return new Set(defaultExpanded);
    if (defaultExpanded === "none") return new Set();
    return new Set(groups.filter((g) => !g.collapsed).map((g) => g.id));
  });
  const expanded = expandedIds ? new Set(expandedIds) : innerExpanded;

  function toggle(id) {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    if (!expandedIds) setInnerExpanded(next);
    onExpandedChange?.([...next]);
  }

  function handleSort(key) {
    if (!key) return;
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sortRows = (list) => !sortKey ? list : [...list].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = typeof av === "number"
      ? av - bv
      : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  // Flat list of visible rows, each carrying its depth. Sorting applies to siblings so children stay under their parent.
  const visible = [];
  const walk = (list, level, path) => sortRows(list).forEach((row, i) => {
    const key = rowKey(row, `${path}${i}`);
    const group = hasChildren(row);
    visible.push({ row, level, group, key });
    if (group && expanded.has(key)) walk(row.children, level + 1, `${path}${i}.`);
  });
  walk(rows, 0, "");
  const sorted = visible.map((v) => v.row);

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
          {visible.map(({ row, level, group, key }, i) => (
            <tr
              key={key ?? i}
              style={{ background: token.white }}
              aria-level={isTree ? level + 1 : undefined}
              aria-expanded={isTree && group ? expanded.has(key) : undefined}
            >
              {columns.map((col) => {
                const isTreeCell = isTree && col.key === treeKey;
                const meta = { level, isGroup: group, expanded: group && expanded.has(key) };
                const content = col.render ? col.render(row[col.key], row, meta) : row[col.key];
                return (
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
                      borderBottom: i < visible.length - 1 ? `1px solid ${token.borderTableStroke}` : undefined,
                    }}
                  >
                    {isTreeCell ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: level * indent, whiteSpace: "nowrap" }}>
                        {group && <Caret open={expanded.has(key)} label={row[col.key]} onToggle={() => toggle(key)} />}
                        {content}
                      </div>
                    ) : content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
