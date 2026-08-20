"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Container } from "@/components/ui/container";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CartSummary } from "@/components/cart/cart-summary";

export default function CartPage() {
  const { items, hydrated, clearCart } = useCart();
  return (
    <Container className="cart-page">
      <span className="eyebrow">Bag / {hydrated ? items.length : 0} itens</span>
      <h1 className="section-title">Seu carrinho.</h1>
      {!hydrated ? (
        <p>Carregando seu carrinho…</p>
      ) : items.length ? (
        <div className="cart-layout">
          <div>
            <div className="cart-list">{items.map((item) => <CartLineItem key={item.key} item={item} />)}</div>
            <button className="remove-btn" onClick={clearCart} style={{ marginTop: "1.5rem" }}>Esvaziar carrinho</button>
          </div>
          <CartSummary />
        </div>
      ) : (
        <div className="empty" style={{ marginTop: "3rem" }}>
          <h2>Comece seu próximo movimento.</h2>
          <p style={{ color: "var(--muted)", margin: "1rem 0 1.5rem" }}>Seu carrinho ainda está vazio.</p>
          <Link className="btn btn-dark" href="/catalogo">Explorar coleção</Link>
        </div>
      )}
    </Container>
  );
}
