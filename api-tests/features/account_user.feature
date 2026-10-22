# language: pt
Funcionalidade: BookStore API - Criacao de Usuario
  Cenarios de criacao de usuario (Account/v1/User), positivos e negativos,
  com validacao de contrato e das mensagens de erro.

  Cenario: CT-001 Criar usuario com sucesso
    Dado que eu crio um usuario valido
    Entao o status code deve ser 201
    E a resposta deve seguir o contrato "user-success"
    E a resposta de criacao deve conter o usuario criado

  Cenario: CT-002 Nao criar usuario ja existente
    Dado que eu crio um usuario valido
    Quando eu tento criar o mesmo usuario novamente
    Entao o status code deve ser 406
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "usuario-existente"

  Cenario: CT-003 Nao criar usuario com senha fraca
    Dado que eu crio um usuario com senha fraca
    Entao o status code deve ser 400
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "senha-fraca"

  Cenario: CT-004 Nao criar usuario com userName vazio
    Dado que eu crio um usuario com userName vazio
    Entao o status code deve ser 400
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "campos-obrigatorios"

  Cenario: CT-005 Nao criar usuario com password vazio
    Dado que eu crio um usuario com password vazio
    Entao o status code deve ser 400
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "campos-obrigatorios"
