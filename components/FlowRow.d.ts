import type { ReactNode } from "react";

export interface FlowRowProps {
  /** The FlowCards, in order. An arrow is inserted between each pair. */
  children?: ReactNode;
  /** Space below the panel in px. Default 24. */
  marginBottom?: number;
}

export function FlowRow(props: FlowRowProps): JSX.Element;
