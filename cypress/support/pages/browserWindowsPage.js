let el = require("../elements/browserWindowsElements").BROWSER_WINDOWS;
const {
  clicarForcado,
  aguardarElemento,
  carregarPagina,
  obterTexto,
} = require("../actions");

const STUB_ALIAS = "windowOpen";

export default {
  validarPagina() {
    aguardarElemento(el.botaoNovaJanela);
  },

  // O Cypress nao controla multiplas janelas: fazemos stub de window.open
  // para capturar a URL que seria aberta na nova janela.
  prepararCapturaDeJanela() {
    cy.window().then((win) => {
      cy.stub(win, "open").as(STUB_ALIAS);
    });
  },

  clicarNovaJanela() {
    clicarForcado(el.botaoNovaJanela);
  },

  // Confirma que window.open foi chamado e abre a URL capturada no mesmo
  // contexto para validar o conteudo da pagina de amostra.
  validarNovaJanela(mensagemEsperada) {
    cy.get("@" + STUB_ALIAS).should("have.been.calledOnce");

    return cy.get("@" + STUB_ALIAS).then((stub) => {
      const urlAberta = stub.getCall(0).args[0];
      carregarPagina(urlAberta);
      aguardarElemento(el.tituloPaginaAmostra);
      return obterTexto(el.tituloPaginaAmostra).then((texto) => {
        expect(texto.trim()).to.eq(mensagemEsperada);
      });
    });
  },

  fecharNovaJanela() {
    carregarPagina(el.url);
    aguardarElemento(el.botaoNovaJanela);
  },
};
