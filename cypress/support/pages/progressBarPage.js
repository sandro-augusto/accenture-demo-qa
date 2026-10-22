let el = require("../elements/progressBarElements").PROGRESS_BAR;
const {
  clicarForcado,
  aguardarElemento,
  validarVisivel,
  validarNaoExiste,
} = require("../actions");

// Le o valor atual da progress bar (aria-valuenow) como numero inteiro
function valorAtual($barra) {
  return parseInt($barra.attr("aria-valuenow"), 10);
}

export default {
  // Confirma que a pagina Progress Bar carregou
  validarPagina() {
    aguardarElemento(el.botaoStartStop);
  },

  // Clica em Start/Stop
  clicarStartStop() {
    clicarForcado(el.botaoStartStop);
  },

  // Aguarda a barra atingir uma faixa segura abaixo do "limite" e para.
  // Usa polling (retry do should) ate o valor entrar na faixa alvo e,
  // assim que entra, clica em Stop. A faixa alvo fica bem abaixo do
  // limite (margem de seguranca) para absorver a latencia ate o clique
  // e garantir que o valor final nunca ultrapasse o limite.
  pararAntesDe(limite) {
    const minimo = 5;
    // Para com folga: metade do limite (ex.: ~12 para limite 25)
    const alvoMaximo = Math.floor(limite / 2);
    cy.get(el.barra, { timeout: 15000 }).should(($barra) => {
      const valor = valorAtual($barra);
      expect(valor).to.be.gte(minimo);
      expect(valor).to.be.lt(alvoMaximo);
    });
    // Para imediatamente ao entrar na faixa
    this.clicarStartStop();
  },

  // Valida que o valor atual e menor ou igual ao limite informado
  validarValorMenorOuIgual(limite) {
    cy.get(el.barra).then(($barra) => {
      const valor = valorAtual($barra);
      expect(valor, "valor da progress bar").to.be.lte(limite);
    });
  },

  // Reinicia e aguarda a barra chegar a 100%
  aguardarCemPorCento() {
    this.clicarStartStop();
    cy.get(el.barra, { timeout: 20000 }).should(($barra) => {
      expect(valorAtual($barra)).to.eq(100);
    });
  },

  // Ao atingir 100%, o botao vira "Reset". Clica para resetar a barra.
  resetar() {
    validarVisivel(el.botaoReset);
    clicarForcado(el.botaoReset);
  },

  // Valida que a barra foi resetada. No DemoQA, o Reset zera a barra e
  // reinicia a contagem automaticamente, entao o botao "Reset" some
  // (volta a ser Start/Stop) e o valor sai de 100 (fica abaixo de 100).
  validarResetada() {
    validarNaoExiste(el.botaoReset);
    cy.get(el.barra).should(($barra) => {
      expect(valorAtual($barra), "valor da progress bar apos reset").to.be.lessThan(100);
    });
  },
};
