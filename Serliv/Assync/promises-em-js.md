
# 📘 Promises em JavaScript

---

## 📌 O que é uma Promise?

Uma **Promise** (promessa) é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona.

Ela é usada para:

- Evitar o "callback hell"
- Controlar melhor o fluxo de operações assíncronas
- Tornar o código mais legível e organizado

---

## ⚙️ Estados de uma Promise

Uma Promise possui **três estados** principais:

| Estado     | Significado                                 |
|------------|---------------------------------------------|
| `pending`  | Aguardando resultado                        |
| `fulfilled`| Resolvida com sucesso                       |
| `rejected` | Rejeitada com erro                          |

---

## ✍️ Criando uma Promise

```js
const promessa = new Promise((resolve, reject) => {
  const sucesso = true;

  if (sucesso) {
    resolve("Deu certo!");
  } else {
    reject("Deu erro.");
  }
});
```

---

## 🔗 then(), catch(), finally()

### ✅ then()
Executa quando a promessa é **resolvida**.

```js
promessa.then(resultado => {
  console.log(resultado);
});
```

### ❌ catch()
Executa quando a promessa é **rejeitada**.

```js
promessa.catch(erro => {
  console.error(erro);
});
```

### 🔚 finally()
Executa **independente do resultado**.

```js
promessa
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log("Acabou."));
```

---

## 🧪 Exemplo com `setTimeout`

```js
function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Esperou ${ms}ms`);
    }, ms);
  });
}

esperar(1000).then(msg => console.log(msg));
```

---

## 🔁 Encadeando Promises

```js
esperar(1000)
  .then(() => esperar(1000))
  .then(() => console.log("Dois segundos se passaram"));
```

---

## 🛠 Métodos Estáticos de Promise

### `Promise.resolve()`

Cria uma promessa resolvida imediatamente.

```js
Promise.resolve("Ok").then(console.log);
```

---

### `Promise.reject()`

Cria uma promessa rejeitada imediatamente.

```js
Promise.reject("Erro").catch(console.error);
```

---

### `Promise.all()`

Espera **todas** as promessas serem resolvidas. Se uma falhar, tudo falha.

```js
Promise.all([
  esperar(1000),
  esperar(2000),
  esperar(3000)
]).then(console.log).catch(console.error);
```

---

### `Promise.race()`

Retorna o resultado da **primeira** promessa que terminar (resolvida ou rejeitada).

```js
Promise.race([
  esperar(1000),
  esperar(3000)
]).then(console.log);
```

---

### `Promise.allSettled()`

Retorna o resultado de todas as promessas, sem se importar se falharam ou não.

```js
Promise.allSettled([
  Promise.resolve("Sucesso"),
  Promise.reject("Falhou")
]).then(console.log);
```

---

## 🔁 Callbacks vs Promises

### Com Callback

```js
setTimeout(() => {
  console.log("Feito com callback");
}, 1000);
```

### Com Promise

```js
esperar(1000).then(() => {
  console.log("Feito com promise");
});
```

---

## 🧠 Usando `async` e `await`

Forma moderna de lidar com promessas.

```js
async function executar() {
  try {
    const resultado = await esperar(1000);
    console.log(resultado);
  } catch (erro) {
    console.error(erro);
  } finally {
    console.log("Finalizado");
  }
}

executar();
```

---

## 🧾 Resumo

✅ Promises ajudam a lidar com tarefas assíncronas  
✅ São mais legíveis do que callbacks aninhados  
✅ `then`, `catch` e `finally` controlam o fluxo  
✅ Combinam muito bem com `async/await`  
✅ Use `Promise.all`, `race`, `allSettled` para gerenciar várias promessas

---

## 🔗 Referências

- [MDN - Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
- [JavaScript.info - Promises](https://javascript.info/promise-basics)

---
