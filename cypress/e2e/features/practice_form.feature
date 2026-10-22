# language: pt
Funcionalidade: DemoQA - Practice Form
  Como um usuario do DemoQA
  Quero preencher o formulario de cadastro com valores aleatorios
  Para garantir que o envio exibe o popup de confirmacao

  Cenario: Preencher e enviar o Practice Form com valores aleatorios
    Dado que acesso a pagina inicial do DemoQA
    Quando seleciono a opcao "Forms" na pagina inicial
    E clico no submenu "Practice Form"
    E preencho todo o formulario com valores aleatorios
    E anexo o arquivo "upload.txt"
    E submeto o formulario
    Entao o popup de confirmacao deve ser exibido
    E fecho o popup
