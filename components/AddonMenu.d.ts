import type { ReactNode } from "react";

export interface AddonMenuProps {
  /** Menu rows. `icon` is a Font Awesome <i/> element. */
  items?: { id: string; label: string; icon?: ReactNode }[];
  onSelect?: (id: string) => void;
  /** Called on an outside click. */
  onClose?: () => void;
}

export function AddonMenu(props: AddonMenuProps): JSX.Element;
