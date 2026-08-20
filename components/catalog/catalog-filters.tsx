"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = {
  category: [["", "Todas"], ["calçados", "Calçados"], ["roupas", "Roupas"], ["acessórios", "Acessórios"]],
  audience: [["", "Todos"], ["feminino", "Feminino"], ["masculino", "Masculino"], ["unissex", "Unissex"]],
  size: [["", "Todos"], ["PP", "PP"], ["P", "P"], ["M", "M"], ["G", "G"], ["GG", "GG"], ["36", "36"], ["38", "38"], ["40", "40"], ["42", "42"]],
  color: [["", "Todas"], ["Volt", "Volt"], ["Carbono", "Carbono"], ["Preto", "Preto"], ["Grafite", "Grafite"], ["Gelo", "Gelo"]],
  maxPrice: [["", "Sem limite"], ["30000", "Até R$ 300"], ["50000", "Até R$ 500"], ["80000", "Até R$ 800"]],
};

const labels: Record<string, string> = { category: "Categoria", audience: "Público", size: "Tamanho", color: "Cor", maxPrice: "Preço" };

export function CatalogFilters({ idPrefix = "filter" }: { idPrefix?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="filters-form">
      {Object.entries(options).map(([key, values]) => (
        <div className="filter-group" key={key}>
          <label htmlFor={`${idPrefix}-${key}`}>{labels[key]}</label>
          <select id={`${idPrefix}-${key}`} value={searchParams.get(key) || ""} onChange={(event) => update(key, event.target.value)}>
            {values.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
      ))}
      <div className="filter-group">
        <button className="btn btn-outline" type="button" onClick={() => router.push(pathname)}>Limpar filtros</button>
      </div>
    </div>
  );
}
