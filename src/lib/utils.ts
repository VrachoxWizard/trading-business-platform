import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as EUR currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a date as relative time.
 */
export function timeAgo(date: string | Date): string {
  const now = new Date()
  const d = new Date(date)
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return 'upravo sada'
  if (seconds < 3600) return `prije ${Math.floor(seconds / 60)} min`
  if (seconds < 86400) return `prije ${Math.floor(seconds / 3600)} h`
  if (seconds < 2592000) return `prije ${Math.floor(seconds / 86400)} d`
  if (seconds < 31536000) return `prije ${Math.floor(seconds / 2592000)} mj`
  return `prije ${Math.floor(seconds / 31536000)} god`
}
