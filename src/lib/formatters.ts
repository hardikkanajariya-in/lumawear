import { CURRENCY_SYMBOL } from "./constants";

export function formatCurrency(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export function detectCardBrand(
  cardNumber: string
): "visa" | "mastercard" | "unknown" {
  const first = cardNumber.replace(/\s/g, "").charAt(0);
  if (first === "4") return "visa";
  if (first === "5") return "mastercard";
  return "unknown";
}

export function formatOrderNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "LW-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
