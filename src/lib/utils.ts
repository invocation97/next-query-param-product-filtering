import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeFirstLetter(term: string) {
  return decodeURIComponent(term.charAt(0).toUpperCase() + term.slice(1));
}
