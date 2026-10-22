// Controle de ambiente
const ENV = "Prd";

const ENVIRONMENTS = {
  // DemoQA possui apenas um ambiente publico
  Prd: {
    baseUrl: "https://demoqa.com",
  },
};

const env = {
  ENV,
  baseUrl: ENVIRONMENTS[ENV].baseUrl,
  agent: "cypress-api-automation",
};

module.exports = { env };
