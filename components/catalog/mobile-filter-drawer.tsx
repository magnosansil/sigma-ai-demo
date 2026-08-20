"use client";

import { X } from "lucide-react";
import { CatalogFilters } from "@/components/catalog/catalog-filters";

export function MobileFilterDrawer({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;
  return (
    <>
      <button className="overlay" onClick={close} aria-label="Fechar filtros" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="filters-title">
        <div className="drawer-head">
          <h2 id="filters-title">Filtrar coleção</h2>
          <button className="icon-btn" onClick={close} aria-label="Fechar filtros"><X /></button>
        </div>
        <CatalogFilters idPrefix="mobile-filter" />
        <button className="btn btn-dark" onClick={close} style={{ width: "100%", marginTop: "1rem" }}>Ver resultados</button>
      </aside>
    </>
  );
}
