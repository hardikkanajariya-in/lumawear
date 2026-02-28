import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 16,
  showValue = false,
  count,
  className,
}: RatingProps) {
  const stars = [];
  const clamped = Math.min(Math.max(value, 0), max);

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(clamped)) {
      stars.push(
        <Star
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400"
        />
      );
    } else if (i === Math.ceil(clamped) && clamped % 1 >= 0.25) {
      stars.push(
        <StarHalf
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400"
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={size}
          className="text-stone-300 dark:text-stone-600"
        />
      );
    }
  }

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rating: ${clamped} out of ${max} stars`}
    >
      {stars}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-stone-700 dark:text-stone-300">
          {clamped.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="ml-1 text-sm text-stone-500 dark:text-stone-400">
          ({count})
        </span>
      )}
    </div>
  );
}
