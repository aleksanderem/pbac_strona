import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Deterministic number formatting (avoids ICU version mismatch between Node
// and browser, which causes React #418 hydration errors). Uses a regular
// ASCII space as thousands separator — same byte sequence on every runtime.
export function formatPLN(value: number): string {
  const rounded = Math.round(value).toString()
  return rounded.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const PL_MONTHS = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
] as const

// Deterministic Polish date formatting (avoids ICU mismatch). Outputs
// e.g. "5 maja 2026". Accepts Date or ISO string.
export function formatPLDate(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input
  return `${d.getUTCDate()} ${PL_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}
