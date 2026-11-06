export interface BreadcrumbItem {
  label: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  type?: "addOn" | "portal";
  items?: BreadcrumbItem[];
  style?: React.CSSProperties;
}

export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
