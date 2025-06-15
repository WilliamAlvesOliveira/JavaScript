/*======================================
    Estrutura de dados Map e WeakMap
======================================*/

/*========
    Map
=========*/

// Em um objeto, quando você cria uma propriedade, 
// essa chave é SEMPRE interpretada como string.

const myObj = new Object()
myObj.prop1 = 'a chave prop1 é uma string'

// Demonstrando o uso do Map
const myMap = new Map()

// Neste caso, a string 'prop1' é uma chave que referencia o valor 'propriedade1'
myMap.set('prop1', 'propriedade1')
console.log(myMap.get('prop1')) // ➝ propriedade1

// Mas também poderia ser uma chave do tipo boolean
myMap.set(true, false)
console.log(myMap.get(true)) // ➝ false

// Poderia ser um objeto como chave
myMap.set(myObj, 'meu objeto')
console.log(myMap.get(myObj)) // ➝ meu objeto

// Poderia ser um array como chave
const array = [1, 2, 3]
myMap.set(array, array.filter(el => el >= 2))
console.log(myMap.get(array)) // ➝ [2, 3]

// Sintaxe do Map com pares chave-valor já definidos
const myMap2 = new Map([
    ['string', 'valor string'],
    [0, 'zero'],
    [false, true],
    [array, array.filter(el => el >= 2)],
    [myObj, myObj]
])

// Métodos do Map
console.log(myMap2.keys())   // ➝ Iterador com todas as chaves
console.log(myMap2.values()) // ➝ Iterador com todos os valores
console.log(myMap2.entries())// ➝ Iterador com arrays [chave, valor]

// Verificando se uma chave existe
console.log(myMap2.has('string')) // ➝ true

// Deletando uma chave
myMap2.delete(0)
console.log(myMap2.has(0)) // ➝ false

// Tamanho do Map
console.log(myMap2.size) // ➝ mostra a quantidade de pares chave-valor

// Limpando o Map
// myMap2.clear()
// console.log(myMap2.size) // ➝ 0


/*========================================
    ✅ Explicação da Diferença Map x WeakMap
=========================================*/

/* 
✔️ Map
- Aceita qualquer tipo de chave (primitivos ou objetos).
- É iterável (pode usar for...of, .keys(), .values(), .entries()).
- As referências são fortes (enquanto a chave existir no Map, o valor permanece na memória).
- Útil quando queremos listas, dicionários, bancos de dados temporários, caches, etc.

✔️ WeakMap
- Aceita SOMENTE objetos como chave (não aceita string, number, boolean, etc.).
- NÃO é iterável, não possui .keys(), .values(), .entries() nem .size().
- As referências são fracas, ou seja, se o objeto usado como chave for removido em outro lugar do código, 
  o par chave-valor é automaticamente removido da memória (garbage collector).
- Muito usado para criar dados privados em objetos (simular encapsulamento antes do ES2022).
*/


/*===============
    WeakMap
================*/

// Criando um WeakMap para armazenar dados "privados"
let _contador = new WeakMap()

class Contador {
    constructor() {
        // Cria uma propriedade pública
        this.contador = 0

        // Cria uma propriedade privada associada à instância (this)
        _contador.set(this, 0)
    }

    increment() {
        // Incrementa o contador público
        this.contador++
        console.log('contador público:', this.contador)

        // Incrementa o contador privado
        const valorPrivado = _contador.get(this) + 1
        _contador.set(this, valorPrivado)
        console.log('contador privado (WeakMap):', _contador.get(this))
    }
}

const c1 = new Contador()

c1.increment()
c1.increment()
c1.increment()

/*
✔️ Saída:
contador público: 1
contador privado (WeakMap): 1

contador público: 2
contador privado (WeakMap): 2

contador público: 3
contador privado (WeakMap): 3

🧠 Observações:
- O contador público pode ser acessado diretamente: c1.contador ➝ 3
- O contador privado NÃO pode ser acessado diretamente, ele está protegido dentro do WeakMap.
- Se fizermos: c1 = null ➝ O dado no WeakMap também some, liberando memória automaticamente.
*/


/*=================================================
    ✅ RESUMO DA AULA SOBRE Map() e WeakMap()
=================================================

✔️ Map
- Coleção de pares chave-valor.
- Aceita qualquer tipo de chave (string, objeto, array, etc.).
- É iterável e possui métodos úteis:
    ➝ set(), get(), has(), delete(), clear(), size
- As chaves mantêm a referência forte (não são descartadas da memória automaticamente).

✔️ WeakMap
- Coleção de pares chave-valor onde as chaves são obrigatoriamente objetos.
- Não é iterável (não possui .keys(), .values()...).
- As chaves têm referência fraca ➝ se não houver mais referência para a chave, 
  o par é automaticamente removido da memória.
- Muito utilizado para simular dados privados antes do ES2022.

*/


/*==================================================
    ✅ Sintaxe Moderna de Campos Privados no JavaScript
==================================================*/

class ContadorModerno {
    #contador = 0 // 🔒 privado

    increment() {
        this.#contador++
        console.log('contador privado (moderno):', this.#contador)
    }

    get valor() {
        return this.#contador
    }
}

const c2 = new ContadorModerno()

c2.increment()
c2.increment()
c2.increment()

console.log('Valor acessível via getter:', c2.valor) // ✔️ Forma segura

// console.log(c2.#contador) // ❌ ERRO: campo privado, acesso não permitido


/* 
🆚 Comparação:
- WeakMap ➝ usava-se como estratégia para encapsulamento antes do ES2022.
- Campos privados (#) ➝ forma moderna, nativa da linguagem, mais simples e segura.

*/


/*==========================
    🏁 Fim da Aula! 🏁
===========================*/
