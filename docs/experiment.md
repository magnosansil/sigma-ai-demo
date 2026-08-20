# SIGMA — Experiment

> **Seu Código + IA: Como transformar um LLM em um membro da equipe**

## 1. Objetivo

Este experimento observa como diferentes estratégias de planejamento e autonomia influenciam o trabalho de um Large Language Model (LLM) durante o desenvolvimento de software.

O estudo de caso é o **SIGMA**, um e-commerce fictício de produtos esportivos premium. A mesma aplicação foi desenvolvida com duas estratégias: implementação direta e separação entre planejamento e execução.

O objetivo não é afirmar que mais planejamento necessariamente produz um resultado melhor. O experimento busca tornar visíveis os efeitos e os trade-offs de cada estratégia em uma demonstração prática e exploratória.

## 2. Aplicação

**Nome:** SIGMA

**Tipo:** e-commerce de produtos esportivos premium.

**Stack:**

- Next.js;
- React;
- TypeScript;
- CSS/Tailwind CSS;
- animações;
- elementos 3D em pontos estratégicos.

Os requisitos fundamentais compartilhados pelas execuções foram:

- página inicial;
- catálogo de produtos;
- filtros;
- página individual de produto;
- carrinho;
- checkout simulado;
- navegação responsiva;
- microinterações;
- elementos visuais animados;
- utilização pontual de elementos 3D;
- experiência visual premium e contemporânea.

## 3. Modelo e ferramenta

**Modelo:** GPT-5.6 Sol

**Ferramenta:** Cursor

O mesmo modelo foi utilizado nas duas abordagens para reduzir a influência da escolha do modelo como variável externa. As execuções também ocorreram na mesma ferramenta.

## 4. Estratégias

### Experimento 01 — No Planning

```text
Requisitos
    ↓
LLM
    ↓
Implementação
```

O modelo recebeu os requisitos e implementou a solução diretamente, sem uma etapa explícita de planejamento.

**Branch:** [`cursor/implement-sigma-a623`](https://github.com/magnosansil/sigma-ai-demo/tree/cursor/implement-sigma-a623)

### Experimento 02 — Planner + Executor

```text
Requisitos
    ↓
Planner
    ↓
Plano detalhado
    ↓
Executor
    ↓
Implementação
    ↓
Testes e validação
```

Nesta estratégia, as responsabilidades foram separadas. O Planner analisou requisitos, arquitetura, componentes, riscos e critérios de validação, sem implementar a aplicação. Em seguida, o Executor recebeu o plano detalhado e ficou responsável pela implementação, pelos testes e pela validação.

**Branch:** [`cursor/sigma-implementation-plan-645c`](https://github.com/magnosansil/sigma-ai-demo/tree/cursor/sigma-implementation-plan-645c)

O plano produzido pelo Planner permanece disponível em [`docs/implementation-plan.md`](https://github.com/magnosansil/sigma-ai-demo/blob/cursor/sigma-implementation-plan-645c/docs/implementation-plan.md), na branch Planner + Executor.

## 5. Variáveis controladas

Sempre que aplicável, permaneceram constantes:

- o mesmo modelo;
- o mesmo projeto;
- os mesmos requisitos fundamentais;
- a mesma stack;
- o mesmo objetivo;
- a mesma identidade do produto;
- o mesmo prompt-base.

A principal mudança foi a estratégia de trabalho utilizada pelo LLM: implementação direta ou separação explícita entre planejamento e execução.

## 6. Hipótese inicial

A hipótese original era que uma etapa robusta de planejamento tenderia a produzir um resultado globalmente superior, com maior coerência, previsibilidade, cobertura dos requisitos e qualidade de implementação.

Essa hipótese **não foi integralmente confirmada** pelos resultados. A estratégia planejada apresentou vantagens claras de engenharia, mas não produziu o resultado considerado mais forte em todos os critérios, especialmente no impacto visual observado.

## 7. Resultados observados

### No Planning

Na avaliação qualitativa realizada para o minicurso, o resultado:

- apresentou maior impacto visual;
- demonstrou maior liberdade criativa;
- chegou rapidamente a uma composição visual atraente;
- produziu uma composição considerada mais interessante;
- utilizou uma estrutura de engenharia mais simples;
- teve menor ênfase explícita em infraestrutura, documentação, testes e validação.

Essas observações descrevem esta execução. Elas não demonstram que a estratégia é universalmente superior.

### Planner + Executor

Na mesma avaliação qualitativa, o resultado:

- não foi considerado o mais forte visualmente;
- apresentou maior estrutura de engenharia;
- obteve maior cobertura sistemática dos requisitos;
- separou melhor as responsabilidades;
- tornou a arquitetura mais explícita;
- estruturou rotas específicas para catálogo, produto, carrinho e checkout;
- sincronizou filtros com a URL;
- implementou persistência do carrinho;
- tratou estados de loading, erro e 404;
- utilizou validação;
- considerou acessibilidade;
- considerou `prefers-reduced-motion`;
- definiu uma estratégia explícita para elementos 3D;
- incorporou testes unitários;
- incorporou testes de componentes;
- incorporou testes E2E;
- produziu documentação de requisitos, arquitetura e design system;
- produziu um plano de implementação.

Essas vantagens de engenharia não tornam a estratégia universalmente superior nem garantem, por si sós, a experiência visual mais interessante.

## 8. Comparação

| Critério | No Planning | Planner + Executor |
| --- | --- | --- |
| Impacto visual imediato | Mais forte no resultado observado | Menos forte no resultado observado |
| Liberdade criativa | Alta | Mais restrita pelo plano |
| Estrutura de engenharia | Mais simples | Mais detalhada |
| Cobertura de requisitos | Menos sistemática | Mais sistemática |
| Testes | Limitados | Unitários, de componentes e E2E |
| Documentação | Mínima | Mais abrangente |
| Rastreabilidade | Menor | Maior |
| Previsibilidade do processo | Menor | Maior |

Esta comparação é qualitativa e específica desta execução. Ela não representa uma medição objetiva ou uma conclusão geral sobre as estratégias.

## 9. Interpretação

"Melhor" depende do objetivo.

Uma solução pode ser visualmente superior e, ainda assim, possuir uma estrutura de engenharia mais simples. Outra pode apresentar arquitetura, testes e documentação superiores sem necessariamente produzir a experiência visual mais interessante.

> **Planning não é um botão de qualidade. É uma escolha de engenharia.**

O nível adequado de planejamento depende de:

- complexidade;
- risco;
- necessidade de manutenção;
- tamanho da equipe;
- requisitos;
- necessidade de rastreabilidade;
- custo de um erro.

Uma landing page ou um protótipo exploratório pode se beneficiar de maior autonomia, improvisação e velocidade. Um sistema existente, mantido por uma equipe, pode exigir mais contexto, documentação e previsibilidade. Em checkout, pagamentos ou outras operações críticas, o custo de um erro torna planejamento, validação e revisão muito mais importantes.

## 10. Context Engineering

O resultado também se relaciona ao conceito de **Context Engineering**: projetar o conjunto de informações, restrições, ferramentas e critérios disponibilizados ao modelo para que ele execute uma tarefa.

Fornecer mais contexto não garante automaticamente um resultado melhor. Contexto excessivo ou inadequado pode restringir exploração, aumentar complexidade ou direcionar esforço para aspectos que não são prioritários para o objetivo.

> **Não existe "mais contexto = melhor". Existe contexto adequado à tarefa.**

O objetivo é fornecer o contexto necessário para o risco, a complexidade e os critérios de sucesso da tarefa em questão.

## 11. Relação com o minicurso

O experimento integra o minicurso:

> **Seu Código + IA: Como transformar um LLM em um membro da equipe**

Transformar um LLM em membro da equipe não significa simplesmente fazê-lo planejar mais. Significa definir adequadamente:

- contexto;
- responsabilidade;
- autonomia;
- restrições;
- ferramentas;
- critérios de sucesso;
- validação.

Assim como acontece com pessoas em uma equipe, diferentes tarefas exigem diferentes níveis de liberdade, supervisão, processo e especialização.

## 12. Limitações

Este experimento é demonstrativo e exploratório, não um estudo científico que prova a superioridade de uma estratégia.

Entre suas limitações estão:

- apenas uma execução principal de cada estratégia;
- natureza probabilística do modelo;
- avaliação visual subjetiva;
- influência da formulação dos prompts;
- influência do Cursor e do ambiente de desenvolvimento;
- características específicas do GPT-5.6 Sol;
- complexidade limitada do projeto;
- ausência de avaliação quantitativa formal;
- possíveis diferenças de interpretação dos requisitos pelo modelo.

Os resultados devem, portanto, ser usados como base para discussão e aprendizado, não como evidência definitiva de que uma estratégia sempre produz resultados melhores.
