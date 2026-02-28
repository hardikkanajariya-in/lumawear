import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "sale" | "bestseller" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: string;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  sale: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  bestseller:
    "bg-brand-accent/20 text-brand-accent dark:bg-brand-accent/30 dark:text-brand-accent",
  default:
    "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
};

function getBadgeVariant(text: string): BadgeVariant {
  const lower = text.toLowerCase();
  if (lower === "new") return "new";
  if (lower === "sale") return "sale";
  if (lower === "bestseller") return "bestseller";
  return "default";
}

export function Badge({ variant, children, className }: BadgeProps) {
  const resolvedVariant = variant || getBadgeVariant(children);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[resolvedVariant],
        className
      )}
    >
      {children}
    </span>
  );
}
