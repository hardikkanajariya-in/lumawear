import type { Metadata } from "next";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import reviews from "@/data/reviews.json";
import type { Product, Review } from "@/lib/types";
import { ProductDetailClient } from "./ProductDetailClient";

const allProducts = products as Product[];
const allReviews = reviews as Record<string, Review[]>;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: `https://images.unsplash.com/${product.images[0]}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const productReviews = allReviews[product.id] || [];
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      reviews={productReviews}
      relatedProducts={relatedProducts}
      allProducts={allProducts}
    />
  );
}
