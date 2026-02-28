"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-stone-700 dark:text-stone-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-colors",
            "bg-white dark:bg-stone-900",
            "text-stone-900 dark:text-stone-100",
            "placeholder:text-stone-400 dark:placeholder:text-stone-500",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent",
            error
              ? "border-error focus:ring-error"
              : "border-stone-300 dark:border-stone-600",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-stone-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
