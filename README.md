# LumaWear — Premium Fashion E-Commerce UI

A production-ready, premium fashion e-commerce storefront built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion**. Features a complete shopping experience with product browsing, cart management, wishlist, checkout flow, and more — all powered by static JSON data (no backend required).

![LumaWear](https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop&q=80)

## ✨ Features

### Shopping Experience
- **Product Catalog** — Filterable, sortable grid with search, grid/list toggle, and pagination
- **Product Detail** — Full-featured pages with image gallery, lightbox, variant selection, size guide, reviews, and related products
- **Collections** — Curated collection pages with hero banners and filtered product grids
- **Quick View** — Modal preview without leaving the current page

### Cart & Checkout
- **Shopping Cart** — Full cart page + slide-out drawer with quantity controls, save-for-later, promo codes
- **4-Step Checkout** — Shipping Info → Shipping Method → Payment → Review with validation and progress indicator
- **Order Summary** — Real-time totals with shipping and discount calculations

### User Features
- **Wishlist** — Persistent favorites with move-to-cart functionality
- **Account Dashboard** — Profile, order history, and address management (mock data)
- **Recently Viewed** — Automatically tracked product browsing history
- **Dark Mode** — System-aware theme with manual toggle

### Design & UX
- **Responsive** — Mobile-first design that works on all screen sizes
- **Animations** — Smooth page transitions, section reveals, toast notifications, and micro-interactions
- **Accessibility** — Skip-to-content, proper focus management, ARIA labels, keyboard navigation
- **SEO** — Dynamic metadata, JSON-LD structured data, sitemap, robots.txt, OG images

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org) | React framework with App Router |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| [Framer Motion](https://www.framer.com/motion) | Animations |
| [Lucide React](https://lucide.dev) | Icons |
| [TypeScript](https://www.typescriptlang.org) | Type safety |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── template.tsx        # Page transition wrapper
│   ├── loading.tsx         # Global loading skeleton
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # Custom 404
│   ├── shop/               # Shop + product detail pages
│   ├── collections/        # Collection pages
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout flow
│   ├── wishlist/           # Wishlist page
│   ├── account/            # Account dashboard
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
├── components/
│   ├── ui/                 # 18 reusable UI primitives
│   ├── layout/             # Header, Footer, Navigation, etc.
│   ├── sections/           # Homepage sections
│   └── features/           # Feature components (cart, filters, checkout, etc.)
├── data/                   # Static JSON data files
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, types, constants
└── providers/              # Context providers (Cart, Wishlist, Toast, Theme)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url> lumawear
cd lumawear

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the store.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to modify the brand color palette:

```ts
colors: {
  brand: {
    primary: '#1a1a1a',    // Main brand color
    accent: '#c9a96e',     // Gold accent
    soft: '#f5f0eb',       // Warm background
  }
}
```

### Fonts
The project uses **Inter** (body) and **DM Serif Display** (headings). Change them in `src/app/layout.tsx`.

### Products
All product data lives in `src/data/products.json`. Add, edit, or remove products by modifying this file. Each product supports:
- Multiple images, colors, and sizes
- Category and collection assignment
- Tags, ratings, and stock status
- Sale pricing

### Content
- **Site settings**: `src/data/site.json`
- **Collections**: `src/data/collections.json`
- **Categories**: `src/data/categories.json`
- **Reviews**: `src/data/reviews.json`
- **Shipping**: `src/data/shipping.json`
- **Legal pages**: `src/data/legal.json`

## 📄 License

This project is source-available for educational and portfolio purposes. See [LICENSE.md](LICENSE.md) for details.

Commercial use requires a separate license. See [COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md).

---

Designed & built by [Hardik Kanajariya](https://hardikkanajariya.in)
