// lib/types.ts
export type NavItem = {
  title: string;
  href: string;
  children?: NavItem[]; // Properti 'children' ini yang bikin jadi pohon
};

export interface SVGLogoProps {
  size: number | { width: number; height: number };
  className?: string;
}
