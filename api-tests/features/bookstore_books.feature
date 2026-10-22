# language: pt
Funcionalidade: BookStore API - Livros
  Cenarios da BookStore (BookStore/v1/Books): listar e alugar livros,
  positivos e negativos, com validacao de contrato e mensagens de erro.

  Cenario: CT-201 Listar livros disponiveis
    Quando eu listo os livros disponiveis
    Entao o status code deve ser 200
    E a resposta deve seguir o contrato "books-list"
    E a lista de livros nao deve estar vazia

  Cenario: CT-202 Alugar dois livros com sucesso
    Dado que eu crio um usuario valido
    E eu gero um token de acesso para o usuario criado
    E eu listo os livros disponiveis
    Quando eu alugo 2 livros para o usuario criado
    Entao o status code deve ser 201
    E a resposta deve seguir o contrato "rent-success"
    E a resposta deve conter 2 livros alugados

  Cenario: CT-203 Nao alugar livros sem token
    Dado que eu crio um usuario valido
    E eu listo os livros disponiveis
    Quando eu tento alugar 2 livros sem token
    Entao o status code deve ser 401

  Cenario: CT-204 Nao alugar livro com ISBN inexistente
    Dado que eu crio um usuario valido
    E eu gero um token de acesso para o usuario criado
    Quando eu tento alugar um livro com ISBN inexistente
    Entao o status code deve ser 400
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "isbn-invalido"
