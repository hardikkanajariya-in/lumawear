"use client";

import { useState } from "react";
import { Input, Select, Button } from "@/components/ui";
import shippingData from "@/data/shipping.json";

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

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  initialData?: Partial<ShippingFormData>;
}

export function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [form, setForm] = useState<ShippingFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zip: initialData?.zip || "",
    country: initialData?.country || "United States",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingFormData, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    if (!form.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const updateField = (field: keyof ShippingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const countries = (shippingData as { countries: string[] }).countries;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
        Shipping Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          error={errors.firstName}
          required
        />
        <Input
          label="Last Name"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Address"
        value={form.address}
        onChange={(e) => updateField("address", e.target.value)}
        error={errors.address}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
          error={errors.city}
          required
        />
        <Input
          label="State"
          value={form.state}
          onChange={(e) => updateField("state", e.target.value)}
          error={errors.state}
          required
        />
        <Input
          label="ZIP Code"
          value={form.zip}
          onChange={(e) => updateField("zip", e.target.value)}
          error={errors.zip}
          required
        />
      </div>

      <Select
        label="Country"
        value={form.country}
        onChange={(e) => updateField("country", e.target.value)}
        options={countries.map((c) => ({ label: c, value: c }))}
        error={errors.country}
      />

      <div className="pt-4">
        <Button type="submit" className="w-full sm:w-auto" size="lg">
          Continue to Shipping
        </Button>
      </div>
    </form>
  );
}
