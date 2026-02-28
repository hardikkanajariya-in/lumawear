import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Heart, Globe, Sparkles } from "lucide-react";
import { unsplashUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "The LumaWear story — premium fashion crafted with intention and sustainability at its core.",
};

const values = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "We source only the finest sustainable fabrics and materials, ensuring every piece is as kind to the planet as it is beautiful to wear.",
  },
  {
    icon: Heart,
    title: "Crafted with Care",
    description:
      "Each garment is carefully constructed by skilled artisans who share our passion for quality and attention to detail.",
  },
  {
    icon: Globe,
    title: "Ethical Production",
    description:
      "Fair wages, safe working conditions, and transparent supply chains are non-negotiable pillars of how we do business.",
  },
  {
    icon: Sparkles,
    title: "Timeless Design",
    description:
      "We design pieces that transcend seasons — versatile, elegant, and built to be loved for years, not just one season.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 sm:h-96 w-full overflow-hidden">
        <Image
          src={unsplashUrl("photo-1441984904996-e0b6ba687e04", 1600, 600)}
          alt="LumaWear fashion atelier"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Our Story
          </h1>
          <p className="text-stone-200 text-lg max-w-xl">
            Minimal. Intentional. Yours.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6">
          Fashion with Purpose
        </h2>
        <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>
            LumaWear was born from a simple belief: that premium fashion
            shouldn&apos;t come at the cost of our planet or the people who make it.
            We set out to create a collection of wardrobe essentials that are as
            thoughtfully made as they are beautifully designed.
          </p>
          <p>
            Every piece in our collection is the result of meticulous research,
            sustainable sourcing, and collaboration with artisans who share our
            commitment to quality. From organic cotton tees to hand-finished
            leather accessories, we obsess over every detail.
          </p>
          <p>
            We believe in a world where buying less but better is the norm —
            where each item in your closet is chosen with intention and worn with
            pride. That&apos;s the LumaWear promise.
          </p>
        </div>
      </section>

      {/* Values grid */}
      <section className="bg-stone-50 dark:bg-stone-900/50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center space-y-3">
                <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                  <value.icon size={24} className="text-brand-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100">
                  {value.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              Sustainability is Not a Trend
            </h2>
            <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                For us, sustainability isn&apos;t a marketing buzzword — it&apos;s
                the foundation of everything we create. We&apos;re committed to
                reducing our environmental footprint through every decision we
                make.
              </p>
              <p>
                Our packaging is 100% recyclable. Our supply chain is fully
                transparent. And we&apos;re constantly exploring new materials and
                processes that push the boundaries of sustainable fashion.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src={unsplashUrl("photo-1515886657613-9f3515b0c78f", 800, 600)}
              alt="Minimal fashion aesthetic"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-stone-50 dark:bg-stone-900/50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
            <Image
              src={unsplashUrl("photo-1506794778202-cad84cf45f1d", 200, 200)}
              alt="Founder"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Built with Passion
          </h2>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            LumaWear is a design concept by{" "}
            <a
              href="https://hardikkanajariya.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              Hardik Kanajariya
            </a>
            , demonstrating what modern fashion e-commerce can look like when
            craft meets technology.
          </p>
        </div>
      </section>
    </div>
  );
}
