"use client";

import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/providers/WishlistProvider";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/providers/ToastProvider";
import { Breadcrumbs } from "@/components/layout";
import { Button, EmptyState } from "@/components/ui";
import { ProductCard } from "@/components/features/ProductCard";
import type { Product } from "@/lib/types";

interface WishlistPageClientProps {
  products: Product[];
}

export function WishlistPageClient({ products }: WishlistPageClientProps) {
  const { items: wishlistIds, toggleWishlist } = useWishlist();
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const moveToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      color: product.colors[0]?.name || "Default",
      size: product.sizes[0] || "One Size",
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity: 1,
    });
    toggleWishlist(product.id);
    showToast(`${product.name} moved to cart`, "success");
    setTimeout(() => setIsCartOpen(true), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Wishlist
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          {wishlistProducts.length > 0
            ? `${wishlistProducts.length} saved item${wishlistProducts.length !== 1 ? "s" : ""}`
            : ""}
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love by tapping the heart icon on any product."
          action={
            <Link href="/shop">
              <Button icon={<ShoppingBag size={16} />}>Browse Products</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <ProductCard product={product} />
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => moveToCart(product)}
                icon={<ArrowRight size={14} />}
              >
                Move to Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
