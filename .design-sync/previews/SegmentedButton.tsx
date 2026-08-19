import { useState } from "react";
import { SegmentedButton } from "folio-design-system";

export function TwoOptions() {
  const [value, setValue] = useState("month");
  return (
    <SegmentedButton
      options={[
        { value: "month", label: "Month" },
        { value: "quarter", label: "Quarter" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

export function ThreeOptionsSelected() {
  return (
    <SegmentedButton
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
      value="week"
      onChange={() => {}}
    />
  );
}

export function FourOptionsSmall() {
  return (
    <SegmentedButton
      size="small"
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "queued", label: "Queued" },
        { value: "history", label: "History" },
      ]}
      value="active"
      onChange={() => {}}
    />
  );
}
