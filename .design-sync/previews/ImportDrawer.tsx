import { ImportDrawer, Badge } from "folio-design-system";

const sections = [
  {
    key: "employee",
    icon: "fa-solid fa-user",
    title: "Employee Fields",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Select field", value: "Full Name", options: ["Full Name", "Preferred Name"], required: true },
      { key: "email", label: "Work Email", placeholder: "Select field", value: "Work Email", options: ["Work Email", "Personal Email"], required: true },
    ],
  },
  {
    key: "org",
    icon: "fa-solid fa-sitemap",
    title: "Org Fields",
    fields: [
      { key: "dept", label: "Department", placeholder: "Select field", value: "Department", options: ["Department", "Cost Center"], required: false },
      { key: "manager", label: "Manager", placeholder: "Select field", value: undefined, options: ["Manager", "Supervisor"], required: false },
    ],
  },
];

const mappingRules = [
  { key: "dept", label: "Department → Cost Center", badge: <Badge type="solid" color="green" size="sm">Mapped</Badge> },
  { key: "loc", label: "Location → Region", badge: <Badge type="outlined" color="gray" size="sm">Unmapped</Badge> },
];

export function JustworksImport() {
  return (
    <div style={{ transform: "translateZ(0)", height: 680, position: "relative" }}>
      <ImportDrawer
        open
        sourceName="Justworks"
        sections={sections}
        mappingRules={mappingRules}
        onEditMappingRules={() => {}}
      />
    </div>
  );
}

export function ImportingState() {
  return (
    <div style={{ transform: "translateZ(0)", height: 680, position: "relative" }}>
      <ImportDrawer
        open
        sourceName="Workday"
        importing
        sections={sections}
        mappingRules={mappingRules}
        onEditMappingRules={() => {}}
      />
    </div>
  );
}
