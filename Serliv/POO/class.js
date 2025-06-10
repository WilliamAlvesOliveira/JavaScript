// ES5 - Utilizando função construtora
function Animal(tipo){
    // Se o tipo for passado, define-o na instância
    if(tipo) this.tipo = tipo
}

// Criando instâncias com diferentes tipos
let cachorro = new Animal('mamifero')
let gato = new Animal('mamifero')
let cobra = new Animal('réptil')
let peixe = new Animal() // Não passa tipo → herdará do prototype

// Método compartilhado entre todas as instâncias via prototype
Animal.prototype.obterTipo = function(){
    return this.tipo
}

// Valor padrão da propriedade 'tipo' via prototype
Animal.prototype.tipo = 'desconhecido'

// ------------------------------------

// ES6 - Utilizando a nova sintaxe de classe (azúcar sintáctico)
class ClassAnimal{
    constructor(tipo){
        // Define a propriedade 'tipo' na instância se for passada
        this.tipo = tipo
    }

    // Método da classe (vai para o prototype, igual ES5)
    obterTipo(){
        return this.tipo
    }
}

// Valor padrão para a propriedade 'tipo' (caso não seja definido no construtor)
ClassAnimal.prototype.tipo = 'desconhecido'

let animal = new ClassAnimal('anfibio')

// ------------------------------------

console.log(animal)             // Instância da classe com tipo = 'anfibio'
console.log(gato)               // Instância da função construtora com tipo = 'mamifero'
console.log(typeof animal)      // 'object' → é uma instância
console.log(typeof gato)        // 'object'
console.log(typeof ClassAnimal) // 'function' → classes são funções internamente
console.log(typeof Animal)      // 'function'
console.log(animal.obterTipo()) // 'anfibio'
console.log(gato.obterTipo())   // 'mamifero'

// Comparando os prototypes
console.log(ClassAnimal.prototype)
console.log(Animal.prototype)

let sapo = new ClassAnimal()     // Não define 'tipo', usará o valor do prototype
console.log(sapo.tipo)           // 'desconhecido'

// ------------------------------------

console.log('-------------------')

// Classe com verificação de tipo e tentativa de definir propriedade fora do constructor
class ClassAnimal2{
    constructor(tipo){
        if(tipo){
            this.tipo = tipo
        }
    }

    obterTipo(){
        return this.tipo
    }

    // Esta propriedade será definida diretamente na instância (não no prototype)
    testePropriedade = 'será que funciona'
}

// Valor padrão via prototype
ClassAnimal2.prototype.tipo = 'desconhecido'

let morcego = new ClassAnimal2()
console.log(morcego.tipo)  // 'desconhecido' (pegou do prototype)

// ------------------------------------------------------
// 🎯 RESUMO FINAL
//
// Neste código mostramos duas formas de trabalhar com orientação a objetos em JavaScript:
//
// 1. Forma "antiga" (ES5) com funções construtoras e prototype:
//    - Criamos objetos com funções como `function Animal()`.
//    - Adicionamos métodos ao prototype (`Animal.prototype.obterTipo`) para reutilização.
//    - Usamos `new` para instanciar e o método `call()` para herança de construtores.
//    - Precisamos ajustar o `constructor` manualmente ao sobrescrever o prototype.
//
// 2. Forma moderna (ES6) com `class`:
//    - A sintaxe é mais limpa e parecida com outras linguagens O.O.
//    - Métodos são adicionados automaticamente ao prototype.
//    - A herança é feita com `extends` (não mostrado aqui, mas importante).
//
// Ambas as formas funcionam, mas hoje usamos `class` por clareza e facilidade.
// Mesmo com `class`, o JavaScript continua usando prototype por trás dos panos.
//
// 💡 Entender a forma antiga (ES5) ajuda a entender como o JS funciona de verdade!
// ------------------------------------------------------

/*========================
    ⚠️ ATENÇÃO IMPORTANTE
==========================*/

// Quando usamos funções construtoras no estilo ES5, como `Animal2`,
// é possível que o desenvolvedor chame a função sem o operador `new`, por exemplo:
// Animal2('mamifero')

// Nesse caso, `this` não se refere a um novo objeto, mas sim ao objeto global (`window` no navegador),
// o que causaria a criação da propriedade `tipo` diretamente no escopo global — algo perigoso e não desejado.

// Podemos evitar esse comportamento de duas formas:
//
// 1. Usando `'use strict'`, o que faz o JavaScript lançar um erro automaticamente
//    se tentarmos usar `this` em uma função construtora sem `new`.
// 2. Validando manualmente com `this instanceof Animal2` e lançando um erro personalizado,
//    como fizemos abaixo:

function Animal2(tipo) {
    if (this instanceof Animal2) {
        if (tipo) this.tipo = tipo
    } else {
        throw new Error('A função Animal2 deve ser chamada com o operador "new"')
    }
}

// ✅ Forma correta:
const cavalo = new Animal2('mamífero')

// ❌ Forma incorreta (sem `new`):
// Animal2('réptil') // Isso lançaria um erro personalizado

// 📌 OBSERVAÇÃO:
// Quando usamos a sintaxe moderna com `class`, esse tipo de erro já é tratado automaticamente pelo JavaScript.
// Ou seja, se você tentar chamar uma classe como função (sem `new`), o JS lança um erro:
ClassAnimal('mamífero') // TypeError: Class constructor Animal3 cannot be invoked without 'new'

// ✅ Por isso, `class` é mais segura e clara nesse aspecto.

console.log('=============================')