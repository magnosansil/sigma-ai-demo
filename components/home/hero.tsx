"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas").then((module) => module.HeroCanvas), {
  ssr: false,
  loading: () => <div className="hero-orbit" aria-hidden="true" />,
});

export function Hero() {
  return (
    <section className="hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Coleção 01 / Performance urbana</span>
          <h1 className="display">Beyond<br />limits.</h1>
          <p>Design técnico para quem transforma ritmo em linguagem. Movimento, precisão e presença em cada detalhe.</p>
          <div className="hero-actions">
            <Link className="btn btn-signal" href="/catalogo">Explorar coleção <ArrowUpRight size={16} /></Link>
            <Link className="btn btn-outline" href="/produto/velocity-one">Conhecer Velocity One</Link>
          </div>
        </div>
        <div className="hero-visual">
          <HeroCanvas />
          <span className="hero-index">Form · Speed · Focus</span>
        </div>
      </Container>
    </section>
  );
}
