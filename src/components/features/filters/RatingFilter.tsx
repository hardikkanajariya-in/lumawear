"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  value: number | null;
  onChange: (rating: number | null) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratings = [4, 3, 2, 1];

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
        Rating
      </h3>
      <div className="space-y-1.5">
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(value === rating ? null : rating)}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors",
              value === rating
                ? "bg-brand-accent/10 text-brand-accent"
                : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            )}
            aria-pressed={value === rating}
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={cn(
                    i < rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-stone-300 dark:text-stone-600"
                  )}
                />
              ))}
            </div>
            <span>& Up</span>
          </button>
        ))}
      </div>
    </div>
  );
}
