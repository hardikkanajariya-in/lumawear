"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
  className?: string;
}

export function ProductGrid({
  products,
  viewMode = "grid",
  className,
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            : "flex flex-col gap-4",
          className
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
