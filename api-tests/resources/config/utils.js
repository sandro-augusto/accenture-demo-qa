// Geracao de massa de dados (espelha resources/config/utils.resource -> Fakers)
const { faker } = require("@faker-js/faker");

function fakers() {
  const randomNumber = faker.string.numeric(10);
  return {
    // Usuario aleatorio para evitar colisao de "User exists!"
    fakeUserName: `qauser_${randomNumber}`,
    // Senha valida conforme a politica do DemoQA
    // (maiuscula, minuscula, digito, caractere especial, min. 8 chars)
    fakePassword: "Senha@123",
  };
}

module.exports = { fakers };
