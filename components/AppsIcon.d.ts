export type AppsIconType =
  | "AI Plugin"
  | "PowerPoint"
  | "Google Slides"
  | "Excel"
  | "Google Sheets"
  | "Slack"
  | "Teams"
  | "Claude"
  | "ChatGPT";

export interface AppsIconProps {
  type?: AppsIconType;
  size?: number;
}

export function AppsIcon(props: AppsIconProps): JSX.Element;
