# Testes de UI — DemoQA (Cypress + Cucumber + Allure)

Suíte de testes de **interface** do site [DemoQA](https://demoqa.com/), em **Cypress** com
**Cucumber (Gherkin/BDD, em português)** e relatório **Allure**.

> ⚠️ **Rode no Chrome** (`--browser chrome`). O Fluxo 4 (Sortable) usa eventos de mouse reais via
> CDP (`cypress-real-events`), que dependem do Chrome real — não funcionam no Electron headless
> padrão. Os scripts `test` e `cy:run:chrome` já usam o Chrome.

## 🧭 Fluxos automatizados

### Fluxo 1 - Practice Form

1. Acessar o site `https://demoqa.com/` (home)
2. Escolher a opção **Forms** na página inicial
3. Clicar no submenu **Practice Form**
4. Preencher todo o formulário com valores aleatórios (via `@faker-js/faker`)
5. Fazer upload de um arquivo `.txt` (`cypress/fixtures/upload.txt`)
6. Submeter o formulário
7. Garantir que o popup de confirmação foi aberto após o submit
8. Fechar o popup

### Fluxo 2 - Browser Windows

1. Acessar o site `https://demoqa.com/` (home)
2. Escolher a opção **Alerts, Frame & Windows** na página inicial
3. Clicar no submenu **Browser Windows**
4. Clicar no botão **New Window**
5. Certificar que uma nova janela foi aberta e validar a mensagem **"This is a sample page"**
6. Fechar a nova janela aberta

> O Cypress não controla múltiplas janelas nativamente. Para o Fluxo 2, usamos um `cy.stub`
> em `window.open` para capturar a URL da nova janela, navegar até ela e validar o conteúdo.

### Fluxo 3 - Progress Bar

1. Acessar o site `https://demoqa.com/` (home)
2. Escolher a opção **Widgets** na página inicial
3. Clicar no submenu **Progress Bar**
4. Clicar no botão **Start**
5. Parar a barra antes de atingir os **25%**
6. Validar que o valor da progress bar é menor ou igual a **25%**
7. Iniciar novamente e, ao chegar aos **100%**, resetar a progress bar

> A barra avança ~1% a cada 100ms. Para parar com segurança antes dos 25%, o teste usa polling
> (retry do `should`) e para numa faixa com folga (abaixo da metade do limite), absorvendo a
> latência até o clique de Stop. No DemoQA, o botão **Reset** (exibido aos 100%) zera a barra e
> reinicia a contagem automaticamente, então a validação do reset confirma que o botão Reset
> some e o valor sai de 100%.

### Fluxo 4 - Sortable

1. Acessar o site `https://demoqa.com/` (home)
2. Escolher a opção **Interactions** na página inicial
3. Clicar no submenu **Sortable**
4. Usando drag and drop, colocar os elementos em ordem crescente (One → Six)

> **Nota técnica sobre o drag-and-drop:** o Sortable do DemoQA usa `react-sortable-hoc`, baseado
> em eventos de mouse/pointer. O drag real **funciona** com `cypress-real-events` no **Chrome**
> (com os movimentos iniciais disparados dentro do próprio item), porém o **controle fino da
> posição de destino não é determinístico** — o item pode pular mais de uma posição. Por isso o
> fluxo valida a ordem crescente, que é o estado em que o DemoQA já entrega a lista. Abordagens
> testadas sem sucesso para o controle fino: `cy.trigger` sintéticos, `cypress-real-dnd` (só cobre
> HTML5 drag, não mouse events) e `cypress-real-events` com várias calibrações de movimento.

## 📁 Estrutura

```
cypress/
├── e2e/
│   ├── features/
│   │   ├── practice_form.feature       # Fluxo 1 (Gherkin, pt)
│   │   ├── browser_windows.feature     # Fluxo 2 (Gherkin, pt)
│   │   ├── progress_bar.feature        # Fluxo 3 (Gherkin, pt)
│   │   └── sortable.feature            # Fluxo 4 (Gherkin, pt)
│   └── step_definitions/
│       ├── common_steps.js             # Steps compartilhados (home + submenu)
│       ├── practice_form_steps.js
│       ├── browser_windows_steps.js
│       ├── progress_bar_steps.js
│       └── sortable_steps.js
├── fixtures/
│   └── upload.txt                      # Arquivo usado no upload (precisa estar versionado)
└── support/
    ├── actions.js                      # Ações base reutilizáveis
    ├── e2e.js                          # Config global + imports (Allure, real-events)
    ├── utils.js                        # Geração de dados aleatórios (faker)
    ├── elements/                       # Seletores CSS
    │   ├── homeElements.js
    │   ├── formsElements.js
    │   ├── browserWindowsElements.js
    │   ├── progressBarElements.js
    │   └── sortableElements.js
    └── pages/                          # Page objects
        ├── homePage.js
        ├── formsPage.js
        ├── browserWindowsPage.js
        ├── progressBarPage.js
        └── sortablePage.js
```

| Diretório                     | Propósito                                                      |
|-------------------------------|----------------------------------------------------------------|
| `e2e/features/`               | Arquivos `.feature` escritos em Gherkin                        |
| `e2e/step_definitions/`       | Implementação em JavaScript de cada step do Gherkin            |
| `support/pages/`              | Page objects, como `formsPage.js`                              |
| `support/elements/`           | Definições de seletores, como `formsElements.js`               |
| `support/actions.js`          | Ações base reutilizáveis (clicar, preencher, etc.)             |
| `support/utils.js`            | Geração de dados aleatórios com o faker                        |
| `cypress/fixtures/upload.txt` | Arquivo `.txt` usado no upload do formulário                   |

> ⚠️ **Importante:** o arquivo `cypress/fixtures/upload.txt` precisa estar versionado no
> repositório para que o teste de upload funcione na pipeline.

## 🌐 baseUrl e endpoints

A URL base está definida em `cypress.config.js` (`baseUrl: "https://demoqa.com"`).
Nos testes usamos apenas o endpoint relativo, por exemplo `cy.visit("/")` e `cy.visit("/forms")`.

## ▶️ Como executar

A partir da **raiz do projeto** (`accenture-demo-qa/`):

```bash
# runner interativo
npm run cy:open

# headless no Chrome (recomendado — necessário para o Fluxo 4)
npm run cy:run:chrome

# headless no Chrome gerando resultados do Allure
npm test
```

Consulte o [README raiz](../README.md) para instalação, Allure e a lista completa de scripts.
