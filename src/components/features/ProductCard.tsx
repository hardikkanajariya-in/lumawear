"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { unsplashUrl, cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/providers/ToastProvider";
import { PriceTag, Badge, Rating } from "@/components/ui";
import { WishlistButton } from "./WishlistButton";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  onQuickView,
  className,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) {
      showToast("This product is currently out of stock.", "error");
      return;
    }

    const firstColor = product.colors[0];
    const firstSize = product.sizes[0];

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      color: firstColor.name,
      size: firstSize,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity: 1,
    });

    showToast(`${product.name} added to cart!`, "success");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <div
      className={cn("group relative", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
          <Image
            src={unsplashUrl(product.images[0], 600, 800)}
            alt={`${product.name} - ${product.colors[0]?.name || "default"}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-10">
            <WishlistButton productId={product.id} />
          </div>

          {/* Hover Actions */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2 z-10"
          >
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-brand-accent text-white text-sm font-medium hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <ShoppingBag size={14} />
              {product.inStock ? "Quick Add" : "Sold Out"}
            </button>
            {onQuickView && (
              <button
                type="button"
                onClick={handleQuickView}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shadow-lg"
                aria-label="Quick view"
              >
                <Eye size={16} />
              </button>
            )}
          </motion.div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/40 flex items-center justify-center">
              <span className="px-4 py-2 rounded-full bg-stone-900/80 text-white text-sm font-medium">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-1">
          <div className="flex items-center gap-2 mb-1">
            <Rating value={product.rating} size={12} />
            <span className="text-xs text-stone-400 dark:text-stone-500">
              ({product.reviewCount})
            </span>
          </div>
          <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1 group-hover:text-brand-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
          <PriceTag
            price={product.price}
            originalPrice={product.compareAtPrice ?? undefined}
            className="text-sm"
          />

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.slice(0, 6).map((color) => (
                <span
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 6 && (
                <span className="text-[10px] text-stone-400">
                  +{product.colors.length - 6}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
