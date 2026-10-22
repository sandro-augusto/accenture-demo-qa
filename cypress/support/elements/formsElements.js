export const FORMS = {
  // Endpoint relativo (baseUrl definida no cypress.config.js)
  url: "/forms",

  // Campos do Practice Form
  titulo: ".main-header",
  primeiroNome: "#firstName",
  ultimoNome: "#lastName",
  email: "#userEmail",
  generoMasculino: 'label[for="gender-radio-1"]',
  generoFeminino: 'label[for="gender-radio-2"]',
  generoOutro: 'label[for="gender-radio-3"]',
  celular: "#userNumber",
  materiasInput: "#subjectsInput",
  materiasMenu: ".subjects-auto-complete__menu",
  hobbyEsportes: 'label[for="hobbies-checkbox-1"]',
  hobbyLeitura: 'label[for="hobbies-checkbox-2"]',
  hobbyMusica: 'label[for="hobbies-checkbox-3"]',
  uploadFoto: "#uploadPicture",
  enderecoAtual: "#currentAddress",
  botaoEnviar: "#submit",

  // Modal de confirmacao
  modal: ".modal-content",
  modalTitulo: "#example-modal-sizes-title-lg",
};
