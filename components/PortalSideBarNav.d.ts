import type { CSSProperties } from "react";

export interface PortalSideBarNavProps {
  /** Whole-rail state: true = 256px labeled rail, false = 48px icon-only rail. Default true. */
  expanded?: boolean;
  /**
   * Per-section accordion open state, keyed by section id
   * ("reporting" | "planning" | "modeling" | "data" | "admin" | "apps").
   * Only meaningful when `expanded` is true. Uncontrolled (managed
   * internally, all open by default) if omitted.
   */
  expandedSections?: Record<string, boolean>;
  /** Controlled accordion toggle. If omitted, the component manages its own state. */
  onToggleSection?: (sectionId: string) => void;
  /** Id of the currently highlighted nav item. */
  activeItemId?: string;
  onItemClick?: (itemId: string) => void;
  style?: CSSProperties;
}

export function PortalSideBarNav(props: PortalSideBarNavProps): JSX.Element;
