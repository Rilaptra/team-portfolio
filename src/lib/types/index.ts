// lib/types.ts
export type NavItem = {
  id: string;
  title: string;
  href: string;
  children?: NavItem[]; // Properti 'children' ini yang bikin jadi pohon
};
