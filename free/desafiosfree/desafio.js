/*
Objetivo:
Crie uma função chamada arrayStats que receba como parâmetro um array de números e retorne um objeto com as seguintes propriedades:
- min: o menor número do array.
- max: o maior número do array.
- sum: a soma de todos os números.
- count: a quantidade de elementos.
- average: a média dos números, arredondada para 2 casas decimais.
- unique: um array contendo apenas os valores únicos (sem repetições) e ordenados de forma crescente.

// Exemplo de array de entrada:
const numeros = [5, 3, 8, 5, 1, 4, 3];

// Saída esperada:
{
  min: 1,
  max: 8,
  sum: 29,
  count: 7,
  average: 4.14,   // 29 / 7 ≈ 4.14 (arredondado para duas casas decimais)
  unique: [1, 3, 4, 5, 8]
}
*/

const numeros = [5, 3, 8, 5, 1, 4, 3];

function arrayStats(array) {
    if (array.length === 0) return "Não há dados a serem analisados";

    let min = Math.min(...array);
    let max = Math.max(...array);
    let sum = 0;

    const unique = array.reduce(function (unique, numero) {
        sum += numero;
        if (!unique.includes(numero)) {
            unique.push(numero);
        }
        return unique;
    }, []).sort((a, b) => a - b);

    let count = array.length;
    let average = Number((sum / count).toFixed(2));

    return {
        min,
        max,
        sum,
        count,
        average,
        unique
    };
}

console.log(arrayStats(numeros));