/*==============================================
    adicionar e remover elementos de um array
==============================================*/


let frutas = ["maçã", "banana", "laranja"] // Criando um array base com alguns elementos

console.log("Array inicial:", frutas);  // Saída: ["maçã", "banana", "laranja"]

// 1. push - adiciona um ou mais elementos no final do array
let novoTamanho = frutas.push("manga", "uva")

console.log("Após push (adicionar no final):", frutas); // Saída: ["maçã", "banana", "laranja", "manga", "uva"]
console.log("Novo tamanho do array após push:", novoTamanho); // 5

// 2. pop - remove o último elemento do array e retorna ele
let frutaRemovida = frutas.pop();
console.log("Após pop (remover último):", frutas);
// Saída: ["maçã", "banana", "laranja", "manga"]
console.log("Elemento removido com pop:", frutaRemovida); // "uva"

// 3. unshift - adiciona um ou mais elementos no início do array
novoTamanho = frutas.unshift("morango", "abacaxi");
console.log("Após unshift (adicionar no início):", frutas);
// Saída: ["morango", "abacaxi", "maçã", "banana", "laranja", "manga"]
console.log("Novo tamanho do array após unshift:", novoTamanho); // 6

// 4. shift - remove o primeiro elemento do array e retorna ele
frutaRemovida = frutas.shift();
console.log("Após shift (remover primeiro):", frutas);
// Saída: ["abacaxi", "maçã", "banana", "laranja", "manga"]
console.log("Elemento removido com shift:", frutaRemovida); // "morango"
