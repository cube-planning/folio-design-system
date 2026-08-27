import type { CSSProperties } from "react";

export interface LogoProps {
  /** Tile background — "Dark" shows the cobalt tile with the white wordmark, "Light" shows the white tile with the full-color wordmark. */
  background?: "Dark" | "Light";
  style?: CSSProperties;
}

export function Logo(props: LogoProps): JSX.Element;
