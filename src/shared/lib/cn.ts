export type ClassValue = string | number | false | null | undefined;

/** Minimal classnames joiner - no dependency pulled in just for this. */
export function cn(...values: ClassValue[]): string {
  return values.filter((v): v is string | number => Boolean(v)).join(' ');
}
