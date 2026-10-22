const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { env } = require("../enviroments/env");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

function headersJson(token) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "user-agent": env.agent,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function sendPost(endpoint, body, headers) {
  return cy.request({
    method: "POST",
    url: `${env.baseUrl}${endpoint}`,
    headers,
    body,
    failOnStatusCode: false,
  });
}

function sendGet(endpoint, headers) {
  return cy.request({
    method: "GET",
    url: `${env.baseUrl}${endpoint}`,
    headers,
    failOnStatusCode: false,
  });
}

function sendDelete(endpoint, headers) {
  return cy.request({
    method: "DELETE",
    url: `${env.baseUrl}${endpoint}`,
    headers,
    failOnStatusCode: false,
  });
}

function validateStatusCode(response, statusCode) {
  expect(response.status, "status code").to.eq(statusCode);
}

function validateContract(response, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(response.body);
  const erros = validate.errors
    ? JSON.stringify(validate.errors, null, 2)
    : "";
  expect(valid, `contrato (JSON Schema)\n${erros}`).to.be.true;
}

module.exports = {
  headersJson,
  sendPost,
  sendGet,
  sendDelete,
  validateStatusCode,
  validateContract,
};
