import { CubeText } from 'folio-design-system';

export function TypeScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8 }}>
      <CubeText variant="display-1" weight="bold">Display 1 — 48px bold</CubeText>
      <CubeText variant="display-2" weight="semibold">Display 2 — 36px semibold</CubeText>
      <CubeText variant="display-3">Display 3 — 30px regular</CubeText>
      <CubeText variant="display-4" weight="medium">Display 4 — 24px medium</CubeText>
      <CubeText variant="title-1" weight="semibold">Title 1 — 20px semibold</CubeText>
      <CubeText variant="title-2">Title 2 — 18px regular</CubeText>
      <CubeText variant="title-3" weight="bold">Title 3 — 16px bold</CubeText>
      <CubeText variant="body">Body — 14px regular. The quick brown fox jumps over the lazy dog.</CubeText>
      <CubeText variant="caption-1" color="#6B7280">Caption 1 — 12px, helper text or metadata.</CubeText>
      <CubeText variant="caption-2" color="#9CA3AF">Caption 2 — 10px, micro labels and axis ticks.</CubeText>
    </div>
  );
}

export function Weights() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <CubeText variant="body" weight="regular">Body Regular — The main reading weight</CubeText>
      <CubeText variant="body" weight="medium">Body Medium — Emphasized inline text</CubeText>
      <CubeText variant="body" weight="semibold">Body Semibold — Table headers and labels</CubeText>
      <CubeText variant="body" weight="bold">Body Bold — Strong emphasis</CubeText>
    </div>
  );
}

export function MonoData() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <CubeText variant="body" mono>42,819 — JetBrains Mono body size</CubeText>
      <CubeText variant="caption-1" mono>$1,234.56 — numeric value at caption-1</CubeText>
      <CubeText variant="caption-2" mono color="#6B7280">99.8% — axis tick at caption-2</CubeText>
    </div>
  );
}
