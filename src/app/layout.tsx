import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import siteData from "@/data/site.json";
import { Providers } from "@/providers";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { CartDrawer } from "@/components/features";
import { DemoBanner } from "@/components/features";
import { BackToTop } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LumaWear — Premium Fashion, Redefined",
    template: "%s | LumaWear",
  },
  description:
    "Discover curated collections of premium fashion essentials. Modern designs crafted with sustainable materials for the conscious consumer.",
  keywords: [
    "fashion",
    "premium",
    "sustainable",
    "clothing",
    "e-commerce",
    "LumaWear",
  ],
  authors: [{ name: "Hardik Kanajariya", url: "https://hardikkanajariya.in" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LumaWear",
    title: "LumaWear — Premium Fashion, Redefined",
    description:
      "Discover curated collections of premium fashion essentials.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumaWear — Premium Fashion, Redefined",
    description:
      "Discover curated collections of premium fashion essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmSerif.variable} font-body antialiased bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100`}
      >
        <Providers>
          <a
            href="#main-content"
            className="skip-to-content sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg"
          >
            Skip to content
          </a>
          <DemoBanner />
          <Header navItems={siteData.navItems} />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer
            brandName={siteData.brandName}
            tagline={siteData.tagline}
            columns={siteData.footerColumns}
            socials={siteData.socials}
            creditText={siteData.creditText}
            creditUrl={siteData.creditUrl}
          />
          <CartDrawer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
