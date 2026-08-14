import { Text } from "folio-design-system";

export function Scale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text variant="display-1" weight="bold">Display 1</Text>
      <Text variant="display-3" weight="semibold">Display 3</Text>
      <Text variant="title-1" weight="semibold">Title 1</Text>
      <Text variant="title-3" weight="bold">Title 3</Text>
      <Text variant="body">Body regular — the default for UI copy.</Text>
      <Text variant="body" weight="semibold">Body semibold — emphasized inline text.</Text>
      <Text variant="caption-1">Caption 1 — hint and helper text.</Text>
      <Text variant="caption-2">Caption 2 — micro labels and metadata.</Text>
    </div>
  );
}

export function MonoData() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text variant="body" mono>128,540</Text>
      <Text variant="caption-1" mono>2026-08-13 09:41:02</Text>
      <Text variant="caption-2" mono>+4.2%</Text>
    </div>
  );
}

export function ColorOverride() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text variant="title-3" weight="semibold" color="var(--color-cobalt-700)">
        Section heading
      </Text>
      <Text variant="body" color="var(--color-gray-600)">
        Secondary body copy in a muted gray.
      </Text>
    </div>
  );
}
