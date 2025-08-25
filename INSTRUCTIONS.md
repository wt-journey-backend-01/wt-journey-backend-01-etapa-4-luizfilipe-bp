# Instruções para Execução do Projeto

## 1. Pré-requisitos

-   Certifique-se de que o **Docker** está instalado em sua máquina.

## 2. Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo.
2. Substitua `seu_usuario`, `sua_senha` e `seu_banco` pelos valores do seu ambiente.

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=seu_banco
NODE_ENV=development
```

## 3. Inicializando o Docker

-   No terminal, execute para subir o container:

    ```bash
    docker compose up -d
    ```

-   Para verificar se o container está rodando:

    ```bash
    docker ps
    ```

## 4. Executando Migrations

-   As migrations criam as tabelas do banco de dados. Execute:

    ```bash
    npx knex migrate:latest
    ```

## 5. Executando Seeds

-   As seeds populam o banco de dados para facilitar o desenvolvimento e testes.
-   Execute o comando:

    ```bash
    npx knex seed:run
    ```

-   Após a execução, o banco estará populado.

## 6. Resetando o Banco (Script Extra)

-   O projeto possui um script que derruba o container, cria novamente, executa as migrations e popula o banco com as seeds.
-   Para utilizá-lo, execute:

    ```bash
    npm run db:reset
    ```

## 7. Outros Scripts disponíveis

`db:cli`

Abre o cliente interativo do PostgreSQL dentro do container Docker `postgres-db`, conectado ao banco `policia_db` com o usuário `postgres`.

`db:drop`

Remove o banco de dados `policia_db` (caso exista) dentro do container Docker.

`db:create`

Cria um novo banco de dados chamado `policia_db` dentro do container Docker.

`db:migrate`

Executa todas as migrações pendentes do **Knex**, estruturando o banco (criação de tabelas, colunas, etc.).

`db:seed`

Executa os arquivos de _seed_ do **Knex**, populando o banco com dados iniciais para testes e desenvolvimento.

# Instruções para autenticação de Usuário na API

A API possui endpoints para **registro** e **login** de usuários, com autenticação baseada em **JWT (JSON Web Token)**.

## Registro de Usuários

**Rota:** `POST /auth/register`

### 📥 Requisição

```json
{
    "nome": "Luiz Filipe",
    "email": "luiz@email.com",
    "senha": "minhaSenha123."
}
```

## Login de Usuários

### Variáveis de ambiente

Certifique-se de que seu arquivo `.env` contém as seguintes variáveis:

```env
JWT_SECRET=seu_segredo
SALT_ROUNDS=valor_inteiro_do_salt
```

-   `JWT_SECRET`: Segredo utilizado para assinar e validar os tokens JWT.
-   `SALT_ROUNDS`: Número de rounds para geração do hash das senhas.

**Rota:** `POST /auth/login`

```json
{
    "email": "luiz@email.com",
    "senha": "minhaSenha123."
}
```

### Resposta de sucesso

```json
{
    "access_token": "jwt_gerado_aqui"
}
```

## Autenticação com JWT

Após o login, o cliente deve enviar o token JWT no **header Authorization** em todas as requisições que exigem autenticação.

### Exemplo de envio com Header Authorization:

```
Authorization: Bearer jwt_gerado_aqui
```

---

## Fluxo de Autenticação

1. O usuário se **registra** com `POST /auth/register`.
2. O usuário faz **login** em `POST /auth/login` e recebe um **JWT**.
3. O cliente envia o **JWT no header** `Authorization` a cada requisição protegida.
4. O servidor valida o token:
    - Se válido: acesso concedido.
    - Se inválido ou expirado: retorno `401 Unauthorized`.

---
