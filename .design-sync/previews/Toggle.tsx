import { useState } from "react";
import { Toggle } from "folio-design-system";

export function On() {
  const [checked, setChecked] = useState(true);
  return <Toggle checked={checked} onChange={setChecked} label="Auto-sync enabled" id="toggle-on" />;
}

export function Off() {
  const [checked, setChecked] = useState(false);
  return <Toggle checked={checked} onChange={setChecked} label="Auto-sync enabled" id="toggle-off" />;
}

export function Disabled() {
  return <Toggle checked={true} disabled label="Managed by admin" id="toggle-disabled" />;
}
