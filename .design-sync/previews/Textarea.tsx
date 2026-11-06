import { Textarea } from "folio-design-system";

export function Canonical() {
  return (
    <Textarea
      label="Release notes"
      placeholder="Summarize what changed for customers..."
      value="Added bulk export for scenario comparisons and fixed a rounding bug in the forecast table."
    />
  );
}

export function StateSweep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Textarea label="Comment" placeholder="Add a comment..." state="default" />
      <Textarea label="Comment" placeholder="Add a comment..." state="focused" value="Looks good, ready to ship." />
      <Textarea
        label="Reason for rejection"
        required
        placeholder="Explain what needs to change"
        state="error"
        value="n/a"
        errorMessage="This field can't be left this short"
      />
      <Textarea
        label="Internal notes"
        placeholder="Add a comment..."
        state="disabled"
        value="Locked after approval on Aug 12."
        disabled
      />
    </div>
  );
}

export function WithCharCount() {
  return (
    <Textarea
      label="Bio"
      placeholder="Tell us about yourself"
      value="Staff Product Designer focused on data-dense B2B tools."
      charCount
      maxChars={160}
    />
  );
}

export function SizeSweep() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
      <Textarea size="large" label="Large" placeholder="Add a comment..." />
      <Textarea size="small" label="Small" placeholder="Add a comment..." />
    </div>
  );
}
