"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Price } from "@/components/ui/price";
import type { CartItem } from "@/types/cart";

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  return (
    <article className="cart-item">
      <Link className="cart-thumb" href={`/produto/${item.product.slug}`}>
        <Image src={item.product.images[0].src} alt="" width={240} height={240} />
      </Link>
      <div>
        <h3><Link href={`/produto/${item.product.slug}`}>{item.product.name}</Link></h3>
        <p>{item.color}{item.size ? ` · Tam. ${item.size}` : ""}</p>
        <div className="cart-controls" aria-label={`Quantidade de ${item.product.name}`}>
          <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Diminuir quantidade">−</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Aumentar quantidade">+</button>
          <button className="remove-btn" onClick={() => removeItem(item.key)}>Remover</button>
        </div>
      </div>
      <Price value={item.product.price * item.quantity} />
    </article>
  );
}
