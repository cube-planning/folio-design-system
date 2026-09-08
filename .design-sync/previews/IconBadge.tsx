import { IconBadge } from "folio-design-system";

export function Hues() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <IconBadge icon="fa-regular fa-database" hue="teal" />
      <IconBadge icon="fa-regular fa-chart-line" hue="cyan" />
      <IconBadge icon="fa-regular fa-circle-check" hue="emerald" />
      <IconBadge icon="fa-regular fa-layer-group" hue="indigo" />
      <IconBadge icon="fa-regular fa-sliders" hue="fuchsia" />
      <IconBadge icon="fa-regular fa-triangle-exclamation" hue="orange" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <IconBadge icon="fa-regular fa-database" hue="indigo" size="xs" />
      <IconBadge icon="fa-regular fa-database" hue="indigo" size="sm" />
      <IconBadge icon="fa-regular fa-database" hue="indigo" size="md" />
      <IconBadge icon="fa-regular fa-database" hue="indigo" size="lg" />
      <IconBadge icon="fa-regular fa-database" hue="indigo" size="xl" />
      <IconBadge icon="fa-regular fa-database" hue="indigo" size="2xl" />
    </div>
  );
}
