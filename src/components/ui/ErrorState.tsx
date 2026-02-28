"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
      role="alert"
    >
      <div className="mb-4 rounded-full bg-red-50 dark:bg-red-950/30 p-4">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
        {title}
      </h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} icon={<RefreshCw size={16} />}>
          Try Again
        </Button>
      )}
    </div>
  );
}
