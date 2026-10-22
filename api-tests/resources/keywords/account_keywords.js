// Keywords do dominio Account (funcoes de dominio reutilizadas pelos steps)
const {
  headersJson,
  sendPost,
  sendGet,
  sendDelete,
} = require("../config/service");
const { endpoints } = require("../enviroments/endpoints");
const userFixture = require("../../fixtures/user_fixture.json");

// Cria um usuario (permite sobrescrever userName/password p/ cenarios alternativos)
function createUserFlow(userName, password) {
  const body = { ...userFixture, userName, password };
  return sendPost(endpoints.createUser, body, headersJson());
}

// Confirma autorizacao do usuario
function confirmUserIsAuthorized(userName, password) {
  return sendPost(endpoints.authorized, { userName, password }, headersJson());
}

// Consulta detalhes do usuario (requer token)
function getUserDetails(userId, token) {
  return sendGet(`${endpoints.userDetails}/${userId}`, headersJson(token));
}

// Exclui um usuario (requer token). Usado no teardown para nao sujar a base.
function deleteUser(userId, token) {
  return sendDelete(`${endpoints.deleteUser}/${userId}`, headersJson(token));
}

// --- Validacoes de resposta ---
function validateUserCreatedResponse(response, expectedUserName) {
  expect(response.body.username, "username").to.eq(expectedUserName);
  expect(response.body.userID, "userID").to.not.be.empty;
}

function validateAuthorizedIsTrue(response) {
  expect(response.body, "authorized").to.eq(true);
}

function validateUserDetailsResponse(response, expectedUserName, qtdLivros) {
  expect(response.body.username, "username").to.eq(expectedUserName);
  expect(response.body.books, "quantidade de livros").to.have.length(qtdLivros);
}

function validateErrorResponse(response, code, message) {
  expect(response.body.code, "code").to.eq(code);
  expect(response.body.message, "message").to.eq(message);
}

module.exports = {
  createUserFlow,
  confirmUserIsAuthorized,
  getUserDetails,
  deleteUser,
  validateUserCreatedResponse,
  validateAuthorizedIsTrue,
  validateUserDetailsResponse,
  validateErrorResponse,
};
