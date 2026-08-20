# Design system — SIGMA

## Direção

Editorial esportivo premium: fundos grafite e marfim, verde-lima como acento, títulos condensados em caixa alta, áreas amplas e contraste forte.

## Tokens

- Cores: `ink`, `paper`, `muted`, `line`, `signal`.
- Espaçamento: escala de 4 px; seções entre 72 e 144 px.
- Raios: 12 px para controles, 24 px para cards e 999 px para pills.
- Movimento: 180 ms para microinterações e 600 ms para entradas; easing suave.
- Layout: container máximo de 1440 px e breakpoints mobile/tablet/desktop.

## Regras

Controles têm foco visível, alvo mínimo de 44 px, labels explícitos e estados hover/disabled/loading. Overlays fecham por Escape e devolvem foco. Animações e Canvas são reduzidos ou removidos quando `prefers-reduced-motion` estiver ativo.
