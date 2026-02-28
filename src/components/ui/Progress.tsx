"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          {label && (
            <span className="text-stone-600 dark:text-stone-400">{label}</span>
          )}
          {showValue && (
            <span className="text-stone-500 dark:text-stone-400 font-medium">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-brand-accent transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
