import { CubeSegmented } from 'folio-design-system';

const PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

const VIEW_OPTIONS = [
  { value: "table", label: "Table" },
  { value: "chart", label: "Chart" },
];

export function PeriodSelector() {
  return (
    <div style={{ padding: 8 }}>
      <CubeSegmented options={PERIOD_OPTIONS} value="monthly" />
    </div>
  );
}

export function ViewToggle() {
  return (
    <div style={{ padding: 8 }}>
      <CubeSegmented options={VIEW_OPTIONS} value="chart" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8 }}>
      <CubeSegmented options={PERIOD_OPTIONS} value="quarterly" size="large" />
      <CubeSegmented options={PERIOD_OPTIONS} value="quarterly" size="small" />
    </div>
  );
}
