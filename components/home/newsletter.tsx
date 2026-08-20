"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <section className="section" id="newsletter">
      <Container>
        <div className="newsletter">
          <div>
            <span className="eyebrow">SIGMA / Radar</span>
            <h2 className="section-title">Ahead of pace.</h2>
            <p>Novos drops, histórias e tecnologia de movimento.</p>
          </div>
          {sent ? <p role="status"><strong>Você está no radar.</strong><br />Cadastro demonstrativo concluído.</p> : (
            <form className="newsletter-form" onSubmit={submit}>
              <label className="sr-only" htmlFor="newsletter-email">Seu e-mail</label>
              <input id="newsletter-email" type="email" placeholder="seu@email.com" required />
              <button className="btn btn-dark" type="submit">Entrar</button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
