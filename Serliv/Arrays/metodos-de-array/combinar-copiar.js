/*==========================================
    metodos para combinar e copiar arrays
===========================================*/

// Array base inicial
let numeros = [1, 2, 3, 4, 5];
console.log("Array inicial:", numeros); 
// Saída: [1, 2, 3, 4, 5]

// 1. concat - combina arrays e retorna um novo array (não altera o original)
let maisNumeros = [6, 7, 8];
let combinado = numeros.concat(maisNumeros, [9, 10]);
console.log("Array após concatenação:", combinado);
// Saída: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log("Array original após concat:", numeros);
// Saída: [1, 2, 3, 4, 5] (não mudou)

// 2. slice - cria uma cópia de parte do array (do índice inicio até fim - 1)
let parte = numeros.slice(1, 4);
console.log("Array criado com slice (índices 1 a 3):", parte);
// Saída: [2, 3, 4]
console.log("Array original após slice:", numeros);
// Saída: [1, 2, 3, 4, 5] (não mudou)

// 3. splice - altera o array original removendo e/ou adicionando elementos
// sintaxe: splice(indiceInicial, quantidadeRemover, elementosAdicionar...)
let removidos = numeros.splice(2, 2, 30, 40); 
// a partir do índice 2, remove 2 elementos (3 e 4), e adiciona 30 e 40
console.log("Array após splice (remover 2 e adicionar 30,40):", numeros);
// Saída: [1, 2, 30, 40, 5]
console.log("Elementos removidos pelo splice:", removidos);
// Saída: [3, 4]
