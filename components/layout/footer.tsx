import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <p className="eyebrow">Designed for motion</p>
            <div className="footer-logo">SIGMA</div>
          </div>
          <nav className="footer-links" aria-label="Coleções">
            <strong>Coleções</strong>
            <Link href="/catalogo">Todos os produtos</Link>
            <Link href="/catalogo?category=calçados">Calçados</Link>
            <Link href="/catalogo?category=roupas">Roupas</Link>
          </nav>
          <nav className="footer-links" aria-label="Ajuda">
            <strong>Experiência</strong>
            <Link href="/carrinho">Carrinho</Link>
            <Link href="/checkout">Checkout demo</Link>
            <a href="#newsletter">Newsletter</a>
          </nav>
        </div>
        <div className="footer-bottom">© 2026 SIGMA. Experiência conceitual — nenhuma compra real será processada.</div>
      </Container>
    </footer>
  );
}
