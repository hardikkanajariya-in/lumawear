import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FooterColumn, SocialLink } from "@/lib/types";

interface FooterProps {
  brandName: string;
  tagline: string;
  columns: FooterColumn[];
  socials: SocialLink[];
  creditText: string;
  creditUrl: string;
}

const socialIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
};

export function Footer({
  brandName,
  tagline,
  columns,
  socials,
  creditText,
  creditUrl,
}: FooterProps) {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100"
            >
              {brandName}
            </Link>
            <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 max-w-xs leading-relaxed">
              {tagline}
            </p>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.platform.toLowerCase()] || ExternalLink;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-brand-accent hover:text-white transition-colors"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 dark:text-stone-500">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Created by{" "}
            <a
              href={creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              {creditText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
