# Postman — DemoQA BookStore

Collection do Postman gerada com base no [Swagger do DemoQA](https://demoqa.com/swagger/),
organizada por endpoints, para testes manuais/exploratórios da API.

## Arquivos

- `DemoQA-BookStore.postman_collection.json` — a collection (pastas **Account**, **BookStore** e **Limpeza**).
- `DemoQA.postman_environment.json` — environment com as variáveis (`baseUrl`, `userName`, `password`, `userId`, `token`, `isbn1`, `isbn2`).

## Como importar

No Postman: **Import** → arraste os dois arquivos. Depois selecione o environment **DemoQA** no canto superior direito.

## Como usar

As requests encadeiam automaticamente via scripts (não precisa copiar/colar valores):

1. **Account → Criar usuario** — gera um `userName` único e salva o `userId`.
2. **Account → Gerar token de acesso** — salva o `token`.
3. **Account → Confirmar autorizacao** — valida que o usuário está autorizado (só fica `true` após o token).
4. **Account → Detalhes do usuario** — usa o `token`.
5. **BookStore → Listar livros** — salva `isbn1` e `isbn2`.
6. **BookStore → Alugar livros** — aluga os dois livros.
7. **BookStore** (demais) — consultar por ISBN, substituir, remover.
8. **Limpeza → Excluir usuario** — passo final; apaga o usuário criado (deve ser o último, pois o token perde a validade depois).

> Execute na ordem das pastas. Rodando a collection inteira (ou com o Newman), o fluxo funciona de ponta a ponta.

## Rodar via linha de comando (Newman)

```bash
npx newman run DemoQA-BookStore.postman_collection.json -e DemoQA.postman_environment.json
```

## Endpoints cobertos

| Pasta | Request | Método | Rota |
|-------|---------|--------|------|
| Account | Criar usuario | POST | `/Account/v1/User` |
| Account | Gerar token | POST | `/Account/v1/GenerateToken` |
| Account | Authorized | POST | `/Account/v1/Authorized` |
| Account | Detalhes do usuario | GET | `/Account/v1/User/{userId}` |
| Account | Detalhes sem token (401) | GET | `/Account/v1/User/{userId}` |
| BookStore | Listar livros | GET | `/BookStore/v1/Books` |
| BookStore | Alugar livros | POST | `/BookStore/v1/Books` |
| BookStore | Consultar livro por ISBN | GET | `/BookStore/v1/Book?ISBN=` |
| BookStore | Substituir livro | PUT | `/BookStore/v1/Books/{isbn}` |
| BookStore | Remover um livro | DELETE | `/BookStore/v1/Book` |
| BookStore | Remover todos | DELETE | `/BookStore/v1/Books?UserId=` |
| Limpeza | Excluir usuario | DELETE | `/Account/v1/User/{userId}` |
