import { Button } from "folio-design-system";

export function Variants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button variant="primary">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="subtle-blue">Subtle action</Button>
      <Button variant="ghost-gray">Dismiss</Button>
      <Button variant="destructive">Delete source</Button>
      <Button variant="destructive-secondary">Remove</Button>
      <Button
        variant="ai"
        size="small"
        leadingIcon={<i className="fa-solid fa-sparkles" style={{ fontSize: 14 }} />}
      >
        Build with AI
      </Button>
    </div>
  );
}

export function WithIcons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button variant="primary" leadingIcon={<i className="fa-regular fa-plus" />}>
        Add source
      </Button>
      <Button variant="secondary" trailingIcon={<i className="fa-regular fa-chevron-right" />}>
        Next
      </Button>
      <Button
        variant="primary"
        leadingIcon={<i className="fa-regular fa-plus" />}
        trailingIcon={<i className="fa-regular fa-chevron-down" />}
      >
        Button
      </Button>
      <Button icon={<i className="fa-regular fa-bell" />} aria-label="Notifications" />
      <Button variant="ghost-gray" icon={<i className="fa-regular fa-xmark" />} aria-label="Close" size="small" />
    </div>
  );
}

export function States() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button variant="primary" state="hover">Hover</Button>
      <Button variant="primary" state="focused">Focused</Button>
      <Button variant="primary" loading>Saving</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button
        variant="primary"
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
      <Button variant="primary" size="large">Large</Button>
      <Button variant="primary" size="small">Small</Button>
    </div>
  );
}
