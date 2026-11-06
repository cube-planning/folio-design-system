import { CubeAddonSheetsDemo } from "folio-design-system";

export function SheetWithAddon() {
  // Fills its container, so give it a fixed frame.
  return (
    <div style={{ width: 1100, height: 640, zoom: 0.6, border: "1px solid #E1E3E1" }}>
      <CubeAddonSheetsDemo />
    </div>
  );
}
