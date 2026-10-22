// Keywords do dominio Token (espelha resources/keywords/token_keywords.resource)
const { headersJson, sendPost } = require("../config/service");
const { endpoints } = require("../enviroments/endpoints");
const { accountVariables } = require("../variables/account_variables");

// Gera um token de acesso
function generateAccessToken(userName, password) {
  return sendPost(
    endpoints.generateToken,
    { userName, password },
    headersJson()
  );
}

function validateTokenSuccessResponse(response) {
  expect(response.body.status, "status").to.eq(
    accountVariables.tokenStatusSuccess
  );
  expect(response.body.result, "result").to.eq(
    accountVariables.tokenResultSuccess
  );
  expect(response.body.token, "token").to.not.be.empty;
}

function validateTokenFailedResponse(response) {
  expect(response.body.status, "status").to.eq(
    accountVariables.tokenStatusFailed
  );
  expect(response.body.result, "result").to.eq(
    accountVariables.tokenResultFailed
  );
}

module.exports = {
  generateAccessToken,
  validateTokenSuccessResponse,
  validateTokenFailedResponse,
};
