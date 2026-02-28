export const PROMO_CODES: Record<string, number> = {
  LUMA20: 0.2,
  WELCOME10: 0.1,
};

export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";
export const FREE_SHIPPING_THRESHOLD = 99;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
};

export const ITEMS_PER_PAGE = 12;

export const PRICE_RANGES: { label: string; min: number; max: number }[] = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $500", min: 200, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
