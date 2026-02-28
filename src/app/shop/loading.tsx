import { ProductCardSkeleton } from "@/components/ui";
import { Skeleton } from "@/components/ui";

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-40 mb-8" />

      {/* Title */}
      <Skeleton className="h-10 w-48 mb-3" />
      <Skeleton className="h-5 w-80 mb-8" />

      <div className="flex gap-8">
        {/* Filter sidebar skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-40" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
