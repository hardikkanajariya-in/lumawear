"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { unsplashUrl } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { PriceTag, Badge } from "@/components/ui";
import type { Product } from "@/lib/types";

interface NewArrivalsSectionProps {
  products: Product[];
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const arrivals = products
    .filter((p) => p.badges.includes("New"))
    .slice(0, 8);

  if (arrivals.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-sm font-medium text-brand-accent uppercase tracking-widest mb-2">
                Fresh Finds
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                New Arrivals
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
            >
              {arrivals.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3">
                    <Image
                      src={unsplashUrl(product.images[0], 560, 750)}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="280px"
                    />
                    {product.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.badges.map((badge) => (
                          <Badge key={badge}>{badge}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1 group-hover:text-brand-accent transition-colors truncate">
                    {product.name}
                  </h3>
                  <PriceTag
                    price={product.price}
                    originalPrice={product.compareAtPrice ?? undefined}
                    className="text-sm"
                  />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
            >
              View All New Arrivals
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
