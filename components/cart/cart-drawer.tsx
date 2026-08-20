"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { calculateTotals } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;
  const totals = calculateTotals(items);

  return (
    <>
      <button className="overlay" onClick={closeDrawer} aria-label="Fechar carrinho" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-head">
          <h2 id="cart-title">Seu carrinho ({items.length})</h2>
          <button ref={closeRef} className="icon-btn" onClick={closeDrawer} aria-label="Fechar carrinho"><X /></button>
        </div>
        {items.length ? (
          <>
            <div className="cart-list">{items.map((item) => <CartLineItem key={item.key} item={item} />)}</div>
            <div className="drawer-footer">
              <div className="summary-row total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
              <Link className="btn btn-dark" href="/carrinho" onClick={closeDrawer}>Ver carrinho</Link>
            </div>
          </>
        ) : (
          <div className="empty">
            <p>Seu carrinho está esperando movimento.</p>
            <Link className="btn btn-dark" href="/catalogo" onClick={closeDrawer}>Explorar coleção</Link>
          </div>
        )}
      </aside>
    </>
  );
}
