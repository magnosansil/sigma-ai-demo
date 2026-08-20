import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CartSummary } from "@/components/cart/cart-summary";

export const metadata: Metadata = { title: "Checkout demonstrativo" };

export default function CheckoutPage() {
  return (
    <Container className="checkout-page">
      <span className="eyebrow">Checkout seguro / Demo</span>
      <h1 className="section-title">Último passo.</h1>
      <div className="checkout-layout">
        <CheckoutForm />
        <CartSummary checkout={false} />
      </div>
    </Container>
  );
}
