import type { CSSProperties } from "react";

export interface FaviconProps {
  /** Tile background — "Dark" shows the cobalt tile with the white mark, "Light" shows the white tile with the full-color mark. */
  background?: "Dark" | "Light";
  style?: CSSProperties;
}

export function Favicon(props: FaviconProps): JSX.Element;
