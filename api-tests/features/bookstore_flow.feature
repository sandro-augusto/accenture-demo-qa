# language: pt
Funcionalidade: BookStore API - Fluxo Completo (E2E)
  Como consumidor da API do DemoQA
  Quero criar um usuario, autenticar, alugar livros e consultar meus dados
  Para validar o fluxo completo do desafio BookStore

  Cenario: Criar usuario, autenticar, alugar dois livros e validar os detalhes
    Dado que eu crio um usuario valido
    Entao o status code deve ser 201
    E a resposta deve seguir o contrato "user-success"
    E a resposta de criacao deve conter o usuario criado

    Quando eu gero um token de acesso para o usuario criado
    Entao o status code deve ser 200
    E a resposta deve seguir o contrato "token-success"
    E o token deve ser gerado com sucesso

    Quando eu confirmo se o usuario esta autorizado
    Entao o status code deve ser 200
    E o usuario deve estar autorizado

    Quando eu listo os livros disponiveis
    Entao o status code deve ser 200
    E a resposta deve seguir o contrato "books-list"
    E a lista de livros nao deve estar vazia

    Quando eu alugo 2 livros para o usuario criado
    Entao o status code deve ser 201
    E a resposta deve seguir o contrato "rent-success"
    E a resposta deve conter 2 livros alugados

    Quando eu consulto os detalhes do usuario criado
    Entao o status code deve ser 200
    E a resposta deve seguir o contrato "user-details"
    E os detalhes devem conter o usuario criado com 2 livros
