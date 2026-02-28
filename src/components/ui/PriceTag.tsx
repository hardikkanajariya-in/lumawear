import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

export function PriceTag({ price, originalPrice, className }: PriceTagProps) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "font-semibold",
          hasDiscount
            ? "text-red-600 dark:text-red-400"
            : "text-stone-900 dark:text-stone-100"
        )}
      >
        {formatCurrency(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-stone-400 dark:text-stone-500 line-through">
          {formatCurrency(originalPrice)}
        </span>
      )}
    </div>
  );
}
