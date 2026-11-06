export interface FilterDropdownOption {
  label: string;
  value: string;
  selected?: boolean;
}

export interface FilterDropdownProps {
  label?: string;
  value?: string;
  count?: number;
  options?: FilterDropdownOption[];
  open?: boolean;
  onToggle?: () => void;
  onOptionToggle?: (value: string) => void;
  onApply?: () => void;
  onClear?: () => void;
}

export function FilterDropdown(props: FilterDropdownProps): JSX.Element;
