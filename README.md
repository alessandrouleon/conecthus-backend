# API RESTful - CRUD de Usuarios

## Sobre o Projeto

Este projeto consiste no desenvolvimento de uma API RESTful para
gerenciamento de usuários, implementando operações de CRUD (Create,
Read, Update, Delete), utilizando NestJS e banco de dados relacional.

Requisitos atendidos: - API RESTful com NestJS - CRUD completo de
usuários - Banco de dados relacional (MySQL) - Documentação com Swagger
UI.

Diferenciais técnicos implementados: - Clean Architecture - DDD -
SOLID - Docker - Prisma ORM

---

## Tecnologias Utilizadas

- Node.js
- NestJS
- Prisma ORM
- MySQL
- Docker
- Swagger (OpenAPI)

---

## Estrutura do Projeto

Organização modular baseada em separação de responsabilidades.

Pastas principais:

```
src/
 ├── @shared/
 │    ├── config/
 │         ├── prisma/
 ├── docs/
 ├── domain/
 │    ├── exception/
 │    ├── notification/
 │    ├── validator/
 ├── pagination/
 ├── services/
 ├── utils/
 │
 ├── modules/
 │    └── user/
 │         ├── controllers/
 │         ├── domain/
 │              ├── entities/
 │              ├── factory/
 |              ├── repository/
 │              ├── validator/
 │              ├── value-objects/
 │         ├── dtos/
 │         ├── repository/
 │         ├── use-cases/
 │         │    ├── create-user/
 │         │    ├── delete-user/
 │         │    ├── find-all-user/
 │         │    ├── find-by-id-user/
 │         │    └── update-user/
 │         └── user.module.ts
 │
 ├── app.module.ts
 └── main.ts

prisma/
test/
Dockerfile
docker-compose.yaml
entrypoint.sh
```

## Explicação da Estrutura

### @shared

#### Contém recursos reutilizáveis da aplicação:

### config

- Configurações globais
- Instância do Prisma
- Configuração do Swagger UI
- Utilitários compartilhados
- Paginação
- Funções utilitárias

### domain

- Contém a camada central da aplicação:
- Exceções customizadas
- Sistema de notificações de erro
- Validadores
- Serviços de domínio

## modules/user

- Implementação do módulo de usuários:
- Controllers → Camada HTTP
- DTOs → Validação e contratos de entrada/saída
- Repository → Interface e implementação de persistência
- Use-cases → Casos de uso isolados (Create, Update, Delete, Read)
- Domain → Regras específicas do domínio de usuário(entities, factory, repository, validator, value-object)
- Cada operação do CRUD foi implementada como um caso de uso independente, respeitando o princípio da responsabilidade única (SRP).

## Banco de Dados

Banco relacional MySQL executando via Docker. Prisma ORM utilizado para
modelagem e acesso aos dados.

---

## Execução do Projeto

Para subir o ambiente completo:

docker compose up -d --build

Esse comando sobe: - Container do MySQL - Container da aplicação NestJS

---

## Documentacao Swagger

Após subir o projeto, acessar:

http://localhost:5000/user-docs/

---

## Endpoints

POST /users GET /users GET /users/:id PUT /users/:id DELETE /users/:id

---

### Requisitos para Criar e Atualizar usuários

- POST: http://localhost:5000/users
- PUT: http://localhost:5000/users/ID

- Matrícula (registration): é única
- Email: é único
- Senha (password): Deve ter letra maiúscula, minúscula, número e caracter especial.

### Listar usuários

- GET: http://localhost:5000/users/
- Neste endpoint é possível filtrar, por nome, matricular ou email

### Deletar usuários

- Delete: http://localhost:5000/users/id
- Observação: Ao deletar um usuário, a data da deleção é registrada na coluna deletedAt no banco de dados. O registro permanece na base, porém o usuário deixa de ser considerado nos registros ativos do sistema

## Critérios Atendidos

- Qualidade do Código
- Funcionalidade
- Capacidade de Resolução de Problemas
- Documentação

---

## 🚀 Repositório da API

🔗 **GitHub:**  
[conecthus-backend](https://github.com/alessandrouleon/conecthus-backend)

## Autor

Alessandro Uleon
