import type { CSSProperties, ReactNode } from "react";

export interface ToastProps {
  /** Color category. Figma's "Nutral" typo is normalized to "neutral". */
  type?: "success" | "warning" | "error" | "info" | "ai" | "neutral";
  /** SemiBold lead line. */
  title?: ReactNode;
  /** Body copy, rendered below the title. */
  children?: ReactNode;
  /** Label for the trailing labeled action button, or `false` to omit it. Defaults to "Button". */
  button?: ReactNode | false;
  onButtonClick?: () => void;
  /** Whether the trailing dismiss (×) button renders. Defaults to true. */
  dismissable?: boolean;
  onDismiss?: () => void;
  style?: CSSProperties;
}

export function Toast(props: ToastProps): JSX.Element;
