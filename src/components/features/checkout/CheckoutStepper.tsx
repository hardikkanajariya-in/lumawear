"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui";
import { CheckoutProgress } from "./CheckoutProgress";
import { ShippingForm } from "./ShippingForm";
import { ShippingMethodSelector } from "./ShippingMethodSelector";
import { PaymentForm } from "./PaymentForm";
import { ReviewStep } from "./ReviewStep";
import { OrderSummary } from "../OrderSummary";
import { formatOrderNumber } from "@/lib/formatters";
import type { ShippingMethod } from "@/lib/types";

type Step = "information" | "shipping" | "payment" | "review";
const STEPS: Step[] = ["information", "shipping", "payment", "review"];

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export function CheckoutStepper() {
  const { items, cartTotal, discount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>("information");
  const [shippingInfo, setShippingInfo] = useState<ShippingFormData | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentFormData | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [confetti, setConfetti] = useState<{ id: number; x: number; delay: number; color: string }[]>([]);

  const currentIndex = STEPS.indexOf(currentStep);

  const goTo = useCallback((step: Step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleShippingInfoSubmit = (data: ShippingFormData) => {
    setShippingInfo(data);
    goTo("shipping");
  };

  const handleShippingMethodSubmit = (method: ShippingMethod) => {
    setShippingMethod(method);
    goTo("payment");
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentInfo(data);
    goTo("review");
  };

  const handleConfirmOrder = () => {
    setOrderId(formatOrderNumber());
    setOrderComplete(true);
    clearCart();
    // generate confetti
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ["#c9a96e", "#f5f0eb", "#1a1a1a", "#e7e5e4", "#a8a29e"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setConfetti(particles);
  };

  // Clear confetti after animation
  useEffect(() => {
    if (confetti.length > 0) {
      const timer = setTimeout(() => setConfetti([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  if (orderComplete) {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center">
        {/* Confetti */}
        {confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 1, scale: 1 }}
            animate={{
              y: "100vh",
              opacity: 0,
              rotate: Math.random() * 720 - 360,
              scale: 0.5,
            }}
            transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: "easeOut" }}
            className="fixed top-0 w-2 h-2 rounded-full pointer-events-none z-50"
            style={{ backgroundColor: p.color, left: `${p.x}%` }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <PartyPopper size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            Thank you for your order.
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-500 mb-6">
            Order #{orderId}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">
            This is a demo store — no real order has been placed. But if it were
            real, you&apos;d have some amazing pieces coming your way!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop">
              <Button icon={<ShoppingBag size={16} />}>Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" icon={<ArrowRight size={16} />}>
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={48} className="mx-auto text-stone-300 dark:text-stone-600 mb-4" />
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Your cart is empty
        </h2>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          Add some items before checking out.
        </p>
        <Link href="/shop">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const shippingCost = shippingMethod?.price;

  return (
    <div className="space-y-8">
      <CheckoutProgress currentStep={currentIndex} steps={["Information", "Shipping", "Payment", "Review"]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main form area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === "information" && (
                <ShippingForm
                  onSubmit={handleShippingInfoSubmit}
                  initialData={shippingInfo ?? undefined}
                />
              )}
              {currentStep === "shipping" && (
                <ShippingMethodSelector
                  onSubmit={handleShippingMethodSubmit}
                  onBack={() => goTo("information")}
                  selectedId={shippingMethod?.id}
                />
              )}
              {currentStep === "payment" && (
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  onBack={() => goTo("shipping")}
                />
              )}
              {currentStep === "review" &&
                shippingInfo &&
                shippingMethod &&
                paymentInfo && (
                  <ReviewStep
                    shippingInfo={shippingInfo}
                    shippingMethod={shippingMethod}
                    paymentInfo={paymentInfo}
                    onConfirm={handleConfirmOrder}
                    onBack={() => goTo("payment")}
                  />
                )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky order summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <OrderSummary
              items={items}
              subtotal={cartTotal}
              shippingCost={shippingCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
