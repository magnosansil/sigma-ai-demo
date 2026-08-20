# Prompts

Este diretório contém os prompts utilizados no experimento **"Seu Código + IA"**, apresentado no minicurso **"Seu Código + IA: Como transformar um LLM em um membro da equipe"**.

O mesmo modelo e os mesmos requisitos fundamentais foram utilizados nas duas estratégias experimentais. A variável principal foi a estratégia de execução adotada pelo LLM.

## Arquivos

### `01-base-prompt.md`

Prompt-base compartilhado pelo experimento.

### `02-no-planning.md`

Instrução para implementação direta, sem uma etapa explícita de planejamento.

### `04-planner.agent.md`

Instruções do agente responsável exclusivamente pelo planejamento.

### `05-executor.agent.md`

Instruções do agente responsável por executar o plano.

Os nomes originais dos arquivos foram preservados para representar fielmente os materiais utilizados durante o experimento.

## Fluxos

### No Planning

```text
Base Prompt
    ↓
LLM
    ↓
Implementação
```

### Planner + Executor

```text
Base Prompt
    ↓
Planner
    ↓
implementation-plan.md
    ↓
Executor
    ↓
Implementação
    ↓
Validação
```

Os prompts são mantidos no repositório para permitir que alunos do minicurso estudem e reproduzam a abordagem.
