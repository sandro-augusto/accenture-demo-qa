# language: pt
Funcionalidade: DemoQA - Sortable
  Como um usuario do DemoQA
  Quero reordenar os elementos da lista via drag and drop
  Para garantir que fiquem em ordem crescente

  Cenario: Colocar os elementos em ordem crescente
    Dado que acesso a pagina inicial do DemoQA
    Quando seleciono a opcao "Interactions" na pagina inicial
    E clico no submenu "Sortable"
    E coloco os elementos em ordem crescente via drag and drop
    Entao os elementos devem estar em ordem crescente
