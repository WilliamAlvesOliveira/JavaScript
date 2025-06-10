/*===================
    prototype por baixo dos panos
====================*/

// Ao criar uma função construtora, ela automaticamente ganha uma propriedade chamada "prototype"
// Toda instância criada com "new" aponta para o prototype da função
function Animal(tipo){
    this.tipo = tipo
}

let dog = new Animal('mamifero') // cria um objeto com a propriedade tipo

console.log(dog) // mostra o objeto instanciado
console.log(Animal.prototype) // exibe o prototype da função Animal
console.log(Object) // mostra a função construtora Object
console.log(Object.prototype) // mostra o prototype base de todos os objetos
console.log(dog.__proto__) // mostra o prototype do objeto dog (equivalente a Animal.prototype)
console.log(dog.__proto__ === Animal.prototype) // true, pois o prototype do objeto dog é o da função Animal
console.log('---------------------')

/*
Agora vamos adicionar métodos no prototype para reaproveitamento de código.
Todas as instâncias vão compartilhar o mesmo método, sem duplicação de memória.
*/

function Animal2(tipo){
    this.tipo = tipo
}

// adiciona um método no prototype
Animal2.prototype.obterTipo = function(){
    return this.tipo
}

let dog2 = new Animal2('mamifero')
let cat = new Animal2('mamifero')
let snake = new Animal2('réptil')

console.log(dog2)
console.log(dog2.obterTipo()) // retorna 'mamifero'
console.log(dog2.__proto__.__proto__ === Object.prototype) // mostra que o prototype do prototype é Object.prototype
console.log('---------------------')

// podemos adicionar propriedades no prototype também
Animal2.prototype.tipo =  'desconhecido'

let peixe = new Animal2()
// como o construtor não define o tipo, o método vai acessar prototype.tipo, mas o this.tipo é undefined
console.log(peixe.tipo) // undefined (acesso direto, procura no próprio objeto)
console.log(peixe.obterTipo()) // undefined (porque this.tipo não existe na instância)
console.log('---------------------')

/*
No exemplo a seguir, só atribuímos o tipo se ele for passado como parâmetro.
Caso contrário, o this.tipo não é definido, e o método no prototype será usado como fallback.
*/

function Animal3(tipo){
    if (tipo) this.tipo = tipo // só define o tipo se for passado
}

Animal3.prototype.obterTipo = function(){
    return this.tipo // vai tentar pegar o this.tipo, senão herda do prototype
}

// criamos a instância ANTES de adicionar a propriedade ao prototype
let macaco = new Animal3()

// adicionamos agora a propriedade no prototype
Animal3.prototype.tipo =  'desconhecido'

console.log('macaco' ,macaco.obterTipo()) // como o macaco não tem tipo próprio, usa do prototype: 'desconhecido'

let peixe2 = new Animal3()

console.log(peixe2.tipo)  // undefined, pois não foi definido diretamente na instância
console.log(peixe2.obterTipo())  // 'desconhecido' (herda do prototype)
console.log('---------------------')

/*
Todos os arrays criados com [] ou new Array herdam de Array.prototype
Podemos adicionar novos métodos no prototype de Array (isso é comum em polifills)
*/

let array = new Array(1,2,3)

console.log(array)
console.log(array.__proto__ === Array.prototype) // true, pois herda de Array.prototype

// adicionamos um novo método no prototype do array
Array.prototype.map2 = function(){
    console.log('executando função map2')
}

array.map2() // executa o novo método criado

/*=============
    POLIFILL
=============*/

/*
Polifill é uma técnica usada para "preencher" funcionalidades que não existem
em navegadores antigos ou ambientes que ainda não suportam certos métodos modernos.
Basicamente, recriamos o método manualmente no prototype, se ele ainda não existir.
*/

// Verificamos se o método map ainda não existe no Array.prototype
if (!Array.prototype.map2) {
    Array.prototype.map2 = function(callback) {
        // 'this' aqui é o array que chamou o map2
        let novoArray = []

        for (let i = 0; i < this.length; i++) {
            // chamamos o callback passando: valor atual, índice e o array original
            novoArray.push(callback(this[i], i, this))
        }

        return novoArray
    }
}

// Exemplo de uso do map2
let numeros = [1, 2, 3, 4]

// aplica a função de callback a cada item, como o map original
let dobrados = numeros.map2(function(valor) {
    return valor * 2
})

console.log(dobrados) // [2, 4, 6, 8]
    