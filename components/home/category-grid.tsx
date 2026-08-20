import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const categories = [
  { title: "Calçados", href: "/catalogo?category=calçados", accent: "#c8ff2e" },
  { title: "Roupas", href: "/catalogo?category=roupas", accent: "#9aa890" },
  { title: "Acessórios", href: "/catalogo?category=acessórios", accent: "#d9d1bd" },
];

export function CategoryGrid() {
  return (
    <section className="section">
      <Container>
        <SectionHeading eyebrow="Encontre seu ritmo" title="Feito para mover" description="Três universos, uma mesma obsessão: desempenho com uma presença impossível de ignorar." />
        <div className="categories">
          {categories.map((category) => (
            <Reveal key={category.title}>
              <Link className="category-card" href={category.href} style={{ "--accent": category.accent } as React.CSSProperties}>
                <span className="eyebrow">Shop / {category.title}</span>
                <h3>{category.title}</h3>
                <ArrowUpRight size={28} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
