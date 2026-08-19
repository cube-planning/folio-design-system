import { useState } from "react";
import { RadioButton } from "folio-design-system";

export function Unselected() {
  return <RadioButton name="demo1" value="a" label="Label" />;
}

export function Selected() {
  return <RadioButton name="demo2" value="a" selected label="Label" />;
}

export function Disabled() {
  return <RadioButton name="demo3" value="a" disabled label="Label" />;
}

export function DisabledSelected() {
  return <RadioButton name="demo4" value="a" selected disabled label="Label" />;
}

export function Small() {
  return <RadioButton name="demo5" value="a" selected size="small" label="Label" />;
}

export function Group() {
  const [value, setValue] = useState("month");
  const options = ["day", "week", "month"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map(opt => (
        <RadioButton
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
