import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { filterProducts, type CatalogFilters as Filters, type CatalogSort } from "@/lib/catalog";

export const metadata: Metadata = { title: "Catálogo", description: "Explore a coleção completa SIGMA." };

type Params = Record<string, string | string[] | undefined>;
const value = (params: Params, key: string) => typeof params[key] === "string" ? params[key] : undefined;

export default async function CatalogPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const filters: Filters = {
    query: value(params, "query"),
    category: value(params, "category"),
    audience: value(params, "audience"),
    size: value(params, "size"),
    color: value(params, "color"),
    maxPrice: Number(value(params, "maxPrice")) || undefined,
    sort: (value(params, "sort") || "featured") as CatalogSort,
  };
  const filtered = filterProducts(filters);

  return (
    <Container>
      <header className="page-hero">
        <span className="eyebrow">Coleção completa</span>
        <h1 className="section-title">Seu próximo movimento.</h1>
        <p>Performance precisa. Design sem excesso. Encontre o equipamento que acompanha seu ritmo.</p>
      </header>
      <div className="catalog-layout">
        <aside className="filters" aria-label="Filtros do catálogo">
          <CatalogFilters />
        </aside>
        <CatalogResults products={filtered} />
      </div>
    </Container>
  );
}
