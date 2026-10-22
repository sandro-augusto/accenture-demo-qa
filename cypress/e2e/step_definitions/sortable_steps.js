import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import sortable from "../../support/pages/sortablePage";

// Steps especificos do fluxo Sortable.
// Os steps de acessar a home, selecionar o card e clicar no submenu
// estao em common_steps.js.

When("coloco os elementos em ordem crescente via drag and drop", () => {
  sortable.validarPagina();
  sortable.ordenarCrescente();
});

Then("os elementos devem estar em ordem crescente", () => {
  sortable.validarOrdemCrescente();
});
