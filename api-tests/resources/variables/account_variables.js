// Variaveis do dominio Account (dados de teste, codigos e mensagens de erro)
const accountVariables = {
  // Dados de cenarios alternativos
  weakPassword: "123",
  nonExistentUser: "usuario_inexistente_999",
  wrongPassword: "SenhaErrada@999",
  emptyValue: "",

  // Codigos / mensagens de erro esperados
  codeUserExists: "1204",
  msgUserExists: "User exists!",
  codeWeakPassword: "1300",
  msgWeakPassword:
    "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
  codeRequiredFields: "1200",
  msgRequiredFields: "UserName and Password required.",
  codeUserNotFound: "1207",
  msgUserNotFound: "User not found!",

  // Resultados esperados do token
  tokenStatusSuccess: "Success",
  tokenResultSuccess: "User authorized successfully.",
  tokenStatusFailed: "Failed",
  tokenResultFailed: "User authorization failed.",
};

module.exports = { accountVariables };
