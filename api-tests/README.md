# Testes de API — BookStore (DemoQA)

Suíte de testes de **API** do desafio BookStore do [DemoQA](https://demoqa.com/swagger/),
implementada em **Cypress + Cucumber (BDD/Gherkin, em português)**, com **validação de contrato
(JSON Schema via Ajv)**, **validação das mensagens de erro** e **Allure**.

> **Linguagem:** Cypress/JavaScript (mesma do projeto), com cenários descritos em **Gherkin**.
> A **organização de pastas e arquivos** é inspirada no projeto Robot de referência
> (`qa-automation-api-regressivo`): `features`,
> `resources/{config,keywords,variables,enviroments,schemas}` e `fixtures`.

## 🧭 Fluxo principal (desafio)

Conforme o enunciado, o fluxo end-to-end (`features/bookstore_flow.cy.js`):

1. **Criar um usuário** — `POST /Account/v1/User`
2. **Gerar um token de acesso** — `POST /Account/v1/GenerateToken`
3. **Confirmar se o usuário está autorizado** — `POST /Account/v1/Authorized`
4. **Listar os livros disponíveis** — `GET /BookStore/v1/Books`
5. **Alugar dois livros de livre escolha** — `POST /BookStore/v1/Books`
6. **Listar os detalhes do usuário com os livros escolhidos** — `GET /Account/v1/User/{userID}`

Cada etapa valida o **status code**, o **contrato (JSON Schema)** e os **dados** da resposta.

## 🧪 Cenários alternativos

Além do fluxo feliz, foram criados cenários negativos e de validação:

Os cenários negativos validam **status + contrato + code + message** da resposta de erro.

**`features/account_user.feature` (criação de usuário)**
- CT-001 Criar usuário com sucesso (+ contrato)
- CT-002 Não criar usuário já existente → `406 / code 1204 / "User exists!"`
- CT-003 Não criar usuário com senha fraca → `400 / code 1300 / regra de senha`
- CT-004 userName obrigatório vazio → `400 / code 1200 / "UserName and Password required."`
- CT-005 password obrigatório vazio → `400 / code 1200 / "UserName and Password required."`

**`features/account_token.feature` (token e autorização)**
- CT-101 Gerar token com credenciais válidas (+ contrato)
- CT-102 Falhar token com usuário inexistente → `status Failed`
- CT-103 Falhar token com senha incorreta → `status Failed`
- CT-104 Confirmar usuário autorizado (`true`) **após** gerar token
- CT-105 Authorized com usuário inexistente → `404 / code 1207 / "User not found!"`
- CT-106 Authorized retorna `false` **antes** de gerar token

**`features/bookstore_books.feature` (livros)**
- CT-201 Listar livros disponíveis (+ contrato)
- CT-202 Alugar dois livros com sucesso (+ contrato)
- CT-203 Não alugar livros sem token → `401`
- CT-204 Não alugar livro com ISBN inexistente → `400 / code 1205 / "ISBN supplied is not available in Books Collection!"`

## 📁 Estrutura (espelhando a arquitetura do projeto Robot)

```
api-tests/
├── features/                       # Somente .feature (Gherkin) — equiv. a Features/*.robot
│   ├── bookstore_flow.feature      # Fluxo principal E2E
│   ├── account_user.feature        # Cenários de criação de usuário
│   ├── account_token.feature       # Cenários de token/autorização
│   └── bookstore_books.feature     # Cenários de livros/aluguel
├── resources/
│   ├── steps/                      # Step definitions (Gherkin -> keywords)
│   │   └── bookstore_steps.js      # equiv. a resources/steps (cola caso <-> lógica)
│   ├── config/                     # equiv. a resources/config
│   │   ├── service.js              # requests (POST/GET) + validações (status, contrato)
│   │   └── utils.js                # geração de massa (fakers)
│   ├── keywords/                   # equiv. a resources/keywords — funções de domínio
│   │   ├── account_keywords.js
│   │   ├── token_keywords.js
│   │   └── books_keywords.js
│   ├── variables/                  # equiv. a resources/variables
│   │   ├── service_variables.js    # status codes
│   │   ├── account_variables.js    # dados/mensagens de erro
│   │   └── books_variables.js
│   ├── enviroments/                # equiv. a resources/enviroments
│   │   ├── env.js                  # controle de ambiente + baseUrl
│   │   └── endpoints.js            # endpoints da API
│   └── schemas/                    # equiv. a resources/schemas — JSON Schemas de contrato
│       ├── user-success.schema.json
│       ├── token-success.schema.json
│       ├── token-failed.schema.json
│       ├── books-list.schema.json
│       ├── rent-success.schema.json
│       ├── user-details.schema.json
│       └── error.schema.json
├── fixtures/                       # payloads base (equiv. a fixtures/*.json)
│   ├── user_fixture.json
│   └── rent_fixture.json
└── support/
    └── e2e.js                      # carrega o plugin do Allure
```

A config dedicada fica em `cypress.config.api.js` (na raiz do projeto), que usa o mesmo
preprocessor Cucumber + esbuild da suíte de UI, mas aponta o `specPattern` para
`api-tests/features/**/*.feature`. Os step definitions de API são registrados em
`.cypress-cucumber-preprocessorrc.json`.

## ▶️ Como executar

A partir da **raiz do projeto** (`accenture-demo-qa/`):

```bash
# roda toda a suíte de API (headless) gerando resultados do Allure
npm run api:run

# abre o runner interativo da suíte de API
npm run api:open
```

Relatório Allure (os resultados vão para `allure-results/` na raiz):

```bash
npm run allure:generate
npm run allure:open
```

## 🔎 Decisões e aprendizados (comportamento real da API)

- **Validação de contrato:** usamos **Ajv** (`resources/config/service.js` → `validateContract`),
  equivalente ao `Validate Jsonschema From File` do Robot.
- **`Authorized` depende do token:** descobri (validando direto na API) que um usuário recém-criado
  retorna `authorized = false` e só passa a `true` **depois** de gerar um token. Por isso o
  CT-104 gera o token antes de confirmar a autorização, e o CT-106 documenta o `false` prévio.
- **Contratos confirmados na API real** (não por suposição):
  - Create User → `201 {userID, username, books}`
  - GenerateToken → `200 {token, expires, status:"Success", result:"User authorized successfully."}`
  - Authorized → `200 true|false` (boolean puro)
  - Rent → `201 {books:[{isbn}]}`
  - Erros → `{code, message}` (ex.: `1204 User exists!`, `1207 User not found!`, `1300` senha fraca)
