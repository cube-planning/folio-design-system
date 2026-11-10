export interface TabGroupTab {
  label: string;
  icon?: JSX.Element;
}

export interface TabGroupProps {
  tabs?: TabGroupTab[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  type?: "primary" | "secondary";
}

export function TabGroup(props: TabGroupProps): JSX.Element;
