"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { CategoryFilter } from "./CategoryFilter";
import { ColorFilter } from "./ColorFilter";
import { SizeFilter } from "./SizeFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import type { FilterState, Category } from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: Category[];
  availableColors: { name: string; hex: string }[];
  availableSizes: string[];
  className?: string;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  categories,
  availableColors,
  availableSizes,
  className,
}: FilterSidebarProps) {
  const activeCount =
    filters.categories.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity ? 1 : 0) +
    (filters.rating !== null ? 1 : 0);

  const clearAll = () => {
    onFiltersChange({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [0, Infinity],
      rating: null,
    });
  };

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100">
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-brand-accent hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <CategoryFilter
        categories={categories}
        selected={filters.categories}
        onChange={(categories) =>
          onFiltersChange({ ...filters, categories })
        }
      />

      <ColorFilter
        colors={availableColors}
        selected={filters.colors}
        onChange={(colors) => onFiltersChange({ ...filters, colors })}
      />

      <SizeFilter
        sizes={availableSizes}
        selected={filters.sizes}
        onChange={(sizes) => onFiltersChange({ ...filters, sizes })}
      />

      <PriceFilter
        value={filters.priceRange}
        onChange={(priceRange) =>
          onFiltersChange({ ...filters, priceRange })
        }
      />

      <RatingFilter
        value={filters.rating}
        onChange={(rating) => onFiltersChange({ ...filters, rating })}
      />
    </aside>
  );
}
