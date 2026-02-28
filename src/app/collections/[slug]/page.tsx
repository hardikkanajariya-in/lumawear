import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import products from "@/data/products.json";
import collections from "@/data/collections.json";
import categories from "@/data/categories.json";
import type { Product, Collection, Category } from "@/lib/types";
import { unsplashUrl } from "@/lib/utils";
import { ShopPageClient } from "../../shop/ShopPageClient";

const allProducts = products as Product[];
const allCollections = collections as Collection[];
const allCategories = categories as Category[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = allCollections.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: collection.name,
      description: collection.description,
      images: [
        {
          url: unsplashUrl(collection.coverImage, 1200, 630),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = allCollections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const collectionProducts = allProducts.filter((p) =>
    collection.productIds.includes(p.id)
  );

  return (
    <div>
      {/* Collection hero */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <Image
          src={unsplashUrl(collection.coverImage, 1600, 600)}
          alt={collection.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-2">
            {collection.name}
          </h1>
          <p className="text-stone-200 text-lg max-w-xl">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products */}
      <ShopPageClient
        products={collectionProducts}
        categories={allCategories}
      />
    </div>
  );
}
