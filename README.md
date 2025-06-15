# Backend Lambda API

This Node.js project exposes a small REST API for managing users, products and addresses.
It uses Express and PostgreSQL with JWT authentication.

## Getting Started

Install dependencies and provide environment variables in a `.env` file:

```
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
PORT=3000 # optional
```

Then start the server:

```
npm install
node index.js
```

Run tests with:

```
npm test
```

The root endpoint `/` responds with a message confirming that the API is running.

## Authentication

Protected routes expect a `Bearer` token generated during login.
Include the header:

```
Authorization: Bearer <token>
```

## Endpoints

### Users

- `POST /usuarios/login` — authenticate a user.
  - **Body**: `{ email, senha }`
  - **Response**: `{ token, usuario: { ... } }`
- `GET /usuarios` — list all users.
- `POST /usuarios` — create a user.
  - **Body**: `{ nome_completo, email, senha, nivel_acesso?, telefone?, cpf?, data_nascimento?, genero?, foto_perfil? }`
- `PUT /usuarios/:id` — update a user *(requires auth)*.
- `DELETE /usuarios/:id` — remove a user *(requires auth)*.
- `PUT /usuarios/:id/nivel` — update access level *(requires auth)*.

### Addresses

- `GET /enderecos` — list all addresses.
- `GET /enderecos/:id` — fetch address by id.
- `GET /enderecos/usuario/:id_usuario` — list addresses for a user.
- `POST /enderecos` — create an address.
  - **Body**: `{ id_usuario, rua, numero, complemento?, bairro, cidade, estado, cep }`
- `PUT /enderecos/:id` — update an address *(requires auth)*.
- `DELETE /enderecos/:id` — delete an address *(requires auth)*.

### Products

- `GET /produtos` — list all products.
- `POST /produtos` — create a product.
  - **Body**: `{ codigo, nome, preco, categoria?, descricao?, imagem? }`
- `PUT /produtos/:id` — update a product *(requires auth)*.
- `DELETE /produtos/:id` — remove a product *(requires auth)*.

---

All responses are JSON. Error messages are returned with an `erro` field and an
appropriate HTTP status code.

