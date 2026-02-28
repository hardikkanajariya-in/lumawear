"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/providers/ToastProvider";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitted(true);
    showToast("Welcome to LumaWear! Check your inbox for 10% off.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-20 sm:py-24 bg-brand-primary dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-brand-accent uppercase tracking-widest mb-3"
          >
            Stay in the Loop
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Get 10% Off Your First Order
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-stone-400 mb-8 text-sm sm:text-base"
          >
            Subscribe to our newsletter for exclusive access to new drops,
            style guides, and member-only offers.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-stone-400 text-sm focus:ring-2 focus:ring-brand-accent focus:border-transparent focus:outline-none"
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={submitted}
              icon={
                submitted ? <Check size={16} /> : <Send size={16} />
              }
              className="sm:w-auto"
            >
              {submitted ? "Subscribed!" : "Subscribe"}
            </Button>
          </motion.form>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-xs text-stone-500"
          >
            No spam, unsubscribe anytime. By subscribing you agree to our{" "}
            <a href="/privacy" className="text-stone-400 underline hover:text-white">
              Privacy Policy
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
