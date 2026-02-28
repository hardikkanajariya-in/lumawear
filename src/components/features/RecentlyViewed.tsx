"use client";

import Link from "next/link";
import Image from "next/image";
import { unsplashUrl } from "@/lib/utils";
import { useRecentlyViewed } from "@/hooks";
import { PriceTag } from "@/components/ui";
import type { Product } from "@/lib/types";

interface RecentlyViewedProps {
  products: Product[];
  currentProductId?: string;
}

export function RecentlyViewed({
  products,
  currentProductId,
}: RecentlyViewedProps) {
  const { recentlyViewed } = useRecentlyViewed();
  const viewed = recentlyViewed
    .filter((id: string) => id !== currentProductId)
    .map((id: string) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6) as Product[];

  if (viewed.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
        Recently Viewed
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
        {viewed.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group flex-shrink-0 w-[160px] sm:w-[180px] snap-start"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2">
              <Image
                src={unsplashUrl(product.images[0], 360, 480)}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="180px"
              />
            </div>
            <h3 className="text-xs font-medium text-stone-900 dark:text-stone-100 truncate group-hover:text-brand-accent transition-colors">
              {product.name}
            </h3>
            <PriceTag
              price={product.price}
              originalPrice={product.compareAtPrice ?? undefined}
              className="text-xs"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
