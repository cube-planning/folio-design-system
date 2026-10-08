import type { ReactNode } from "react";

export interface FlowCardIcon {
  /** Image URL, rendered in the 40px tile. */
  img?: string;
  /** Font Awesome icon name, e.g. "fa-table". Rendered Solid on a gray tile. */
  fa?: string;
  /** Single letter on a gray tile. */
  initial?: string;
}

export interface FlowCardAction {
  /** Font Awesome icon name, e.g. "fa-arrows-rotate". Rendered Regular. */
  icon: string;
  /** Accessible name. Required unless `tooltip` is set. */
  label?: string;
  /** Tooltip text shown on hover and focus. */
  tooltip?: string;
  onClick?: () => void;
  /** Spins the icon (e.g. while syncing). */
  spinning?: boolean;
}

export interface FlowCardStatus {
  tone: "red" | "orange" | "blue";
  /** Optional Font Awesome icon name, rendered Solid, e.g. "fa-wrench". */
  icon?: string;
  text: string;
  /** Makes the line a clickable button. */
  onClick?: () => void;
}

export interface FlowCardButton {
  label: string;
  onClick?: () => void;
  /** "danger" is the red-tinted variant, e.g. Mapping when values are unmapped. */
  tone?: "default" | "danger";
}

export interface FlowCardProps {
  /** Caption above the card: "Source", "Connection" or "Destination". */
  label?: string;
  /** A node, or { img } | { fa } | { initial }. */
  icon?: ReactNode | FlowCardIcon;
  /** "circle" is for source logos. Default "rounded". */
  iconShape?: "circle" | "rounded";
  /** Single line; truncates with an ellipsis and shows the full text in a Tooltip when clipped. */
  title: string;
  /** CSS color override for the title. */
  titleColor?: string;
  /** Makes the title a link (blue). */
  onTitleClick?: () => void;
  /** Neutral 12px text under the title. */
  subtitle?: string;
  /** Colored 12px line under the title. */
  status?: FlowCardStatus;
  /** Node shown under the title block, e.g. a red Badge. */
  badge?: ReactNode;
  /** Icon-only plain-blue buttons pinned to the top-right corner; a node is accepted as an escape hatch. */
  actions?: FlowCardAction[] | ReactNode;
  /** Node between the header and the button. */
  body?: ReactNode;
  /** Full-width small pill at the bottom. */
  button?: FlowCardButton;
}

export function FlowCard(props: FlowCardProps): JSX.Element;
