# language: pt
Funcionalidade: DemoQA - Progress Bar
  Como um usuario do DemoQA
  Quero controlar a barra de progresso
  Para garantir que ela para antes dos 25% e reseta ao chegar aos 100%

  Cenario: Parar antes dos 25% e resetar ao atingir 100%
    Dado que acesso a pagina inicial do DemoQA
    Quando seleciono a opcao "Widgets" na pagina inicial
    E clico no submenu "Progress Bar"
    E clico no botao Start da progress bar
    E paro a barra antes de atingir 25%
    Entao o valor da progress bar deve ser menor ou igual a 25
    Quando inicio novamente e a barra chega aos 100%
    E reseto a progress bar
    Entao a progress bar deve ser resetada
