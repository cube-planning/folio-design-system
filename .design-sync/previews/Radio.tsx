import { useState } from "react";
import { Radio } from "folio-design-system";

export function Unselected() {
  return <Radio name="demo1" value="a" label="Label" />;
}

export function Selected() {
  return <Radio name="demo2" value="a" selected label="Label" />;
}

export function Disabled() {
  return <Radio name="demo3" value="a" disabled label="Label" />;
}

export function DisabledSelected() {
  return <Radio name="demo4" value="a" selected disabled label="Label" />;
}

export function Small() {
  return <Radio name="demo5" value="a" selected size="small" label="Label" />;
}

export function Group() {
  const [value, setValue] = useState("month");
  const options = ["day", "week", "month"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map(opt => (
        <Radio
          key={opt}
          name="demo-group"
          value={opt}
          selected={value === opt}
          onChange={setValue}
          label={opt[0].toUpperCase() + opt.slice(1)}
        />
      ))}
    </div>
  );
}
