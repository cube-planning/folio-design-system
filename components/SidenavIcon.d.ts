import type { CSSProperties, ReactNode } from "react";

export interface SidenavIconProps {
  /** Font Awesome glyph element, e.g. <i className="fa-regular fa-chart-line" /> */
  icon?: ReactNode;
  /** Glyph size in px. Default 14 (matches Figma's Icon node). */
  size?: number;
  /** Centered hit-box size in px. Default 22 (matches Figma's IconWrapper node). */
  wrapperSize?: number;
  style?: CSSProperties;
}

export function SidenavIcon(props: SidenavIconProps): JSX.Element;
