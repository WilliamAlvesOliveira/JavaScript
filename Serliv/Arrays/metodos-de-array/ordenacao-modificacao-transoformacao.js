// Métodos de ordenação, modificação e transformação

const letras = ['d', 'a', 'c', 'b', 'e'];
console.log("Array original:", letras);

// 1. sort - ordena o array (alfabeticamente por padrão)
letras.sort();
console.log("Array após sort():", letras);
// Saída: ['a', 'b', 'c', 'd', 'e']

// sort com função de comparação numérica
const numeros = [10, 2, 5, 1, 9];
numeros.sort((a, b) => a - b);
console.log("Números ordenados:", numeros);
// Saída: [1, 2, 5, 9, 10]

// 2. reverse - inverte a ordem dos elementos
numeros.reverse();
console.log("Números após reverse():", numeros);
// Saída: [10, 9, 5, 2, 1]

// 3. join - une elementos em uma string com separador
const frase = letras.join('-');
console.log("Array letras unido com '-':", frase);
// Saída: 'a-b-c-d-e'

// 4. fill - preenche array com valor entre índices
const arrayFill = [0, 0, 0, 0, 0];
arrayFill.fill(7, 1, 4); 
// preenche índice 1 até 3 com o valor 7 (4 é não incluso)
console.log("Array após fill(7, 1, 4):", arrayFill);
// Saída: [0, 7, 7, 7, 0]

// 5. flat - achata arrays aninhados
const arrayAninhado = [1, [2, 3], [4, [5, 6]]];
console.log("Array aninhado original:", arrayAninhado);

const plano1 = arrayAninhado.flat();
console.log("flat() com profundidade padrão (1):", plano1);
// Saída: [1, 2, 3, 4, [5, 6]]

const plano2 = arrayAninhado.flat(2);
console.log("flat(2) - achata até profundidade 2:", plano2);
// Saída: [1, 2, 3, 4, 5, 6]
