import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedDropsSection } from "@/components/sections/FeaturedDropsSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { NewArrivalsSection } from "@/components/sections/NewArrivalsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { RecentlyViewed } from "@/components/features/RecentlyViewed";
import products from "@/data/products.json";
import collections from "@/data/collections.json";
import categories from "@/data/categories.json";
import testimonials from "@/data/testimonials.json";
import type { Product, Collection, Category, Testimonial } from "@/lib/types";

export default function Home() {
  const allProducts = products as Product[];
  const allCollections = collections as Collection[];
  const allCategories = categories as Category[];
  const allTestimonials = testimonials as Testimonial[];

  const featuredProducts = allProducts.filter((p) =>
    p.badges.includes("Bestseller") || p.badges.includes("New")
  ).slice(0, 4);

  const newArrivals = allProducts
    .filter((p) => p.badges.includes("New"))
    .slice(0, 8);

  // If not enough "New" items, pad with others
  const arrivals =
    newArrivals.length >= 4
      ? newArrivals
      : allProducts.slice(0, 8);

  return (
    <>
      <HeroSection />
      <FeaturedDropsSection
        products={featuredProducts}
      />
      <CategoriesSection categories={allCategories} />
      <NewArrivalsSection products={arrivals} />
      <TestimonialsSection testimonials={allTestimonials} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RecentlyViewed products={allProducts} />
      </section>
      <NewsletterSection />
    </>
  );
}
