import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with internationalization
 */
export function formatCurrency(amount: number | string, currency: string = "SAR", locale: string = "ar-SA"): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return `0.00 ${currency}`;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format date for Arabic and English locales
 */
export function formatDate(date: Date | string, locale: string = "ar-SA"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/**
 * Format time (e.g., "09:30 AM" or "09:30 ص")
 */
export function formatTime(date: Date | string, locale: string = "ar-SA"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
