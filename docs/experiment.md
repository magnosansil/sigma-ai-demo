# SIGMA — Experiment

> **Seu Código + IA: Como transformar um LLM em um membro da equipe**

## 1. Objetivo

Este experimento tem como objetivo demonstrar como diferentes níveis de contexto e planejamento podem influenciar o resultado produzido por um Large Language Model (LLM) durante o desenvolvimento de uma aplicação web.

Para isso, será construída a mesma aplicação três vezes, utilizando o mesmo modelo, a mesma tecnologia e os mesmos requisitos fundamentais, variando apenas a estratégia de planejamento fornecida ao modelo.

O projeto utilizado como estudo de caso será o **SIGMA**, um e-commerce fictício de produtos esportivos premium.

A hipótese do experimento é:

> **Quanto melhor estruturado estiver o contexto e o processo de planejamento fornecido ao LLM, maior tende a ser sua capacidade de produzir uma solução coerente com os requisitos, com melhor arquitetura, experiência de usuário e qualidade de implementação.**

O experimento não pretende provar que uma estratégia de planejamento é universalmente superior a outra. Seu objetivo é tornar visível a influência do contexto e do planejamento sobre o processo de desenvolvimento assistido por LLM.

---

## 2. Aplicação

### Nome

**SIGMA**

### Tipo

E-commerce de produtos esportivos premium.

### Tecnologia

- Next.js
- React
- TypeScript
- CSS/Tailwind CSS
- Animações
- Elementos 3D em pontos estratégicos

### Funcionalidades esperadas

A aplicação deve contemplar, no mínimo:

- página inicial;
- catálogo de produtos;
- filtros;
- página individual de produto;
- carrinho;
- checkout simulado;
- navegação responsiva;
- microinterações;
- elementos visuais animados;
- utilização pontual de elementos 3D.

A aplicação deve priorizar uma experiência visual premium e contemporânea.

---

## 3. Modelo utilizado

O modelo utilizado nos três experimentos será:

**GPT-5.6 Sol**

O modelo deve permanecer constante entre os experimentos.

O objetivo é reduzir a influência da escolha do modelo como variável externa.

---

## 4. Variável do experimento

A principal variável será o **nível de planejamento e contexto fornecido ao modelo**.

Serão realizados três experimentos:

### Experimento 01 — No Planning

O modelo recebe a especificação da aplicação e deve implementar a solução diretamente.

Fluxo:

```text
Requisitos
    ↓
LLM
    ↓
Implementação
```

Não será fornecida uma etapa explícita de planejamento.

---

### Experimento 02 — Light Planning

O modelo recebe os mesmos requisitos fundamentais, mas também recebe instruções para realizar um planejamento curto antes da implementação.

Fluxo:

```text
Requisitos
    ↓
Planejamento curto
    ↓
LLM
    ↓
Implementação
```

O planejamento e a execução continuam sendo realizados pelo mesmo agente/modelo.

---

### Experimento 03 — Planner + Executor

O processo é dividido em dois agentes conceituais:

**Planner**

Responsável por:

- analisar os requisitos;
- investigar o projeto;
- analisar arquitetura e documentação;
- identificar componentes;
- definir estratégia de implementação;
- identificar riscos;
- definir critérios de validação.

O Planner não deve implementar o código.

Fluxo:

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

O Executor recebe o plano produzido pelo Planner e é responsável pela implementação.

---

## 5. Variáveis controladas

Sempre que possível, os seguintes elementos devem permanecer constantes:

- modelo utilizado;
- aplicação a ser desenvolvida;
- nome da aplicação;
- requisitos fundamentais;
- stack tecnológica;
- identidade visual desejada;
- funcionalidades principais;
- dados utilizados;
- objetivo final da aplicação;
- prompt-base.

A variável principal é o processo de planejamento.

---

## 6. Intervenção humana

Durante cada execução, a intervenção humana deve ser minimizada.

O objetivo é evitar que o resultado de um experimento seja manualmente aprimorado de maneira diferente dos demais.

Correções necessárias para permitir a execução do experimento devem ser registradas.

Alterações estéticas ou funcionais realizadas exclusivamente para "melhorar" um resultado não devem ser feitas após a geração, pois poderiam comprometer a comparação.

---

## 7. Reprodutibilidade

Todos os prompts utilizados no experimento serão mantidos no diretório:

```text
prompts/
```

Estrutura:

```text
prompts/
├── 01-base-prompt.md
├── 02-no-planning.md
├── 03-light-planning.md
├── 04-planner.agent.md
└── 05-executor.agent.md
```

Os prompts devem ser versionados juntamente com o projeto.

---

## 8. Resultados

Cada resultado será preservado em uma branch específica:

```text
experiment/no-planning
experiment/light-planning
experiment/planner-executor
```

As branches representam os estados produzidos durante cada etapa do experimento.

Tags podem ser utilizadas para registrar versões específicas:

```text
v0.1-no-planning
v0.2-light-planning
v1.0-planner-executor
```

---

## 9. Critérios de comparação

Os resultados serão comparados qualitativamente considerando:

### Arquitetura

- organização dos componentes;
- separação de responsabilidades;
- reutilização;
- estrutura de arquivos.

### Interface

- hierarquia visual;
- consistência;
- composição;
- qualidade visual;
- responsividade.

### Experiência do usuário

- navegação;
- feedback de interação;
- estados de loading;
- estados vazios;
- microinterações.

### Implementação

- qualidade do código;
- consistência;
- reutilização;
- tratamento de estados;
- acessibilidade.

### Recursos avançados

- animações;
- transições;
- elementos 3D;
- interações avançadas.

As avaliações serão utilizadas como instrumento de comparação e demonstração, e não como métricas científicas absolutas.

---

## 10. Hipótese

A hipótese inicial é que:

> **A introdução progressiva de contexto e planejamento tende a produzir resultados mais coerentes, previsíveis e alinhados aos requisitos do projeto.**

Especificamente, espera-se observar uma evolução aproximada:

```text
No Planning
    ↓
Maior improvisação
Maior inconsistência
Menor previsibilidade

Light Planning
    ↓
Maior organização
Melhor coerência

Planner + Executor
    ↓
Maior decomposição
Maior rastreabilidade
Maior separação de responsabilidades
Maior previsibilidade
```

Os resultados reais devem prevalecer sobre essa expectativa.

---

## 11. Relação com o minicurso

O experimento será utilizado no minicurso:

# Seu Código + IA: Como transformar um LLM em um membro da equipe

A demonstração pretende ilustrar a evolução:

```text
LLM
 ↓
LLM + contexto
 ↓
LLM + planejamento
 ↓
LLM + ferramentas
 ↓
Agent
 ↓
Equipe de agentes
```

A principal mensagem do experimento é:

> **O valor de um LLM em desenvolvimento de software não depende apenas do modelo. O contexto, o planejamento, as ferramentas e o processo ao redor do modelo também importam.**

---

## 12. Limitações

Este experimento não representa uma avaliação científica definitiva sobre LLMs.

Os resultados podem ser influenciados por:

- características específicas do modelo;
- variação estocástica;
- qualidade dos prompts;
- qualidade dos requisitos;
- complexidade da aplicação;
- interpretação do modelo;
- limitações da ferramenta utilizada;
- capacidade do ambiente de desenvolvimento.

Portanto, os resultados devem ser interpretados como uma demonstração prática e exploratória.
