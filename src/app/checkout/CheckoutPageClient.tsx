"use client";

import { Breadcrumbs } from "@/components/layout";
import { CheckoutStepper } from "@/components/features/checkout";

export function CheckoutPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-6 mb-8">
        Checkout
      </h1>

      <CheckoutStepper />
    </div>
  );
}
