export interface RangeBuilderProps {
  /** Everything that can be dragged. */
  dimensions?: { key: string; label: string }[];
  /** Dimension keys per zone. Every zone takes several, in drop order. */
  layout?: { columns: string[]; rows: string[]; filters: string[] };
  /** Fired with the next layout after a drop, a move, or a removal (X or drag back to the tray). */
  onChange?: (layout: { columns: string[]; rows: string[]; filters: string[] }) => void;
  /** A dimension's members for its selector, root first; `parentId` is null for the root. Omitted: a lone root named by `rootNameFor`. */
  membersFor?: (key: string) => { id: string; parentId: string | null; name: string }[];
  /** Root member name used only when `membersFor` is omitted, e.g. "All Markets". */
  rootNameFor?: (key: string) => string;
  excludeZeroRow?: boolean;
  onExcludeZeroRowChange?: (checked: boolean) => void;
}

export function RangeBuilder(props: RangeBuilderProps): JSX.Element;
