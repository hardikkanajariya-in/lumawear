"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface WishlistContextValue {
  items: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lumawear-wishlist");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.warn("Error reading wishlist from localStorage:", error);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lumawear-wishlist", JSON.stringify(items));
  }, [items, mounted]);

  const toggleWishlist = useCallback((productId: string) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => {
      return items.includes(productId);
    },
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items: mounted ? items : [],
        toggleWishlist,
        isWishlisted: mounted ? isWishlisted : () => false,
        wishlistCount: mounted ? items.length : 0,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
