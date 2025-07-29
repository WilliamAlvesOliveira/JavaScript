//=======================================================
// 📦 Exemplo de módulo com contagem (CommonJS)
//=======================================================

let count = 0

const increment = () => ++count
const getCount = () => count

// Exporta as funções usando CommonJS
module.exports = { increment, getCount }


//=======================================================
// 📦 Versão ESModules do mesmo código
//=======================================================

// ATENÇÃO: para usar ESModules, mude a extensão do arquivo para `.mjs`
// ou adicione `"type": "module"` no package.json

/*
let count = 0

export const increment = () => ++count
export const getCount = () => count
*/
