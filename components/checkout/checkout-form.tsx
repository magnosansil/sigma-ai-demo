"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { checkoutSchema } from "@/lib/checkout-schema";
import { ContactFields } from "@/components/checkout/contact-fields";
import { AddressFields } from "@/components/checkout/address-fields";
import { ShippingOptions } from "@/components/checkout/shipping-options";
import { PaymentFields } from "@/components/checkout/payment-fields";

export function CheckoutForm() {
  const { items, hydrated, clearCart } = useCart();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (processing) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = checkoutSchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      const first = Object.keys(next)[0];
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
      return;
    }
    setErrors({});
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    const order = `SG-${Date.now().toString(36).toUpperCase()}`;
    window.sessionStorage.setItem("sigma-last-order", order);
    clearCart();
    router.push("/checkout/sucesso");
  }

  if (!hydrated) return <p>Preparando checkout…</p>;
  if (!items.length) {
    return (
      <div className="empty">
        <h2>Seu carrinho está vazio.</h2>
        <p style={{ margin: "1rem 0" }}>Adicione um produto antes de iniciar o checkout.</p>
        <Link className="btn btn-dark" href="/catalogo">Ir ao catálogo</Link>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={submit} noValidate>
      <ContactFields errors={errors} />
      <AddressFields errors={errors} />
      <ShippingOptions />
      <PaymentFields errors={errors} />
      <button className="btn btn-dark" disabled={processing} type="submit">
        {processing ? "Processando…" : "Confirmar pedido demonstrativo"}
      </button>
    </form>
  );
}
