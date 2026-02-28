import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl font-bold text-brand-accent mb-4">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Page Not Found
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button icon={<ArrowLeft size={16} />}>Back to Home</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary" icon={<Search size={16} />}>
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
