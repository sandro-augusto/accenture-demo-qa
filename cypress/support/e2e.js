// ***********************************************************
// Este arquivo support/e2e.js e processado e carregado
// automaticamente antes dos arquivos de teste.
// ***********************************************************

import "@shelex/cypress-allure-plugin";
import "cypress-real-events";

// Oculta o ruido de requisicoes XHR do command log
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none; }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style);
}

// O demoqa possui scripts de anuncios que podem lancar erros nao tratados.
// Impede que esses erros de terceiros quebrem os testes.
Cypress.on("uncaught:exception", () => false);

afterEach(() => {
  cy.screenshot({ capture: "runner" });
});
