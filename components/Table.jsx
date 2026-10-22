import { createContext, useContext, useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Checkbox } from "./Checkbox.jsx";
import { Input } from "./Input.jsx";

/** Folio table tokens — values from tokens.css. Matches Figma "Table" (2026 UI Refresh). */
const token = {
  white:             "var(--color-white)",
  gray200:           "var(--color-gray-200)",   // header fill + row divider
  gray500:           "var(--color-gray-500)",   // resting sort glyph
  gray600:           "var(--color-gray-600)",   // header hint line
  gray700:           "var(--color-gray-700)",   // header label + active sort
  gray900:           "var(--color-gray-900)",   // body text
  cobalt50:          "var(--color-cobalt-50)",
  cobalt500:         "var(--color-cobalt-500)",
  borderStrong:      "var(--color-border-strong)",   // gray-300 — outer border, frozen-column divider, grid lines
  borderTableStroke: "var(--border-table-stroke)",   // gray-200 — row divider
  borderFocus:       "var(--color-border-focus)",
  rowHover:          "var(--color-bg-row-hover)",
  rowSelected:       "var(--color-bg-row-selected)",
  shadowSm:          "var(--shadow-sm)",
};

const FONT = "'DM Sans', sans-serif";

// Row height and cell padding per density. Header height is 40px in both.
const DENSITY = {
  default: { row: 48, pad: "0 8px" },
  compact: { row: 40, pad: "0 12px" },
};

// Stacking: body cells < editing cell < frozen body cells < sticky header < frozen header.
const Z = { editing: 1, frozenBody: 2, stickyHeader: 3, frozenHeader: 4 };

// Hover/selected backgrounds go through a custom property so frozen cells (which need an opaque
// background of their own) still follow the row: the tr sets --row-base, :hover swaps --row-bg.
const CSS = `
.folio-table-row--click{cursor:pointer}
.folio-table-row--click:not(.folio-table-row--sel):hover{--row-bg:${token.rowHover}}
`;

const TableContext = createContext({ variant: "default" });

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
const hasChildren = (row) => Array.isArray(row.children) && row.children.length > 0;

function collectGroupIds(rows, keyFn, path = "") {
  const out = [];
  rows.forEach((r, i) => {
    const p = `${path}${i}`;
    if (hasChildren(r)) {
      out.push({ id: keyFn(r, p, i), collapsed: r.defaultExpanded === false });
      out.push(...collectGroupIds(r.children, keyFn, `${p}.`));
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

// ── Inline editing ──────────────────────────────────────────────────────────
// Enter = commit, Escape = cancel, blur = commit. In a `variant="grid"` table the input has no border or
// radius and fills the cell, with an inset focus ring so the td never has to clip it.
// `persistent` (used by the grid's always-on inputs) stays mounted: it commits only when the value changed
// and Escape reverts the draft instead of unmounting.
export function EditableCell({ value, onCommit, onCancel, placeholder, align = "left", persistent = false, "aria-label": ariaLabel }) {
  const { variant } = useContext(TableContext);
  const initial = value == null ? "" : String(value);
  const [draft, setDraft] = useState(initial);
  const [focused, setFocused] = useState(false);
  const done = useRef(false);

  useEffect(() => { if (persistent) setDraft(initial); }, [initial, persistent]);

  function commit() {
    if (persistent) { if (draft !== initial) onCommit?.(draft); return; }
    if (done.current) return;
    done.current = true;
    onCommit?.(draft);
  }
  function cancel() {
    if (persistent) { setDraft(initial); onCancel?.(); return; }
    if (done.current) return;
    done.current = true;
    onCancel?.();
  }
  function onKeyDown(e) {
    if (e.key === "Enter") { e.preventDefault(); commit(); }
    else if (e.key === "Escape") { e.preventDefault(); cancel(); }
  }

  if (variant === "grid") {
    return (
      <input
        type="text"
        value={draft}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoFocus={!persistent}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); commit(); }}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", boxSizing: "border-box",
          padding: "0 8px", border: "none", outline: "none", borderRadius: 0,
          background: token.white, color: token.gray900,
          fontFamily: FONT, fontSize: 14, lineHeight: "20px", textAlign: align,
          fontVariantNumeric: align === "right" ? "tabular-nums" : undefined,
          boxShadow: focused ? `inset 0 0 0 2px ${token.borderFocus}` : "none",
        }}
      />
    );
  }

  return (
    <Input
      size="small"
      state="focused"
      value={draft}
      placeholder={placeholder}
      autoFocus
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={onKeyDown}
      onBlur={commit}
    />
  );
}

// ── Header filter ───────────────────────────────────────────────────────────
// A small button for a header label plus a menu anchored under the th. The menu renders in a portal on
// document.body, so a scroll container (the Table root) never clips it.
function HeaderFilter({ options = [], value = [], onChange, multiple = true, children, label = "Filter", width = 220 }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const active = value.length > 0;

  const place = useCallback(() => {
    const anchor = btnRef.current?.closest("th") ?? btnRef.current;
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)) });
  }, [width]);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (menuRef.current?.contains(e.target) || btnRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleOption(v) {
    if (!multiple) { onChange?.(value.includes(v) ? [] : [v]); setOpen(false); return; }
    onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        style={{
          width: 24, height: 24, padding: 0, marginLeft: 4, border: "none", borderRadius: 9999,
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: active || open ? token.cobalt50 : "transparent",
          color: active ? token.cobalt500 : token.gray700, cursor: "pointer",
        }}
      >
        <i className="fa-regular fa-filter" style={{ fontSize: 12 }} aria-hidden="true" />
      </button>
      {open && pos && createPortal(
        <div
          ref={menuRef}
          role="menu"
          style={{
            position: "fixed", top: pos.top, left: pos.left, width, maxHeight: 320, overflowY: "auto",
            zIndex: "var(--z-modal)", boxSizing: "border-box", padding: 8,
            background: token.white, border: `1px solid ${token.borderStrong}`, borderRadius: 12,
            boxShadow: token.shadowSm, fontFamily: FONT, fontSize: 14, color: token.gray900,
            textTransform: "none", fontWeight: 400, textAlign: "left",
          }}
        >
          {children ?? (
            <>
              {options.map((o) => (
                <div key={o.value} role="menuitemcheckbox" aria-checked={value.includes(o.value)} style={{ padding: "6px 8px", borderRadius: 8 }}>
                  {multiple ? (
                    <Checkbox
                      size="small"
                      checked={value.includes(o.value) ? "checked" : "unchecked"}
                      onChange={() => toggleOption(o.value)}
                      label={o.label}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleOption(o.value)}
                      style={{
                        all: "unset", display: "block", width: "100%", cursor: "pointer", fontFamily: FONT, fontSize: 14,
                        color: value.includes(o.value) ? token.cobalt500 : token.gray900,
                        fontWeight: value.includes(o.value) ? 600 : 400,
                      }}
                    >
                      {o.label}
                    </button>
                  )}
                </div>
              ))}
              {active && (
                <button
                  type="button"
                  onClick={() => onChange?.([])}
                  style={{
                    all: "unset", display: "block", margin: "4px 8px 0", padding: "6px 0", cursor: "pointer",
                    fontFamily: FONT, fontSize: 12, fontWeight: 600, color: token.cobalt500,
                  }}
                >
                  Clear
                </button>
              )}
            </>
          )}
        </div>,
        document.body
      )}
    </>
  );
}

const sameKey = (a, b) => a != null && b != null && String(a) === String(b);

export function Table({
  columns = [],
  rows = [],
  style,
  treeColumn,
  defaultExpanded = "all",
  expandedIds,
  onExpandedChange,
  indent = 24,
  // sticky
  stickyHeader = false,
  stickyColumns = 0,
  // sorting (controlled when sortKey is passed)
  sortKey: sortKeyProp,
  sortDir: sortDirProp,
  onSortChange,
  // rows
  rowKey: rowKeyProp,
  density = "default",
  variant = "default",
  // editing
  editingCell,
  onEditStart,
  onCellCommit,
  onCellCancel,
  emptyState,
}) {
  const [innerKey, setInnerKey] = useState(null);
  const [innerDir, setInnerDir] = useState("asc");
  const controlled = sortKeyProp !== undefined;
  const sortKey = controlled ? sortKeyProp : innerKey;
  const sortDir = controlled ? (sortDirProp ?? "asc") : innerDir;

  const isTree = rows.some(hasChildren);
  const treeKey = treeColumn ?? columns[0]?.key;
  const grid = variant === "grid";
  const dens = DENSITY[density] ?? DENSITY.default;

  // Row identity: a field name or function via `rowKey`, else row.id, else the position.
  const keyFn = (row, path, i) => {
    const k = typeof rowKeyProp === "function" ? rowKeyProp(row, i) : rowKeyProp ? row[rowKeyProp] : row.id;
    return k ?? path;
  };

  // Uncontrolled expansion: every group open unless defaultExpanded says otherwise, and a group row's own
  // `defaultExpanded: false` collapses just that group. Pass `expandedIds` to control it from outside.
  const [innerExpanded, setInnerExpanded] = useState(() => {
    const groups = isTree ? collectGroupIds(rows, keyFn) : [];
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
    const dir = sortKey === key ? (sortDir === "asc" ? "desc" : "asc") : "asc";
    if (!controlled) { setInnerKey(key); setInnerDir(dir); }
    onSortChange?.(key, dir);
  }

  // When sort is controlled the caller owns the order: rows render exactly as given.
  const sortRows = (list) => (controlled || !sortKey) ? list : [...list].sort((a, b) => {
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
    const key = keyFn(row, `${path}${i}`, i);
    const group = hasChildren(row);
    visible.push({ row, level, group, key });
    if (group && expanded.has(key)) walk(row.children, level + 1, `${path}${i}.`);
  });
  walk(rows, 0, "");

  // ── Frozen columns ─────────────────────────────────────────────────────────
  // Offsets come from measured th widths, not hardcoded ones, so content-sized columns still stack.
  const frozen = columns.map((c, i) => c.sticky ?? i < stickyColumns);
  const frozenSig = frozen.map(Number).join("");
  const lastFrozen = frozen.lastIndexOf(true);
  const thRefs = useRef([]);
  const [widths, setWidths] = useState([]);

  useLayoutEffect(() => {
    if (!frozenSig.includes("1")) return;
    const measure = () => {
      const w = thRefs.current.map((el) => (el ? el.getBoundingClientRect().width : 0));
      setWidths((prev) => (prev.length === w.length && prev.every((v, i) => v === w[i]) ? prev : w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    thRefs.current.forEach((el, i) => { if (el && frozenSig[i] === "1") ro.observe(el); });
    return () => ro.disconnect();
  }, [frozenSig]);

  const leftOf = [];
  let acc = 0;
  columns.forEach((_, i) => {
    leftOf[i] = acc;
    if (frozen[i]) acc += widths[i] ?? 0;
  });

  const scrolls = stickyHeader || lastFrozen >= 0 || grid;
  const sized = scrolls || columns.some((c) => c.width != null || c.minWidth != null);
  const lastCol = columns.length - 1;

  // The root's top padding sits above a sticky header, so rows would scroll visibly through it. A white
  // shadow the height of that padding, cast upward from each sticky header cell, hides them.
  const padTop = parseFloat(style?.paddingTop ?? style?.padding ?? (grid ? 0 : 16)) || 0;

  const stickyCell = (i, header) => {
    if (!frozen[i] && !(header && stickyHeader)) return null;
    return {
      position: "sticky",
      top: header && stickyHeader ? 0 : undefined,
      left: frozen[i] ? leftOf[i] : undefined,
      zIndex: header ? (frozen[i] ? Z.frozenHeader : Z.stickyHeader) : Z.frozenBody,
      ...(header && stickyHeader && padTop > 0 && { boxShadow: `0 -${padTop}px 0 ${token.white}` }),
      ...(i === lastFrozen && { borderRight: `1px solid ${token.borderStrong}` }),
    };
  };

  return (
    <TableContext.Provider value={{ variant }}>
      <div style={{
        border: `1px solid ${token.borderStrong}`,
        borderRadius: grid ? 0 : 16,
        padding: grid ? 0 : 16,
        overflow: scrolls ? "auto" : "hidden",
        background: token.white,
        fontFamily: FONT,
        color: token.gray900,
        ...style,
      }}>
        <style>{CSS}</style>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, ...(sized && { minWidth: "max-content" }) }}>
          <thead>
            <tr>
              {columns.map((col, colIndex) => {
                const isString = typeof col.label === "string";
                const sortable = col.sortable !== false && !col.selectAll;
                const align = col.align ?? "left";
                const text = (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                  }}>
                    {col.selectAll && (
                      <span
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "inline-flex", marginRight: col.label ? 8 : 0 }}
                      >
                        <Checkbox
                          size="small"
                          checked={col.selectAll.state === "indeterminate" ? "mixed" : col.selectAll.state}
                          onChange={() => col.selectAll.onToggle?.()}
                        />
                      </span>
                    )}
                    {col.label}
                    {sortable && (
                      <SortIcon direction={sortKey === col.key ? sortDir : null} />
                    )}
                  </span>
                );
                return (
                  <th
                    key={col.key}
                    ref={(el) => { thRefs.current[colIndex] = el; }}
                    onClick={() => sortable && handleSort(col.key)}
                    aria-sort={sortable && sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                    style={{
                      height: 40,
                      padding: dens.pad,
                      textAlign: align,
                      background: token.gray200,
                      fontFamily: FONT,
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: token.gray700,
                      // Only plain-string labels are uppercased; a node label (checkbox, filter button) is left alone.
                      textTransform: isString ? "uppercase" : "none",
                      cursor: sortable ? "pointer" : "default",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                      width: col.width,
                      minWidth: col.minWidth,
                      ...(!grid && colIndex === 0 && { borderTopLeftRadius: 8 }),
                      ...(!grid && colIndex === lastCol && { borderTopRightRadius: 8 }),
                      ...(grid && { borderRight: `1px solid ${token.borderStrong}`, borderBottom: `1px solid ${token.borderStrong}` }),
                      ...col.headerStyle,
                      ...stickyCell(colIndex, true),
                    }}
                  >
                    {col.headerHint ? (
                      <div>
                        {text}
                        <div style={{
                          fontSize: 12, fontWeight: 400, lineHeight: "16px", textTransform: "none",
                          color: token.gray600, whiteSpace: "nowrap",
                        }}>
                          {col.headerHint}
                        </div>
                      </div>
                    ) : text}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map(({ row, level, group, key }, i) => {
              const rs = row._style ?? {};
              const rowBg = rs.background ?? (row._selected ? token.rowSelected : token.white);
              const clickable = typeof row._onClick === "function";
              const className = [
                clickable && "folio-table-row--click",
                row._selected && "folio-table-row--sel",
                row._className,
              ].filter(Boolean).join(" ") || undefined;
              return (
                <tr
                  key={key ?? i}
                  className={className}
                  onClick={clickable ? (e) => row._onClick(row, e) : undefined}
                  style={{
                    "--row-base": rowBg,
                    background: "var(--row-bg, var(--row-base))",
                    color: rs.color,
                    fontWeight: rs.fontWeight ?? 400,
                  }}
                  aria-level={isTree ? level + 1 : undefined}
                  aria-expanded={isTree && group ? expanded.has(key) : undefined}
                  aria-selected={row._selected ? true : undefined}
                >
                  {columns.map((col, colIndex) => {
                    const isTreeCell = isTree && col.key === treeKey;
                    const cell = { rowKey: key, colKey: col.key };
                    const meta = { level, isGroup: group, expanded: group && expanded.has(key), rowIndex: i };
                    const isEditing = !!col.renderEditor && editingCell != null
                      && sameKey(editingCell.rowKey, key) && editingCell.colKey === col.key;
                    const alwaysOn = grid && col.editable && !col.renderEditor;
                    const commit = (v) => onCellCommit?.(cell, v, row);
                    const cancel = () => onCellCancel?.(cell);
                    const align = col.align ?? "left";

                    let content;
                    if (isEditing) content = col.renderEditor(row[col.key], row, commit, cancel);
                    else if (alwaysOn) content = <EditableCell persistent value={row[col.key]} align={align} onCommit={commit} />;
                    else content = col.render ? col.render(row[col.key], row, meta) : row[col.key];

                    const cs = (!isEditing && col.cellStyle?.(row[col.key], row)) || null;
                    const fixed = stickyCell(colIndex, false);
                    return (
                      <td
                        key={col.key}
                        onDoubleClick={col.editable && col.renderEditor && onEditStart && !isEditing ? () => onEditStart(cell) : undefined}
                        style={{
                          height: dens.row,
                          padding: alwaysOn ? 0 : dens.pad,
                          fontFamily: FONT,
                          fontSize: 14,
                          fontWeight: "inherit",
                          lineHeight: "20px",
                          color: "inherit",
                          textAlign: align,
                          background: "var(--row-bg, var(--row-base))",
                          width: col.width,
                          minWidth: col.minWidth,
                          ...(align === "right" && { fontVariantNumeric: "tabular-nums" }),
                          ...(rs.borderTop && { borderTop: rs.borderTop }),
                          borderBottom: grid
                            ? `1px solid ${token.borderStrong}`
                            : i < visible.length - 1 ? `1px solid ${token.borderTableStroke}` : undefined,
                          ...(grid && { borderRight: `1px solid ${token.borderStrong}` }),
                          // The editor's 3px focus ring must not be clipped by the cell.
                          ...((isEditing || alwaysOn) && { position: "relative", overflow: "visible", zIndex: Z.editing }),
                          ...cs,
                          ...(fixed && {
                            ...fixed,
                            // Frozen cells are opaque and follow the row background; a cellStyle background wins.
                            background: cs?.background ?? "var(--row-bg, var(--row-base))",
                          }),
                        }}
                      >
                        {isTreeCell && !isEditing ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: level * indent, whiteSpace: "nowrap" }}>
                            {group && <Caret open={expanded.has(key)} label={row[col.key]} onToggle={() => toggle(key)} />}
                            {content}
                          </div>
                        ) : content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && emptyState != null && (
          // Sticky so the message stays centred in the visible area even when the table scrolls sideways.
          <div style={{
            position: "sticky", left: 0, padding: "48px 16px", textAlign: "center",
            fontFamily: FONT, fontSize: 14, lineHeight: "20px", color: token.gray700,
          }}>
            {emptyState}
          </div>
        )}
      </div>
    </TableContext.Provider>
  );
}

Table.HeaderFilter = HeaderFilter;
Table.EditableCell = EditableCell;
