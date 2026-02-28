import type { Metadata } from "next";
import { Package, Globe, RotateCcw, Truck, Zap, Clock } from "lucide-react";
import shippingData from "@/data/shipping.json";
import { Breadcrumbs } from "@/components/layout";
import { formatCurrency } from "@/lib/formatters";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "LumaWear shipping methods, delivery times, international shipping info, and return policy.",
};

const methodIcons: Record<string, React.ReactNode> = {
  standard: <Truck size={20} />,
  express: <Zap size={20} />,
  overnight: <Clock size={20} />,
};

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Shipping & Returns" }]}
      />

      <div className="mt-8 mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Shipping &amp; Returns
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Everything you need to know about getting your order to you — and
          sending it back if needed.
        </p>
      </div>

      {/* Shipping Methods */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          <Package size={20} className="text-brand-accent" />
          Shipping Methods
        </h2>
        <div className="space-y-4">
          {shippingData.methods.map((method) => (
            <div
              key={method.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-soft dark:bg-stone-800 text-brand-accent flex-shrink-0">
                {methodIcons[method.id] ?? <Truck size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    {method.name}
                  </h3>
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {method.price === 0
                      ? "Free"
                      : formatCurrency(method.price)}
                  </span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {method.estimatedDays}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* International Shipping */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          <Globe size={20} className="text-brand-accent" />
          International Shipping
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
          We currently ship to the following countries. International shipping
          rates and delivery times vary by destination and are calculated at
          checkout.
        </p>
        <div className="flex flex-wrap gap-2">
          {shippingData.countries.map((country) => (
            <span
              key={country}
              className="px-3 py-1.5 text-sm rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              {country}
            </span>
          ))}
        </div>
      </section>

      {/* Return Policy */}
      <section>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          <RotateCcw size={20} className="text-brand-accent" />
          Return Policy
        </h2>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          {shippingData.returnPolicy}
        </p>
      </section>
    </div>
  );
}
