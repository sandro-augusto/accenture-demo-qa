import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import forms from "../../support/pages/formsPage";
import { gerarDadosFormulario } from "../../support/utils";

// Steps especificos do fluxo Practice Form.
// Os steps de acessar a home, selecionar o card e clicar no submenu
// estao em common_steps.js.

When("preencho todo o formulario com valores aleatorios", () => {
  const dados = gerarDadosFormulario();
  cy.wrap(dados).as("dadosFormulario");

  forms.preencherNome(dados.primeiroNome, dados.ultimoNome);
  forms.preencherEmail(dados.email);
  forms.selecionarGenero(dados.genero);
  forms.preencherCelular(dados.celular);
  forms.preencherMateria(dados.materia);
  forms.selecionarHobby(dados.hobby);
  forms.preencherEndereco(dados.endereco);
});

When("anexo o arquivo {string}", (nomeArquivo) => {
  forms.anexarArquivo(nomeArquivo);
});

When("submeto o formulario", () => {
  forms.enviarFormulario();
});

Then("o popup de confirmacao deve ser exibido", () => {
  forms.validarModalAberto().then((titulo) => {
    expect(titulo.trim()).to.eq("Thanks for submitting the form");
  });
});

Then("fecho o popup", () => {
  forms.fecharModal();
});
