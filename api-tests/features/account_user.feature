# language: pt
Funcionalidade: BookStore API - Criacao de Usuario
  Cenarios de criacao de usuario (Account/v1/User), positivos e negativos,
  com validacao de contrato e das mensagens de erro.

  Cenario: CT-001 Criar usuario com sucesso
    Dado que eu crio um usuario valido
    Entao o status code deve ser 201
    E a resposta deve seguir o contrato "user-success"
    E a resposta de criacao deve conter o usuario criado

  # Comportamento REAL da API: o DemoQA responde 406 para usuario duplicado.
  Cenario: CT-002 Nao criar usuario ja existente (comportamento real da API)
    Dado que eu crio um usuario valido
    Quando eu tento criar o mesmo usuario novamente
    Entao o status code deve ser 406
    E a resposta deve seguir o contrato "error"
    E a resposta de erro deve corresponder a "usuario-existente"

  # BUG CONHECIDO: pelo padrao REST, "recurso ja existe" deveria retornar 409 Conflict,
  # nao 406 (Not Acceptable). Este cenario afirma o status CORRETO e, por isso, FALHA de
  # proposito contra a API real - evidenciando que a automacao detecta a inconsistencia.
  @bug-conhecido
  Cenario: CT-002b Usuario duplicado deveria retornar 409 (Conflict) - FALHA ESPERADA
    Dado que eu crio um usuario valido
    Quando eu tento criar o mesmo usuario novamente
    Entao o status code deve ser 409

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
