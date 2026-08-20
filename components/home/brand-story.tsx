import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function BrandStory() {
  return (
    <section className="story section">
      <Container className="story-grid">
        <Reveal><div className="story-art" aria-hidden="true" /></Reveal>
        <Reveal>
          <span className="eyebrow">Manifesto</span>
          <h2 className="section-title">A forma segue o movimento.</h2>
          <p>SIGMA nasce no encontro entre laboratório e rua. Criamos peças que trabalham em silêncio para que sua presença fale mais alto.</p>
          <Link className="btn btn-signal" href="/catalogo">Vista o próximo passo</Link>
        </Reveal>
      </Container>
    </section>
  );
}
