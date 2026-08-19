import { Filter } from "folio-design-system";

export function NoActiveFilters() {
  return <Filter label="Status" value="All" />;
}

export function WithActiveFilters() {
  return <Filter label="Status" value="All" count={4} />;
}

export function Row() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Filter label="Status" value="All" count={4} />
      <Filter label="Owner" value="Anyone" />
    </div>
  );
}
