<h1 align="center"> AUTOMAÇÃO FRONT-END - DEMOQA 🧪 (Cypress + Cucumber BDD + Allure)</h1>

![STATUS](https://img.shields.io/static/v1?label=STATUS&message=%20Ativo&color=green&style=for-the-badge)

## 💬 Sobre o projeto

Projeto de automação front-end para o site [DemoQA](https://demoqa.com/). Utiliza **Cypress**
como motor de testes, **Cucumber (Gherkin/BDD)** para descrever os cenários em linguagem natural
(em português) e **Allure** para gerar o relatório.

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

## 💻 Tecnologias utilizadas

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [Cypress](https://www.cypress.io/) 13
- [Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) (`@badeball/cypress-cucumber-preprocessor`)
- [esbuild preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor)
- [Faker](https://fakerjs.dev/) (`@faker-js/faker`) para dados aleatórios
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) para drag-and-drop real (Fluxo 4)
- [Allure](https://allurereport.org/) (`@shelex/cypress-allure-plugin`)

## 📁 Estrutura do projeto

```
accenture-demo-qa/
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── practice_form.feature       # Fluxo 1 (Gherkin, pt)
│   │   │   ├── browser_windows.feature     # Fluxo 2 (Gherkin, pt)
│   │   │   ├── progress_bar.feature        # Fluxo 3 (Gherkin, pt)
│   │   │   └── sortable.feature            # Fluxo 4 (Gherkin, pt)
│   │   └── step_definitions/
│   │       ├── common_steps.js             # Steps compartilhados (home + submenu)
│   │       ├── practice_form_steps.js      # Steps do Fluxo 1
│   │       ├── browser_windows_steps.js    # Steps do Fluxo 2
│   │       ├── progress_bar_steps.js       # Steps do Fluxo 3
│   │       └── sortable_steps.js           # Steps do Fluxo 4
│   ├── fixtures/
│   │   └── upload.txt                      # Arquivo usado no upload (vai pro GitHub)
│   └── support/
│       ├── actions.js                      # Ações base reutilizáveis
│       ├── e2e.js                          # Config global + imports (Allure, real-events)
│       ├── utils.js                        # Geração de dados aleatórios (faker)
│       ├── elements/                       # Seletores CSS
│       │   ├── homeElements.js
│       │   ├── formsElements.js
│       │   ├── browserWindowsElements.js
│       │   ├── progressBarElements.js
│       │   └── sortableElements.js
│       └── pages/                          # Page objects
│           ├── homePage.js
│           ├── formsPage.js
│           ├── browserWindowsPage.js
│           ├── progressBarPage.js
│           └── sortablePage.js
├── .cypress-cucumber-preprocessorrc.json
├── cypress.config.js
└── package.json
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
> repositório (commitado no GitHub) para que o teste de upload funcione na pipeline.

## 🌐 baseUrl e endpoints

A URL base está definida em `cypress.config.js` (`baseUrl: "https://demoqa.com"`).
Nos testes usamos apenas o endpoint relativo, por exemplo `cy.visit("/")` e `cy.visit("/forms")`.

## 📥 Clonando o projeto

```bash
git clone <url-do-seu-repo>
cd accenture-demo-qa
```

## 👩🏻‍💻 Instalando as dependências

```bash
npm install
```

> O Allure também precisa de um runtime Java (JRE/JDK) disponível na máquina para gerar o relatório HTML.

## ▶️ Executando os testes

Abrir o runner interativo do Cypress:

```bash
npm run cy:open
```

Executar em modo headless **no Chrome** (recomendado — necessário para o Fluxo 4):

```bash
npm run cy:run:chrome
```

## 📊 Relatório Allure

Rodar os testes gerando os resultados do Allure (em `allure-results/`):

```bash
npm test
```

Gerar e abrir o relatório HTML:

```bash
npm run allure:generate
npm run allure:open
```

Ou fazer tudo em um único passo (limpar → rodar → gerar → abrir):

```bash
npm run test:allure
```

Servidor rápido (sem gerar HTML estático):

```bash
npm run allure:serve
```

## 🧪 Scripts disponíveis

| Script             | Descrição                                                        |
|--------------------|------------------------------------------------------------------|
| `cy:open`          | Abre o runner interativo do Cypress                              |
| `cy:run`           | Executa os testes em modo headless (Electron)                    |
| `cy:run:chrome`    | Executa os testes em modo headless no Chrome (recomendado)       |
| `test`             | Executa no Chrome gerando os resultados do Allure                |
| `api:open`         | Abre o runner interativo da suíte de **API** (`cypress.config.api.js`) |
| `api:run`          | Executa a suíte de **API** headless gerando resultados do Allure |
| `allure:clear`     | Remove `allure-results` e `allure-report`                        |
| `allure:generate`  | Gera o relatório HTML do Allure                                  |
| `allure:open`      | Abre o relatório gerado do Allure                                |
| `allure:serve`     | Sobe um servidor temporário do Allure a partir dos resultados    |
| `test:allure`      | Limpa, roda, gera e abre o relatório em sequência                |

## 🔌 Testes de API (BookStore)

Além dos fluxos de UI, o projeto tem uma suíte de **testes de API** do desafio BookStore do
DemoQA, em `api-tests/`, com o fluxo completo (criar usuário → token → autorização → listar livros
→ alugar → detalhes) e cenários alternativos (campos obrigatórios, validação de schema, erros).
A organização de pastas espelha o projeto Robot de referência. Veja os detalhes em
[`api-tests/README.md`](./api-tests/README.md).

```bash
npm run api:run     # roda a suíte de API
```
