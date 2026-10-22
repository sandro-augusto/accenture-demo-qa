let el = require("../elements/homeElements").HOME;
const { carregarPagina, clicarPorTexto, aguardarElemento } = require("../actions");

export default {
  acessarHome() {
    carregarPagina(el.url);
  },

  validarHome() {
    return aguardarElemento(el.cards);
  },

  // Clica em um card da pagina inicial (Elements, Forms, Alerts..., etc.)
  clicarNoCard(nomeCard) {
    clicarPorTexto(el.cards, nomeCard);
  },

  // Clica em um item do menu lateral (submenu) pelo texto.
  // A estrutura ".menu-list span.text" e comum a todos os grupos do DemoQA.
  clicarNoSubmenu(nomeSubmenu) {
    clicarPorTexto(el.submenu, nomeSubmenu);
  },
};
