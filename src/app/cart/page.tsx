import type { Metadata } from "next";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your shopping cart.",
};

export default function CartPage() {
  return <CartPageClient />;
}
