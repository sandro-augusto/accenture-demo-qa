/// <reference types="cypress" />
import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";

const { statusCode } = require("../variables/service_variables");
const { accountVariables } = require("../variables/account_variables");
const { booksVariables } = require("../variables/books_variables");
const { fakers } = require("../config/utils");
const { validateStatusCode, validateContract } = require("../config/service");
const account = require("../keywords/account_keywords");
const token = require("../keywords/token_keywords");
const books = require("../keywords/books_keywords");

// Schemas por nome (equivalente as variaveis ${SchemaXxx} do projeto Robot)
const schemas = {
  "user-success": require("../schemas/user-success.schema.json"),
  "token-success": require("../schemas/token-success.schema.json"),
  "token-failed": require("../schemas/token-failed.schema.json"),
  "books-list": require("../schemas/books-list.schema.json"),
  "rent-success": require("../schemas/rent-success.schema.json"),
  "user-details": require("../schemas/user-details.schema.json"),
  error: require("../schemas/error.schema.json"),
};

// Contexto compartilhado entre os steps de um cenario.
// Reiniciado a cada cenario para evitar vazamento de estado.
let ctx = {};

// Usuarios criados no cenario atual, para serem excluidos no teardown
// (cada teste cria o seu usuario e o apaga no fim -> independente e sem lixo).
let usuariosCriados = [];

function reset() {
  ctx = {
    userName: null,
    password: null,
    userId: null,
    token: null,
    booksList: [],
    response: null,
  };
  usuariosCriados = [];
}

reset();
beforeEach(() => reset());

// Registra um usuario criado com sucesso para limpeza posterior
function registrarUsuario(userId, userName, password) {
  if (userId) {
    usuariosCriados.push({ userId, userName, password });
  }
}

// Teardown: exclui todos os usuarios criados no cenario.
// Gera um token valido para cada um (o DELETE exige Authorization) e,
// em seguida, chama o endpoint de exclusao. Nao falha o cenario se a
// limpeza der erro (ex.: usuario invalido que nunca chegou a ser criado).
After(() => {
  usuariosCriados.forEach(({ userId, userName, password }) => {
    token.generateAccessToken(userName, password).then((resToken) => {
      const tk = resToken.body && resToken.body.token;
      if (tk) {
        account.deleteUser(userId, tk);
      }
    });
  });
});

// Helper: guarda a ultima resposta no contexto
function store(res) {
  ctx.response = res;
  return res;
}

// =========================================================
// GIVEN / WHEN - acoes
// =========================================================

Given("que eu crio um usuario valido", () => {
  const { fakeUserName, fakePassword } = fakers();
  ctx.userName = fakeUserName;
  ctx.password = fakePassword;
  account.createUserFlow(ctx.userName, ctx.password).then((res) => {
    store(res);
    if (res.body && res.body.userID) {
      ctx.userId = res.body.userID;
      // registra para exclusao no teardown
      registrarUsuario(ctx.userId, ctx.userName, ctx.password);
    }
  });
});

Given("que eu crio um usuario com senha fraca", () => {
  const { fakeUserName } = fakers();
  ctx.userName = fakeUserName;
  account
    .createUserFlow(ctx.userName, accountVariables.weakPassword)
    .then(store);
});

Given("que eu crio um usuario com userName vazio", () => {
  const { fakePassword } = fakers();
  account.createUserFlow(accountVariables.emptyValue, fakePassword).then(store);
});

Given("que eu crio um usuario com password vazio", () => {
  const { fakeUserName } = fakers();
  account.createUserFlow(fakeUserName, accountVariables.emptyValue).then(store);
});

When("eu tento criar o mesmo usuario novamente", () => {
  account.createUserFlow(ctx.userName, ctx.password).then(store);
});

When("eu gero um token de acesso para o usuario criado", () => {
  token.generateAccessToken(ctx.userName, ctx.password).then((res) => {
    store(res);
    if (res.body && res.body.token) ctx.token = res.body.token;
  });
});

When("eu gero um token para um usuario inexistente", () => {
  token
    .generateAccessToken(accountVariables.nonExistentUser, accountVariables.wrongPassword)
    .then(store);
});

When("eu gero um token com senha incorreta", () => {
  token
    .generateAccessToken(ctx.userName, accountVariables.wrongPassword)
    .then(store);
});

When("eu confirmo se o usuario esta autorizado", () => {
  account.confirmUserIsAuthorized(ctx.userName, ctx.password).then(store);
});

When("eu confirmo autorizacao de um usuario inexistente", () => {
  const { fakePassword } = fakers();
  account
    .confirmUserIsAuthorized(accountVariables.nonExistentUser, fakePassword)
    .then(store);
});

When("eu listo os livros disponiveis", () => {
  books.listAvailableBooks().then((res) => {
    store(res);
    ctx.booksList = res.body.books;
  });
});

When("eu alugo {int} livros para o usuario criado", (qtd) => {
  const isbns = books.selectIsbnsToRent(ctx.booksList, qtd);
  books.rentBooksFlow(ctx.userId, isbns, ctx.token).then(store);
});

When("eu tento alugar {int} livros sem token", (qtd) => {
  const isbns = books.selectIsbnsToRent(ctx.booksList, qtd);
  books.rentBooksFlow(ctx.userId, isbns, null).then(store);
});

When("eu tento alugar um livro com ISBN inexistente", () => {
  const isbns = [{ isbn: booksVariables.isbnInvalido }];
  books.rentBooksFlow(ctx.userId, isbns, ctx.token).then(store);
});

When("eu consulto os detalhes do usuario criado", () => {
  account.getUserDetails(ctx.userId, ctx.token).then(store);
});

// =========================================================
// THEN - validacoes
// =========================================================

Then("o status code deve ser {int}", (code) => {
  validateStatusCode(ctx.response, code);
});

Then("a resposta deve seguir o contrato {string}", (nomeSchema) => {
  validateContract(ctx.response, schemas[nomeSchema]);
});

Then("a resposta de criacao deve conter o usuario criado", () => {
  account.validateUserCreatedResponse(ctx.response, ctx.userName);
});

Then("o token deve ser gerado com sucesso", () => {
  token.validateTokenSuccessResponse(ctx.response);
});

Then("o token deve falhar com a mensagem de autorizacao negada", () => {
  token.validateTokenFailedResponse(ctx.response);
});

Then("o usuario deve estar autorizado", () => {
  account.validateAuthorizedIsTrue(ctx.response);
});

Then("o usuario nao deve estar autorizado", () => {
  expect(ctx.response.body, "authorized antes do token").to.eq(false);
});

Then("a lista de livros nao deve estar vazia", () => {
  books.validateBooksListIsNotEmpty(ctx.response);
});

Then("a resposta deve conter {int} livros alugados", (qtd) => {
  books.validateRentedBooksResponse(ctx.response, qtd);
});

Then("os detalhes devem conter o usuario criado com {int} livros", (qtd) => {
  account.validateUserDetailsResponse(ctx.response, ctx.userName, qtd);
});

Then(
  "a resposta de erro deve ter code {string} e message {string}",
  (code, message) => {
    account.validateErrorResponse(ctx.response, code, message);
  }
);

Then("a resposta de erro deve ter code {string}", (code) => {
  expect(ctx.response.body.code, "code").to.eq(code);
});

// Mensagens de erro conhecidas, referenciadas por uma chave legivel no Gherkin,
// para nao poluir a feature com textos longos (ex.: regra de senha).
const mensagensErro = {
  "senha-fraca": {
    code: accountVariables.codeWeakPassword,
    message: accountVariables.msgWeakPassword,
  },
  "campos-obrigatorios": {
    code: accountVariables.codeRequiredFields,
    message: accountVariables.msgRequiredFields,
  },
  "usuario-existente": {
    code: accountVariables.codeUserExists,
    message: accountVariables.msgUserExists,
  },
  "usuario-nao-encontrado": {
    code: accountVariables.codeUserNotFound,
    message: accountVariables.msgUserNotFound,
  },
  "isbn-invalido": {
    code: booksVariables.codeIsbnInvalido,
    message: booksVariables.msgIsbnInvalido,
  },
};

Then("a resposta de erro deve corresponder a {string}", (chave) => {
  const esperado = mensagensErro[chave];
  expect(esperado, `mensagem de erro mapeada para "${chave}"`).to.not.be
    .undefined;
  account.validateErrorResponse(ctx.response, esperado.code, esperado.message);
});
