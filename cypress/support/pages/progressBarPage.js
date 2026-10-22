let el = require("../elements/progressBarElements").PROGRESS_BAR;
const {
  clicarForcado,
  aguardarElemento,
  validarVisivel,
  validarNaoExiste,
} = require("../actions");

function valorAtual($barra) {
  return parseInt($barra.attr("aria-valuenow"), 10);
}

export default {
  validarPagina() {
    aguardarElemento(el.botaoStartStop);
  },

  clicarStartStop() {
    clicarForcado(el.botaoStartStop);
  },

  // Para numa faixa com folga (abaixo da metade do limite) para absorver a
  // latencia ate o clique de Stop e garantir que o valor final nao ultrapasse.
  pararAntesDe(limite) {
    const minimo = 5;
    const alvoMaximo = Math.floor(limite / 2);
    cy.get(el.barra, { timeout: 15000 }).should(($barra) => {
      const valor = valorAtual($barra);
      expect(valor).to.be.gte(minimo);
      expect(valor).to.be.lt(alvoMaximo);
    });
    this.clicarStartStop();
  },

  validarValorMenorOuIgual(limite) {
    cy.get(el.barra).then(($barra) => {
      const valor = valorAtual($barra);
      expect(valor, "valor da progress bar").to.be.lte(limite);
    });
  },

  aguardarCemPorCento() {
    this.clicarStartStop();
    cy.get(el.barra, { timeout: 20000 }).should(($barra) => {
      expect(valorAtual($barra)).to.eq(100);
    });
  },

  resetar() {
    validarVisivel(el.botaoReset);
    clicarForcado(el.botaoReset);
  },

  // No DemoQA o Reset zera e reinicia a contagem automaticamente: o botao
  // "Reset" some e o valor sai de 100. Validamos exatamente isso.
  validarResetada() {
    validarNaoExiste(el.botaoReset);
    cy.get(el.barra).should(($barra) => {
      expect(valorAtual($barra), "valor da progress bar apos reset").to.be.lessThan(100);
    });
  },
};
