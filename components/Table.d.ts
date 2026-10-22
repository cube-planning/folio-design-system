import * as React from "react";

export interface TableRowMeta {
  /** Depth in the tree, 0 for top-level rows. */
  level: number;
  /** True when the row has children. The table draws the caret; render only the label. */
  isGroup: boolean;
  /** True when a group row is currently open. */
  expanded: boolean;
  /** Position of the row in the rendered (sorted, expanded) list. */
  rowIndex: number;
}

export interface TableCellRef {
  rowKey: string | number;
  colKey: string;
}

export interface TableSelectAll {
  state: "checked" | "unchecked" | "indeterminate";
  onToggle: () => void;
}

export interface TableColumn<Row = TableRow> {
  key: string;
  /** A string is uppercased. A node (checkbox, filter button, hint pill) is rendered as given. */
  label: React.ReactNode;
  /** Small secondary line under the label. */
  headerHint?: React.ReactNode;
  /** Header click sorts by this key. Default true. `false` hides the sort icon and the click. */
  sortable?: boolean;
  align?: "left" | "right";
  /** Fixed width and minimum width in px (or any CSS length). */
  width?: number | string;
  minWidth?: number | string;
  /** Freeze this column. Overrides `stickyColumns`. Frozen columns must be contiguous from the left. */
  sticky?: boolean;
  /** Draws the cell. The third argument tells a cell where it sits in a tree and in the list. */
  render?: (value: any, row: Row, meta: TableRowMeta) => React.ReactNode;
  /** Per-cell overrides: color, background, fontWeight. Return nothing for no override. */
  cellStyle?: (value: any, row: Row) => React.CSSProperties | undefined | null | false;
  /** Header cell overrides. */
  headerStyle?: React.CSSProperties;
  /** Cells in this column can enter edit mode (needs `renderEditor`; in `variant="grid"` an editable column without one is always an input). */
  editable?: boolean;
  /** Draws the editor in place of the content for the cell named by `editingCell`. */
  renderEditor?: (value: any, row: Row, onCommit: (value: any) => void, onCancel: () => void) => React.ReactNode;
  /** Header checkbox. `onToggle` fires on click; the table never selects rows itself. */
  selectAll?: TableSelectAll;
}

export interface TableRow {
  /** Required in a tree: expanded state is keyed on it. */
  id?: string | number;
  /** A row with children is a group row. Nested rows indent per level. */
  children?: TableRow[];
  /** Start this group collapsed. Groups start open by default. */
  defaultExpanded?: boolean;
  /** Makes the row clickable: pointer cursor and hover background. */
  _onClick?: (row: TableRow, event: React.MouseEvent) => void;
  /** Row overrides. `borderTop` is drawn on each cell. */
  _style?: { background?: string; color?: string; fontWeight?: React.CSSProperties["fontWeight"]; borderTop?: string };
  _className?: string;
  /** Applies the selected row background. */
  _selected?: boolean;
  [key: string]: any;
}

export interface TableProps {
  columns?: TableColumn[];
  rows?: TableRow[];
  /** Merged onto the root, which is the scroll container: pass `maxHeight`, `height`, `padding`. */
  style?: React.CSSProperties;
  /** Key of the column that carries the caret and indent. Defaults to the first column. */
  treeColumn?: string;
  /** Initial expansion: "all" (default), "none", or an array of row ids. */
  defaultExpanded?: "all" | "none" | Array<string | number>;
  /** Control expansion from outside, e.g. to force groups open while filtering. */
  expandedIds?: Array<string | number>;
  onExpandedChange?: (ids: Array<string | number>) => void;
  /** Pixels of indent per level. Default 24. */
  indent?: number;

  /** Header stays pinned to the top of the root while rows scroll. Use `padding: 0` in `style` to sit flush. */
  stickyHeader?: boolean;
  /** Freeze the first N columns. Offsets are measured, not hardcoded. Default 0. */
  stickyColumns?: number;

  /** Controlled sort. When `sortKey` is passed (even null) the table never reorders rows itself. */
  sortKey?: string | null;
  sortDir?: "asc" | "desc";
  onSortChange?: (key: string, dir: "asc" | "desc") => void;

  /** Field name or function giving each row's key. Default `row.id ?? index`. */
  rowKey?: string | ((row: TableRow, index: number) => string | number);
  /** "default" = 48px rows, 8px cell padding. "compact" = 40px rows, 12px cell padding. */
  density?: "default" | "compact";
  /** "grid" = dense editor: 1px cell borders, square outer corners, inputs fill their cells. */
  variant?: "default" | "grid";

  /** The one cell currently in edit mode. */
  editingCell?: TableCellRef | null;
  /** Fired on double-click of an editable cell. Set `editingCell` in response. */
  onEditStart?: (cell: TableCellRef) => void;
  onCellCommit?: (cell: TableCellRef, value: any, row: TableRow) => void;
  onCellCancel?: (cell: TableCellRef) => void;

  /** Centered message inside the card when `rows` is empty. */
  emptyState?: React.ReactNode;
}

export interface EditableCellProps {
  value?: string | number | null;
  /** Enter or blur. */
  onCommit?: (value: string) => void;
  /** Escape. */
  onCancel?: () => void;
  placeholder?: string;
  align?: "left" | "right";
  /** Stay mounted and commit only on change (the grid variant's always-on inputs). */
  persistent?: boolean;
  "aria-label"?: string;
}

export interface TableHeaderFilterProps {
  options?: Array<{ value: string | number; label: React.ReactNode }>;
  value?: Array<string | number>;
  onChange?: (value: Array<string | number>) => void;
  /** Checkbox list (default) or single choice. */
  multiple?: boolean;
  /** Replaces the option list with your own menu content. */
  children?: React.ReactNode;
  /** Accessible name of the button. */
  label?: string;
  /** Menu width in px. Default 220. */
  width?: number;
}

export declare function EditableCell(props: EditableCellProps): JSX.Element;

export declare function Table(props: TableProps): JSX.Element;
export declare namespace Table {
  function HeaderFilter(props: TableHeaderFilterProps): JSX.Element;
  const EditableCell: typeof import("./Table").EditableCell;
}
