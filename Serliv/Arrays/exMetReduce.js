/* exercício Criar uma lista de números unicos usando o metodo reduce() */

const numeros = [1, 3, 4, 1, 4, 5, 3, 5, 8, 9]

/* Minha resolução */
const numUnicos = numeros.reduce(function(arr, numero){
    if (!arr.includes(numero)){
        arr.push(numero)
    }
    return arr
}, [])

console.log(numUnicos)

/* Resolução do professor */

const numerosUnicos2 = numeros.reduce(function(numerosUnicos, numeroAtual){
    if(numerosUnicos.indexOf(numeroAtual) < 0){
        numerosUnicos.push(numeroAtual)
    }
    return numerosUnicos
}, []);

console.log(numerosUnicos2)

/* Forma abreviada utilizando o Set*/

const numerosUnicos3 = [...new Set(numeros)];

console.log(numerosUnicos3)

/*
O Set é uma estrutura de dados nativa do JavaScript (introduzida no ES6) que armazena valores únicos, ou seja, não permite duplicatas.

    Características principais do Set:
    Armazena qualquer tipo de valor: números, strings, objetos, etc.

    Não aceita valores duplicados.

    Mantém a ordem de inserção dos elementos.

    É iterável, ou seja, você pode usar for...of, forEach, spread, etc.
*/ 