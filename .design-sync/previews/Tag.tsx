import { Tag } from "folio-design-system";

export function Default() {
  return <Tag>Item</Tag>;
}

export function Clearable() {
  return <Tag canBeCleared onRemove={() => {}}>Item</Tag>;
}

export function Small() {
  return <Tag size="small">Item</Tag>;
}

export function SmallClearable() {
  return <Tag size="small" canBeCleared onRemove={() => {}}>Item</Tag>;
}
