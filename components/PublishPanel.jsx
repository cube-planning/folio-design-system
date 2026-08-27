// PublishPanel — Folio Design System (Feature)
// Kit vocabulary: no matching family in Figma "Folio Design System Beta"
// (Q7G87Bmjx2aYNVDKYLlBaG) — confirmed intentional, addon-specific screen.
// Built from: Button, SegmentedButton, Banner, Input, Select, Textarea, Tag —
// the Cube Add-on's "Publish" section: push the fetched range to the live
// model (Data tab) or manage a Web Report (Web Report tab).
//
// Presentational and fully controlled, same pattern as BuildPanel/AnalyzePanel.
//
//   tab                : "data" | "web"
//   blockingDimensions : parent dimensions that block a Data publish — shown
//                         in a warning Banner; "Publish Data" is disabled while any exist
//   webReportState      : "empty" | "create" | "existing"
//   reportArea/-Kind    : the picked range/table once set on the create form
//                         ("Range" | "Table"), shown as a hint under the picker
//   sharing             : "private" | "specified"
//   sharedUsers         : [{ id, name }] — only rendered when sharing is "specified"
//   report              : { name, meta } — the existing-report row

import { useState } from "react";
import { Button } from "./Button.jsx";
import { SegmentedButton } from "./SegmentedButton.jsx";
import { Banner } from "./Banner.jsx";
import { Input } from "./Input.jsx";
import { Select } from "./Select.jsx";
import { Textarea } from "./Textarea.jsx";
import { Tag } from "./Tag.jsx";
import { Checkbox } from "./Checkbox.jsx";

const COLORS = {
  gray900:   "#222B3A",
  gray600:   "#677489",
  gray500:   "#97A3B6",
  gray400:   "#CDD5E0",
  gray200:   "#F2F5F9",
  cobalt500: "#173D82",
  white:     "#FFFFFF",
};

const REPORT_ACTIONS = [
  { key: "edit", label: "Edit Details" },
  { key: "view", label: "View Report" },
  { key: "overwrite", label: "Overwrite Web Report" },
  { key: "saveNew", label: "Save as New Report" },
];

function KebabMenu({ onAction }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Button
        icon={<i className="fa-solid fa-ellipsis-vertical" />}
        aria-label="Report actions"
        variant="ghost-gray"
        size="small"
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div
          style={{
            position: "absolute", right: 0, top: "calc(100% + 4px)", zIndex: 20,
            minWidth: 180, background: COLORS.white, border: `1px solid ${COLORS.gray200}`,
            borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", padding: 4,
          }}
        >
          {REPORT_ACTIONS.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => { setOpen(false); onAction?.(a.key); }}
              style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
                padding: "8px 10px", borderRadius: 6, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray900,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.gray200; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PublishPanel({
  tab = "data",
  onTabChange,

  // Data tab
  blockingDimensions = [],
  onPublishData,

  // Web Report — shared
  webReportState = "empty",
  onCreateReport,
  onOverwrite,

  // Web Report — create form
  reportName = "",
  onReportNameChange,
  reportArea,
  onPickReportArea,
  reportAreaKind,
  description = "",
  onDescriptionChange,
  sharing = "private",
  onSharingChange,
  sharedUsers = [],
  onRemoveUser,
  onAddUser,
  allowDataInput = false,
  onAllowDataInputChange,
  onCreateWebReport,
  onCancelCreate,

  // Web Report — existing
  report,
  onReportAction,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
      <SegmentedButton
        fullWidth
        options={[
          { value: "data", label: "Data" },
          { value: "web", label: "Web Report" },
        ]}
        value={tab}
        onChange={onTabChange}
      />

      {tab === "data" && (
        <>
          {blockingDimensions.length > 0 && (
            <Banner variant="warning" title="Publish is blocked">
              {blockingDimensions.join(", ")} {blockingDimensions.length === 1 ? "is a" : "are"} parent dimension{blockingDimensions.length === 1 ? "" : "s"} and must be resolved before publishing.
            </Banner>
          )}
          <Button variant="primary" style={{ width: "100%" }} disabled={blockingDimensions.length > 0} onClick={onPublishData}>
            Publish Data
          </Button>
        </>
      )}

      {tab === "web" && webReportState === "empty" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "24px 8px", textAlign: "center" }}>
          <i className="fa-regular fa-file-chart-column" style={{ fontSize: 40, color: COLORS.gray400 }} aria-hidden="true" />
          <div style={{ fontSize: 12, color: COLORS.gray600 }}>Create or overwrite an existing report</div>
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <Button variant="primary" style={{ flex: 1 }} leadingIcon={<i className="fa-solid fa-plus" />} onClick={onCreateReport}>
              Report
            </Button>
            <Button variant="secondary" style={{ flex: 1 }} onClick={onOverwrite}>
              Overwrite
            </Button>
          </div>
        </div>
      )}

      {tab === "web" && webReportState === "create" && (
        <>
          <Input label="Name" placeholder="Report name" value={reportName} onChange={(e) => onReportNameChange?.(e.target.value)} />

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray900 }}>Report Area</label>
            <button
              type="button"
              onClick={onPickReportArea}
              style={{
                display: "flex", alignItems: "center", gap: 8, width: "100%", height: 32, padding: "0 12px",
                borderRadius: 8, border: `1px solid ${COLORS.gray400}`, background: COLORS.white, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", textAlign: "left", boxSizing: "border-box",
              }}
            >
              <span style={{ flex: 1, fontSize: 12, color: reportArea ? COLORS.gray900 : COLORS.gray500 }}>
                {reportArea ?? "Select a range or table"}
              </span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 12, color: COLORS.gray600 }} aria-hidden="true" />
            </button>
            {reportArea && reportAreaKind && (
              <span style={{ fontSize: 12, color: COLORS.gray500 }}>
                {reportAreaKind === "table" ? "Uses this table's live layout" : "Uses a fixed sheet range"}
              </span>
            )}
          </div>

          <Textarea label="Description" placeholder="What is this report for?" value={description} onChange={(e) => onDescriptionChange?.(e.target.value)} size="small" />

          <Select
            label="Sharing"
            options={["Private", "Specified Users"]}
            value={sharing === "specified" ? "Specified Users" : "Private"}
            onChange={(v) => onSharingChange?.(v === "Specified Users" ? "specified" : "private")}
          />

          {sharing === "specified" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {sharedUsers.map((u) => (
                  <Tag key={u.id} size="small" canBeCleared onRemove={() => onRemoveUser?.(u.id)}>{u.name}</Tag>
                ))}
                <Button variant="ghost-blue" size="small" leadingIcon={<i className="fa-solid fa-plus" />} onClick={onAddUser}>
                  Add user
                </Button>
              </div>
              <Checkbox
                size="small"
                label="Allow data input and publish in the Web"
                checked={allowDataInput ? "checked" : "unchecked"}
                onChange={(checked) => onAllowDataInputChange?.(checked)}
              />
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" onClick={onCancelCreate}>Cancel</Button>
            <Button variant="primary" style={{ flex: 1 }} onClick={onCreateWebReport}>Create Web Report</Button>
          </div>
        </>
      )}

      {tab === "web" && webReportState === "existing" && report && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", height: 48,
            border: `1px solid ${COLORS.gray400}`, borderRadius: 8, background: COLORS.white, boxSizing: "border-box",
          }}>
            <i className="fa-regular fa-file-chart-column" style={{ fontSize: 16, color: COLORS.cobalt500 }} aria-hidden="true" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {report.name}
              </div>
              {report.meta && <div style={{ fontSize: 12, color: COLORS.gray500 }}>{report.meta}</div>}
            </div>
            <KebabMenu onAction={onReportAction} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {REPORT_ACTIONS.map((a) => (
              <Button key={a.key} variant="secondary" size="small" onClick={() => onReportAction?.(a.key)}>
                {a.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
