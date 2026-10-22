let el = require("../elements/browserWindowsElements").BROWSER_WINDOWS;
const {
  clicarForcado,
  aguardarElemento,
  carregarPagina,
  validarVisivel,
  obterTexto,
} = require("../actions");

const STUB_ALIAS = "windowOpen";

export default {
  // Confirma que a pagina Browser Windows carregou
  validarPagina() {
    aguardarElemento(el.botaoNovaJanela);
  },

  // Prepara um stub para capturar a chamada window.open,
  // ja que o Cypress nao controla multiplas janelas nativamente.
  prepararCapturaDeJanela() {
    cy.window().then((win) => {
      cy.stub(win, "open").as(STUB_ALIAS);
    });
  },

  // Clica no botao "New Window"
  clicarNovaJanela() {
    clicarForcado(el.botaoNovaJanela);
  },

  // Garante que uma nova janela foi solicitada (window.open chamado)
  // e abre a URL de amostra no mesmo contexto para validar o conteudo.
  validarNovaJanela(mensagemEsperada) {
    cy.get("@" + STUB_ALIAS).should("have.been.calledOnce");

    return cy.get("@" + STUB_ALIAS).then((stub) => {
      const urlAberta = stub.getCall(0).args[0];
      // Visita a URL que seria aberta na nova janela
      carregarPagina(urlAberta);
      validarVisivel(el.tituloPaginaAmostra);
      return obterTexto(el.tituloPaginaAmostra).then((texto) => {
        expect(texto.trim()).to.eq(mensagemEsperada);
      });
    });
  },

  // "Fecha" a janela de amostra retornando para a pagina Browser Windows
  fecharNovaJanela() {
    carregarPagina(el.url);
    aguardarElemento(el.botaoNovaJanela);
  },
};
