"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <div className="success">
      <span className="eyebrow">Algo saiu do ritmo</span>
      <h1 className="section-title">Tente novamente.</h1>
      <button className="btn btn-dark" onClick={reset}>Recarregar experiência</button>
    </div>
  );
}
