# Plano de implementação — SIGMA

## Objetivo

Construir o SIGMA como um e-commerce demonstrativo de roupas e acessórios esportivos premium em Next.js, React e TypeScript, cobrindo descoberta, filtragem, detalhe de produto, carrinho e checkout simulado. A entrega deve ser responsiva, acessível e visualmente sofisticada, com animações, microinterações e um elemento 3D pontual sem comprometer desempenho ou usabilidade.

## Premissas

- O repositório é um scaffold: `package.json`, `app/app.tsx`, `data/products.ts`, `README.md`, `docs/architecture.md`, `docs/design-system.md` e `docs/requirements.md` existem, mas estão vazios.
- Não há backend, autenticação, estoque em tempo real ou provedor de pagamentos; catálogo e checkout serão simulados no cliente.
- A aplicação usará o App Router do Next.js. O arquivo atual `app/app.tsx` não é uma entrada reconhecida pelo App Router e será substituído por `app/layout.tsx` e `app/page.tsx`.
- Preços serão armazenados em centavos de real e apresentados em `pt-BR`/BRL para evitar erros de ponto flutuante.
- O carrinho persistirá no `localStorage`; filtros do catálogo ficarão na URL para permitir recarregar e compartilhar a seleção.
- Dependências deverão ser instaladas pelo gerenciador de pacotes em suas versões estáveis mais recentes, sem fixar versões inferidas neste plano.

## Requisitos

### Funcionais

- Exibir uma home com hero, categorias, produtos em destaque, manifesto da marca e chamadas para o catálogo.
- Exibir um catálogo com busca textual, filtros por categoria, gênero, tamanho, cor e faixa de preço, além de ordenação e limpeza de filtros.
- Manter os filtros sincronizados com query parameters e informar quantidade de resultados, estado vazio e filtros ativos.
- Exibir uma página por produto com imagens, preço, variações, tamanhos disponíveis, descrição, detalhes e produtos relacionados.
- Exigir a seleção de tamanho quando aplicável antes de adicionar um item ao carrinho e fornecer feedback imediato da ação.
- Permitir abrir um minicarrinho, alterar quantidades, remover itens, esvaziar o carrinho e acessar uma página dedicada com subtotal e frete simulado.
- Disponibilizar checkout simulado com dados de contato, endereço, entrega, pagamento fictício, resumo do pedido, validação e confirmação.
- Preservar o carrinho entre recarregamentos e evitar divergência de hidratação durante a inicialização.
- Oferecer navegação responsiva entre todas as etapas e links funcionais de continuidade/retorno.

### Experiência, interface e qualidade

- Aplicar identidade premium consistente, com tipografia editorial, alto contraste, paleta neutra com cor de destaque, espaçamento e raios definidos por tokens.
- Implementar transições de página/seção, hover/focus de cards e botões, feedback de carrinho e estados de carregamento respeitando `prefers-reduced-motion`.
- Usar 3D somente no hero, carregado no cliente sob demanda, com fallback estático e sem bloquear conteúdo ou interação.
- Atender navegação por teclado, foco visível, landmarks semânticos, labels de formulário, mensagens de erro associadas e contraste WCAG AA.
- Otimizar imagens com `next/image`, fontes com `next/font`, componentes client-side apenas onde houver estado/interação e carregamento dinâmico do 3D.
- Tratar explicitamente estados vazio, rota/produto inexistente, imagem indisponível e confirmação de pedido.

## Arquivos afetados

Os caminhos existentes foram confirmados no repositório; os demais são caminhos novos e concretos propostos para a implementação.

### Configuração e documentação

- `package.json` (existente, vazio): definir scripts de desenvolvimento, build, lint, typecheck e testes; adicionar Next.js, React, TypeScript, Tailwind CSS, Motion, React Three Fiber/Drei/Three e ferramentas de teste.
- `tsconfig.json` (novo): habilitar modo estrito, aliases `@/*` e opções recomendadas pelo Next.js.
- `next.config.ts` (novo): configurar o Next.js e, se necessário, origens remotas de imagens.
- `postcss.config.mjs` (novo): integrar Tailwind CSS ao pipeline.
- `eslint.config.mjs` (novo): configurar lint para Next.js e TypeScript.
- `vitest.config.ts` e `vitest.setup.ts` (novos): preparar testes unitários/de componentes com ambiente DOM.
- `playwright.config.ts` (novo): preparar testes dos fluxos críticos em viewport desktop e mobile.
- `.gitignore` (novo): ignorar dependências, builds, cobertura, resultados de teste e arquivos locais.
- `README.md` (existente, vazio): documentar instalação, comandos, rotas, decisões principais e natureza simulada do checkout.
- `docs/requirements.md` (existente, vazio): registrar escopo, premissas e critérios de aceite funcionais.
- `docs/architecture.md` (existente, vazio): registrar estrutura de rotas, limites server/client, estado do carrinho, dados e estratégia 3D.
- `docs/design-system.md` (existente, vazio): registrar tokens, tipografia, componentes, estados e regras de movimento/acessibilidade.

### Fundação da aplicação

- `app/app.tsx` (existente, vazio): remover, pois não corresponde a uma convenção de rota do App Router.
- `app/layout.tsx` (novo): definir metadados, fontes, estilos globais, providers e estrutura compartilhada.
- `app/page.tsx` (novo): compor a home com seções reutilizáveis e dados do catálogo.
- `app/globals.css` (novo): declarar tokens visuais, estilos-base, utilitários globais e comportamento de movimento reduzido.
- `app/loading.tsx`, `app/not-found.tsx` e `app/error.tsx` (novos): fornecer feedback para carregamento, 404 e falhas inesperadas.
- `app/providers.tsx` (novo): concentrar providers client-side, inicialmente o estado do carrinho.

### Rotas

- `app/catalogo/page.tsx` (novo): ler query parameters, filtrar/ordenar produtos e compor catálogo.
- `app/catalogo/loading.tsx` (novo): exibir skeleton da grade.
- `app/produto/[slug]/page.tsx` (novo): gerar/validar slugs, metadados e detalhe do produto; chamar `notFound()` para slug inválido.
- `app/carrinho/page.tsx` (novo): exibir e editar o carrinho com resumo financeiro.
- `app/checkout/page.tsx` (novo): renderizar o fluxo de checkout e impedir submissão sem itens.
- `app/checkout/sucesso/page.tsx` (novo): confirmar pedido simulado sem expor dados sensíveis na URL.

### Dados, domínio e estado

- `data/products.ts` (existente, vazio): fornecer catálogo tipado e variado, com slugs únicos, categorias, imagens, cores, tamanhos, preços, destaques e estoque simulado.
- `types/product.ts` (novo): definir `Product`, categoria, cor, tamanho e mídia.
- `types/cart.ts` (novo): definir item do carrinho, chave de variante e resumo financeiro.
- `lib/catalog.ts` (novo): centralizar busca por slug, filtragem, ordenação, faixas de preço e relacionados.
- `lib/currency.ts` (novo): formatar centavos em BRL.
- `lib/cart.ts` (novo): gerar chaves de variantes, normalizar quantidades e calcular subtotal/frete/total.
- `context/cart-context.tsx` (novo): expor estado e ações do carrinho, persistência versionada e sinal de hidratação.

### Componentes compartilhados

- `components/layout/header.tsx`, `components/layout/mobile-nav.tsx` e `components/layout/footer.tsx` (novos): estruturar navegação global, busca/links, contador do carrinho e menu móvel acessível.
- `components/ui/button.tsx`, `components/ui/container.tsx`, `components/ui/section-heading.tsx`, `components/ui/badge.tsx`, `components/ui/price.tsx` e `components/ui/skeleton.tsx` (novos): formar primitives consistentes do design system.
- `components/motion/reveal.tsx` (novo): encapsular animação de entrada com fallback para movimento reduzido.
- `components/cart/cart-drawer.tsx`, `components/cart/cart-line-item.tsx` e `components/cart/cart-summary.tsx` (novos): compartilhar visual e regras entre minicarrinho, carrinho e checkout.

### Home e elemento 3D

- `components/home/hero.tsx`, `components/home/category-grid.tsx`, `components/home/featured-products.tsx`, `components/home/brand-story.tsx` e `components/home/newsletter.tsx` (novos): implementar as seções da página inicial.
- `components/three/hero-scene.tsx` (novo): renderizar uma composição abstrata leve com iluminação e movimento moderado.
- `components/three/hero-canvas.tsx` (novo): isolar o Canvas client-side, lazy loading, fallback e suspensão quando fora da viewport ou com movimento reduzido.

### Catálogo e produto

- `components/product/product-card.tsx`, `components/product/product-grid.tsx` e `components/product/product-gallery.tsx` (novos): apresentar produtos com imagens responsivas, estados interativos e semântica adequada.
- `components/product/product-purchase-panel.tsx` (novo): controlar cor/tamanho/quantidade e adição ao carrinho.
- `components/catalog/catalog-toolbar.tsx`, `components/catalog/catalog-filters.tsx`, `components/catalog/active-filters.tsx` e `components/catalog/mobile-filter-drawer.tsx` (novos): manipular filtros na URL em desktop e mobile.
- `components/catalog/empty-catalog.tsx` (novo): orientar a limpeza de filtros quando não houver resultados.

### Checkout

- `components/checkout/checkout-form.tsx` (novo): controlar etapas/campos, validação e submissão simulada.
- `components/checkout/contact-fields.tsx`, `components/checkout/address-fields.tsx`, `components/checkout/shipping-options.tsx` e `components/checkout/payment-fields.tsx` (novos): dividir o formulário em grupos sem duplicar estado.
- `lib/checkout-schema.ts` (novo): centralizar regras de validação e mensagens em português.

### Assets e testes

- `public/images/products/*` e `public/images/brand/*` (novos): armazenar imagens locais otimizáveis e fallbacks, com licenças/origens documentadas quando aplicável.
- `tests/unit/catalog.test.ts`, `tests/unit/cart.test.ts` e `tests/unit/checkout-schema.test.ts` (novos): validar regras puras do domínio.
- `tests/components/cart-context.test.tsx`, `tests/components/catalog-filters.test.tsx` e `tests/components/product-purchase-panel.test.tsx` (novos): validar estado persistido e interações.
- `tests/e2e/storefront.spec.ts` (novo): cobrir navegação, filtragem, compra e checkout em navegador.

## Passos de implementação

1. Inicializar o projeto no scaffold atual:
   - preencher `package.json` com scripts para `dev`, `build`, `start`, `lint`, `typecheck`, `test` e `test:e2e`;
   - instalar as dependências de runtime e desenvolvimento estáveis mais recentes;
   - criar configurações de TypeScript, Next.js, Tailwind/PostCSS, ESLint, Vitest e Playwright;
   - remover `app/app.tsx` somente após `app/layout.tsx` e `app/page.tsx` existirem.

2. Formalizar os contratos antes da interface:
   - registrar critérios de aceite em `docs/requirements.md`;
   - registrar decisões de arquitetura e fronteiras server/client em `docs/architecture.md`;
   - definir tokens, estados de componentes, breakpoints e movimento em `docs/design-system.md`;
   - criar os tipos de produto e carrinho, mantendo preços inteiros em centavos e slugs estáveis.

3. Montar o catálogo local:
   - preencher `data/products.ts` com quantidade suficiente para demonstrar filtros e ordenação, contemplando múltiplas categorias, gêneros, tamanhos, cores e faixas de preço;
   - garantir IDs/slugs únicos, imagens com dimensões/alt, estoque coerente e ao menos produtos relacionados/destaques;
   - adicionar assets locais e fallback para mídia ausente.

4. Implementar funções puras de domínio:
   - criar formatação monetária;
   - implementar normalização dos query parameters, busca textual sem diferenciação de caixa, combinação de filtros, ordenação e relacionados;
   - implementar identidade de item por produto + cor + tamanho, limites de quantidade e cálculos de subtotal, frete simulado e total;
   - escrever os testes unitários dessas regras antes de conectá-las à UI.

5. Criar a fundação visual:
   - declarar cores, tipografia, espaçamento, raios, sombras, largura máxima e durações/easings em `globals.css`;
   - carregar fontes com `next/font` e configurar metadados padrão;
   - implementar primitives de UI com variantes, foco visível, estados disabled/loading e áreas de toque adequadas;
   - adicionar `Reveal` para animações progressivas sem ocultar conteúdo quando JavaScript ou movimento estiver indisponível.

6. Estruturar o shell global:
   - compor layout, header, navegação móvel e footer;
   - adicionar links para home, catálogo, carrinho e checkout, estado ativo e contador acessível;
   - implementar menu móvel com controle de foco, fechamento por Escape e bloqueio correto do scroll;
   - integrar os providers apenas no menor limite client-side necessário.

7. Implementar o carrinho:
   - criar reducer/context com ações de adicionar, remover, alterar quantidade, esvaziar e finalizar;
   - versionar o payload salvo no `localStorage`, validar dados lidos e renderizar estado neutro até a hidratação;
   - implementar drawer e componentes de linha/resumo compartilhados;
   - anunciar alterações relevantes com região `aria-live`, devolver foco ao gatilho ao fechar e oferecer estado vazio útil.

8. Construir a home:
   - compor hero, categorias, destaques, história da marca e newsletter demonstrativa;
   - manter a proposta de valor e CTA visíveis antes do carregamento do 3D;
   - usar cards de produto compartilhados e links reais para categorias/produtos;
   - aplicar animações discretas por seção e microinterações sem layout shift.

9. Adicionar o elemento 3D:
   - criar uma cena abstrata alinhada à identidade da marca, sem depender de modelo externo pesado;
   - carregar `hero-canvas.tsx` dinamicamente apenas no cliente e exibir fallback visual até estar pronto;
   - limitar DPR, complexidade geométrica e iluminação; pausar renderização fora da viewport;
   - desativar rotação automática para movimento reduzido e garantir que o Canvas seja decorativo, não capture navegação nem seja necessário para compreender o hero.

10. Implementar o catálogo:
    - interpretar os filtros no server component a partir de `searchParams` e delegar apenas controles interativos a client components;
    - atualizar a URL sem perder filtros incompatíveis, mantendo ordenação e busca;
    - criar sidebar desktop e drawer mobile com os mesmos controles e labels;
    - exibir chips removíveis, quantidade de resultados, botão limpar, skeleton e estado vazio;
    - preservar navegação por histórico e foco previsível após alterações.

11. Implementar a página de produto:
    - gerar rotas/metadados a partir dos slugs locais e tratar produto inexistente com `notFound()`;
    - montar galeria otimizada, informações, preço, variações, tamanhos, estoque e detalhes;
    - validar variante/tamanho antes da adição, mostrar erro junto ao seletor e abrir/atualizar feedback de carrinho;
    - listar relacionados pela mesma categoria sem repetir o produto atual.

12. Implementar a página do carrinho:
    - reutilizar itens e resumo do drawer;
    - permitir editar quantidades/remover itens com atualização imediata de totais;
    - exibir política de frete simulado e CTAs para continuar comprando ou seguir ao checkout;
    - impedir valores negativos, quantidade zero persistida ou variantes duplicadas.

13. Implementar o checkout simulado:
    - dividir formulário em contato, endereço, entrega e pagamento, mantendo uma única fonte de estado;
    - validar campos no blur e na submissão, mover foco para o primeiro erro e não persistir dados de pagamento;
    - aceitar apenas dados fictícios, mascarar visualmente campos quando necessário e deixar explícito que não haverá cobrança;
    - bloquear checkout vazio, mostrar estado de processamento, evitar submissão dupla, gerar identificador local não sensível, limpar o carrinho e navegar para sucesso;
    - garantir que a página de sucesso tenha ação para voltar ao catálogo e comportamento definido ao acesso direto.

14. Completar estados de rota e robustez:
    - criar loading, not-found e error boundaries;
    - adicionar fallbacks de imagem e mensagens úteis para dados ausentes;
    - validar responsividade desde telas pequenas até desktop largo e evitar overflow horizontal;
    - revisar o número de client components para não transformar páginas inteiras em bundles do cliente.

15. Documentar e preparar entrega:
    - preencher o `README.md` com pré-requisitos, instalação, scripts, rotas e limitações;
    - confirmar que arquitetura, requisitos e design system refletem a implementação final;
    - registrar origem/licença de assets externos ou manter somente assets próprios/livres no repositório;
    - executar toda a matriz de validação e corrigir regressões antes da entrega.

## Testes

### Automatizados

- `catalog.test.ts`: busca, interseção de múltiplos filtros, limites de preço, ordenações, parâmetros inválidos e lista vazia.
- `cart.test.ts`: chave de variante, consolidação de item repetido, variantes distintas, limites de quantidade, remoção e totais/frete.
- `checkout-schema.test.ts`: campos obrigatórios, formatos aceitos e mensagens previsíveis sem validar/armazenar dados reais de cartão.
- `cart-context.test.tsx`: hidratação sem mismatch, payload persistido válido/inválido, atualização do storage e limpeza após checkout.
- `catalog-filters.test.tsx`: serialização na URL, remoção individual, limpeza geral e preservação da ordenação.
- `product-purchase-panel.test.tsx`: bloqueio sem tamanho, seleção de variante, indisponibilidade e feedback de adição.
- `storefront.spec.ts`:
  1. abrir a home e navegar pelo menu;
  2. filtrar o catálogo e abrir um produto;
  3. selecionar variante, adicionar e alterar quantidade;
  4. recarregar e confirmar persistência;
  5. concluir checkout simulado e confirmar carrinho vazio;
  6. repetir o fluxo essencial em viewport mobile e operar menu/filtros por teclado.

### Validação técnica e manual

- Executar lint, verificação TypeScript, testes unitários/de componentes e build de produção.
- Rodar os testes E2E contra o build de produção, não apenas o servidor de desenvolvimento.
- Auditar home, catálogo, produto, carrinho e checkout com Lighthouse para performance, acessibilidade, boas práticas e SEO.
- Testar teclado completo, leitor de tela nos controles críticos, zoom a 200%, contraste, foco após drawers/erros e `prefers-reduced-motion`.
- Verificar breakpoints móveis, tablet e desktop, além de conexão/recurso limitado para confirmar que o fallback do 3D mantém a home utilizável.
- Confirmar que não há chamadas reais de pagamento, segredos, dados pessoais persistidos ou erros no console.

## Riscos / pontos de atenção

- **Scaffold vazio:** as decisões iniciais de configuração têm impacto amplo; o Executor deve confirmar APIs e convenções das versões efetivamente instaladas em vez de copiar configuração de versões antigas.
- **Peso do 3D:** Three.js pode degradar LCP, bateria e estabilidade visual. O bundle deve ser isolado, lazy-loaded e medido; se o orçamento de performance não for atingido, manter o fallback visual e simplificar/desativar a cena em dispositivos limitados.
- **Hidratação do carrinho:** acessar `localStorage` durante renderização inicial causa mismatch. Leitura e escrita precisam ficar em efeito client-side com estado explícito de hidratação.
- **Filtros e histórico:** duas fontes de verdade entre estado local e URL geram inconsistência. A URL deve ser canônica, com parsing/serialização centralizados e valores desconhecidos ignorados.
- **Checkout fictício:** a interface não pode sugerir cobrança real nem persistir número/CVV; todo processamento deve ser local, claramente identificado como simulação.
- **Assets:** imagens remotas podem quebrar, exigir configuração de domínio ou ter licença incompatível. Preferir assets locais otimizados, com origem documentada.
- **Acessibilidade de overlays:** menu, filtros e carrinho exigem foco, Escape, retorno ao gatilho e bloqueio de scroll; compartilhar primitives/comportamentos reduz divergências.
- **Server versus client components:** Motion, contexto, Canvas e controles dependem do cliente, mas dados e composição principal devem permanecer no servidor para limitar JavaScript enviado.
- **Escopo sem backend:** estoque, frete, promoções e confirmação são demonstrações locais; essa limitação deve permanecer visível na documentação e no checkout.

## Handoff

Após a revisão deste documento, acione o handoff **“Executar plano”** para passar este plano ao agente Executor.
