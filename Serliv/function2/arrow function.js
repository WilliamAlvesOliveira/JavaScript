 //função nominal comum (function declaration)
function teste(){
    console.log('funtion declaration teste')
    return 'function declaration'
}

const test1 = teste()
console.log(test1)

console.log('-------------------')

//mesma função com arrow function
const testArrow = (/*podemos passar parametros normalmente*/) => {
    console.log('teste arrow function')
    return 'arrow function'
}


const test2 = testArrow()
console.log(test2)

console.log('-------------------')

//quando recebemos apenas um parametro nas arrow functions, podemos excluir os parenteses
const testeArrow2 = str => {
    console.log('teste aroow funtion',str)
    return 'arrow function sem parenteses'
}

const test3= testeArrow2('removendo os parenteses')
console.log(test3)

console.log('-------------------')

//se a arrow function precisar apenas retornar um resultado podemos abreviar retirando as chaves e a palavra return
const testeArrow3 = str =>  str + ' arrow function' //retorno implícito

const test4= testeArrow3('shorthand')
console.log(test4)

console.log('-------------------')

//shorthands com mais de um parametro precisa de parenteses
const testeArrow4 = (n1, n2) =>  n1 + n2

const soma = testeArrow4(3,2)
console.log(soma)

console.log('-------------------')

//arrow functionas podem retornar objetos
const arrowObject = () => {
    console.log('arrow function retornando objeto')
    return{
        nome: 'william',
        idade: 31
    }
}

const test5 = arrowObject()
console.log(test5)
console.log(test5.nome) //acessando a propriedade utilizando o .
console.log(test5['nome']) //acessando a propriedade utilizando []

console.log('-------------------')

//para usar a shorthand retornando um objeto devemos por o objeto dentro de parenteses, caso contrario o interpretador do javascript vai interpretar como o corpo da função
const arrowObject2 = () => ({
    nome: 'william',
    idade: 31
})

const test6 = arrowObject2()
console.log(test6)


// Não podemos esquecer que as arrow functions não são hoistiadas, portanto não podemos executa-las antes da sua declaração.

//Arrow functions herdam o this do escopo onde foi criada, portanto não possuem um this proprio.