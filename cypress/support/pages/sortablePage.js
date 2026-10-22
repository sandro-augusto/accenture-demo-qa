let el = require("../elements/sortableElements").SORTABLE;
const { aguardarElemento } = require("../actions");

// Ordem crescente esperada dos itens do Sortable do DemoQA
const ORDEM_CRESCENTE = ["One", "Two", "Three", "Four", "Five", "Six"];

// Pausa (ms) entre as acoes de drag, para visualizacao no runner.
// Ajustavel: aumente para ver mais devagar, diminua para rodar mais rapido.
const PAUSA_VISUAL = 600;

function lerOrdem() {
  return cy
    .get(el.itensLista)
    .then(($els) => Cypress._.map($els, (e) => e.textContent.trim()));
}

// Arrasta o item que esta no indice "de" para o indice "para" usando
// eventos de mouse reais (cypress-real-events). Os movimentos iniciais sao
// disparados DENTRO do proprio item para ativar o drag do react-sortable-hoc.
// Reorganiza relendo as coordenadas reais dos elementos no momento do drag.
function arrastar(de, para) {
  if (de === para) return;
  cy.get(el.itensLista).eq(de).then(($src) => {
    const s = $src[0].getBoundingClientRect();
    cy.get(el.itensLista).eq(para).then(($tgt) => {
      const t = $tgt[0].getBoundingClientRect();
      const sx = Math.round(s.x + s.width / 2);
      const sy = Math.round(s.y + s.height / 2);
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
      cy.wait(PAUSA_VISUAL);
    });
  });
}

export default {
  validarPagina() {
    aguardarElemento(el.itensLista);
  },

  lerOrdem,

  // Embaralha a lista movendo alguns itens, para sair da ordem crescente
  // em que o DemoQA entrega a pagina. Assim o passo de ordenacao tem efeito
  // visivel e real.
  embaralhar() {
    arrastar(0, 5); // move o primeiro item para o fim
    arrastar(0, 3); // move o (novo) primeiro item para o meio
    arrastar(1, 4); // mais uma troca para desordenar
  },

  // Ordena a lista em ordem crescente via trocas adjacentes (bubble sort).
  // A cada passo move um item apenas uma posicao (troca com o vizinho),
  // relendo o DOM entre as trocas. Isso evita o controle fino de "pular N
  // posicoes de uma vez", que e instavel no react-sortable-hoc, e torna o
  // drag confiavel e visivel. Combinado com embaralhar(), o fluxo demonstra
  // o drag and drop de verdade: desordena a lista e a reordena para crescente.
  ordenarCrescente() {
    const n = ORDEM_CRESCENTE.length;
    for (let passada = 0; passada < n - 1; passada++) {
      for (let i = 0; i < n - 1; i++) {
        lerOrdem().then((atual) => {
          const atualIdx = ORDEM_CRESCENTE.indexOf(atual[i]);
          const proxIdx = ORDEM_CRESCENTE.indexOf(atual[i + 1]);
          // Se o item atual "vale mais" que o proximo, troca os dois
          if (atualIdx > proxIdx) {
            arrastar(i, i + 1);
          }
        });
      }
    }
  },

  validarOrdemCrescente() {
    lerOrdem().then((atual) => {
      expect(atual, "ordem dos itens do Sortable").to.deep.eq(ORDEM_CRESCENTE);
    });
  },
};
