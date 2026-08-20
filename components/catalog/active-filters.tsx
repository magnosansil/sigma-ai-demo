"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const known = ["query", "category", "audience", "size", "color", "maxPrice"];

export function ActiveFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = known.flatMap((key) => {
    const value = params.get(key);
    return value ? [{ key, value }] : [];
  });
  if (!active.length) return null;

  function remove(key: string) {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="active-filters" aria-label="Filtros ativos">
      {active.map(({ key, value }) => (
        <button className="filter-chip" key={key} onClick={() => remove(key)} aria-label={`Remover filtro ${value}`}>{value} ×</button>
      ))}
    </div>
  );
}
