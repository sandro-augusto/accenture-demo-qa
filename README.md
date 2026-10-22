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

# UI + API em sequência (sem gerar relatório)
npm run test:all
```

Detalhes de cada suíte (fluxos, cenários, notas técnicas) nos READMEs de cada domínio:
[UI](./cypress/README.md) · [API](./api-tests/README.md).

## 📊 Relatório Allure

Os resultados das duas suítes são gravados em `allure-results/` na raiz, e o relatório HTML
em `allure-report/`.

### Forma recomendada: tudo em um comando

```bash
npm run test:all:allure
```

Esse comando faz, em sequência: **limpa** os resultados antigos → **roda a UI** (Chrome, com Allure)
→ **roda a API** (com Allure) → **gera** o HTML → **abre** o relatório. É a forma correta de obter
o relatório com **as duas suítes juntas**.

> ⚠️ **Atenção:** `npm run test:all` **não** gera o relatório Allure da UI (ele apenas executa as
> duas suítes). Para o relatório consolidado, use `npm run test:all:allure`. O motivo: o Allure
> precisa da flag `--env allure=true`, que está nos scripts `test` (UI) e `api:run` (API) — o
> `test:all` usa `cy:run:chrome` (sem essa flag na UI).

### Passo a passo (se quiser rodar manualmente)

```bash
npm run allure:clear                 # limpa resultados antigos
npm test                             # UI no Chrome, com Allure
npm run api:run                      # API, com Allure
npm run allure:generate              # gera o HTML em allure-report/
npm run allure:open                  # abre o relatório
```

> A suíte de API contém um cenário que **falha de propósito** (evidência de um bug de contrato da
> API — ver [`api-tests/README.md`](./api-tests/README.md)). Por isso o `test:all:allure` está
> preparado para **não abortar** na falha e gerar o relatório mesmo assim — a falha aparece
> registrada no Allure, que é o comportamento desejado.

Outros comandos úteis:

```bash
npm run allure:serve      # sobe um servidor temporário a partir dos resultados
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
| `test:all`         | Roda UI + API em sequência (**sem** gerar relatório Allure)      |
| `test:all:allure`  | **Recomendado:** limpa, roda UI + API (com Allure), gera e abre o relatório consolidado |
| `allure:clear`     | Remove `allure-results` e `allure-report`                        |
| `allure:generate`  | Gera o relatório HTML do Allure                                  |
| `allure:open`      | Abre o relatório gerado do Allure                                |
| `allure:serve`     | Sobe um servidor temporário do Allure                            |
| `test:allure`      | Limpa, roda **só a UI**, gera e abre o relatório                 |

## 📚 Documentação

- [`cypress/README.md`](./cypress/README.md) — detalhes da suíte de UI
- [`api-tests/README.md`](./api-tests/README.md) — detalhes da suíte de API
