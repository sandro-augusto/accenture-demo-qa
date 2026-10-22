<h1 align="center"> ACCENTURE DEMO QA 🧪 — Automação DemoQA (UI + API)</h1>

![STATUS](https://img.shields.io/static/v1?label=STATUS&message=%20Ativo&color=green&style=for-the-badge)

## 💬 Sobre o projeto

Automação de testes do site [DemoQA](https://demoqa.com/), cobrindo **dois domínios**:

- 🖥️ **UI** — fluxos de interface (formulário, janelas, progress bar, drag and drop)
- 🔌 **API** — desafio BookStore (criar usuário, token, autorização, alugar livros)

Ambos usam **Cypress + Cucumber (Gherkin/BDD, em português)** e geram relatório **Allure**.

## 📦 Os dois domínios

| Domínio | Pasta | O que cobre | Documentação |
|---------|-------|-------------|--------------|
| **UI** | `cypress/` | 4 fluxos: Practice Form, Browser Windows, Progress Bar e Sortable (drag and drop) | [`cypress/README.md`](./cypress/README.md) |
| **API** | `api-tests/` | Fluxo BookStore E2E + cenários alternativos, com validação de contrato (JSON Schema) e das mensagens de erro | [`api-tests/README.md`](./api-tests/README.md) |

> A suíte de **API** usa uma organização de pastas em camadas
> (`features` + `resources/{config,keywords,variables,enviroments,schemas,steps}` + `fixtures`).

## 💻 Stack

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [Cypress](https://www.cypress.io/) 13
- [Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) + [esbuild preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor)
- [Faker](https://fakerjs.dev/) — dados aleatórios
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) — drag and drop real (UI, Fluxo 4)
- [Ajv](https://ajv.js.org/) — validação de contrato (API)
- [Allure](https://allurereport.org/) (`@shelex/cypress-allure-plugin`)

## 🗂️ Estrutura (visão geral)

```
accenture-demo-qa/
├── cypress/                  # Testes de UI (ver cypress/README.md)
│   ├── e2e/{features,step_definitions}
│   └── support/{pages,elements,actions,utils}
├── api-tests/                # Testes de API (ver api-tests/README.md)
│   ├── features/             # .feature (Gherkin)
│   ├── resources/{steps,keywords,config,variables,enviroments,schemas}
│   └── fixtures/
├── material-estudo.html      # Material de estudo (abre no navegador / vira PDF)
├── material-estudo.pdf       # Mesmo material em PDF
├── cypress.config.js         # Config da suíte de UI
├── cypress.config.api.js     # Config da suíte de API
└── package.json
```

## 📥 Instalação

```bash
git clone https://github.com/sandro-augusto/accenture-demo-qa.git
cd accenture-demo-qa
npm install
```

> O Allure precisa de um runtime Java (JRE/JDK) disponível na máquina para gerar o relatório HTML.

## ▶️ Execução rápida

```bash
# UI (Chrome — necessário para o Fluxo 4)
npm run cy:run:chrome

# API
npm run api:run
```

Detalhes de cada suíte (fluxos, cenários, notas técnicas) nos READMEs de cada domínio:
[UI](./cypress/README.md) · [API](./api-tests/README.md).

## 📊 Relatório Allure

Os resultados das duas suítes vão para `allure-results/` na raiz.

```bash
npm run allure:generate   # gera o HTML em allure-report/
npm run allure:open       # abre o relatório
npm run allure:serve      # servidor temporário a partir dos resultados
```

## 🧪 Scripts disponíveis

| Script             | Descrição                                                        |
|--------------------|------------------------------------------------------------------|
| `cy:open`          | Abre o runner interativo (UI)                                    |
| `cy:run`           | UI headless (Electron)                                           |
| `cy:run:chrome`    | UI headless no Chrome (recomendado)                              |
| `test`             | UI no Chrome gerando resultados do Allure                        |
| `api:open`         | Abre o runner interativo da suíte de **API**                     |
| `api:run`          | Suíte de **API** headless gerando resultados do Allure           |
| `allure:clear`     | Remove `allure-results` e `allure-report`                        |
| `allure:generate`  | Gera o relatório HTML do Allure                                  |
| `allure:open`      | Abre o relatório gerado do Allure                                |
| `allure:serve`     | Sobe um servidor temporário do Allure                            |
| `test:allure`      | Limpa, roda (UI), gera e abre o relatório em sequência           |

## 📚 Documentação

- [`cypress/README.md`](./cypress/README.md) — detalhes da suíte de UI
- [`api-tests/README.md`](./api-tests/README.md) — detalhes da suíte de API
- [`material-estudo.html`](./material-estudo.html) — material de estudo para apresentação (UI + API, desafios e FAQ)
