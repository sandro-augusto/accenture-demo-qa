// Configuracao dedicada da suite de testes de API (api-tests/).
// Usa Cucumber (BDD/Gherkin) + esbuild, assim como a suite de UI.
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    specPattern: "api-tests/features/**/*.feature",
    supportFile: "api-tests/support/e2e.js",
    fixturesFolder: "api-tests/fixtures",
    video: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      allureWriter(on, config);
      return config;
    },
  },
});
