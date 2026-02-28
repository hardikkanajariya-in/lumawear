"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { unsplashUrl } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-stone-100 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex flex-col lg:flex-row items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex-1 px-6 sm:px-8 lg:px-12 py-16 lg:py-24"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-medium text-brand-accent uppercase tracking-widest mb-4"
            >
              New Season Collection
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-900 dark:text-stone-100 leading-[1.1] mb-6"
            >
              Minimal.
              <br />
              Intentional.
              <br />
              <span className="text-brand-accent">Yours.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-stone-600 dark:text-stone-400 max-w-md mb-8 leading-relaxed"
            >
              Thoughtfully crafted essentials that elevate your everyday.
              Premium materials meet timeless design.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Shop Now
                </Button>
              </Link>
              <Link href="/collections/summer-essentials">
                <Button variant="secondary" size="lg">
                  Explore Collections
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex-1 w-full lg:h-full min-h-[50vh] lg:min-h-[80vh]"
          >
            <Image
              src={unsplashUrl("photo-1441984904996-e0b6ba687e04", 1200, 900)}
              alt="LumaWear fashion store interior showcasing minimal aesthetic"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-100/80 dark:from-stone-900/80 via-transparent to-transparent lg:block hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
