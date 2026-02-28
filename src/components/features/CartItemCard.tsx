"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Bookmark, MoveRight } from "lucide-react";
import { unsplashUrl, cn } from "@/lib/utils";
import { PriceTag, QuantityStepper } from "@/components/ui";
import type { CartItem as CartItemType } from "@/lib/types";

interface CartItemCardProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater?: (id: string) => void;
  className?: string;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  className,
}: CartItemCardProps) {
  return (
    <div
      className={cn(
        "flex gap-4 py-4 border-b border-stone-200 dark:border-stone-700 last:border-0",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/shop/${item.slug}`}
        className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0"
      >
        <Image
          src={unsplashUrl(item.image, 200, 260)}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/shop/${item.slug}`}
              className="text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-brand-accent transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {item.color} · {item.size}
            </p>
          </div>
          <PriceTag
            price={item.price * item.quantity}
            className="text-sm flex-shrink-0"
          />
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <QuantityStepper
            value={item.quantity}
            onChange={(qty) => onUpdateQuantity(item.id, qty)}
          />
          <div className="flex items-center gap-1">
            {onSaveForLater && (
              <button
                type="button"
                onClick={() => onSaveForLater(item.id)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-stone-400 hover:text-brand-accent hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Save for later"
              >
                <Bookmark size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="flex items-center justify-center w-8 h-8 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
