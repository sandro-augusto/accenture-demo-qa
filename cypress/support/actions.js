function aguardarElemento(el) {
  try {
    cy.log("Aguardando o elemento " + el + " ficar visivel");
    cy.get(el).should("be.visible");
    cy.log("Elemento encontrado: " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return aguardarElemento;
}

function carregarPagina(url) {
  try {
    cy.log(`Aguardando carregar ${url}`);
    cy.visit(url);
    cy.log("URL carregada: " + url);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return carregarPagina;
}

function preencher(el, texto) {
  aguardarElemento(el);
  try {
    cy.get(el).clear().type(texto);
    cy.log("Informacao preenchida no elemento " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return preencher;
}

function clicar(el) {
  aguardarElemento(el);
  try {
    cy.get(el).click();
    cy.log("Clique realizado no elemento " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return clicar;
}

// Clique forcado, util para elementos cobertos por banners/anuncios do DemoQA.
// Faz scroll ate o elemento e usa { force: true } para ignorar sobreposicoes.
function clicarForcado(el) {
  aguardarElemento(el);
  try {
    cy.get(el).scrollIntoView();
    cy.get(el).click({ force: true });
    cy.log("Clique forcado realizado no elemento " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return clicarForcado;
}

// Pressiona uma tecla em um elemento (ex.: "{esc}", "{enter}").
// Util para fechar modais do react-bootstrap no DemoQA, cujo botao de
// fechar fica atras de iframes de anuncios e nao recebe o clique.
function pressionarTecla(el, tecla) {
  try {
    cy.get(el).type(tecla);
    cy.log("Tecla " + tecla + " pressionada no elemento " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return pressionarTecla;
}

// Anexa um arquivo a um input file usando { force: true },
// pois o input costuma ficar oculto na pagina.
function anexarArquivoForcado(el, caminhoArquivo) {
  try {
    cy.get(el).selectFile(caminhoArquivo, { force: true });
    cy.log("Arquivo anexado no elemento " + el + ": " + caminhoArquivo);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return anexarArquivoForcado;
}

function clicarPorTexto(el, texto) {
  try {
    cy.contains(el, texto).should("be.visible").click({ force: true });
    cy.log("Clique no elemento " + el + " com o texto " + texto);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return clicarPorTexto;
}

function obterTexto(el) {
  aguardarElemento(el);
  let texto;
  try {
    texto = cy.get(el).invoke("text");
    cy.log("Elemento encontrado: " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return texto;
}

function validarVisivel(el) {
  try {
    cy.get(el).should("be.visible");
    cy.log("Elemento visivel: " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return validarVisivel;
}

function validarNaoExiste(el) {
  try {
    cy.get(el).should("not.exist");
    cy.log("Elemento nao existe mais: " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return validarNaoExiste;
}

function obterAtributo(el, atributo) {
  aguardarElemento(el);
  let valor;
  try {
    valor = cy.get(el).invoke("attr", atributo);
    cy.log("Atributo " + atributo + " obtido do elemento " + el);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return valor;
}

// Preenche um campo de autocomplete: digita o texto, aguarda o menu
// de sugestoes aparecer e confirma a selecao com Enter.
function selecionarAutocomplete(elInput, elMenu, texto) {
  aguardarElemento(elInput);
  try {
    cy.get(elInput).type(texto);
    cy.get(elMenu).should("be.visible");
    cy.get(elInput).type("{enter}");
    cy.log("Autocomplete " + elInput + " selecionado com: " + texto);
  } catch (error) {
    cy.log("Excecao capturada: " + error.message);
  }
  return selecionarAutocomplete;
}

module.exports = {
  aguardarElemento,
  carregarPagina,
  preencher,
  clicar,
  clicarForcado,
  pressionarTecla,
  anexarArquivoForcado,
  clicarPorTexto,
  obterTexto,
  obterAtributo,
  validarVisivel,
  validarNaoExiste,
  selecionarAutocomplete,
};
