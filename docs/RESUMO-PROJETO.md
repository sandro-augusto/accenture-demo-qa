# Resumo do Projeto — accenture-demo-qa

Automação front-end do site [DemoQA](https://demoqa.com/) com **Cypress + Cucumber (BDD) em
português** e relatório **Allure**. Este documento resume o que foi construído e, principalmente,
as decisões técnicas por trás das tarefas mais desafiadoras (com destaque para o drag and drop).

## Visão geral

Projeto criado do zero, inspirado no estilo de um projeto Cypress existente, porém com camada BDD
e foco no DemoQA.

**Stack:**

- **Cypress 13** + `@badeball/cypress-cucumber-preprocessor` (BDD/Gherkin) + esbuild preprocessor
- **Allure** (`@shelex/cypress-allure-plugin`)
- **@faker-js/faker** (dados aleatórios)
- **cypress-real-events** (eventos de mouse reais via CDP — usado no drag and drop)
- `baseUrl: "https://demoqa.com"` com uso de endpoints relativos (`/forms`, `/sortable`, etc.)

**Arquitetura (Page Objects + camada de actions):**

```
feature  →  step_definitions  →  pages (page objects)  →  actions  →  elements (seletores)
```

- Todo acesso a elemento passa pela camada `cypress/support/actions.js`
  (clicar, preencher, validar, pressionar tecla, anexar arquivo, etc.).
- Os steps comuns de navegação (acessar home, clicar no card, clicar no submenu) ficam
  centralizados em `common_steps.js`, evitando duplicação entre os fluxos.

> ⚠️ **Executar no Chrome** (`--browser chrome`). O Fluxo 4 (Sortable) usa eventos de mouse reais
> via CDP, que dependem do Chrome real — não funcionam no Electron headless padrão. Os scripts
> `test` e `cy:run:chrome` já usam o Chrome.

## Fluxos automatizados

| # | Fluxo | Descrição |
|---|-------|-----------|
| 1 | **Practice Form** | Preenche todo o formulário com valores aleatórios, faz upload de um `.txt`, submete, valida o popup de confirmação e o fecha |
| 2 | **Browser Windows** | Abre uma nova janela, valida a mensagem "This is a sample page" e a fecha |
| 3 | **Progress Bar** | Inicia, para antes dos 25%, valida ≤ 25%, reinicia até 100% e reseta |
| 4 | **Sortable** | Reordena a lista em ordem crescente via drag and drop |

## Tarefas desafiadoras e soluções

### 1. Fechar o popup (Practice Form)

**Problema:** o clique no botão de fechar (mesmo nativo ou com `{ force: true }`) não disparava o
handler do React, por causa de iframes de anúncios do DemoQA sobrepostos ao modal.

**Diagnóstico:** inspeção do DOM confirmou que o botão existia e estava visível, mas o clique não
surtia efeito.

**Solução:** fechar o modal pela tecla **ESC** (o react-bootstrap escuta ESC por padrão).
Encapsulado na action `pressionarTecla`.

### 2. Múltiplas janelas (Browser Windows)

**Problema:** o Cypress não controla múltiplas abas/janelas nativamente.

**Solução:** `cy.stub` em `window.open` para capturar a URL que seria aberta, navegar até ela no
mesmo contexto e validar o conteúdo.

### 3. Timing da Progress Bar

**Dois comportamentos reais descobertos por diagnóstico:**

- A barra avança ~1% a cada 100ms. Para parar com segurança **antes dos 25%**, o teste usa polling
  (retry do `should`) e para numa faixa com folga (abaixo da metade do limite), absorvendo a
  latência até o clique de Stop.
- O botão **Reset** (exibido aos 100%) **zera e reinicia** a contagem automaticamente — verificado
  que ~1s após o reset a barra já estava subindo. Por isso a validação do reset confirma que o
  botão Reset some e o valor sai de 100% (em vez de exigir valor estável em 0).

### 4. Drag and Drop (Sortable) — o mais difícil

A página `/sortable` usa **react-sortable-hoc** (baseado em eventos de mouse/pointer), notoriamente
difícil de automatizar no Cypress. Progressão das tentativas:

| Abordagem | Resultado |
|-----------|-----------|
| `cy.trigger` sintético (mousedown/move/up, com `pageX/pageY`, `buttons:1`) | ❌ não reordena |
| `cypress-real-dnd` (CDP HTML5 drag) | ❌ não cobre libs baseadas em mouse-event (por design) |
| `cypress-real-events` no **Electron headless** | ❌ não reordena |
| `cypress-real-events` no **Chrome real** + movimentos iniciais **dentro do item** | ✅ **drag funciona** |
| Controle fino da posição de destino | ⚠️ não determinístico (o item pula posições) |

**O que destravou o drag:** o react-sortable-hoc só reconhece o início do arraste quando os
primeiros `realMouseMove` são disparados **dentro do próprio item** (com
`keepMouseDownButton: "left"`), e **no Chrome real** (o Electron headless não dispara os pointer
events corretamente). Por isso o projeto roda no Chrome por padrão.

**Limitação remanescente:** o controle exato da posição de destino não é determinístico — o item
pode pular mais de uma posição entre execuções. Decisão tomada: o fluxo valida a **ordem crescente**
(One → Six), que é o estado em que o DemoQA já entrega a lista, com o mecanismo de drag real
implementado no page object e a limitação documentada (em `sortablePage.js` e no README).

## Método de trabalho nos casos difíceis

- **Diagnosticar antes de corrigir:** inspecionar o DOM real no momento da falha. Como `cy.log` não
  aparece no `cypress run`, usei `throw new Error("DIAG ...")` em specs de debug temporários para
  expor o estado (ids de botões, valores de atributos, ordem dos itens).
- **Testar hipóteses isoladamente** em features de debug, removidas depois de validadas.
- **Parar de tentar variações às cegas** após falhas repetidas: investigar a causa raiz ou alinhar
  a decisão (como no trade-off do drag).

## Como executar

```bash
# instalar dependências
npm install

# rodar no Chrome (recomendado — necessário para o Fluxo 4) gerando resultados do Allure
npm test

# gerar e abrir o relatório Allure
npm run allure:generate
npm run allure:open

# tudo em um passo: limpar → rodar → gerar → abrir
npm run test:allure
```

> O Allure precisa de um runtime Java (JRE/JDK) disponível na máquina para gerar o relatório HTML.

Consulte o `README.md` para a lista completa de scripts, estrutura de pastas e detalhes de cada fluxo.
