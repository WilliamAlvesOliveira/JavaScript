/*========================================
    Métodos de iteração e transformação
========================================*/

// Métodos de iteração e transformação

const numeros = [1, 2, 3, 4, 5];

console.log("Array original:", numeros);

/*
1. forEach(callback(elemento, índice, array)) 

Executa a função `callback` para cada elemento do array, sem retornar nada (undefined).
Parâmetros da callback:
- elemento: valor do elemento atual.
- índice: posição do elemento no array.
- array: o próprio array que está sendo iterado.
Uso típico: executar ações que não precisam de retorno, como imprimir ou modificar algo fora do array.
*/
console.log("Usando forEach para imprimir cada número:");
numeros.forEach((num, indice) => {
    console.log(`Índice ${indice}:`, num);
});

/*
2. map(callback(elemento, índice, array))

Cria e retorna um novo array aplicando a função `callback` a cada elemento do array original.
Parâmetros da callback são os mesmos do forEach.
Uso típico: transformar os elementos, criando um novo array sem modificar o original.
*/
const quadrados = numeros.map(num => num * num);
console.log("Array com quadrados usando map:", quadrados);
// Saída: [1, 4, 9, 16, 25]

/*
3. filter(callback(elemento, índice, array))

Cria e retorna um novo array contendo apenas os elementos que passam no teste definido pelo `callback`, que deve retornar true ou false.
Uso típico: filtrar elementos que satisfazem uma condição.
*/
const pares = numeros.filter(num => num % 2 === 0);
console.log("Números pares usando filter:", pares);
// Saída: [2, 4]

/*
4. reduce(callback(acumulador, elemento, índice, array), valorInicial)

Reduz o array a um único valor acumulando resultados via `callback`.
- acumulador: valor acumulado retornado na última chamada do callback.
- elemento: elemento atual sendo processado.
- índice e array: mesmos que nos outros métodos.
- valorInicial: valor inicial do acumulador (opcional, mas recomendado).
Uso típico: somar valores, concatenar strings, ou acumular qualquer tipo de resultado.
*/
const soma = numeros.reduce((acumulador, num) => acumulador + num, 0);
console.log("Soma dos números usando reduce:", soma);
// Saída: 15

/*
5. flatMap(callback(elemento, índice, array))

Executa o map seguido de um flat de profundidade 1.
O `callback` deve retornar um array ou valor para cada elemento, e os arrays resultantes serão "achatados" em um único array.
Uso típico: mapear e achatar arrays aninhados em uma única operação.
*/
const palavras = ["hello world", "foo bar"];
const letras = palavras.flatMap(frase => frase.split(" "));
console.log("Resultado de flatMap (dividindo frases em palavras):", letras);
// Saída: ["hello", "world", "foo", "bar"]
