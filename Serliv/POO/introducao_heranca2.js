/*============================
    HERANÇA COM PROTOTYPE
=============================*/

function Animal(tipo){
    if(tipo) this.tipo = tipo
}

Animal.prototype.obterTipo = function(){
    return this.tipo
}

Animal.prototype.tipo = 'desconhecido'

function Cachorro(nome, tipo){
    this.nome = nome
    Animal.call(this, tipo) // herda propriedades
}

// Herança de métodos
Cachorro.prototype = new Animal()

// Corrigindo a referência ao construtor
Cachorro.prototype.constructor = Cachorro

const rex = new Cachorro('Rex', 'mamífero')

console.log(rex)

// Testando propriedades com for...in
for (let propriedade in rex){
    console.log(propriedade) // lista todas as propriedades, incluindo herdadas
}

console.log('--- Somente as do próprio objeto ---')
for (let propriedade in rex){
    if (rex.hasOwnProperty(propriedade)){
        console.log(propriedade) // filtra apenas propriedades do próprio objeto
    }
}

// Testando instanceof
console.log(rex instanceof Animal) // true
console.log(rex instanceof Cachorro) // true
console.log(rex instanceof Object) // true
console.log(rex instanceof Array) // false

// Testando isPrototypeOf
console.log(Cachorro.prototype.isPrototypeOf(rex)) // true
console.log(Animal.prototype.isPrototypeOf(rex)) // true
console.log(Object.prototype.isPrototypeOf(rex)) // true

// Acessando o prototype diretamente
console.log(Object.getPrototypeOf(rex)) // mesmo que rex.__proto__
console.log(rex.__proto__)
console.log(Object.getPrototypeOf(rex) === rex.__proto__) // true

console.log('----------------------')

/*============================
    DEFININDO CONSTRUCTOR DE FORMA SEGURA
=============================*/

function Cachorro2(nome, tipo){
    this.nome = nome
    Animal.call(this, tipo)
}

// Herda de Animal
Cachorro2.prototype = new Animal()

// Define o constructor corretamente e de forma não-enumerável
Object.defineProperty(Cachorro2.prototype, 'constructor', {
    value: Cachorro2,
     enumerable: false // 🔹 false por padrão, evita que apareça em loops (como for...in)
    /*
    Se colocássemos enumerable: true, o 'constructor' apareceria em loops como este:

    for (let propriedade in rex2) {
        console.log(propriedade) // incluiria 'constructor'
    }

    // Para testar, descomente a linha abaixo:
    // enumerable: true
    */
})

/*
=====================
Resumo Final
=====================

➡️ Este exemplo mostra como a **herança clássica com prototype** funciona por baixo da sintaxe moderna de `class`. Essa era a forma padrão antes do ES6, e ainda é importante conhecer para entender o que o JavaScript faz internamente.

📌 Destaques:
- `Animal.call(this, tipo)` permite que `Cachorro` herde **propriedades** de `Animal`.
- `Cachorro.prototype = new Animal()` faz `Cachorro` herdar os **métodos** de `Animal.prototype`.
- `constructor` precisa ser **reajustado** manualmente, pois ao sobrescrever o prototype com `new Animal()`, a referência ao construtor original (`Cachorro`) é perdida.
- `Object.defineProperty` permite **definir o `constructor` corretamente e sem torná-lo enumerável**, mantendo a consistência e evitando que apareça em loops como `for...in`.

🧪 Também testamos:
- `instanceof` para verificar a cadeia de protótipos.
- `isPrototypeOf` para saber se um prototype está em algum nível da cadeia.
- `Object.getPrototypeOf()` e `__proto__` para inspecionar diretamente o prototype.

🆚 Hoje usamos `class`, que por baixo dos panos faz praticamente **tudo isso automaticamente**:
```js
class Cachorro extends Animal {
    constructor(nome, tipo) {
        super(tipo)
        this.nome = nome
    }
}
*/