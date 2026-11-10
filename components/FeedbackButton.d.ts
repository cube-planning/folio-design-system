import type { CSSProperties, ReactNode } from "react";

export interface FeedbackButtonProps {
  /** Color category. Figma's "Nutral" typo is normalized to "neutral". */
  type?: "info" | "error" | "success" | "warning" | "ai" | "neutral";
  /** "plain" = labeled pill; "ghost" = icon-only dismiss button. */
  kind?: "plain" | "ghost";
  /** Label text, only rendered for kind="plain". */
  children?: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
  style?: CSSProperties;
}

export function FeedbackButton(props: FeedbackButtonProps): JSX.Element;
