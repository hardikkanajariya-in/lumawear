"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutProgressProps {
  currentStep: number;
  steps: string[];
  onStepClick?: (step: number) => void;
}

export function CheckoutProgress({
  currentStep,
  steps,
  onStepClick,
}: CheckoutProgressProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-initial">
            <button
              type="button"
              onClick={() => {
                if (isCompleted && onStepClick) onStepClick(stepNum);
              }}
              disabled={!isCompleted}
              className={cn(
                "flex items-center gap-2 group",
                isCompleted && "cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-brand-accent text-white"
                      : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400"
                )}
              >
                {isCompleted ? <Check size={14} /> : stepNum}
              </div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline",
                  isCurrent
                    ? "text-stone-900 dark:text-stone-100"
                    : isCompleted
                      ? "text-stone-700 dark:text-stone-300 group-hover:text-brand-accent"
                      : "text-stone-400 dark:text-stone-500"
                )}
              >
                {label}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3",
                  stepNum < currentStep
                    ? "bg-green-500"
                    : "bg-stone-200 dark:bg-stone-700"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
