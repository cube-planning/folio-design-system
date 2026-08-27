export interface UserDropdownProps {
  name?: string;
  initials?: string;
  avatarColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function UserDropdown(props: UserDropdownProps): JSX.Element;
