import { cn } from "@/lib/utils";

type SkeletonVariant = "rectangular" | "circular" | "text";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-stone-200 dark:bg-stone-700",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded-md h-4",
        variant === "rectangular" && "rounded-xl",
        className
      )}
      style={{ width, height }}
      role="presentation"
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/4 h-5" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-20" />
          ))}
        </div>
      </div>
      <div className="space-y-4 py-4">
        <Skeleton variant="text" className="w-3/4 h-8" />
        <Skeleton variant="text" className="w-1/4 h-6" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-2/3 h-4" />
        <div className="flex gap-2 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="circular" className="w-10 h-10" />
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-14 h-10" />
          ))}
        </div>
        <Skeleton className="w-full h-14 mt-4" />
      </div>
    </div>
  );
}
