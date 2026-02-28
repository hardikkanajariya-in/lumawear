"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { unsplashUrl, cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/providers/ToastProvider";
import { Button, PriceTag, Rating, QuantityStepper } from "@/components/ui";
import { WishlistButton } from "./WishlistButton";
import type { Product } from "@/lib/types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const trapRef = useRef<HTMLDivElement>(null);
  useFocusTrap(trapRef, !!product);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size.", "warning");
      return;
    }

    const color = product.colors[selectedColor];
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      color: color.name,
      size: selectedSize,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
    });

    setAdded(true);
    showToast(`${product.name} added to cart!`, "success");
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={trapRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label="Close quick view"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square bg-stone-100 dark:bg-stone-800">
                <Image
                  src={unsplashUrl(
                    product.colors[selectedColor]?.imageId || product.images[0],
                    700,
                    700
                  )}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 350px"
                />
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 flex flex-col">
                <h2
                  id="quickview-title"
                  className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2"
                >
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-3">
                  <Rating value={product.rating} size={14} />
                  <span className="text-xs text-stone-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <PriceTag
                  price={product.price}
                  originalPrice={product.compareAtPrice ?? undefined}
                  className="text-lg mb-4"
                />

                <p className="text-sm text-stone-600 dark:text-stone-400 mb-5 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                      Color: {product.colors[selectedColor].name}
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(i)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            i === selectedColor
                              ? "border-brand-accent ring-2 ring-brand-accent ring-offset-2 dark:ring-offset-stone-900"
                              : "border-stone-300 dark:border-stone-600"
                          )}
                          style={{ backgroundColor: color.hex }}
                          aria-label={`Select ${color.name}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mb-5">
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[44px] h-[44px] px-3 rounded-lg text-sm font-medium border transition-all",
                          selectedSize === size
                            ? "bg-brand-primary dark:bg-white text-white dark:text-stone-900 border-brand-primary dark:border-white"
                            : "border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-stone-500"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex items-center gap-3 mt-auto">
                  <QuantityStepper
                    value={quantity}
                    onChange={setQuantity}
                  />
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    icon={
                      added ? (
                        <Check size={16} />
                      ) : (
                        <ShoppingBag size={16} />
                      )
                    }
                    className="flex-1"
                  >
                    {added ? "Added!" : product.inStock ? "Add to Cart" : "Sold Out"}
                  </Button>
                </div>

                {/* Wishlist */}
                <div className="mt-3 flex justify-center">
                  <WishlistButton productId={product.id} size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
