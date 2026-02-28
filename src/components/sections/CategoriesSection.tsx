"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { unsplashUrl } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { Category } from "@/lib/types";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-brand-soft dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-sm font-medium text-brand-accent uppercase tracking-widest mb-2">
              Browse
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <motion.div key={category.slug} variants={fadeUp}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 mb-3">
                    <Image
                      src={unsplashUrl(category.image, 400, 530)}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-xs mt-0.5">
                        {category.count} items
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
