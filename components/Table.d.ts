import * as React from "react";

export interface TableRowMeta {
  /** Depth in the tree, 0 for top-level rows. */
  level: number;
  /** True when the row has children. The table draws the caret; render only the label. */
  isGroup: boolean;
  /** True when a group row is currently open. */
  expanded: boolean;
}

export interface TableColumn<Row = TableRow> {
  key: string;
  label: React.ReactNode;
  /** Header click sorts by this key. Default true. */
  sortable?: boolean;
  align?: "left" | "right";
  /** Draws the cell. The third argument tells a cell where it sits in a tree. */
  render?: (value: any, row: Row, meta: TableRowMeta) => React.ReactNode;
}

export interface TableRow {
  /** Required in a tree: expanded state is keyed on it. */
  id?: string | number;
  /** A row with children is a group row. Nested rows indent per level. */
  children?: TableRow[];
  /** Start this group collapsed. Groups start open by default. */
  defaultExpanded?: boolean;
  [key: string]: any;
}

export interface TableProps {
  columns?: TableColumn[];
  rows?: TableRow[];
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
}

export function Table(props: TableProps): JSX.Element;
