import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container>
      <div className="success">
        <span className="eyebrow">Erro 404</span>
        <h1 className="section-title">Fora da rota.</h1>
        <p style={{ margin: "1.5rem 0" }}>A página ou produto que você procura não está nesta coleção.</p>
        <Link className="btn btn-dark" href="/catalogo">Ir ao catálogo</Link>
      </div>
    </Container>
  );
}
