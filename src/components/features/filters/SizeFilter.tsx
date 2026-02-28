"use client";

import { cn } from "@/lib/utils";

interface SizeFilterProps {
  sizes: string[];
  selected: string[];
  onChange: (sizes: string[]) => void;
}

export function SizeFilter({ sizes, selected, onChange }: SizeFilterProps) {
  const toggle = (size: string) => {
    onChange(
      selected.includes(size)
        ? selected.filter((s) => s !== size)
        : [...selected, size]
    );
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
        Size
      </h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => toggle(size)}
            className={cn(
              "min-w-[40px] h-[40px] px-2.5 rounded-lg text-sm font-medium border transition-all",
              selected.includes(size)
                ? "bg-brand-primary dark:bg-white text-white dark:text-stone-900 border-brand-primary dark:border-white"
                : "border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-stone-500"
            )}
            aria-label={`Filter by size ${size}`}
            aria-pressed={selected.includes(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
