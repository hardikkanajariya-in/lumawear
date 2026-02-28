"use client";

import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { unsplashUrl } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { useCart } from "@/providers/CartProvider";
import { Button, PriceTag } from "@/components/ui";
import type { ShippingMethod } from "@/lib/types";

interface ReviewStepProps {
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: ShippingMethod;
  paymentInfo: {
    cardNumber: string;
    cardName: string;
    expiry: string;
  };
  onConfirm: () => void;
  onBack: () => void;
}

export function ReviewStep({
  shippingInfo,
  shippingMethod,
  paymentInfo,
  onConfirm,
  onBack,
}: ReviewStepProps) {
  const { items, cartTotal, discount } = useCart();
  const discountAmount = discount ? cartTotal * discount : 0;
  const subtotal = cartTotal - discountAmount;
  const shipping = shippingMethod.price;
  const total = subtotal + shipping;
  const maskedCard = `•••• •••• •••• ${paymentInfo.cardNumber.replace(/\s/g, "").slice(-4)}`;

  return (
    <div className="space-y-6">
      <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100">
        Review Your Order
      </h3>

      {/* Shipping address */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 space-y-1">
        <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
          Shipping Address
        </h4>
        <p className="text-stone-600 dark:text-stone-400">
          {shippingInfo.firstName} {shippingInfo.lastName}
        </p>
        <p className="text-stone-600 dark:text-stone-400">
          {shippingInfo.address}
        </p>
        <p className="text-stone-600 dark:text-stone-400">
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
        <p className="text-stone-600 dark:text-stone-400">
          {shippingInfo.country}
        </p>
        <p className="text-stone-500 dark:text-stone-500 text-sm">
          {shippingInfo.email}
        </p>
      </div>

      {/* Shipping method & payment row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 space-y-1">
          <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
            Shipping Method
          </h4>
          <p className="text-stone-600 dark:text-stone-400">
            {shippingMethod.name}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-500">
            {shippingMethod.estimatedDays} &middot;{" "}
            {shippingMethod.price === 0
              ? "Free"
              : formatCurrency(shippingMethod.price)}
          </p>
        </div>
        <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 space-y-1">
          <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
            Payment
          </h4>
          <p className="text-stone-600 dark:text-stone-400">{maskedCard}</p>
          <p className="text-sm text-stone-500 dark:text-stone-500">
            Exp: {paymentInfo.expiry}
          </p>
        </div>
      </div>

      {/* Order items */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 space-y-4">
        <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
          Items ({items.length})
        </h4>
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                <Image
                  src={unsplashUrl(item.image, 112, 112)}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {item.color} / {item.size} &times; {item.quantity}
                </p>
              </div>
              <PriceTag price={item.price * item.quantity} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 space-y-2">
        <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
          <span>Subtotal</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        {discount ? (
          <div className="flex justify-between text-sm text-green-600">
            <span className="flex items-center gap-1">
              <Check size={14} /> Discount ({(discount * 100).toFixed(0)}%)
            </span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        ) : null}
        <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>
        <div className="border-t border-stone-200 dark:border-stone-700 pt-2 mt-2 flex justify-between font-bold text-stone-900 dark:text-stone-100">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
        <ShieldCheck size={16} />
        <span>This is a demo checkout — no real charges will be made.</span>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onConfirm} className="flex-1 sm:flex-none">
          Place Order
        </Button>
      </div>
    </div>
  );
}
