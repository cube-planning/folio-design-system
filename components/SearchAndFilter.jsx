// SearchAndFilter — Folio Design System
// Source of truth: Figma "Folio Design System Beta" › Search and Filter (node 185:28180, Search & Filter page)
//
// Composite bar: a "Filter by:" label + N filter dropdowns + a "Clear" action on the left, and a
// search input on the right (Figma shows both a filters-only and a search-only layout depending on
// variant props — this component supports both by simply omitting the pieces that aren't passed).
//
// Reuses FilterDropdown.jsx for each chip (which itself reuses Filter.jsx — see that file's header)
// and Input.jsx for the search field, rather than reimplementing either.
//
//   filters          : FilterDropdownProps[] — spread directly onto each FilterDropdown
//   onClearAll       : "Clear" action (Figma's Ghost Blue small button) next to the filter chips
//   showSearch       : whether to render the search Input (Figma's `search` variant flag)
//   searchValue / onSearchChange / searchPlaceholder : forwarded to Input.jsx

import { FilterDropdown } from "./FilterDropdown.jsx";
import { Input } from "./Input.jsx";
import { Button } from "./Button.jsx";

const COLORS = {
  gray900: "#222B3A",
};

export function SearchAndFilter({
  filters = [],
  onClearAll,
  showSearch = true,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
}) {
  const hasFilters = filters.length > 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: "100%",
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {hasFilters && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.gray900, whiteSpace: "nowrap" }}>
            Filter by:
          </span>
          {filters.map((f, i) => (
            <FilterDropdown key={f.label ?? i} {...f} />
          ))}
          <Button variant="ghost-blue" size="small" onClick={onClearAll}>Clear</Button>
        </div>
      )}

      {showSearch && (
        <div style={{ width: 250, flexShrink: 0, marginLeft: hasFilters ? 0 : "auto" }}>
          <Input
            size="large"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            leadingIcon={<i className="fa-regular fa-magnifying-glass" aria-hidden="true" />}
          />
        </div>
      )}
    </div>
  );
}
