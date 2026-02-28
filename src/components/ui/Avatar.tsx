import Image from "next/image";
import { cn } from "@/lib/utils";
import { unsplashUrl } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  photoId?: string;
  alt: string;
  size?: number;
  className?: string;
  fallback?: string;
}

export function Avatar({
  src,
  photoId,
  alt,
  size = 40,
  className,
  fallback,
}: AvatarProps) {
  const imageSrc = src || (photoId ? unsplashUrl(photoId, size * 2, size * 2) : null);
  const initials = fallback || alt.charAt(0).toUpperCase();

  if (!imageSrc) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent font-semibold",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
