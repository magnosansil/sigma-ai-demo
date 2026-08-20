"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/product-grid";
import { CatalogToolbar } from "@/components/catalog/catalog-toolbar";
import { ActiveFilters } from "@/components/catalog/active-filters";
import { MobileFilterDrawer } from "@/components/catalog/mobile-filter-drawer";
import { EmptyCatalog } from "@/components/catalog/empty-catalog";

export function CatalogResults({ products }: { products: Product[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <div className="catalog-main">
      <CatalogToolbar count={products.length} openFilters={() => setFiltersOpen(true)} />
      <ActiveFilters />
      {products.length ? <ProductGrid products={products} /> : <EmptyCatalog />}
      <MobileFilterDrawer open={filtersOpen} close={() => setFiltersOpen(false)} />
    </div>
  );
}
