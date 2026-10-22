import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import browserWindows from "../../support/pages/browserWindowsPage";

// Steps especificos do fluxo Browser Windows.
// Os steps de acessar a home, selecionar o card e clicar no submenu
// estao em common_steps.js.

When("clico no botao New Window", () => {
  browserWindows.validarPagina();
  // Intercepta window.open antes do clique para capturar a nova janela
  browserWindows.prepararCapturaDeJanela();
  browserWindows.clicarNovaJanela();
});

Then("uma nova janela deve ser aberta com a mensagem {string}", (mensagem) => {
  browserWindows.validarNovaJanela(mensagem);
});

Then("fecho a nova janela", () => {
  browserWindows.fecharNovaJanela();
});
