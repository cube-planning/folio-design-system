import type { CSSProperties } from "react";

export interface CompanySwitcherProps {
  /** Active company's display name. Default "[Company name]" (Figma placeholder). */
  companyName?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export function CompanySwitcher(props: CompanySwitcherProps): JSX.Element;
