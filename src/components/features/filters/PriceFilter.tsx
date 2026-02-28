"use client";

import { cn } from "@/lib/utils";
import { PRICE_RANGES } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";

interface PriceFilterProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
        Price Range
      </h3>
      <div className="space-y-2">
        {PRICE_RANGES.map((range) => {
          const isSelected =
            value[0] === range.min && value[1] === range.max;
          return (
            <button
              key={range.label}
              type="button"
              onClick={() =>
                onChange(isSelected ? [0, Infinity] : [range.min, range.max])
              }
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors",
                isSelected
                  ? "bg-brand-accent/10 text-brand-accent font-medium"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              )}
              aria-pressed={isSelected}
            >
              {range.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
