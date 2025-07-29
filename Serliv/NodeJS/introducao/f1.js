//===========================================================
// 📦 Importação de módulo com CommonJS (require)
//===========================================================

// Aqui usamos `require` para importar as funções `getCount` e `increment`
// do módulo `myCount.js`, que está no mesmo diretório.
// Em CommonJS, cada arquivo é um módulo isolado (com escopo próprio).
// Isso significa que variáveis definidas em `myCount.js` não vazam para cá
// e só podem ser acessadas por meio da exportação explícita.

const { getCount, increment } = require('./myCount')

// Chamamos a função `increment` três vezes
increment() // count = 1
increment() // count = 2
increment() // count = 3

// Recuperamos e exibimos o valor atual de `count`
// A função `getCount` acessa a variável privada `count` dentro de myCount.js
console.log(getCount()) // Saída: 3


//===========================================================
// 💡 Isolamento de escopo
//===========================================================

// A variável `count` é interna ao módulo `myCount.js`.
// Ela não está acessível diretamente aqui neste arquivo.
// Isso garante **encapsulamento** e evita **efeitos colaterais** indesejados.
// A única forma de modificar ou acessar `count` é usando as funções públicas (`increment`, `getCount`).


//===========================================================
// 📦 Versão com ESModules (import/export)
//===========================================================

// Para usar ESModules, você pode renomear o arquivo para `.mjs`
// ou definir `"type": "module"` no `package.json`.

// Arquivo: myCount.mjs
/*
let count = 0

export const increment = () => ++count
export const getCount = () => count
*/

// Arquivo: main.mjs
/*
import { getCount, increment } from './myCount.mjs'

increment()
increment()
increment()

console.log(getCount()) // Saída: 3
*/
