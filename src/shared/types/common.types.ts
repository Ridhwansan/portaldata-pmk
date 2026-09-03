export type FileFormat = 'CSV' | 'JSON' | 'XLS';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}
