"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishlistProvider";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: number;
}

export function WishlistButton({
  productId,
  className,
  size = 18,
}: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
        wishlisted
          ? "bg-red-50 dark:bg-red-950/30 text-red-500"
          : "bg-white/80 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30",
        className
      )}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={size}
        className={cn(wishlisted && "fill-current")}
      />
    </button>
  );
}
