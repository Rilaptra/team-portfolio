import React from "react";
// lib/types.ts
export type NavItem = {
  title: string;
  href: string;
  children?: NavItem[]; // Properti 'children' ini yang bikin jadi pohon
};

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  size: number | { width: number; height: number };
  className?: string;
}
