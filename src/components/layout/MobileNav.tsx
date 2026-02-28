"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks";
import { useWishlist } from "@/providers/WishlistProvider";
import { useCart } from "@/providers/CartProvider";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import type { NavItem } from "@/lib/types";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  const trapRef = useRef<HTMLDivElement>(null);
  useFocusTrap(trapRef, isOpen);
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <motion.div
            ref={trapRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white dark:bg-stone-900 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-700">
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-xl font-bold text-stone-900 dark:text-stone-100"
              >
                LumaWear
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-3.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-medium"
                    >
                      {item.label}
                      <ChevronRight
                        size={16}
                        className="text-stone-400"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Utility links */}
              <div className="mt-6 px-3 border-t border-stone-200 dark:border-stone-700 pt-4 space-y-1">
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto text-xs bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <ShoppingBag size={18} />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto text-xs bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full font-medium">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <User size={18} />
                  <span>Account</span>
                </Link>
              </div>
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <ThemeToggle />
              <span className="text-xs text-stone-400 dark:text-stone-500">
                © LumaWear
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
