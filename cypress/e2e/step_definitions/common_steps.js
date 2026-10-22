import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import home from "../../support/pages/homePage";

// Steps compartilhados entre os fluxos do DemoQA

Given("que acesso a pagina inicial do DemoQA", () => {
  home.acessarHome();
  home.validarHome();
});

When("seleciono a opcao {string} na pagina inicial", (card) => {
  home.clicarNoCard(card);
});

When("clico no submenu {string}", (submenu) => {
  home.clicarNoSubmenu(submenu);
});
