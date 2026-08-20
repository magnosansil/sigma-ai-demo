"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CatalogToolbar({ count, openFilters }: { count: number; openFilters: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("query") || "");

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="catalog-toolbar">
      <p>{count} {count === 1 ? "produto" : "produtos"}</p>
      <div style={{ display: "flex", gap: ".6rem" }}>
        <form onSubmit={(event) => { event.preventDefault(); update("query", query); }}>
          <label className="sr-only" htmlFor="catalog-search">Buscar</label>
          <input id="catalog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" style={{ minHeight: 44, border: "1px solid var(--line)", borderRadius: 999, padding: "0 1rem", background: "transparent", maxWidth: 150 }} />
        </form>
        <button className="btn btn-outline filter-mobile" type="button" onClick={openFilters}>Filtros</button>
        <label className="sr-only" htmlFor="sort">Ordenar</label>
        <select id="sort" value={params.get("sort") || "featured"} onChange={(event) => update("sort", event.target.value)} style={{ border: "1px solid var(--line)", borderRadius: 999, padding: "0 .8rem", background: "transparent" }}>
          <option value="featured">Destaques</option>
          <option value="newest">Novidades</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
}
