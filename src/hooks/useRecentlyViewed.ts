"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [items, setItems] = useLocalStorage<string[]>(
    "lumawear-recently-viewed",
    []
  );

  const addViewed = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const filtered = prev.filter((id) => id !== productId);
        return [productId, ...filtered].slice(0, MAX_ITEMS);
      });
    },
    [setItems]
  );

  const clearViewed = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return { recentlyViewed: items, addViewed, clearViewed };
}
