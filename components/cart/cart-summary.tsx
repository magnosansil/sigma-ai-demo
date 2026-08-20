"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { calculateTotals } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";

export function CartSummary({ checkout = true }: { checkout?: boolean }) {
  const { items } = useCart();
  const totals = calculateTotals(items);
  return (
    <aside className="summary" aria-label="Resumo do pedido">
      <h2>Resumo</h2>
      <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
      <div className="summary-row"><span>Frete</span><span>{totals.shipping ? formatCurrency(totals.shipping) : "Grátis"}</span></div>
      <div className="summary-row total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
      {checkout && items.length > 0 && <Link className="btn btn-signal" href="/checkout">Finalizar compra</Link>}
      <p className="summary-note">Frete grátis em pedidos acima de R$ 600. Checkout demonstrativo, sem cobrança real.</p>
    </aside>
  );
}
