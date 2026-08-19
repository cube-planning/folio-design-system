const COLORS = {
  cobalt600: "#122E64",
  cobalt500: "#173D82",
  cobalt100: "#C6D3EC",
  cobalt50:  "#E6EBF4",
  gray900:   "#101828",
  gray500:   "#667085",
  gray400:   "#98A2B3",
  gray200:   "#E4E7EC",
  gray100:   "#F2F4F7",
  white:     "#FFFFFF",
};

const LEVEL_INDENT = 20; // px per nesting level, matches Figma "Level" variant (0-3)

/**
 * A single row inside a Single Select or Multi Select dropdown/tree, matching the
 * Folio "List item" Figma component (Input-Tab page, Single Select_List item /
 * MultiSelect_List item component sets).
 *
 * Figma property mapping:
 *   state    -> `disabled` prop + CSS hover (State variant: Default/Hover/Disabled)
 *   level    -> `level` prop (Level variant: 0-3, drives indentation)
 *   tree     -> `tree` prop (Tree boolean: shows the expand/collapse chevron)
 *   expanded -> `expanded` prop (nested chevron rotation - not yet exposed as a
 *               top-level Figma property, see component description in Figma)
 *   selected -> `selected` prop, single-select only (Selected boolean)
 *   checked  -> `checked` prop, multi-select only (Checked instance-swap:
 *               'unchecked' | 'checked' | 'mixed' - mirrors native checkbox
 *               tri-state semantics since Selected/Mixed are mutually exclusive)
 */
export function ListItem({
  label,
  level = 0,
  multi = false,
  tree = false,
  expanded = false,
  selected = false,
  checked = "unchecked",
  disabled = false,
  onClick,
  onToggleExpand,
}) {
  const isChecked = multi && checked === "checked";
  const isMixed = multi && checked === "mixed";
  const isSelected = !multi && selected;

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 32,
    paddingLeft: 8 + level * LEVEL_INDENT,
    paddingRight: 8,
    borderRadius: 6,
    background: isSelected ? COLORS.cobalt50 : "transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: disabled ? COLORS.gray400 : isSelected ? COLORS.cobalt500 : COLORS.gray900,
    opacity: disabled ? 0.6 : 1,
    transition: "background 100ms",
  };

  function handleClick() {
    if (disabled) return;
    onClick?.();
  }

  function handleToggleExpand(e) {
    e.stopPropagation();
    if (disabled) return;
    onToggleExpand?.();
  }

  return (
    <div
      role="option"
      aria-selected={isSelected || isChecked}
      aria-disabled={disabled}
      style={rowStyle}
      onClick={handleClick}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = isSelected ? COLORS.cobalt50 : COLORS.gray100; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? COLORS.cobalt50 : "transparent"; }}
    >
      {tree ? (
        <button
          onClick={handleToggleExpand}
          aria-label={expanded ? "Collapse" : "Expand"}
          style={{
            background: "none", border: "none", padding: 0, cursor: "inherit",
            display: "inline-flex", width: 14, flexShrink: 0,
            color: disabled ? COLORS.gray400 : COLORS.gray500,
          }}
        >
          <i className={`fa-solid fa-chevron-${expanded ? "down" : "right"}`} style={{ fontSize: 10 }} aria-hidden="true" />
        </button>
      ) : (
        <span style={{ width: 14, flexShrink: 0 }} />
      )}

      {multi && (
        <span
          style={{
            width: 14, height: 14, flexShrink: 0, borderRadius: 4,
            border: `1px solid ${isChecked || isMixed ? COLORS.cobalt600 : COLORS.gray400}`,
            background: isChecked || isMixed ? COLORS.cobalt600 : COLORS.white,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {isChecked && <i className="fa-solid fa-check" style={{ fontSize: 9, color: COLORS.white }} aria-hidden="true" />}
          {isMixed && <i className="fa-solid fa-minus" style={{ fontSize: 9, color: COLORS.white }} aria-hidden="true" />}
        </span>
      )}

      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>

      {!multi && isSelected && (
        <i className="fa-solid fa-check" style={{ fontSize: 12, color: COLORS.cobalt500, flexShrink: 0 }} aria-hidden="true" />
      )}
    </div>
  );
}
