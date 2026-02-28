"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui";
import shippingData from "@/data/shipping.json";
import type { ShippingMethod } from "@/lib/types";

interface ShippingMethodSelectorProps {
  onSubmit: (method: ShippingMethod) => void;
  onBack: () => void;
  selectedId?: string;
}

export function ShippingMethodSelector({
  onSubmit,
  onBack,
  selectedId,
}: ShippingMethodSelectorProps) {
  const methods = (shippingData as { methods: ShippingMethod[] }).methods;
  const [selected, setSelected] = useState<string>(
    selectedId || methods[0]?.id || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = methods.find((m) => m.id === selected);
    if (method) onSubmit(method);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
        Shipping Method
      </h3>

      <div className="space-y-3">
        {methods.map((method) => {
          const isSelected = selected === method.id;
          return (
            <label
              key={method.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                isSelected
                  ? "border-brand-accent bg-brand-soft/30 dark:bg-stone-800"
                  : "border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-brand-accent bg-brand-accent"
                      : "border-stone-300 dark:border-stone-600"
                  )}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={isSelected}
                  onChange={() => setSelected(method.id)}
                  className="sr-only"
                />
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">
                    {method.name}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {method.estimatedDays}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {method.price === 0 ? "Free" : formatCurrency(method.price)}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
