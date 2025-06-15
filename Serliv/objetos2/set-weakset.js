/*==========================================
    Estrutura de dados Set e WeakSet
==========================================*/

/*========
    Set
=========*/

// O Set é uma coleção de valores únicos, ou seja, não permite valores duplicados.

const meuSet = new Set()

// Adicionando valores
meuSet.add(1)
meuSet.add(2)
meuSet.add(3)
meuSet.add(3) // ➝ Ignorado (valor duplicado)

console.log(meuSet) // ➝ Set {1, 2, 3}

// Verificar se um valor existe
console.log(meuSet.has(2)) // ➝ true
console.log(meuSet.has(5)) // ➝ false

// Deletar um valor
meuSet.delete(2)
console.log(meuSet.has(2)) // ➝ false

// Tamanho do Set
console.log(meuSet.size) // ➝ 2

// Iterando sobre o Set
for (const valor of meuSet) {
    console.log('valor:', valor)
}

// Limpando o Set
// meuSet.clear()
// console.log(meuSet.size) // ➝ 0

/*===========================================
    Sintaxe de Set com valores pré-definidos
===========================================*/

const meuSet2 = new Set([10, 20, 30, 10, 20])
console.log(meuSet2) // ➝ Set {10, 20, 30}

/*
🧠 Observações:
- Se houver valores duplicados no array inicial, eles são automaticamente ignorados.
- Set é muito usado quando queremos garantir que uma lista tenha apenas valores únicos.
*/


/*=========================================
    ✅ Diferença entre Set e WeakSet
==========================================*/

/*
✔️ Set
- Armazena qualquer tipo de dado (primitivos ou objetos).
- É iterável (possui .keys(), .values(), .entries(), for...of).
- As referências são fortes ➝ enquanto existir no Set, o valor permanece na memória.
- Pode verificar tamanho (.size) e limpar (.clear()).
- Útil para listas de valores únicos.

✔️ WeakSet
- Armazena apenas OBJETOS (não aceita valores primitivos como string, number, boolean...).
- NÃO é iterável, não possui .keys(), .values(), .entries() nem .size().
- As referências são fracas ➝ se o objeto não tiver mais referência no código, ele é removido automaticamente da memória (garbage collector).
- Usado geralmente para controle de estado ou marcação de objetos de forma segura e leve na memória.
*/


/*==============
    WeakSet
===============*/

// Criando alguns objetos
const obj1 = {nome: 'objeto1'}
const obj2 = {nome: 'objeto2'}
const obj3 = {nome: 'objeto3'}

// Criando o WeakSet
const meuWeakSet = new WeakSet()

// Adicionando objetos no WeakSet
meuWeakSet.add(obj1)
meuWeakSet.add(obj2)

// Verificando se um objeto está no WeakSet
console.log(meuWeakSet.has(obj1)) // ➝ true
console.log(meuWeakSet.has(obj3)) // ➝ false

// Deletando um objeto
meuWeakSet.delete(obj2)
console.log(meuWeakSet.has(obj2)) // ➝ false

/*
🧠 Observações Importantes:
- Não é possível ver o conteúdo interno do WeakSet.
- Não existe .size, .keys(), .values(), .entries() nem iteração sobre WeakSet.
- Se fizermos: obj1 = null ➝ O WeakSet remove automaticamente o objeto da memória.
- WeakSet é muito usado quando queremos associar uma informação a um objeto sem impedir que ele seja coletado pelo garbage collector.
*/


/*===============================================
    ✅ RESUMO DA AULA SOBRE Set() e WeakSet()
===============================================

✔️ Set
- Coleção de valores únicos (não aceita valores repetidos).
- Aceita qualquer tipo de dado (primitivos e objetos).
- É iterável e possui métodos úteis:
    ➝ add(), has(), delete(), clear(), size
- As referências são fortes ➝ mantém os dados na memória.

✔️ WeakSet
- Coleção de objetos (não aceita primitivos).
- NÃO é iterável e não possui métodos para verificar tamanho ou percorrer.
- As referências são fracas ➝ se o objeto não tiver mais referência no código, ele é removido automaticamente da memória.
- Útil para controle de estado interno, marcações e gerenciamento de objetos sem risco de vazamento de memória.

*/


/*========================
    🏁 Fim da Aula! 🏁
========================*/
