"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Search, Grid3X3, List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks";
import { useMediaQuery } from "@/hooks";
import { ITEMS_PER_PAGE, SORT_OPTIONS } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout";
import { Button, Input, Drawer } from "@/components/ui";
import { ProductGrid } from "@/components/features/ProductGrid";
import { FilterSidebar } from "@/components/features/filters";
import { SortDropdown } from "@/components/features/SortDropdown";
import type { Product, Category, FilterState, SortOption } from "@/lib/types";

interface ShopPageClientProps {
  products: Product[];
  categories: Category[];
}

export function ShopPageClient({ products, categories }: ShopPageClientProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    colors: [],
    sizes: [],
    priceRange: [0, Infinity],
    rating: null,
  });

  // Extract unique colors from products
  const allColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    products.forEach((p) =>
      p.colors.forEach((c) => colorMap.set(c.name, c.hex))
    );
    return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // All sizes
  const allSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => sizeSet.add(s)));
    return Array.from(sizeSet);
  }, [products]);

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    // Sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    // Price range
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Rating
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }

    // Sort
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => {
          const aNew = a.badges.includes("New") ? 1 : 0;
          const bNew = b.badges.includes("New") ? 1 : 0;
          return bNew - aNew;
        });
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, debouncedSearch, filters, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity ? 1 : 0) +
    (filters.rating ? 1 : 0);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const showingFrom = (page - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(page * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Shop All
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Discover our curated collection of premium fashion essentials.
        </p>
      </div>

      {/* Toolbar: search, sort, view toggle, filter button (mobile) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search products..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1); }} />

          <div className="hidden sm:flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-2 transition-colors",
                view === "grid"
                  ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "text-stone-400 hover:text-stone-600"
              )}
              aria-label="Grid view"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-2 transition-colors",
                view === "list"
                  ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "text-stone-400 hover:text-stone-600"
              )}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          {isMobile && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFilterOpen(true)}
              icon={<SlidersHorizontal size={14} />}
            >
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        {!isMobile && (
          <div className="w-64 flex-shrink-0 hidden md:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFilterChange}
              categories={categories}
              availableColors={allColors}
              availableSizes={allSizes}
            />
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 text-sm text-stone-500 dark:text-stone-400">
            <span>
              {filteredProducts.length > 0
                ? `Showing ${showingFrom}–${showingTo} of ${filteredProducts.length} products`
                : "No products found"}
            </span>
          </div>

          <ProductGrid products={paginatedProducts} viewMode={view} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-stone-200 dark:border-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                    p === page
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                      : "border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-stone-200 dark:border-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {isMobile && (
        <Drawer
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          title="Filters"
          side="left"
        >
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFilterChange}
            categories={categories}
            availableColors={allColors}
            availableSizes={allSizes}
          />
        </Drawer>
      )}
    </div>
  );
}
