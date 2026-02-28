"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { Breadcrumbs } from "@/components/layout";
import { Button, EmptyState } from "@/components/ui";
import { CartItemCard } from "@/components/features/CartItemCard";
import { PromoCodeInput } from "@/components/features/PromoCodeInput";
import { OrderSummary } from "@/components/features/OrderSummary";

export function CartPageClient() {
  const {
    items,
    cartTotal,
    removeItem,
    updateQuantity,
    saveForLater,
    savedItems,
    moveToCart,
    removeSaved,
  } = useCart();

  const [activeDiscount, setActiveDiscount] = useState<{
    code: string;
    percentage: number;
  } | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-6 mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={
            <Link href="/shop">
              <Button icon={<ArrowLeft size={16} />}>Continue Shopping</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onUpdateQuantity={(id, qty) => updateQuantity(id, qty)}
                onSaveForLater={() => saveForLater(item.id)}
              />
            ))}

            {/* Saved for later */}
            {savedItems.length > 0 && (
              <div className="pt-8 border-t border-stone-200 dark:border-stone-700">
                <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  Saved for Later ({savedItems.length})
                </h2>
                <div className="space-y-4">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-stone-200 dark:border-stone-700"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => moveToCart(item.id)}
                        >
                          Move to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeSaved(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link href="/shop">
                <Button variant="ghost" icon={<ArrowLeft size={14} />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <OrderSummary items={items} subtotal={cartTotal} discount={activeDiscount} />
              <PromoCodeInput onApply={setActiveDiscount} activeDiscount={activeDiscount} />
              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
