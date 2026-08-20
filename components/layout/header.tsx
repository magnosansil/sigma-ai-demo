"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated, openDrawer } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <nav className="desktop-nav" aria-label="Navegação principal">
          <Link className="nav-link" href="/catalogo">Coleção</Link>
          <Link className="nav-link" href="/catalogo?category=calçados">Calçados</Link>
          <Link className="nav-link" href="/catalogo?category=roupas">Roupas</Link>
        </nav>
        <Link className="logo" href="/" aria-label="SIGMA — início">SIGMA</Link>
        <div className="header-actions">
          <Link className="icon-btn" href="/catalogo" aria-label="Buscar produtos"><Search size={19} /></Link>
          <button className="icon-btn" onClick={openDrawer} aria-label={`Abrir carrinho com ${hydrated ? itemCount : 0} itens`}>
            <ShoppingBag size={20} />
            {hydrated && itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menuOpen && <MobileNav close={() => setMenuOpen(false)} />}
    </header>
  );
}
