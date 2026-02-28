"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Ruler, Truck, RotateCcw, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/providers/ToastProvider";
import { useRecentlyViewed } from "@/hooks";
import { Breadcrumbs } from "@/components/layout";
import { Button, Rating, PriceTag, QuantityStepper, Accordion } from "@/components/ui";
import { ProductGallery } from "@/components/features/ProductGallery";
import { WishlistButton } from "@/components/features/WishlistButton";
import { ShareButton } from "@/components/features/ShareButton";
import { SizeGuideModal } from "@/components/features/SizeGuideModal";
import { ReviewCard } from "@/components/features/ReviewCard";
import { RecentlyViewed } from "@/components/features/RecentlyViewed";
import { ProductCard } from "@/components/features/ProductCard";
import uiData from "@/data/ui.json";
import shippingData from "@/data/shipping.json";
import type { Product, Review, SizeGuideRow, UIData, ShippingData } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  allProducts: Product[];
}

type DetailTab = "details" | "reviews" | "shipping";

export function ProductDetailClient({
  product,
  reviews,
  relatedProducts,
  allProducts,
}: ProductDetailClientProps) {
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const { addViewed } = useRecentlyViewed();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<DetailTab>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const ui = uiData as UIData;
  const shipping = shippingData as ShippingData;

  // Track recently viewed
  useEffect(() => {
    addViewed(product.id);
  }, [product.id, addViewed]);

  // Get images for selected color
  const currentImages = selectedColor
    ? [selectedColor.imageId, ...product.images.filter((img) => img !== selectedColor.imageId)]
    : product.images;

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size", "warning");
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: currentImages[0],
      color: selectedColor.name,
      size: selectedSize,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
    });

    setAddedToCart(true);
    showToast(`${product.name} added to cart`, "success");
    setTimeout(() => setIsCartOpen(true), 300);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product.rating;

  const tabs: { id: DetailTab; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "reviews", label: `Reviews (${reviews.length || product.reviewCount})` },
    { id: "shipping", label: "Shipping" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      {/* Product section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <ProductGallery images={currentImages} productName={product.name} />

        {/* Product info */}
        <div className="space-y-6">
          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="flex gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    badge === "Sale"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : badge === "New"
                        ? "bg-brand-accent/20 text-brand-accent"
                        : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            <Rating value={avgRating} showValue count={reviews.length || product.reviewCount} />
          </div>

          <PriceTag
            price={product.price}
            originalPrice={product.compareAtPrice ?? undefined}
            className="text-2xl"
          />

          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {product.description}
          </p>

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div>
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Color: {selectedColor.name}
              </span>
              <div className="flex gap-3 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all ring-offset-2 ring-offset-white dark:ring-offset-stone-950",
                      selectedColor.name === color.name
                        ? "ring-2 ring-brand-accent border-brand-accent"
                        : "border-stone-200 dark:border-stone-700 hover:border-stone-400"
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Color: ${color.name}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Size{selectedSize ? `: ${selectedSize}` : ""}
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-sm text-brand-accent hover:underline flex items-center gap-1"
              >
                <Ruler size={14} />
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-[44px] h-11 px-4 rounded-lg text-sm font-medium transition-all border",
                    selectedSize === size
                      ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                      : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <Button
              size="lg"
              className="flex-1 text-base"
              onClick={handleAddToCart}
              disabled={addedToCart}
              icon={
                addedToCart ? (
                  <Check size={18} />
                ) : (
                  <ShoppingBag size={18} />
                )
              }
            >
              {addedToCart ? "Added!" : "Add to Cart"}
            </Button>
          </div>

          {/* Wishlist + Share */}
          <div className="flex items-center gap-4 pt-2">
            <WishlistButton productId={product.id} size={20} />
            <ShareButton />
          </div>

          {/* Quick info accordion */}
          <Accordion
            items={[
              {
                id: "shipping",
                title: "Shipping & Returns",
                content: `Free standard shipping on orders over $99. ${shipping.returnPolicy}`,
              },
              {
                id: "care",
                title: "Care Instructions",
                content: product.careInstructions,
              },
              {
                id: "details",
                title: "Product Details",
                content: product.details,
              },
            ]}
          />
        </div>
      </div>

      {/* Mobile sticky add to cart */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 p-4 lg:hidden">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
              {product.name}
            </p>
            <PriceTag
              price={product.price}
              originalPrice={product.compareAtPrice ?? undefined}
            />
          </div>
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={addedToCart}
            icon={addedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
          >
            {addedToCart ? "Added!" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 mb-20 lg:mb-0">
        <div className="border-b border-stone-200 dark:border-stone-700">
          <div className="flex gap-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors relative",
                  tab === t.id
                    ? "text-stone-900 dark:text-stone-100"
                    : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                )}
              >
                {t.label}
                {tab === t.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="py-8"
          >
            {tab === "details" && (
              <div className="prose prose-stone dark:prose-invert max-w-3xl">
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
                  {product.details}
                </p>
              </div>
            )}

            {tab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p className="text-stone-500 dark:text-stone-400">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            )}

            {tab === "shipping" && (
              <div className="max-w-3xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(shipping as ShippingData).methods.map((method) => (
                    <div
                      key={method.id}
                      className="rounded-xl border border-stone-200 dark:border-stone-700 p-4"
                    >
                      <Truck size={20} className="text-brand-accent mb-2" />
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        {method.name}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {method.estimatedDays}
                      </p>
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-1">
                        {method.price === 0
                          ? "Free"
                          : formatCurrency(method.price)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-stone-50 dark:bg-stone-900 p-6">
                  <div className="flex items-start gap-3">
                    <RotateCcw size={20} className="text-brand-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-stone-900 dark:text-stone-100 mb-1">
                        Return Policy
                      </h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {shipping.returnPolicy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t border-stone-200 dark:border-stone-700">
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently viewed */}
      <section className="py-12 border-t border-stone-200 dark:border-stone-700">
        <RecentlyViewed products={allProducts} currentProductId={product.id} />
      </section>

      {/* Size guide modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        sizeGuide={ui.sizeGuide}
      />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: `https://images.unsplash.com/${product.images[0]}?w=800&h=800&fit=crop&q=80`,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avgRating.toFixed(1),
              reviewCount: reviews.length || product.reviewCount,
            },
          }),
        }}
      />
    </div>
  );
}
