import { Star, BadgeCheck } from "lucide-react";
import { Rating, Avatar } from "@/components/ui";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div
      className={cn(
        "py-5 border-b border-stone-200 dark:border-stone-700 last:border-0",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <Avatar alt={review.author} size={36} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                {review.author}
              </span>
              {review.verified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-green-600 dark:text-green-400 font-medium">
                  <BadgeCheck size={12} />
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 dark:text-stone-500">
              {formatDate(review.date)}
            </p>
          </div>
        </div>
        <Rating value={review.rating} size={14} />
      </div>

      {review.title && (
        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
          {review.title}
        </h4>
      )}
      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        {review.body}
      </p>
    </div>
  );
}
