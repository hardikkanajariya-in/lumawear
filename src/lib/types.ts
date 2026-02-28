/* ─── Product ─── */
export interface ProductColor {
  name: string;
  hex: string;
  imageId: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string;
  careInstructions: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  collectionSlugs: string[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  badges: string[];
  inStock: boolean;
}

/* ─── Collection ─── */
export interface Collection {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  productIds: string[];
}

/* ─── Category ─── */
export interface Category {
  slug: string;
  name: string;
  count: number;
  image: string;
}

/* ─── Cart ─── */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  color: string;
  size: string;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
}

export interface SavedItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  color: string;
  size: string;
  price: number;
}

/* ─── Review ─── */
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

/* ─── Testimonial ─── */
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarPhotoId: string;
  quote: string;
}

/* ─── Shipping ─── */
export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

export interface ShippingData {
  methods: ShippingMethod[];
  countries: string[];
  returnPolicy: string;
}

/* ─── Legal ─── */
export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalData {
  privacyPolicy: LegalSection[];
  termsOfService: LegalSection[];
}

/* ─── Site Config ─── */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  description: string;
  navItems: NavItem[];
  footerColumns: FooterColumn[];
  socials: SocialLink[];
  announcementText: string;
  creditText: string;
  creditUrl: string;
}

/* ─── UI Data ─── */
export interface SizeGuideRow {
  size: string;
  chest: { cm: number; inches: number };
  waist: { cm: number; inches: number };
  hips: { cm: number; inches: number };
  length: { cm: number; inches: number };
}

export interface UIData {
  announcementBar: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterCta: string;
  sizeGuide: SizeGuideRow[];
}

/* ─── Account ─── */
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

export interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

/* ─── Toast ─── */
export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/* ─── Filter ─── */
export interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  rating: number | null;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "rating";
