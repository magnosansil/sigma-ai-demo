# SIGMA — Seu Código + IA

> Como transformar um LLM em um membro da equipe

O SIGMA faz parte do minicurso **"Seu Código + IA: Como transformar um LLM em um membro da equipe"**. O projeto usa um e-commerce fictício de produtos esportivos premium para demonstrar como diferentes estratégias de autonomia e planejamento influenciam o trabalho de um LLM no desenvolvimento de software.

O repositório preserva os resultados como foram produzidos. A comparação não busca eleger uma estratégia universalmente superior, mas discutir qual processo é adequado a cada objetivo.

## O experimento

- **Modelo:** GPT-5.6 Sol
- **Ferramenta:** Cursor
- **Stack:** Next.js + React + TypeScript

Foram comparados dois fluxos:

**No Planning**

```text
Requisitos → LLM → Implementação
```

[Ver resultado na branch No Planning](https://github.com/magnosansil/sigma-ai-demo/tree/cursor/implement-sigma-a623)

**Planner + Executor**

```text
Requisitos → Planner → Plano → Executor → Implementação → Validação
```

[Ver resultado na branch Planner + Executor](https://github.com/magnosansil/sigma-ai-demo/tree/cursor/sigma-implementation-plan-645c)

## A hipótese

A hipótese inicial era que uma etapa robusta de planejamento produziria um resultado globalmente e claramente superior.

> **Não foi isso que aconteceu.**

## O resultado

Na avaliação qualitativa desta execução:

- **No Planning:** apresentou o maior impacto visual observado, mais liberdade criativa e chegou rapidamente a uma composição atraente.
- **Planner + Executor:** apresentou maior estrutura de engenharia, documentação, testes, cobertura sistemática dos requisitos e previsibilidade do processo.

Essas observações são específicas desta execução e não tornam nenhuma das estratégias universalmente superior.

## Melhor para quê?

A definição de qualidade depende do objetivo:

- **Landing page ou protótipo exploratório:** liberdade criativa e velocidade podem ser mais importantes.
- **Software mantido por uma equipe:** estrutura, documentação, rastreabilidade e previsibilidade ganham importância.
- **Checkout, pagamentos ou sistemas críticos:** planejamento, validação e revisão são fundamentais devido ao custo de um erro.

Uma solução pode ser visualmente mais interessante e ter uma estrutura de engenharia mais simples. Outra pode ser mais bem documentada e testada sem produzir a experiência visual mais impactante.

## A conclusão

> **Planning não é um botão de qualidade. É uma escolha de engenharia.**

> **Não existe "mais contexto = melhor". Existe contexto adequado à tarefa.**

## Prompts

Os prompts utilizados estão em [`prompts/`](prompts/):

- [`01-base-prompt.md`](prompts/01-base-prompt.md)
- [`02-no-planning.md`](prompts/02-no-planning.md)
- [`04-planner.agent.md`](prompts/04-planner.agent.md)
- [`05-executor.agent.md`](prompts/05-executor.agent.md)

## Documentação

- [Descrição completa do experimento](docs/experiment.md)
- [Plano produzido pelo Planner](docs/implementation-plan.md)

## Executando o SIGMA

Instale as dependências e inicie o ambiente de desenvolvimento:

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

### Comandos

- `npm run dev` — inicia o ambiente de desenvolvimento;
- `npm run build` — gera o build de produção;
- `npm start` — inicia o build de produção;
- `npm run lint` — executa a análise estática;
- `npm run typecheck` — executa a verificação TypeScript;
- `npm test` — executa os testes unitários e de componentes;
- `npm run test:e2e` — executa os testes Playwright.

### Rotas

- `/` — home editorial;
- `/catalogo` — busca, filtros e ordenação;
- `/produto/[slug]` — detalhe e seleção de variante;
- `/carrinho` — carrinho persistido no navegador;
- `/checkout` — checkout local demonstrativo;
- `/checkout/sucesso` — confirmação da simulação.

### Decisões da implementação

O catálogo é local, os filtros vivem na URL e o carrinho usa `localStorage` versionado. A cena 3D do hero é decorativa e carregada no cliente. As imagens são ilustrações SVG autorais incluídas em `public/images/products`.

Este projeto não possui backend nem pagamento real. Não informe dados pessoais ou financeiros verdadeiros no checkout.
