/*============================
    HERANÇA COM FUNCTION CONSTRUCTOR
=============================*/

// Função construtora Animal
function Animal(tipo){
    if(tipo) this.tipo = tipo // define a propriedade tipo, se for fornecida
}

// Adiciona o método obterTipo ao prototype da função Animal
Animal.prototype.obterTipo = function(){
    return this.tipo
}

// Define um valor padrão para a propriedade tipo no prototype
Animal.prototype.tipo = 'desconhecido'

// Função construtora Cachorro que irá "herdar" Animal (propriedades)
function Cachorro(nome, tipo){
    this.nome = nome // define a propriedade nome
    Animal.call(this, tipo) // chama a função Animal, herdando as propriedades dela para o objeto atual (this)
}

const rex = new Cachorro('Rex', 'mamifero') // cria uma instância de Cachorro

console.log('objeto rex', rex)
console.log('function constructor', rex.constructor) // mostra a função que criou rex
console.log('rex __proto__', rex.__proto__) // mostra o prototype do objeto rex (ainda não ligado ao prototype de Animal)
console.log('-------------------')


/*============================
    HERANÇA DE PROPRIEDADES + MÉTODOS
=============================*/

function Animal2(tipo){
    if(tipo) this.tipo = tipo
}

Animal2.prototype.obterTipo = function(){
    return this.tipo
}

Animal2.prototype.tipo = 'desconhecido'

function Cachorro2(nome, tipo){
    this.nome = nome
    Animal2.call(this, tipo) // herda propriedades de Animal2
}

// Aqui, Cachorro2 passa a herdar também os métodos de Animal2 por prototype
Cachorro2.prototype = new Animal2() // sobrescreve o prototype para herdar os métodos

const rex2 = new Cachorro2('Rex', 'mamifero')

console.log('objeto rex2', rex2)
console.log('function constructor', rex2.constructor) // mostra Animal2 (pois o prototype foi sobrescrito)
console.log('rex2 __proto__', rex2.__proto__) // aponta para uma instância de Animal2 (de onde herda os métodos)
console.log('-------------------')


/*============================
    CORRIGINDO O CONSTRUCTOR APÓS HERANÇA
=============================*/

function Animal3(tipo){
    if(tipo) this.tipo = tipo
}

Animal3.prototype.obterTipo = function(){
    return this.tipo
}

Animal3.prototype.tipo = 'desconhecido'

function Cachorro3(nome, tipo){
    this.nome = nome
    Animal3.call(this, tipo) // herda as propriedades de Animal3
    this.constructor = Cachorro3 // corrige o ponteiro para o construtor correto (opcional mas recomendado)
}

// Herda os métodos via prototype
Cachorro3.prototype = new Animal3()

const rex3 = new Cachorro3('Rex', 'mamifero')

console.log('objeto rex3', rex3)
console.log('function constructor', rex3.constructor) // agora aponta corretamente para Cachorro3
console.log('rex3 __proto__', rex3.__proto__) // aponta para uma instância de Animal3

/* 
=====================
Resumo Final
=====================

➡️ Este é o modelo **tradicional de herança em JavaScript**, anterior à introdução da palavra-chave `class` no ES6 (2015). Embora hoje o uso de `class` seja mais comum e legível, entender esse padrão antigo ajuda a **compreender o que acontece por baixo dos panos**.

🧱 Os principais conceitos envolvidos aqui são:
- `function Animal(...)` → define um **construtor**, que será usado com `new`.
- `Animal.prototype.metodo = ...` → define **métodos compartilhados**, armazenados no prototype.
- `Cachorro.call(this, tipo)` → faz com que a função `Animal` seja chamada no contexto da instância `Cachorro`, **herdando propriedades** (mas não métodos).
- `Cachorro.prototype = new Animal()` → faz com que `Cachorro` herde também os **métodos do prototype** de `Animal`.
- `this.constructor = Cachorro` → corrige o `.constructor`, que é sobrescrito ao fazer `Cachorro.prototype = new Animal()`.

🆚 Hoje usamos `class`, que é basicamente um **açúcar sintático** sobre essa mesma estrutura. Ou seja, o mecanismo de prototype ainda existe e funciona da mesma forma, mas a sintaxe é mais limpa e moderna:

```js
class Cachorro extends Animal {
    constructor(nome, tipo) {
        super(tipo)
        this.nome = nome
    }
}
*/