import { Checkbox } from "folio-design-system";

export function Unchecked() {
  return <Checkbox label="Label" />;
}

export function Checked() {
  return <Checkbox checked="checked" label="Label" />;
}

export function Mixed() {
  return <Checkbox checked="mixed" label="Label" />;
}

export function Disabled() {
  return <Checkbox checked="checked" disabled label="Label" />;
}

export function Small() {
  return <Checkbox checked="checked" size="small" label="Label" />;
}
