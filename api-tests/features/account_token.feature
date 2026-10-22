# language: pt
Funcionalidade: BookStore API - Token e Autorizacao
  Cenarios de geracao de token (Account/v1/GenerateToken) e autorizacao
  (Account/v1/Authorized), com validacao de contrato e mensagens de erro.

  Cenario: CT-101 Gerar token com credenciais validas
    Dado que eu crio um usuario valido
    Quando eu gero um token de acesso para o usuario criado
    Entao o status code deve ser 200
    E a resposta deve seguir o contrato "token-success"
    E o token deve ser gerado com sucesso

  Cenario: CT-102 Falhar token com usuario inexistente
    Quando eu gero um token para um usuario inexistente
    Entao o status code deve ser 200
    E a resposta deve seguir o contrato "token-failed"
    E o token deve falhar com a mensagem de autorizacao negada

  Cenario: CT-103 Falhar token com senha incorreta
    Dado que eu crio um usuario valido
    Quando eu gero um token com senha incorreta
    Entao o status code deve ser 200
    E o token deve falhar com a mensagem de autorizacao negada

  Cenario: CT-104 Confirmar usuario autorizado apos gerar token
    Dado que eu crio um usuario valido
    E eu gero um token de acesso para o usuario criado
    Quando eu confirmo se o usuario esta autorizado
    Entao o status code deve ser 200
    E o usuario deve estar autorizado

  Cenario: CT-105 Authorized com usuario inexistente
    Quando eu confirmo autorizacao de um usuario inexistente
    Entao o status code deve ser 404
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "usuario-nao-encontrado"

  Cenario: CT-106 Authorized retorna false antes de gerar token
    Dado que eu crio um usuario valido
    Quando eu confirmo se o usuario esta autorizado
    Entao o status code deve ser 200
    E o usuario nao deve estar autorizado
