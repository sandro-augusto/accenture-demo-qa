// Keywords do dominio BookStore (espelha resources/keywords)
const { headersJson, sendPost, sendGet } = require("../config/service");
const { endpoints } = require("../enviroments/endpoints");
const rentFixture = require("../../fixtures/rent_fixture.json");

// Lista os livros disponiveis
function listAvailableBooks() {
  return sendGet(endpoints.books, headersJson());
}

// Seleciona os primeiros N ISBNs da lista para alugar
function selectIsbnsToRent(booksList, qtd) {
  return booksList.slice(0, qtd).map((b) => ({ isbn: b.isbn }));
}

// Aluga os livros informados
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
