"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/providers/ToastProvider";
import { Button, EmptyState } from "@/components/ui";
import { CartItemCard } from "./CartItemCard";
import { PromoCodeInput } from "./PromoCodeInput";
import { formatCurrency } from "@/lib/formatters";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const {
    items,
    savedItems,
    removeItem,
    updateQuantity,
    saveForLater,
    moveToCart,
    removeSaved,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    discount,
    setDiscount,
  } = useCart();
  const { showToast } = useToast();
  const trapRef = useFocusTrap(isCartOpen);

  const discountedTotal = discount
    ? cartTotal * (1 - discount.percentage)
    : cartTotal;

  const freeShippingRemaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            ref={trapRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
              <h2 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100">
                Cart ({cartCount})
              </h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Bar */}
            {cartCount > 0 && freeShippingRemaining > 0 && (
              <div className="px-5 py-3 bg-brand-soft dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
                <p className="text-xs text-stone-600 dark:text-stone-400 text-center">
                  Add{" "}
                  <span className="font-semibold text-brand-accent">
                    {formatCurrency(freeShippingRemaining)}
                  </span>{" "}
                  more for free shipping
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-accent transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (cartTotal / FREE_SHIPPING_THRESHOLD) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5">
              {cartCount === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your cart is empty"
                  description="Looks like you haven't added anything to your cart yet."
                  action={
                    <Link href="/shop" onClick={() => setIsCartOpen(false)}>
                      <Button size="sm">Start Shopping</Button>
                    </Link>
                  }
                />
              ) : (
                <>
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      onSaveForLater={saveForLater}
                    />
                  ))}

                  {/* Saved for Later */}
                  {savedItems.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700">
                      <h3 className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                        <Bookmark size={14} />
                        Saved for Later ({savedItems.length})
                      </h3>
                      {savedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-2 text-sm"
                        >
                          <span className="text-stone-600 dark:text-stone-400 truncate mr-2">
                            {item.name}
                          </span>
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => moveToCart(item.id)}
                              className="text-xs text-brand-accent hover:underline"
                            >
                              Move to Cart
                            </button>
                            <span className="text-stone-300 dark:text-stone-600">
                              ·
                            </span>
                            <button
                              type="button"
                              onClick={() => removeSaved(item.id)}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {cartCount > 0 && (
              <div className="border-t border-stone-200 dark:border-stone-700 px-5 py-4 space-y-3">
                <PromoCodeInput
                  onApply={setDiscount}
                  activeDiscount={discount}
                />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500 dark:text-stone-400">
                      Subtotal
                    </span>
                    <span className="text-stone-900 dark:text-stone-100">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  {discount && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">
                        Discount ({Math.round(discount.percentage * 100)}%)
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        -{formatCurrency(cartTotal * discount.percentage)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500 dark:text-stone-400">
                      Shipping
                    </span>
                    <span className="text-stone-500 dark:text-stone-400">
                      {cartTotal >= FREE_SHIPPING_THRESHOLD
                        ? "Free"
                        : "Calculated at checkout"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      Total
                    </span>
                    <span className="font-bold text-lg text-stone-900 dark:text-stone-100">
                      {formatCurrency(discountedTotal)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block"
                  >
                    <Button className="w-full" size="lg" icon={<ArrowRight size={16} />}>
                      Checkout
                    </Button>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block"
                  >
                    <Button variant="secondary" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
