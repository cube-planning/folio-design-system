import type { ReactNode } from "react";

export interface DefaultMemberPickerProps {
  /** Dimension name shown in the title, e.g. "Scenario". */
  dimension: string;
  /** Flat member list; `members[0]` is the root. `parentId` is null for the root. */
  members: { id: string; parentId: string | null; name: string }[];
  /** The company default member id, or null when none is set (automatic applies). */
  defaultId?: string | null;
  /** The member this user already filtered on, or null. */
  appliedId?: string | null;
  /** May change the default. Viewers see a lock and a permission tooltip. Default true. */
  canEdit?: boolean;
  /** "filter" picks a member for a range (Apply filter); "default" is the admin flow (Done). Default "filter". */
  mode?: "filter" | "default";
  /** Open with the "Reset to automatic?" confirm sheet already showing. */
  startWithReset?: boolean;
  /** Fired after the admin confirms: a member id to set, or null to reset to automatic. */
  onDefaultChange?: (id: string | null) => void;
  /** "filter" mode primary action; receives the highlighted member id. */
  onApply?: (id: string) => void;
  onCancel?: () => void;
  /** Back chevron, and the "default" mode Done button. */
  onBack?: () => void;
  /** Cap the member list height in px; omit to fill the container. */
  maxListHeight?: number;
}

export function DefaultMemberPicker(props: DefaultMemberPickerProps): JSX.Element;
