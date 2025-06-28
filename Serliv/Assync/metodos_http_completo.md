# Guia Completo dos Métodos HTTP

Este guia documenta os principais métodos HTTP utilizados em aplicações web e APIs REST, incluindo explicações, usos comuns, exemplos de requisição e observações importantes.

---

## ✅ `GET`

### ► Objetivo

Recuperar dados do servidor.

### ► Características

- Não altera o estado do servidor (método seguro).
- Pode ser armazenado em cache.
- Os dados são enviados na URL (query string).

### ► Exemplo de uso

Buscar todos os usuários:

```http
GET /api/usuarios
```

### ► Exemplo com `fetch`

```js
fetch('/api/usuarios')
  .then(res => res.json())
  .then(dados => console.log(dados))
```

---

## ✉️ `POST`

### ► Objetivo

Enviar dados para o servidor para **criar** um novo recurso.

### ► Características

- Envia dados no corpo (body) da requisição.
- Pode alterar o estado do servidor.

### ► Exemplo de uso

Criar um novo usuário:

```http
POST /api/usuarios
```

### ► Exemplo com `fetch`

```js
fetch('/api/usuarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'William', idade: 30 })
})
```

---

## 🗘️ `PUT`

### ► Objetivo

Atualizar um recurso **por completo**.

### ► Características

- Substitui totalmente os dados existentes.
- Uso com ID do recurso.

### ► Exemplo de uso

Atualizar todos os dados de um usuário:

```http
PUT /api/usuarios/1
```

### ► Exemplo com `fetch`

```js
fetch('/api/usuarios/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Novo Nome', idade: 35 })
})
```

---

## ⚠️ `PATCH`

### ► Objetivo

Atualizar **parcialmente** um recurso.

### ► Características

- Envia apenas os campos que serão atualizados.
- Mais eficiente que `PUT` em muitos casos.

### ► Exemplo de uso

Alterar apenas o nome de um usuário:

```http
PATCH /api/usuarios/1
```

### ► Exemplo com `fetch`

```js
fetch('/api/usuarios/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Nome Atualizado' })
})
```

---

## ❌ `DELETE`

### ► Objetivo

Excluir um recurso do servidor.

### ► Características

- Remove permanentemente o dado especificado.

### ► Exemplo de uso

Deletar um usuário:

```http
DELETE /api/usuarios/1
```

### ► Exemplo com `fetch`

```js
fetch('/api/usuarios/1', {
  method: 'DELETE'
})
```

---

## ❓ `OPTIONS`

### ► Objetivo

Retornar os métodos HTTP permitidos por um recurso.

### ► Uso comum

- Verificação de permissões em **CORS (Cross-Origin Resource Sharing)**
- Não retorna dados, apenas informa sobre as possibilidades de interação com o recurso.

### ► Exemplo

```http
OPTIONS /api/usuarios
```

### ► Exemplo de resposta

```http
Allow: GET, POST, PUT, PATCH, DELETE
```

---

## ℹ️ Dicas Finais

- `GET` e `HEAD` são considerados **seguros** (não devem causar efeitos colaterais).
- `PUT`, `POST`, `PATCH`, `DELETE` são **não idempotentes** (podem alterar o servidor).
- `PUT` é **idempotente**: repetir a requisição produz o mesmo resultado.
- Sempre use `Content-Type: application/json` ao enviar dados JSON no corpo da requisição.

---



