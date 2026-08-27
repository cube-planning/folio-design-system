// ImportDrawer — Folio Design System
// Source of truth: Figma "Folio DS — 2026 UI Refresh — Eng Handoff" › Side Draw (node 123:31299)
// Kit vocabulary: that source file predates and is separate from "Folio
// Design System Beta" (Q7G87Bmjx2aYNVDKYLlBaG) — the current kit has no
// distinct "ImportDrawer" family; confirmed intentional as a composite
// built on top of the kit's own `Drawer`.
//
// Composes the existing Drawer / Button / Select / Badge primitives into the
// "Justworks Import" drawer pattern: a scrollable list of section-titled field
// groups (icon + label), each divided by a hairline, ending in a footer with
// Cancel / primary action.
//
// Sections are data-driven so the same shell can back other data-source
// import drawers (not just Justworks) — pass a different `sections` array.

import { Drawer } from "./Drawer";
import { Button } from "./Button";
import { Select } from "./Select";
import { Badge } from "./Badge";

const COLORS = {
  gray900: "#222B3A",
  gray700: "#4A5567",
  gray200: "#F2F5F9",
};

function SectionTitle({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {icon && (
        <i className={icon} style={{ fontSize: 14, color: COLORS.gray900 }} aria-hidden="true" />
      )}
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 500,
        color: COLORS.gray900,
        lineHeight: "20px",
      }}>
        {children}
      </span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: COLORS.gray200, width: "100%" }} />;
}

// One row inside the "Mapping Rules" section: label + status badge.
function MappingRow({ label, badge }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBlock: 4 }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.gray900, lineHeight: "20px" }}>
        {label}
      </span>
      {badge}
    </div>
  );
}

export function ImportDrawer({
  open = true,
  sourceName = "Justworks",
  onClose,
  onCancel,
  onImport,
  importing = false,
  sections = [],
  mappingRules,
  onEditMappingRules,
}) {
  return (
    <Drawer
      open={open}
      title={`${sourceName} Import`}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onImport} loading={importing}>Import Data</Button>
        </>
      }
    >
      {sections.map((section, i) => (
        <div key={section.key ?? i} style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <SectionTitle icon={section.icon}>{section.title}</SectionTitle>

          {section.fields.map((field, j) => (
            <Select
              key={field.key ?? j}
              label={field.required ? `${field.label} *` : field.label}
              placeholder={field.placeholder}
              value={field.value}
              options={field.options}
              onChange={field.onChange}
            />
          ))}

          <Divider />
        </div>
      ))}

      {mappingRules && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: COLORS.gray900, lineHeight: "20px" }}>
                Mapping Rules
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray700, lineHeight: "18px" }}>
                Automap your dimensions when importing.
              </div>
            </div>
            {onEditMappingRules && (
              <button
                onClick={onEditMappingRules}
                aria-label="Edit mapping rules"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#173D82" }}
              >
                <i className="fa-solid fa-pen" style={{ fontSize: 14 }} aria-hidden="true" />
              </button>
            )}
          </div>

          {mappingRules.map((rule, i) => (
            <MappingRow key={rule.key ?? i} label={rule.label} badge={rule.badge} />
          ))}

          <Divider />
        </div>
      )}
    </Drawer>
  );
}
