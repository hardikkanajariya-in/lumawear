"use client";

import { cn } from "@/lib/utils";

interface ColorFilterProps {
  colors: { name: string; hex: string }[];
  selected: string[];
  onChange: (colors: string[]) => void;
}

export function ColorFilter({ colors, selected, onChange }: ColorFilterProps) {
  const toggle = (name: string) => {
    onChange(
      selected.includes(name)
        ? selected.filter((c) => c !== name)
        : [...selected, name]
    );
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">
        Color
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => toggle(color.name)}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
              selected.includes(color.name)
                ? "border-brand-accent ring-2 ring-brand-accent ring-offset-2 dark:ring-offset-stone-900"
                : "border-stone-300 dark:border-stone-600 hover:border-stone-500"
            )}
            style={{ backgroundColor: color.hex }}
            aria-label={`Filter by ${color.name}`}
            aria-pressed={selected.includes(color.name)}
          />
        ))}
      </div>
    </div>
  );
}
