import { Button } from "folio-design-system";

export function Variants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button type="primary">Save changes</Button>
      <Button type="secondary">Cancel</Button>
      <Button type="subtle-blue">Subtle action</Button>
      <Button type="ghost-gray">Dismiss</Button>
      <Button type="destructive">Delete source</Button>
      <Button type="destructive-secondary">Remove</Button>
    </div>
  );
}

export function WithIcons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button type="primary" leadingIcon={<i className="fa-regular fa-plus" />}>
        Add source
      </Button>
      <Button type="secondary" trailingIcon={<i className="fa-regular fa-chevron-right" />}>
        Next
      </Button>
      <Button
        type="primary"
        leadingIcon={<i className="fa-regular fa-plus" />}
        trailingIcon={<i className="fa-regular fa-chevron-down" />}
      >
        Button
      </Button>
      <Button icon={<i className="fa-regular fa-bell" />} aria-label="Notifications" />
      <Button type="ghost-gray" icon={<i className="fa-regular fa-xmark" />} aria-label="Close" size="small" />
    </div>
  );
}

export function States() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button type="primary" state="hover">Hover</Button>
      <Button type="primary" state="focused">Focused</Button>
      <Button type="primary" loading>Saving</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button
        type="primary"
        loading
        trailingIcon={<i className="fa-regular fa-chevron-down" />}
      >
        Button
      </Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button type="primary" size="large">Large</Button>
      <Button type="primary" size="small">Small</Button>
    </div>
  );
}
