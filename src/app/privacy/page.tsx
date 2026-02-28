import type { Metadata } from "next";
import legalData from "@/data/legal.json";
import { Breadcrumbs } from "@/components/layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "LumaWear privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

      <div className="mt-8 mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-stone-400">
          Last updated: January 1, 2025
        </p>
      </div>

      <div className="space-y-10">
        {legalData.privacyPolicy.map((section, index) => (
          <section key={index}>
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              {section.title}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
