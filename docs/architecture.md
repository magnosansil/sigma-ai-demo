# Arquitetura — SIGMA

- **Framework:** Next.js App Router com server components por padrão.
- **Dados:** catálogo local tipado em `data/products.ts`; funções puras em `lib/`.
- **Estado:** `CartProvider` é o único estado global, persistido em payload versionado no `localStorage`.
- **Filtros:** query parameters são a fonte de verdade; controles clientes atualizam a URL e a rota calcula os resultados.
- **UI:** componentes por domínio em `components/`; primitives em `components/ui/`.
- **3D:** Canvas cliente isolado no hero, com lazy loading visual, DPR limitado e respeito a movimento reduzido.
- **Checkout:** validação local com Zod, confirmação simulada e nenhum dado de pagamento persistido.

## Limites server/client

Layouts, catálogo, páginas de produto e composição editorial permanecem no servidor. Contexto, overlays, filtros, compra, checkout, animações e Canvas usam client components no menor limite possível.
