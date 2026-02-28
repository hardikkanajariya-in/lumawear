"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { cn, unsplashUrl } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 group cursor-zoom-in">
        <Image
          src={unsplashUrl(images[mainIndex], 900, 900)}
          alt={`${productName} - main image`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onClick={() => setLightboxOpen(true)}
        />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          aria-label="Open image gallery"
        >
          <ZoomIn size={16} />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((imageId, index) => (
            <button
              key={imageId + index}
              type="button"
              onClick={() => setMainIndex(index)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                index === mainIndex
                  ? "border-brand-accent ring-1 ring-brand-accent"
                  : "border-transparent hover:border-stone-300 dark:hover:border-stone-600"
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === mainIndex ? "true" : "false"}
            >
              <Image
                src={unsplashUrl(imageId, 160, 160)}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={images}
        productName={productName}
        isOpen={lightboxOpen}
        initialIndex={mainIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
