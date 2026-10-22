const { headersJson, sendPost, sendGet } = require("../config/service");
const { endpoints } = require("../enviroments/endpoints");
const rentFixture = require("../../fixtures/rent_fixture.json");

function listAvailableBooks() {
  return sendGet(endpoints.books, headersJson());
}

function selectIsbnsToRent(booksList, qtd) {
  return booksList.slice(0, qtd).map((b) => ({ isbn: b.isbn }));
}

function rentBooksFlow(userId, isbns, token) {
  const body = { ...rentFixture, userId, collectionOfIsbns: isbns };
  return sendPost(endpoints.books, body, headersJson(token));
}

function validateBooksListIsNotEmpty(response) {
  expect(response.body.books, "lista de livros").to.not.be.empty;
}

function validateRentedBooksResponse(response, qtdEsperada) {
  expect(response.body.books, "livros alugados").to.have.length(qtdEsperada);
}

module.exports = {
  listAvailableBooks,
  selectIsbnsToRent,
  rentBooksFlow,
  validateBooksListIsNotEmpty,
  validateRentedBooksResponse,
};
