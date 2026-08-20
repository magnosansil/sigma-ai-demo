import Link from "next/link";

export function EmptyCatalog() {
  return (
    <div className="empty">
      <h2>Nenhum produto nesse ritmo.</h2>
      <p style={{ color: "var(--muted)", margin: "1rem 0 1.5rem" }}>Remova alguns filtros para ampliar sua busca.</p>
      <Link className="btn btn-dark" href="/catalogo">Limpar filtros</Link>
    </div>
  );
}
