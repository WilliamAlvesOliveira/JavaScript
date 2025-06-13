/*
===========================================
 Diferença entre keys() e getOwnPropertyNames()
===========================================

Em nossa função deepFreeze usamos Object.getOwnPropertyNames()
em vez de Object.keys(). A razão disso está na forma como
cada método lida com propriedades **enumeráveis** e **não enumeráveis**.

Vamos ver isso com um exemplo:
*/

const obj = {};

Object.defineProperties(obj, {
    um: { enumerable: true, value: 1 },
    dois: { enumerable: false, value: 2 },
});

console.log('Object.keys():');
// Retorna **somente** as propriedades **enumeráveis** do objeto
console.log(Object.keys(obj)); // ['um']

console.log('Object.getOwnPropertyNames():');
// Retorna **todas** as propriedades do objeto, **enumeráveis e não enumeráveis**
console.log(Object.getOwnPropertyNames(obj)); // ['um', 'dois']

/*
===========================================
 Por que usamos getOwnPropertyNames no deepFreeze?
===========================================

Ao congelar um objeto profundamente, queremos garantir que
**todas as propriedades** (inclusive as não enumeráveis)
também sejam congeladas — e Object.keys() **não** nos dá isso.

Então, usamos Object.getOwnPropertyNames() para que o freeze
seja realmente completo e seguro!
*/
