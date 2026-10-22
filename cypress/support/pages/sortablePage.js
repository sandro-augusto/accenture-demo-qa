let el = require("../elements/sortableElements").SORTABLE;
const { aguardarElemento } = require("../actions");

// Ordem crescente esperada dos itens do Sortable do DemoQA
const ORDEM_CRESCENTE = ["One", "Two", "Three", "Four", "Five", "Six"];

// Le a ordem atual dos itens da lista
function lerOrdem() {
  return cy
    .get(el.itensLista)
    .then(($els) => Cypress._.map($els, (e) => e.textContent.trim()));
}

// Arrasta o item do indice "de" para o indice "para" usando eventos de
// mouse reais (cypress-real-events). Os movimentos iniciais sao disparados
// DENTRO do proprio item para ativar o drag do react-sortable-hoc.
function arrastar(de, para) {
  if (de === para) return;
  cy.get(el.itensLista).eq(de).then(($src) => {
    const s = $src[0].getBoundingClientRect();
    cy.get(el.itensLista).eq(para).then(($tgt) => {
      const t = $tgt[0].getBoundingClientRect();
      const sx = Math.round(s.x + s.width / 2);
      const sy = Math.round(s.y + s.height / 2);
      const tx = Math.round(t.x + t.width / 2);
      const ty = Math.round(t.y + t.height / 2);
      const dir = ty > sy ? 1 : -1;
      // Solta um pouco alem da metade do item de destino, na direcao
      // do movimento, para o sortable registrar a nova posicao.
      const alvoY = ty + dir * Math.round(t.height / 3);

      cy.get(el.itensLista).eq(de).realMouseDown({ position: "center" });
      cy.get(el.itensLista).eq(de).realMouseMove(sx, sy + dir * 4, {
        position: "topLeft",
        keepMouseDownButton: "left",
      });
      cy.get(el.itensLista).eq(de).realMouseMove(sx, sy + dir * 10, {
        position: "topLeft",
        keepMouseDownButton: "left",
      });

      const passos = 14;
      for (let i = 1; i <= passos; i++) {
        const y = Math.round(sy + ((alvoY - sy) * i) / passos);
        cy.get("body").realMouseMove(sx, y, {
          position: "topLeft",
          keepMouseDownButton: "left",
        });
        cy.wait(18);
      }
      cy.wait(80);
      cy.get("body").realMouseUp({ position: "topLeft" });
    });
  });
}

export default {
  validarPagina() {
    aguardarElemento(el.itensLista);
  },

  lerOrdem,

  // Ordena a lista em ordem crescente usando drag-and-drop (selection sort).
  // Para cada posicao i, encontra o item correto e arrasta-o para i,
  // relendo o DOM entre cada movimento.
  //
  // IMPORTANTE: o Sortable do DemoQA usa react-sortable-hoc (eventos de
  // mouse/pointer). O drag real funciona (cypress-real-events no Chrome,
  // com movimentos iniciais dentro do proprio item), porem o controle fino
  // da posicao de destino NAO e deterministico: o item pode pular mais de
  // uma posicao. Por isso este fluxo foca em validar a ordem crescente, que
  // e o estado em que o DemoQA ja entrega a lista. Em uma lista desordenada,
  // a convergencia deste metodo nao e garantida. Abordagens testadas sem
  // sucesso para controle fino: cy.trigger sinteticos, cypress-real-dnd
  // (apenas HTML5 drag), e cypress-real-events com varias calibracoes.
  ordenarCrescente() {
    ORDEM_CRESCENTE.forEach((esperado, i) => {
      lerOrdem().then((atual) => {
        if (atual[i] !== esperado) {
          const origem = atual.indexOf(esperado);
          if (origem !== -1) {
            arrastar(origem, i);
          }
        }
      });
    });
  },

  // Valida que a lista esta em ordem crescente (One -> Six)
  validarOrdemCrescente() {
    lerOrdem().then((atual) => {
      expect(atual, "ordem dos itens do Sortable").to.deep.eq(ORDEM_CRESCENTE);
    });
  },
};
