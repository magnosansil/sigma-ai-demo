# SIGMA

E-commerce conceitual de roupas, calçados e acessórios esportivos premium, criado com Next.js, React e TypeScript.

## Executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Comandos

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run lint` — análise estática
- `npm run typecheck` — verificação TypeScript
- `npm test` — testes unitários e de componentes
- `npm run test:e2e` — testes Playwright

## Rotas

- `/` — home editorial
- `/catalogo` — busca, filtros e ordenação
- `/produto/[slug]` — detalhe e seleção de variante
- `/carrinho` — carrinho persistido no navegador
- `/checkout` — checkout local demonstrativo
- `/checkout/sucesso` — confirmação da simulação

## Decisões

O catálogo é local, filtros vivem na URL e o carrinho usa `localStorage` versionado. A cena 3D do hero é decorativa e carregada no cliente. Imagens são ilustrações SVG autorais incluídas em `public/images/products`.

Este projeto não possui backend nem pagamento real. Não informe dados pessoais ou financeiros verdadeiros no checkout.
