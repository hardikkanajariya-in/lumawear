"use client";

import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/lib/constants";
import type { SortOption } from "@/lib/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-low": "Price: Low → High",
  "price-high": "Price: High → Low",
  rating: "Top Rated",
};

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label
        htmlFor="sort-select"
        className="text-sm text-stone-500 dark:text-stone-400 whitespace-nowrap"
      >
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-brand-accent focus:outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjYThhMjllIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_0.5rem_center] pr-8"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {sortLabels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
