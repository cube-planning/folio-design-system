import type { ReactNode } from "react";

export interface GoogleSheetMockProps {
  /** Document title, e.g. "2026 P&L". */
  title?: string;
  /** The sheets (tabs). `header` and `rows` are arrays of strings; `rows` index `boldRows` / `indentRows`. */
  sheets?: {
    id: string;
    name: string;
    header: string[];
    rows: string[][];
    /** Per column, "left" or "right". */
    aligns?: ("left" | "right")[];
    /** Per column width in px; default 160. */
    widths?: number[];
    /** "pivot" paints the header row cobalt with white text. */
    style?: "plain" | "pivot";
    boldRows?: number[];
    indentRows?: number[];
  }[];
  /** Which sheet shows. Defaults to the first. */
  activeSheetId?: string;
  onSelectSheet?: (id: string) => void;
  /** A1-style ref shown in the name box and outlined, e.g. "B2". Default "A1". */
  selectedCell?: string;
  /** The add-on, docked on the right. */
  sidePanel?: ReactNode;
}

export function GoogleSheetMock(props: GoogleSheetMockProps): JSX.Element;
