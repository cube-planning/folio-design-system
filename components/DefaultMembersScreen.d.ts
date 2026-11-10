export interface DefaultMembersScreenProps {
  /** One row per dimension. `defaultName` present means a company default is set. */
  dimensions?: { key: string; label: string; defaultName?: string; automaticName: string; meta?: string }[];
  /** May change defaults. Viewers get a "View only" badge and read-only rows. Default true. */
  canEdit?: boolean;
  onSelect?: (key: string) => void;
  /** Hover Reset on a set row (admins only). */
  onReset?: (key: string) => void;
  onBack?: () => void;
}

export function DefaultMembersScreen(props: DefaultMembersScreenProps): JSX.Element;
