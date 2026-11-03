// WorkflowListTemplate - the Workflows page.
//
// THIS IS THE TEMPLATE. Start every UI request from it. Render it first, exactly as it is, before you add anything.
// Never start from a blank file. On later requests, keep working from this template and the same slot.
// It already contains the whole page: side navigation, top bar, page header, stat cards,
// filter bar, search, and the workflows table. Every part is built from the components in
// folio-components.jsx and the tokens in tokens.css.
//
// To add a feature: put it in the marked SLOT below and nothing else. Do not rebuild, restyle or
// replace any other part of the page. Use the components from folio-components.jsx for anything new.
//
// State you can use in the slot:
//   selectedStatuses       array of the statuses currently chosen in the Status filter ([] means All)
//   setSelectedStatuses    update that array
//   visibleRows            the rows currently shown in the table

import { useState } from "react";
import {
  Button, Input, Filter, FilterDropdown, Table, Cell, PortalSideBarNav,
  CompanySwitcher, UserDropdown, Icon,
} from "./folio-components.jsx";

const ALL_ROWS = [
  { id: 1, name: "FY 2026 Planning", owner: "Jessica White", tasks: [0, 3], status: "Not Started" },
  { id: 2, name: "Quarter Forecasting Q2 2025", owner: "Andrew Miller", tasks: [6, 6], status: "In Progress" },
  { id: 3, name: "Scenario Planning", owner: "Karen Lee", tasks: [2, 7], status: "In Progress" },
  { id: 4, name: "Resource Allocation Strategies", owner: "Thomas Davis", tasks: [4, 5], status: "In Progress" },
  { id: 5, name: "Risk Assessment and Mitigation", owner: "Samantha Nelson", tasks: [0, 3], status: "Not Started" },
];

const STATUS_OPTIONS = ["Not Started", "In Progress", "Completed"];
const STATUS_COLOR = { "Not Started": "warning", "In Progress": "info", Completed: "success" };

const SHELL_CSS = `
  .wf-root, .wf-root * { box-sizing: border-box; }
  .wf-root { font-family: var(--font-base, 'DM Sans', sans-serif); }
  .wf-root button { font-family: inherit; }
`;

function StatCard({ label, value, max, note }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div
      style={{
        background: "var(--color-white, #FFFFFF)",
        border: "1px solid var(--color-gray-300, #E3E8EF)",
        borderRadius: 12,
        boxShadow: "var(--shadow-xs, 0px 1px 2px rgba(16,24,40,0.05))",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 12, lineHeight: "18px", color: "var(--color-gray-600, #677489)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: "var(--color-gray-900, #222B3A)", letterSpacing: "-0.01em" }}>{value}</span>
        {max != null && <span style={{ fontSize: 14, color: "var(--color-gray-600, #677489)" }}>/{max}</span>}
      </div>
      {note && <span style={{ fontSize: 12, color: "var(--color-gray-600, #677489)", marginTop: -4 }}>{note}</span>}
      {max != null && (
        <div style={{ height: 6, borderRadius: 9999, background: "var(--color-gray-200, #F2F5F9)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 9999, background: "var(--color-green-400, #70CF98)" }} />
        </div>
      )}
    </div>
  );
}

function HomeItem() {
  return (
    <button
      type="button"
      style={{
        display: "flex", alignItems: "center", gap: 8, width: "100%", height: 32, paddingLeft: 32, paddingRight: 16,
        border: "none", background: "var(--color-white, #FFFFFF)", color: "var(--color-gray-900, #222B3A)",
        fontSize: 14, lineHeight: "20px", cursor: "pointer", textAlign: "left",
      }}
    >
      <span style={{ width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
        <Icon name="house" />
      </span>
      Home
    </button>
  );
}

export default function WorkflowListTemplate() {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");

  const visibleRows = ALL_ROWS.filter((r) => {
    const byStatus = selectedStatuses.length === 0 || selectedStatuses.includes(r.status);
    const bySearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return byStatus && bySearch;
  });

  const count = (s) => ALL_ROWS.filter((r) => r.status === s).length;
  const total = ALL_ROWS.length;

  const columns = [
    {
      key: "name", label: "Name",
      render: (v) => <Cell.Link icon={<Icon name="layer-group" />}>{v}</Cell.Link>,
    },
    { key: "owner", label: "Owner", render: (v) => <Cell.User name={v} /> },
    { key: "tasks", label: "Tasks", render: (v) => <Cell.Progress value={v[0]} max={v[1]} color="var(--color-green-400, #70CF98)" /> },
    {
      key: "status", label: "Status",
      render: (v) => <Cell.Status color={STATUS_COLOR[v] ?? "neutral"} size="lg" selectable>{v}</Cell.Status>,
    },
    {
      key: "_a", label: "", sortable: false, align: "right",
      render: () => (
        <Cell.Actions>
          <Cell.ActionButton aria-label="Duplicate" icon={<Icon name="copy" style={{ fontSize: 14 }} />} />
        </Cell.Actions>
      ),
    },
  ];

  return (
    <div className="wf-root" style={{ display: "flex", height: "100vh", background: "var(--color-cobalt-25, #F5F7FA)", color: "var(--color-gray-900, #222B3A)" }}>
      <style>{SHELL_CSS}</style>

      {/* ---------- Side navigation (shell) ---------- */}
      <aside style={{ width: 255, minWidth: 255, padding: 8, height: "100vh" }}>
        <div
          style={{
            background: "var(--color-white, #FFFFFF)", borderRadius: 8, height: "100%", display: "flex", flexDirection: "column",
            overflow: "hidden", boxShadow: "0px 4px 8px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ height: 48, padding: "16px 12px 0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--color-gray-600, #677489)" }}>
              <span style={{ color: "var(--color-cobalt-500, #173D82)", fontSize: 14 }}><Icon name="buildings" solid /></span>
              Accuplanner Inc
            </span>
            <button type="button" aria-label="Collapse navigation" style={{ width: 28, height: 28, border: "none", background: "transparent", borderRadius: 4, color: "var(--color-gray-700, #4A5567)", cursor: "pointer", fontSize: 14 }}>
              <Icon name="arrow-left" />
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
            <HomeItem />
            <div style={{ height: 1, background: "var(--color-gray-300, #E3E8EF)", margin: "8px 0" }} />
            <PortalSideBarNav expanded activeItemId="workflows" style={{ width: "100%" }} />
          </div>
        </div>
      </aside>

      {/* ---------- Main column ---------- */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{ height: 80, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <CompanySwitcher companyName="Accuplanner Inc" />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button type="button" aria-label="Background tasks" style={{ width: 32, height: 32, border: "none", background: "transparent", color: "var(--color-gray-700, #4A5567)", cursor: "pointer", fontSize: 15 }}>
              <Icon name="database" />
            </button>
            <button type="button" aria-label="Help" style={{ width: 32, height: 32, border: "none", background: "transparent", color: "var(--color-gray-700, #4A5567)", cursor: "pointer", fontSize: 15 }}>
              <Icon name="circle-question" />
            </button>
            <button
              type="button"
              aria-label="AI assistant"
              style={{ width: 28, height: 28, border: "none", borderRadius: 9999, background: "var(--color-gradient-ai, linear-gradient(135deg, #7A5AF8 10%, #9B8AFB 50%, #6938EF 100%))", color: "#FFFFFF", cursor: "pointer", fontSize: 13 }}
            >
              <Icon name="sparkles" solid />
            </button>
            <UserDropdown name="Nina Graham" avatarColor="#2DD4BF" />
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24, paddingTop: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Page header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24, width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--color-gray-900, #222B3A)" }}>
                    <Icon name="layer-group" />
                  </span>
                  <h1 style={{ margin: 0, fontSize: 24, lineHeight: "32px", fontWeight: 700, color: "var(--color-gray-900, #222B3A)" }}>Workflows</h1>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: "20px", color: "var(--color-gray-600, #677489)" }}>
                  Orchestrate finance-led processes to keep them structured, visible, and on track.
                </p>
              </div>
              <Button variant="primary" size="large" leadingIcon={<Icon name="plus" />}>Workflow</Button>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, margin: "16px 0" }}>
              <StatCard label="Total Workflows" value={total} note="across all statuses" />
              <StatCard label="In Progress" value={count("In Progress")} max={total} />
              <StatCard label="Complete" value={count("Completed")} max={total} />
              <StatCard label="Not started" value={count("Not Started")} max={total} />
            </div>

            {/* Filter bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, margin: "8px 0 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-gray-900, #222B3A)", whiteSpace: "nowrap" }}>Filter by:</span>
                <FilterDropdown
                  label="Status"
                  value={selectedStatuses.length ? `${selectedStatuses.length} selected` : "All"}
                  count={selectedStatuses.length}
                  open={filterOpen}
                  onToggle={() => setFilterOpen((o) => !o)}
                  options={STATUS_OPTIONS.map((s) => ({ label: s, value: s, selected: selectedStatuses.includes(s) }))}
                  onOptionToggle={(v) => setSelectedStatuses((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]))}
                  onApply={() => setFilterOpen(false)}
                  onClear={() => setSelectedStatuses([])}
                />
              </div>
              <div style={{ width: 250, flexShrink: 0 }}>
                <Input
                  size="large"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  leadingIcon={<Icon name="magnifying-glass" />}
                />
              </div>
            </div>

            {/* ===================================================================== */}
            {/* SLOT: the new feature goes here, between the filter bar and the table. */}
            {/* Everything else in this file is the template. Leave it as it is.       */}
            {/* ===================================================================== */}
            <div data-slot="new-feature" />

            {/* Workflows table */}
            <Table columns={columns} rows={visibleRows} />
          </div>
        </main>
      </div>
    </div>
  );
}
