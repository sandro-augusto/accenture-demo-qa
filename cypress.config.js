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
    specPattern: "cypress/e2e/features/**/*.feature",
    viewportWidth: 1920,
    viewportHeight: 1080,
    scrollBehavior: false,
    chromeWebSecurity: false,
    video: false,
    downloads: false,
    async setupNodeEvents(on, config) {
      // Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // Bundle .feature files with esbuild
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Allure reporter
      allureWriter(on, config);

      return config;
    },
  },
});
