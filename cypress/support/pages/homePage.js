let el = require("../elements/homeElements").HOME;
const { carregarPagina, clicarPorTexto, aguardarElemento } = require("../actions");

export default {
  acessarHome() {
    carregarPagina(el.url);
  },

  validarHome() {
    return aguardarElemento(el.cards);
  },

  clicarNoCard(nomeCard) {
    clicarPorTexto(el.cards, nomeCard);
  },

  clicarNoSubmenu(nomeSubmenu) {
    clicarPorTexto(el.submenu, nomeSubmenu);
  },
};
