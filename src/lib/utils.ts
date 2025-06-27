import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random<T extends string>(min: T[]): T;
export function random(min: number): number;
export function random(min: number, max: number): number;
export function random<T extends string | number>(
  min: T[] | number,
  max?: number,
): T | number {
  if (Array.isArray(min)) return min[Math.floor(Math.random() * min.length)];
  if (typeof min === "number" && max === undefined)
    return Math.floor(Math.random() * (min + 1));
  if (typeof min === "number" && typeof max === "number")
    return Math.floor(Math.random() * (max - min + 1)) + min;
  throw new Error("Invalid arguments for random function.");
}
export function getRandomBorderRadiusValue(min = 10, max = 35) {
  const tl = Math.floor(Math.random() * (max - min + 1)) + min;
  const tr = Math.floor(Math.random() * (max - min + 1)) + min;
  const br = Math.floor(Math.random() * (max - min + 1)) + min;
  const bl = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${tl}px ${tr}px ${br}px ${bl}px`;
}
