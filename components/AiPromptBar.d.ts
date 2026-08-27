export interface AiPromptBarProps {
  size?: "large" | "small";
  state?: "default" | "hover" | "focused" | "error" | "disabled";
  expanded?: boolean;
  splitButton?: boolean;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  helperText?: string;
  showHelperText?: boolean;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
  onSplitAction?: () => void;
  style?: React.CSSProperties;
}

export function AiPromptBar(props: AiPromptBarProps): JSX.Element;
