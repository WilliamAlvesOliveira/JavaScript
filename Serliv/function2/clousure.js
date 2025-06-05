const teste = (function(){
    return 'meu retorno'
})()

console.log(teste)// saída sera a string retornada, pois a função se auto invoca


const teste1 = (function(){
    return function testeInterno(){
        console.log('teste interno foi chamado')
        return 'retorno do teste interno'
    }
})()

console.log(teste1) //retorna function pois teste1 é uma função
console.log('-----')
console.log(teste1()) //executa a função teste1, saida no console será o log e retorno
console.log('-----')
let str = teste1() //saida no console será o log da função e str recebe o valor do retorno
console.log('-----')
console.log(str)//saída no console vai ser o valor retornado

console.log('--------------------')

/*-------------
Closure
--------------*/
//refere-se a capacidade de uma função de lembrar das variáveis do contexto onde ela foi criada

const teste2 = (function(){
    let n = 0 //variável local no escopo da função teste2
    return function testeInterno(){
        console.log('printando veriável fora do escopo da função ', n) //logando variável que foi declarada fora da função via closure
        return 'retorno da variável fora da função '+n//retornando a variável declarada fora da função
    }
})()

console.log(teste2())//executa a função printando a variavel 0
console.log('-----')
let teste2Str = teste2()//printa a veriavel 0
console.log('-----')
console.log(teste2Str) //recebe o retorno com a veriavel 0

console.log('--------------------')

const teste3 = (function(){
    let n = 0 
    return function testeInterno(){
        console.log('acresentando valor a n ', ++n) //neste caso a veriável sofre reatribuição no seu valor, assim 1 é acresentado a n
        return 'retorno da variável n com valor incrementado '+ n //toda vez que a função for chamada irá ser acrecentado 1 a n
    }
})()

console.log(teste3()) //executa a função normalmente e acresenta (n === 1)
console.log('-----')
let teste3Str = teste3() //aqui a str vai receber o valor retornado, mais como a função é executada ela acrescenta novamente (n === 2)
console.log('-----')
console.log(teste3Str) //aqui o valor da variável é igual 2
console.log('-----')
teste3() //executa novamente (n === 3)
teste3() //(n === 4)
console.log('-----')
let teste3Str2 = teste3() //nova variavel ececuta novamente a função (n == 5)
console.log(teste3Str2) //printa o retorno da função (n === 5)

console.log('--------------------')

//ao invés de criarmos a variável que vai ser alterado no closure ela pode ser passada por parâmetro
const teste4 = (function(n){
    return function testeInterno(){
        console.log('acresentando valor a n ', ++n) //neste caso a veriável sofre reatribuição no seu valor, assim 1 é acresentado a n
        return 'retorno da variável n com valor incrementado '+ n //toda vez que a função for chamada irá ser acrecentado 1 a n
    }
})(10)

console.log(teste4()) // n === 11
console.log('-----')
let teste4Str = teste4() // n === 12
console.log('-----')
console.log(teste4Str) // somente printa o retorno n === 12
console.log('-----')
teste4() //n === 13
teste4() //(n === 14)
console.log('-----')
let teste4Str2 = teste4() //n === 15
console.log(teste4Str2) //printa o retorno da função (n === 15)

/*
-------------------------------
Anotações complementares sobre Closure
-------------------------------

- Closure não é apenas "lembrar de variáveis". 
  Ele mantém o escopo da função original vivo mesmo após sua execução.
  Isso permite que variáveis internas continuem existindo entre chamadas de função.

- Cuidado com variáveis compartilhadas em loops:
  Quando usamos `var`, todas as funções criadas no loop compartilham o mesmo escopo.
  Para evitar esse problema, use `let`, que possui escopo de bloco.

- Closures permitem encapsular dados e criar "variáveis privadas":
  É possível proteger variáveis do acesso externo e permitir apenas interações controladas 
  através de funções (por exemplo, contador, conta bancária, etc.).

- Closures são fundamentais em JavaScript moderno.
  Eles são usados em callbacks, event listeners, funções que retornam outras funções 
  e até mesmo em bibliotecas e frameworks como React (hooks, por exemplo).

- Resumo:
  • Closure = função + escopo onde foi criada
  • Muito útil para manter estado entre chamadas
  • Permite criar código mais seguro e modular
  • Atenção ao comportamento de escopo em loops
*/

