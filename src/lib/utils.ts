import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random<T>(array: readonly T[]): T | undefined;
export function random<T>(object: Record<string, T>): T | undefined;
export function random(max: number): number;
export function random(max: number, floatNumber: true): number;
export function random(min: number, max: number): number;
export function random(min: number, max: number, floatNumber: true): number;
export function random<T>(
  arg1: readonly T[] | Record<string, T> | number,
  arg2?: number | boolean,
  arg3?: boolean,
): T | number | undefined {
  if (Array.isArray(arg1)) {
    if (arg1.length === 0) return undefined;
    return arg1[Math.floor(Math.random() * arg1.length)];
  }
  if (typeof arg1 === "object" && arg1 !== null) {
    const k = Object.keys(arg1);
    if (k.length === 0) return undefined;
    const rk = k[Math.floor(Math.random() * k.length)];
    return (arg1 as Record<string, T>)[rk];
  }
  if (typeof arg1 === "number") {
    let min: number;
    let max: number;
    let isFloating: boolean;
    if (typeof arg2 === "number") {
      min = arg1;
      max = arg2;
      isFloating = arg3 === true;
    } else {
      min = 0;
      max = arg1;
      isFloating = arg2 === true;
    }
    if (min > max) [min, max] = [max, min];
    return isFloating
      ? Math.random() * (max - min) + min
      : Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new Error("Invalid arguments supplied to the random function.");
}

export function getRandomBorderRadiusValue(min = 10, max = 35) {
  const tl = random(min, max);
  const tr = random(min, max);
  const br = random(min, max);
  const bl = random(min, max);
  return `${tl}px ${tr}px ${br}px ${bl}px`;
}
