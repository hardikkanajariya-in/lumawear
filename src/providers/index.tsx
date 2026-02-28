"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import { CartProvider } from "./CartProvider";
import { WishlistProvider } from "./WishlistProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
