export interface ButtonGroupItem {
  /** Font Awesome <i> element for this segment (icon-only). */
  icon: JSX.Element;
  /** Required — every segment is an icon-only button. */
  "aria-label": string;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonGroupProps {
  items?: ButtonGroupItem[];
  style?: React.CSSProperties;
}

export function ButtonGroup(props: ButtonGroupProps): JSX.Element;
