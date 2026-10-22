import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import progressBar from "../../support/pages/progressBarPage";

// Steps especificos do fluxo Progress Bar.
// Os steps de acessar a home, selecionar o card e clicar no submenu
// estao em common_steps.js.

When("clico no botao Start da progress bar", () => {
  progressBar.validarPagina();
  progressBar.clicarStartStop();
});

When("paro a barra antes de atingir {int}%", (limite) => {
  progressBar.pararAntesDe(limite);
});

Then("o valor da progress bar deve ser menor ou igual a {int}", (limite) => {
  progressBar.validarValorMenorOuIgual(limite);
});

When("inicio novamente e a barra chega aos {int}%", () => {
  progressBar.aguardarCemPorCento();
});

When("reseto a progress bar", () => {
  progressBar.resetar();
});

Then("a progress bar deve ser resetada", () => {
  progressBar.validarResetada();
});
