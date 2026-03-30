import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedField(
  item: Record<string, unknown>,
  field: string,
  locale: string
): string {
  const localizedKey = `${field}_${locale}`;
  const fallbackKey = `${field}_en`;
  return (item[localizedKey] as string) || (item[fallbackKey] as string) || "";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}
