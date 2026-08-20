import { products } from "@/data/products";
import { audiences, categories, type Product } from "@/types/product";

export type CatalogSort = "featured" | "price-asc" | "price-desc" | "newest";

export interface CatalogFilters {
  query?: string;
  category?: string;
  audience?: string;
  size?: string;
  color?: string;
  maxPrice?: number;
  sort?: CatalogSort;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function filterProducts(filters: CatalogFilters, source = products) {
  const query = filters.query?.trim().toLocaleLowerCase("pt-BR");
  const validCategory = categories.includes(filters.category as (typeof categories)[number]);
  const validAudience = audiences.includes(filters.audience as (typeof audiences)[number]);

  const filtered = source.filter((product) => {
    const searchable = `${product.name} ${product.tagline} ${product.description}`.toLocaleLowerCase("pt-BR");
    return (
      (!query || searchable.includes(query)) &&
      (!validCategory || product.category === filters.category) &&
      (!validAudience || product.audience === filters.audience) &&
      (!filters.size || product.sizes.includes(filters.size)) &&
      (!filters.color || product.colors.some((color) => color.name === filters.color)) &&
      (!filters.maxPrice || product.price <= filters.maxPrice)
    );
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    if (filters.sort === "newest") return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
}

export function getRelated(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.id !== product.id && candidate.category === product.category)
    .slice(0, limit);
}
