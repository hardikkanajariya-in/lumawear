"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { unsplashUrl } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { PriceTag, Badge } from "@/components/ui";
import type { Product } from "@/lib/types";

interface FeaturedDropsSectionProps {
  products: Product[];
}

export function FeaturedDropsSection({ products }: FeaturedDropsSectionProps) {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-brand-accent uppercase tracking-widest mb-2">
                Just Dropped
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                Featured Drops
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-brand-accent transition-colors"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, index) => (
              <motion.div key={product.id} variants={fadeUp}>
                <Link href={`/shop/${product.slug}`} className="group block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4">
                    <Image
                      src={unsplashUrl(product.images[0], 600, 800)}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {product.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.badges.map((badge) => (
                          <Badge key={badge}>{badge}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1 group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h3>
                  <PriceTag
                    price={product.price}
                    originalPrice={product.compareAtPrice ?? undefined}
                    className="text-sm"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
            >
              View All Products
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
