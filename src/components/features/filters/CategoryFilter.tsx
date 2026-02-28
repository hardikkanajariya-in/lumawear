"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const toggle = (slug: string) => {
    onChange(
      selected.includes(slug)
        ? selected.filter((s) => s !== slug)
        : [...selected, slug]
    );
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
        Category
      </h3>
      <div className="space-y-2">
        {categories.map((cat) => (
          <label
            key={cat.slug}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(cat.slug)}
              onChange={() => toggle(cat.slug)}
              className="rounded border-stone-300 dark:border-stone-600 text-brand-accent focus:ring-brand-accent w-4 h-4"
            />
            <span className="text-sm text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors flex-1">
              {cat.name}
            </span>
            <span className="text-xs text-stone-400 dark:text-stone-500">
              {cat.count}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
