import type { Metadata } from "next";
import { WishlistPageClient } from "./WishlistPageClient";
import products from "@/data/products.json";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved LumaWear items.",
};

export default function WishlistPage() {
  return <WishlistPageClient products={products as Product[]} />;
}
