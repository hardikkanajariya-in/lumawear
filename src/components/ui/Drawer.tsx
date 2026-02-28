"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  side?: "left" | "right" | "bottom";
}

const slideVariants = {
  left: {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  },
  right: {
    hidden: { x: "100%" },
    visible: { x: 0 },
  },
  bottom: {
    hidden: { y: "100%" },
    visible: { y: 0 },
  },
};

const positionStyles = {
  left: "left-0 top-0 h-full w-full max-w-md",
  right: "right-0 top-0 h-full w-full max-w-md",
  bottom: "bottom-0 left-0 w-full max-h-[85vh] rounded-t-2xl",
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  className,
  side = "right",
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={drawerRef}
            variants={slideVariants[side]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className={cn(
              "fixed bg-white dark:bg-stone-900 shadow-2xl overflow-y-auto",
              positionStyles[side],
              className
            )}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-4">
              <h2
                id="drawer-title"
                className="text-lg font-semibold text-stone-900 dark:text-stone-100"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
