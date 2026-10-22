const booksVariables = {
  // Quantidade de livros a alugar no fluxo principal
  qtdLivrosAlugar: 2,

  // ISBN inexistente para cenario alternativo
  isbnInvalido: "0000000000000",

  // Erro esperado ao alugar ISBN inexistente
  codeIsbnInvalido: "1205",
  msgIsbnInvalido: "ISBN supplied is not available in Books Collection!",
};

module.exports = { booksVariables };
