import { useState, useRef, useEffect } from "react";

const COLORS = {
  cobalt500: "#173D82",
  cobalt100: "#C6D3EC",
  cobalt50:  "#E6EBF4",
  gray900:   "#101828",
  gray400:   "#98A2B3",
  gray200:   "#E4E7EC",
  gray100:   "#F2F4F7",
  red500:    "#D92D20",
  white:     "#FFFFFF",
};

const SIZE = {
  large: { height: 32, fontSize: 14, px: 8 },
  small: { height: 28, fontSize: 12, px: 8 },
};

function Chip({ label, onRemove }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: 20,
      paddingInline: 8,
      borderRadius: 9999,
      background: COLORS.cobalt50,
      border: `1px solid ${COLORS.cobalt100}`,
      fontSize: 12,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      color: COLORS.cobalt500,
      flexShrink: 0,
    }}>
      {label}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 0, display: "inline-flex", color: COLORS.cobalt500,
            fontSize: 10,
          }}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}

export function Select({
  size = "large",
  state = "default",
  label,
  placeholder = "Select an option",
  options = [],
  value,
  multi = false,
  disabled = false,
  errorMessage,
  onChange,
  style,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const resolvedState = disabled ? "disabled" : state;
  const s = SIZE[size] ?? SIZE.large;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedValues = multi
    ? (Array.isArray(value) ? value : [])
    : value;

  const isPopulated = multi ? selectedValues.length > 0 : !!selectedValues;

  const borderColor = resolvedState === "error" ? COLORS.red500
    : open ? COLORS.cobalt500
    : COLORS.gray400;

  const fieldStyle = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    minHeight: s.height,
    paddingInline: s.px,
    paddingBlock: 4,
    borderRadius: 8,
    border: `1px solid ${borderColor}`,
    background: resolvedState === "disabled" ? COLORS.gray100 : COLORS.white,
    boxShadow: open ? `0 0 0 3px ${COLORS.cobalt100}` : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    flexWrap: "wrap",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: s.fontSize,
    transition: "border 100ms, box-shadow 100ms",
    boxSizing: "border-box",
    width: "100%",
  };

  const textColor = isPopulated ? COLORS.gray900 : COLORS.gray400;

  function toggleOption(opt) {
    if (!multi) {
      onChange?.(opt);
      setOpen(false);
      return;
    }
    const next = selectedValues.includes(opt)
      ? selectedValues.filter(v => v !== opt)
      : [...selectedValues, opt];
    onChange?.(next);
  }

  const filteredOptions = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} style={{ display: "inline-flex", flexDirection: "column", gap: 4, width: "100%", fontFamily: "'DM Sans', sans-serif", ...style }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900, lineHeight: "18px" }}>
          {label}
        </label>
      )}

      <div style={fieldStyle} onClick={() => !disabled && setOpen(o => !o)}>
        {multi && selectedValues.map(v => (
          <Chip key={v} label={v} onRemove={() => toggleOption(v)} />
        ))}
        {(!multi || selectedValues.length === 0) && (
          <span style={{ flex: 1, color: textColor, fontSize: s.fontSize }}>
            {!multi && isPopulated ? selectedValues : placeholder}
          </span>
        )}
        {multi && selectedValues.length > 0 && (
          <button
            onClick={e => { e.stopPropagation(); onChange?.([]); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gray400, fontSize: 14, padding: 0 }}
            aria-label="Clear all"
          >×</button>
        )}
        <i
          className={`fa-solid fa-chevron-${open ? "up" : "down"}`}
          style={{ fontSize: 12, color: COLORS.gray400, flexShrink: 0 }}
          aria-hidden="true"
        />
      </div>

      {open && (
        <div style={{
          position: "absolute",
          marginTop: s.height + 4,
          background: COLORS.white,
          border: `1px solid ${COLORS.gray200}`,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          zIndex: 50,
          minWidth: 200,
          overflow: "hidden",
        }}>
          {multi && (
            <div style={{ padding: "8px 8px 0" }}>
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                style={{
                  width: "100%", border: `1px solid ${COLORS.gray400}`,
                  borderRadius: 6, padding: "4px 8px", fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif", outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}
          {filteredOptions.map(opt => {
            const selected = multi ? selectedValues.includes(opt) : opt === selectedValues;
            return (
              <div
                key={opt}
                onClick={() => toggleOption(opt)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  fontSize: s.fontSize,
                  color: selected ? COLORS.cobalt500 : COLORS.gray900,
                  background: selected && !multi ? COLORS.cobalt50 : "transparent",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {multi && (
                  <input type="checkbox" readOnly checked={selected}
                    style={{ accentColor: COLORS.cobalt500, width: 14, height: 14, flexShrink: 0 }}
                  />
                )}
                {opt}
              </div>
            );
          })}
        </div>
      )}

      {resolvedState === "error" && errorMessage && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: COLORS.red500, fontSize: 12, fontWeight: 500 }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 12 }} aria-hidden="true" />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
