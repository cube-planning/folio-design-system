import type { ReactNode } from "react";

// Note: keep every shape inline in FlowCardProps. design-sync copies only the Props
// interface into the emitted .d.ts, so named helper types would be left undefined.
export interface FlowCardProps {
  /** Caption above the card: "Source", "Connection" or "Destination". */
  label?: string;
  /**
   * The 40px leading tile: exactly one of { img: image URL } | { fa: Font Awesome name such as
   * "fa-table", rendered Solid } | { initial: single letter }. (A ready-made node also works at runtime.)
   */
  icon?: { img?: string; company?: string; flow?: "import" | "cube"; fa?: string; initial?: string };
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
  /**
   * Colored 12px line under the title, e.g. "Xero is Disconnected" (red), "Set Mapping Rules" (orange),
   * "Schedule Now" (blue). `icon` is an optional Font Awesome name such as "fa-wrench", rendered Solid.
   * `onClick` makes it a clickable button.
   */
  status?: { tone: "red" | "orange" | "blue"; icon?: string; text: string; onClick?: () => void };
  /** Node shown under the title block, e.g. a red Badge with "12 unmapped values". */
  badge?: ReactNode;
  /**
   * Icon-only plain-blue buttons (24x24) pinned to the card's top-right corner. `icon` is a Font Awesome
   * name such as "fa-arrows-rotate", rendered Regular. `label` is the accessible name (required unless
   * `tooltip` is set). `spinning` spins the icon (e.g. while syncing). (A ready-made node also works at runtime.)
   */
  actions?: Array<{ icon: string; label?: string; tooltip?: string; onClick?: () => void; spinning?: boolean }>;
  /** Node between the header and the button, e.g. Schedule / Date Range rows. */
  body?: ReactNode;
  /** Full-width small pill at the bottom. tone "danger" is the red-tinted variant, e.g. Mapping when values are unmapped. */
  button?: { label: string; onClick?: () => void; tone?: "default" | "danger" };
}

export function FlowCard(props: FlowCardProps): JSX.Element;
