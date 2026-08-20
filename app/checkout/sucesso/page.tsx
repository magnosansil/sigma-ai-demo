"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function CheckoutSuccessPage() {
  const order = useSyncExternalStore(
    () => () => undefined,
    () => window.sessionStorage.getItem("sigma-last-order"),
    () => null,
  );

  return (
    <Container>
      <div className="success">
        <div className="success-mark"><Check aria-hidden="true" /></div>
        <span className="eyebrow">{order ? `Pedido ${order}` : "Checkout demonstrativo"}</span>
        <h1 className="section-title">{order ? "Movimento confirmado." : "Nenhum pedido recente."}</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "1.5rem auto 2rem", maxWidth: 520 }}>
          {order ? "Sua simulação foi concluída. Nenhuma cobrança foi feita e nenhum dado de pagamento foi armazenado." : "Esta página confirma apenas pedidos simulados concluídos nesta sessão."}
        </p>
        <Link className="btn btn-dark" href="/catalogo">Voltar ao catálogo</Link>
      </div>
    </Container>
  );
}
