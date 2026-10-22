import { faker } from "@faker-js/faker";

// Gera um conjunto completo de dados aleatorios para o Practice Form
export function gerarDadosFormulario() {
  const primeiroNome = faker.person.firstName();
  const ultimoNome = faker.person.lastName();
  const generos = ["Masculino", "Feminino", "Outro"];
  const hobbies = ["Esportes", "Leitura", "Musica"];

  return {
    primeiroNome,
    ultimoNome,
    email: faker.internet
      .email({ firstName: primeiroNome, lastName: ultimoNome })
      .toLowerCase(),
    genero: faker.helpers.arrayElement(generos),
    // Celular com exatamente 10 digitos (exigencia do DemoQA)
    celular: faker.string.numeric(10),
    endereco: faker.location.streetAddress(),
    hobby: faker.helpers.arrayElement(hobbies),
    // Materia valida do autocomplete do DemoQA
    materia: faker.helpers.arrayElement([
      "Maths",
      "Physics",
      "Chemistry",
      "English",
      "Computer Science",
      "Commerce",
    ]),
  };
}
