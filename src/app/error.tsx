"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Something went wrong
        </h2>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          We encountered an unexpected error. Please try again, and if the
          problem persists, contact our support team.
        </p>
        <Button onClick={reset} icon={<RefreshCw size={16} />}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
