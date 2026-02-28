import { formatCurrency } from "@/lib/formatters";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount?: { code: string; percentage: number } | null;
  shippingCost?: number;
  className?: string;
}

export function OrderSummary({
  items,
  subtotal,
  discount,
  shippingCost,
  className,
}: OrderSummaryProps) {
  const discountAmount = discount ? subtotal * discount.percentage : 0;
  const shipping =
    shippingCost !== undefined
      ? shippingCost
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : undefined;
  const total = subtotal - discountAmount + (shipping ?? 0);

  return (
    <div
      className={cn(
        "rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6",
        className
      )}
    >
      <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-stone-500 dark:text-stone-400 flex-shrink-0">
                {item.quantity}×
              </span>
              <span className="text-stone-700 dark:text-stone-300 truncate">
                {item.name}
              </span>
            </div>
            <span className="text-stone-900 dark:text-stone-100 font-medium flex-shrink-0 ml-2">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Breakdown */}
      <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-stone-700">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500 dark:text-stone-400">Subtotal</span>
          <span className="text-stone-900 dark:text-stone-100">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {discount && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 dark:text-green-400">
              Discount ({discount.code})
            </span>
            <span className="text-green-600 dark:text-green-400">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-stone-500 dark:text-stone-400">Shipping</span>
          <span className="text-stone-900 dark:text-stone-100">
            {shipping === undefined
              ? "Calculated next"
              : shipping === 0
                ? "Free"
                : formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between pt-3 border-t border-stone-200 dark:border-stone-700">
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            Total
          </span>
          <span className="font-bold text-lg text-stone-900 dark:text-stone-100">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
