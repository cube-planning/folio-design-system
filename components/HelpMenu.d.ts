export interface HelpMenuProps {
  onHelpCenterClick?: () => void;
  onWhatsNewClick?: () => void;
  onFeedbackClick?: () => void;
  onStatusClick?: () => void;
  style?: React.CSSProperties;
}

export function HelpMenu(props: HelpMenuProps): JSX.Element;
