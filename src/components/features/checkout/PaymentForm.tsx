"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { formatCardNumber, formatExpiry, detectCardBrand } from "@/lib/formatters";

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  onBack: () => void;
}

export function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const [form, setForm] = useState<PaymentFormData>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});

  const cardBrand = detectCardBrand(form.cardNumber.replace(/\s/g, ""));

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentFormData, string>> = {};
    const rawNumber = form.cardNumber.replace(/\s/g, "");
    if (!rawNumber) newErrors.cardNumber = "Card number is required";
    else if (rawNumber.length < 13 || rawNumber.length > 19)
      newErrors.cardNumber = "Invalid card number";
    if (!form.cardName.trim()) newErrors.cardName = "Name on card is required";
    if (!form.expiry) newErrors.expiry = "Expiry is required";
    else if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      newErrors.expiry = "Use MM/YY format";
    if (!form.cvv) newErrors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(form.cvv))
      newErrors.cvv = "Invalid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const update = (field: keyof PaymentFormData, value: string) => {
    if (field === "cardNumber") value = formatCardNumber(value);
    if (field === "expiry") value = formatExpiry(value);
    if (field === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
        Payment Details
      </h3>

      <div className="bg-brand-soft/30 dark:bg-stone-800 rounded-xl p-4 flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 mb-2">
        <Lock size={14} />
        <span>Your payment information is encrypted and secure (demo only).</span>
      </div>

      <div className="relative">
        <Input
          label="Card Number"
          value={form.cardNumber}
          onChange={(e) => update("cardNumber", e.target.value)}
          placeholder="1234 5678 9012 3456"
          error={errors.cardNumber}
          required
        />
        <div className="absolute right-3 top-9 flex items-center gap-1 text-stone-400">
          {cardBrand ? (
            <span className="text-xs font-medium uppercase text-stone-500 dark:text-stone-400">
              {cardBrand}
            </span>
          ) : (
            <CreditCard size={18} />
          )}
        </div>
      </div>

      <Input
        label="Name on Card"
        value={form.cardName}
        onChange={(e) => update("cardName", e.target.value)}
        placeholder="John Doe"
        error={errors.cardName}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry"
          value={form.expiry}
          onChange={(e) => update("expiry", e.target.value)}
          placeholder="MM/YY"
          error={errors.expiry}
          required
        />
        <Input
          label="CVV"
          type="password"
          value={form.cvv}
          onChange={(e) => update("cvv", e.target.value)}
          placeholder="123"
          error={errors.cvv}
          required
        />
      </div>

      <div className="flex items-center gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Review Order
        </Button>
      </div>
    </form>
  );
}
