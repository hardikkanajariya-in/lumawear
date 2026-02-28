"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROMO_CODES } from "@/lib/constants";
import { useToast } from "@/providers/ToastProvider";

interface PromoCodeInputProps {
  onApply: (discount: { code: string; percentage: number } | null) => void;
  activeDiscount: { code: string; percentage: number } | null;
  className?: string;
}

export function PromoCodeInput({
  onApply,
  activeDiscount,
  className,
}: PromoCodeInputProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleApply = () => {
    const upperCode = code.trim().toUpperCase();
    const discount = PROMO_CODES[upperCode as keyof typeof PROMO_CODES];

    if (discount) {
      onApply({ code: upperCode, percentage: discount });
      showToast(
        `${Math.round(discount * 100)}% discount applied!`,
        "success"
      );
      setCode("");
      setError("");
    } else {
      setError("Invalid promo code");
      showToast("Invalid promo code. Try LUMA20 or WELCOME10.", "error");
    }
  };

  const handleRemove = () => {
    onApply(null);
    showToast("Discount removed.", "info");
  };

  if (activeDiscount) {
    return (
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            {activeDiscount.code} ({Math.round(activeDiscount.percentage * 100)}%
            off)
          </span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="text-green-600 dark:text-green-400 hover:text-red-500 transition-colors"
          aria-label="Remove discount code"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <input
        type="text"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          if (error) setError("");
        }}
        placeholder="Promo code"
        className={cn(
          "flex-1 px-3 py-2 rounded-lg text-sm border bg-transparent focus:ring-2 focus:ring-brand-accent focus:outline-none  text-stone-900 dark:text-stone-100",
          error
            ? "border-red-400 dark:border-red-600"
            : "border-stone-300 dark:border-stone-600"
        )}
        aria-label="Promo code"
      />
      <button
        type="button"
        onClick={handleApply}
        disabled={!code.trim()}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
