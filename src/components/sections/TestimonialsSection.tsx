"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { unsplashUrl } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Avatar } from "@/components/ui";
import type { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-brand-soft dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-medium text-brand-accent uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeUp}
                className="relative bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <Quote
                  size={24}
                  className="text-brand-accent/20 mb-4"
                />
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6 text-sm sm:text-base">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar
                    photoId={testimonial.avatarPhotoId}
                    alt={testimonial.name}
                    size={44}
                  />
                  <div>
                    <p className="font-medium text-sm text-stone-900 dark:text-stone-100">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra testimonials below as quotes */}
          {testimonials.length > 3 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {testimonials.slice(3).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={fadeUp}
                  className="flex items-start gap-4 bg-white dark:bg-stone-900 rounded-xl p-5 shadow-sm"
                >
                  <Avatar
                    photoId={testimonial.avatarPhotoId}
                    alt={testimonial.name}
                    size={40}
                  />
                  <div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-2">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <p className="text-xs font-medium text-stone-900 dark:text-stone-100">
                      {testimonial.name}
                      <span className="text-stone-400 dark:text-stone-500 font-normal">
                        {" "}
                        · {testimonial.location}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
