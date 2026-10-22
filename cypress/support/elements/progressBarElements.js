export const PROGRESS_BAR = {
  // Endpoint relativo (baseUrl definida no cypress.config.js)
  url: "/progress-bar",

  // Botao que inicia/para a progress bar (muda de rotulo)
  botaoStartStop: "#startStopButton",
  // Botao de reset, exibido somente ao atingir 100%
  botaoReset: "#resetButton",
  // Barra de progresso (o valor fica em aria-valuenow e no texto)
  barra: ".progress-bar",
};
