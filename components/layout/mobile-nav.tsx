"use client";

import Link from "next/link";

export function MobileNav({ close }: { close: () => void }) {
  return (
    <nav className="mobile-nav" aria-label="Navegação móvel">
      <Link href="/" onClick={close}>Início</Link>
      <Link href="/catalogo" onClick={close}>Catálogo</Link>
      <Link href="/catalogo?category=calçados" onClick={close}>Calçados</Link>
      <Link href="/catalogo?category=roupas" onClick={close}>Roupas</Link>
    </nav>
  );
}
