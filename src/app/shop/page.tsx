import type { Metadata } from "next";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import type { Product, Category } from "@/lib/types";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full LumaWear collection — premium fashion essentials for the modern wardrobe.",
};

export default function ShopPage() {
  return (
    <ShopPageClient
      products={products as Product[]}
      categories={categories as Category[]}
    />
  );
}
