import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedProducts() {
  return (
    <section className="section">
      <Container>
        <SectionHeading eyebrow="Seleção SIGMA" title="Em destaque" description="Equipamentos essenciais, refinados até restar apenas o que amplia sua performance." />
        <Reveal><ProductGrid products={products.filter((product) => product.featured).slice(0, 4)} /></Reveal>
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link className="btn btn-outline" href="/catalogo">Ver todos <ArrowRight size={16} /></Link>
        </div>
      </Container>
    </section>
  );
}
