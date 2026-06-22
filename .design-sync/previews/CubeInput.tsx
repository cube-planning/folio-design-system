import { CubeInput } from 'folio-design-system';

export function States() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 8, maxWidth: 320 }}>
      <CubeInput label="Default" placeholder="Enter text" state="default" />
      <CubeInput label="Focused" placeholder="Enter text" state="focused" />
      <CubeInput label="Populated" value="Accrual basis" state="populated-inactive" />
      <CubeInput label="Disabled" placeholder="Disabled" disabled />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ padding: 8, maxWidth: 320 }}>
      <CubeInput
        label="Date"
        value="13/45/2024"
        state="error"
        errorMessage="Enter a valid date (MM/DD/YYYY)"
      />
    </div>
  );
}

export function WithCharCount() {
  return (
    <div style={{ padding: 8, maxWidth: 320 }}>
      <CubeInput
        label="Description"
        placeholder="Describe the scenario..."
        value="Q3 pipeline review"
        charCount
        maxChars={120}
        state="populated-active"
      />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8, maxWidth: 320 }}>
      <CubeInput size="large" label="Large (32px)" placeholder="Text" />
      <CubeInput size="small" label="Small (28px)" placeholder="Text" />
    </div>
  );
}
