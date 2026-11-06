import { ListItem } from "folio-design-system";

export function Default() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="Ava Chen" />
    </div>
  );
}

export function Selected() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="Ava Chen" selected />
    </div>
  );
}

export function MultiUnchecked() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="Ava Chen" multi checked="unchecked" />
    </div>
  );
}

export function MultiChecked() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="Ava Chen" multi checked="checked" />
    </div>
  );
}

export function MultiMixed() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="All owners" multi checked="mixed" tree expanded />
    </div>
  );
}

export function Tree() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="Sales" tree expanded />
      <ListItem label="West region" level={1} />
      <ListItem label="East region" level={1} />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 240 }}>
      <ListItem label="Tobias Reyes" disabled />
    </div>
  );
}
