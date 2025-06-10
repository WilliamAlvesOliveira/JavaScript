/*==============
    HERANÇA
==============*/

/*==============
    ES5
==============*/

// Função construtora Animal
function Animal(tipo) {
    // Proteção contra chamadas sem o operador `new`
    if (this instanceof Animal) {
        if (tipo) this.tipo = tipo
    } else {
        throw new Error('A função Animal deve ser chamada com o operador "new"')
    }
}

// Método no prototype de Animal
Animal.prototype.obterTipo = function () {
    return this.tipo
}

// Valor padrão se tipo não for definido
Animal.prototype.tipo = 'desconhecido'

// Função construtora Cachorro (herdando de Animal)
function Cachorro(nome) {
    this.nome = nome
    Animal.call(this, 'mamífero') // herda as propriedades de Animal (tipo)
}

// Herdando métodos de Animal
Cachorro.prototype = new Animal('mamífero')

// Corrigindo o constructor
Cachorro.prototype.constructor = Cachorro

// Criando uma instância
let dog = new Cachorro('Dog')

// Logs e testes
console.log(dog) // Cachorro { nome: 'Dog', tipo: 'mamífero' }
console.log(dog.obterTipo()) // 'mamífero'
console.log(Object.getPrototypeOf(dog)) // equivale a dog.__proto__

// Observação: getPrototypeOf é o método moderno recomendado para acessar o prototype

/*==============
    ES6 (class)
==============*/

// Classe Animal moderna
class ClassAnimal {
    constructor(tipo) {
        if (tipo) this.tipo = tipo
    }

    obterTipo() {
        return this.tipo
    }
}

// Valor padrão (caso tipo não seja definido no constructor)
ClassAnimal.prototype.tipo = 'desconhecido'

// Classe Gato que herda de ClassAnimal
class ClassGato extends ClassAnimal {
    constructor(nome) {
        super('mamífero') // chama o constructor da classe mãe com tipo = 'mamífero'
        this.nome = nome
    }
}

// Criando uma instância
let gato = new ClassGato('Mingau')

// Logs e testes
console.log(gato)                      // ClassGato { tipo: 'mamífero', nome: 'Mingau' }
console.log(gato.obterTipo())         // 'mamífero'
console.log(Object.getPrototypeOf(gato)) // equivale a gato.__proto__

/*============================
  RESUMO FINAL DA TRANSIÇÃO
==============================

- No ES5, usamos funções construtoras, `.call()` e manipulação de `prototype` para simular herança.
- No ES6, usamos `class`, `extends` e `super()` para uma sintaxe mais clara e próxima da orientação a objetos tradicional.
- Internamente, `class` ainda usa protótipos — a diferença é apenas sintática (açucarada).
- O uso de `super()` em classes filhas equivale a `ClasseMae.call(this, ...)` no ES5.
- Mesmo em ES6, a herança continua sendo baseada em `prototype`, mas com menos código manual.


obs:
// Mesmo que a propriedade `tipo` não seja definida no objeto,
// o método `obterTipo()` ainda retorna 'desconhecido'
// porque `tipo` foi definido no prototype da classe pai (ClassAnimal).

*/
