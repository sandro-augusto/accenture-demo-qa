const {
  headersJson,
  sendPost,
  sendGet,
  sendDelete,
} = require("../config/service");
const { endpoints } = require("../enviroments/endpoints");
const userFixture = require("../../fixtures/user_fixture.json");

function createUserFlow(userName, password) {
  const body = { ...userFixture, userName, password };
  return sendPost(endpoints.createUser, body, headersJson());
}

function confirmUserIsAuthorized(userName, password) {
  return sendPost(endpoints.authorized, { userName, password }, headersJson());
}

function getUserDetails(userId, token) {
  return sendGet(`${endpoints.userDetails}/${userId}`, headersJson(token));
}

// Usado no teardown para excluir o usuario criado e nao sujar a base.
function deleteUser(userId, token) {
  return sendDelete(`${endpoints.deleteUser}/${userId}`, headersJson(token));
}

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
