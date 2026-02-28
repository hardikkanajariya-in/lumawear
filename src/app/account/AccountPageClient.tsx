"use client";

import { useState } from "react";
import { User, Package, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/providers/ToastProvider";
import { Breadcrumbs } from "@/components/layout";
import { Input, Button, Badge } from "@/components/ui";
import { formatCurrency, formatDate, formatOrderNumber } from "@/lib/formatters";
import type { Order, Address, UserProfile } from "@/lib/types";

const mockProfile: UserProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
};

const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "LW-20260115-001",
    date: "2026-01-15",
    status: "delivered",
    total: 289.00,
    items: [
      { name: "Heritage Leather Jacket", quantity: 1, price: 289.00, image: "photo-1551028719-00167b16eac5" },
    ],
  },
  {
    id: "ord-002",
    orderNumber: "LW-20260201-002",
    date: "2026-02-01",
    status: "shipped",
    total: 158.00,
    items: [
      { name: "Essential White Tee", quantity: 2, price: 49.00, image: "photo-1521572163474-6864f9cf17ab" },
      { name: "Minimalist Watch", quantity: 1, price: 60.00, image: "photo-1524592094714-0f0654e20314" },
    ],
  },
  {
    id: "ord-003",
    orderNumber: "LW-20260220-003",
    date: "2026-02-20",
    status: "processing",
    total: 199.00,
    items: [
      { name: "Urban Streetwear Hoodie", quantity: 1, price: 199.00, image: "photo-1556821840-3a63f95609a7" },
    ],
  },
];

const mockAddresses: Address[] = [
  {
    id: "addr-001",
    label: "Home",
    name: "Alex Morgan",
    street: "123 Fashion Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr-002",
    label: "Office",
    name: "Alex Morgan",
    street: "456 Business St, Suite 200",
    city: "New York",
    state: "NY",
    zip: "10016",
    country: "United States",
    isDefault: false,
  },
];

type AccountTab = "profile" | "orders" | "addresses";

const tabs: { id: AccountTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={16} /> },
  { id: "orders", label: "Orders", icon: <Package size={16} /> },
  { id: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
];

const statusColors: Record<Order["status"], string> = {
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  shipped: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function AccountPageClient() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [profile, setProfile] = useState(mockProfile);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile updated successfully", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-6 mb-8">
        My Account
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar tabs */}
        <div className="lg:col-span-1">
          <nav className="flex lg:flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                  activeTab === tab.id
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Heart size={16} />
              Wishlist
            </Link>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} className="space-y-6 max-w-lg">
              <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                Profile Information
              </h2>
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
              />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
              />
              <Input
                label="Phone"
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <Button type="submit">Save Changes</Button>
            </form>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                Order History
              </h2>
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-stone-50 dark:bg-stone-900">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          #{order.orderNumber}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
                          statusColors[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-stone-500 dark:text-stone-400">
                          {item.quantity}×
                        </span>
                        <span className="text-stone-700 dark:text-stone-300">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                Saved Addresses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={cn(
                      "rounded-xl border p-4 space-y-1",
                      addr.isDefault
                        ? "border-brand-accent bg-brand-soft/20 dark:bg-stone-800"
                        : "border-stone-200 dark:border-stone-700"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-stone-900 dark:text-stone-100">
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="text-xs font-semibold bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {addr.name}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {addr.street}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {addr.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
