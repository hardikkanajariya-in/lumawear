import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unsplashUrl(
  photoId: string,
  width: number,
  height: number
): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=80`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
