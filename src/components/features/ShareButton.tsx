"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/providers/ToastProvider";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  className?: string;
}

export function ShareButton({ className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy link.", "error");
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full border border-stone-300 dark:border-stone-600 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors",
        className
      )}
      aria-label="Share product"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
    </button>
  );
}
