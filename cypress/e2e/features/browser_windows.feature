# language: pt
Funcionalidade: DemoQA - Browser Windows
  Como um usuario do DemoQA
  Quero abrir uma nova janela a partir da pagina Browser Windows
  Para garantir que a janela exibe a mensagem de amostra esperada

  Cenario: Abrir uma nova janela e validar a mensagem de amostra
    Dado que acesso a pagina inicial do DemoQA
    Quando seleciono a opcao "Alerts, Frame & Windows" na pagina inicial
    E clico no submenu "Browser Windows"
    E clico no botao New Window
    Entao uma nova janela deve ser aberta com a mensagem "This is a sample page"
    E fecho a nova janela
