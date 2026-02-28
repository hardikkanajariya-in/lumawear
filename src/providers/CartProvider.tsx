"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, SavedItem } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  savedItems: SavedItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (id: string) => void;
  moveToCart: (savedId: string) => void;
  removeSaved: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  discount: { code: string; percentage: number } | null;
  setDiscount: (discount: { code: string; percentage: number } | null) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

function generateCartItemId(
  productId: string,
  color: string,
  size: string
): string {
  return `${productId}-${color}-${size}`.toLowerCase().replace(/\s+/g, "-");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discount, setDiscount] = useState<{ code: string; percentage: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("lumawear-cart");
      const storedSaved = localStorage.getItem("lumawear-saved");
      if (storedItems) setItems(JSON.parse(storedItems));
      if (storedSaved) setSavedItems(JSON.parse(storedSaved));
    } catch (error) {
      console.warn("Error reading cart from localStorage:", error);
    }
    setMounted(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lumawear-cart", JSON.stringify(items));
  }, [items, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lumawear-saved", JSON.stringify(savedItems));
  }, [savedItems, mounted]);

  const addItem = useCallback(
    (item: Omit<CartItem, "id">) => {
      const id = generateCartItemId(item.productId, item.color, item.size);
      setItems((prev) => {
        const existing = prev.find((i) => i.id === id);
        if (existing) {
          return prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        }
        return [...prev, { ...item, id }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(null);
  }, []);

  const saveForLater = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        setSavedItems((saved) => [
          ...saved,
          {
            id: item.id,
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            image: item.image,
            color: item.color,
            size: item.size,
            price: item.price,
          },
        ]);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const moveToCart = useCallback((savedId: string) => {
    setSavedItems((prev) => {
      const item = prev.find((i) => i.id === savedId);
      if (item) {
        setItems((cartItems) => {
          const existing = cartItems.find((i) => i.id === savedId);
          if (existing) {
            return cartItems.map((i) =>
              i.id === savedId ? { ...i, quantity: i.quantity + 1 } : i
            );
          }
          return [
            ...cartItems,
            {
              ...item,
              quantity: 1,
              compareAtPrice: null,
            },
          ];
        });
      }
      return prev.filter((i) => i.id !== savedId);
    });
  }, []);

  const removeSaved = useCallback((id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: mounted ? items : [],
        savedItems: mounted ? savedItems : [],
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCart,
        removeSaved,
        cartCount: mounted ? cartCount : 0,
        cartTotal: mounted ? cartTotal : 0,
        isCartOpen,
        setIsCartOpen,
        discount,
        setDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
