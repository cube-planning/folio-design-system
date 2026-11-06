import type { FilterDropdownProps } from "./FilterDropdown";

export interface SearchAndFilterProps {
  filters?: FilterDropdownProps[];
  onClearAll?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}

export function SearchAndFilter(props: SearchAndFilterProps): JSX.Element;
