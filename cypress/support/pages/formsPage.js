let el = require("../elements/formsElements").FORMS;
const {
  preencher,
  clicarForcado,
  pressionarTecla,
  anexarArquivoForcado,
  obterTexto,
  aguardarElemento,
  validarNaoExiste,
  selecionarAutocomplete,
} = require("../actions");

export default {
  preencherNome(primeiroNome, ultimoNome) {
    preencher(el.primeiroNome, primeiroNome);
    preencher(el.ultimoNome, ultimoNome);
  },

  preencherEmail(email) {
    preencher(el.email, email);
  },

  selecionarGenero(genero) {
    switch (genero) {
      case "Masculino":
        clicarForcado(el.generoMasculino);
        break;
      case "Feminino":
        clicarForcado(el.generoFeminino);
        break;
      default:
        clicarForcado(el.generoOutro);
    }
  },

  preencherCelular(celular) {
    preencher(el.celular, celular);
  },

  preencherMateria(materia) {
    selecionarAutocomplete(el.materiasInput, el.materiasMenu, materia);
  },

  selecionarHobby(hobby) {
    switch (hobby) {
      case "Esportes":
        clicarForcado(el.hobbyEsportes);
        break;
      case "Leitura":
        clicarForcado(el.hobbyLeitura);
        break;
      default:
        clicarForcado(el.hobbyMusica);
    }
  },

  // Upload de um arquivo .txt presente em cypress/fixtures
  anexarArquivo(nomeArquivo) {
    anexarArquivoForcado(el.uploadFoto, `cypress/fixtures/${nomeArquivo}`);
  },

  preencherEndereco(endereco) {
    preencher(el.enderecoAtual, endereco);
  },

  enviarFormulario() {
    clicarForcado(el.botaoEnviar);
  },

  validarModalAberto() {
    aguardarElemento(el.modal);
    return obterTexto(el.modalTitulo);
  },

  fecharModal() {
    // Fecha o modal via tecla ESC. No DemoQA headless, o clique no botao
    // de fechar nao dispara o handler por causa de iframes sobrepostos,
    // mas o react-bootstrap fecha o modal ao receber a tecla ESC.
    pressionarTecla("body", "{esc}");
    validarNaoExiste(el.modal);
  },
};
