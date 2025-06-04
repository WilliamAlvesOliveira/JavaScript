/*--------------------------------------
    exemplo de metodo de objeto cumum
----------------------------------------*/

function latir(){
    console.log(this.name, 'says: au au')
}

function miar(){
    console.log(this.name, 'says: miau')
}

const dog = {
    name: 'rex',
    falar: latir
}

const cat = {
    name: 'Cookie',
    falar: miar
}

dog.falar()
cat.falar()

console.log('-------------------------')
/*----------------------
    Exemplo 1 da aula
------------------------*/

const dog2 = {
    name: 'Maillow',
    falar: function(){
        console.log(this.name, 'says: au au')
    },
    //em casos simples podemos omitir a função
    falar2(){
        console.log(this.name, 'says: Rrrrrrrrr')
    }
}

dog2.falar()
dog2.falar2()

const cat2 = {
    name: 'Gatão',
    //em casos onde a função esta fora do objeto não podemos omitir
    //modo errado
    falar(){
        miar()
    }
}

cat2.falar()//name === undefined
// this dentro da função miar() depende de quem a chama.
// Como ela está fora do objeto, quando chamada de dentro de cat2.falar(), ela não "herda" o this do objeto.
// Resultado: this dentro de miar() é o escopo global (window no browser, undefined no Node, erro no strict mode).

console.log('-------------------------')
/*--------------
    RESUMO:
---------------*/
// - Métodos definidos diretamente no objeto usam o this corretamente.
// - Funções externas precisam de call(), apply() ou bind() para acessar o this do objeto.
// - call(thisArg, ...args) e apply(thisArg, args[]) executam a função imediatamente.
// - bind(thisArg) retorna uma nova função com o this fixado, que pode ser chamada depois.

const cat3 = {
    name: 'Fujimoto',
    //corrigindo falar com o metodo call
    falar(){
        miar.call(this)
    }
}

cat3.falar()
