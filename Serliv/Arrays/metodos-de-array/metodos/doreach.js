/*========================================
  Método Array.prototype.forEach()
==========================================

- O método `forEach` executa uma função para **cada item** de um array.
- Não retorna um novo array (retorna `undefined`).
- Muito útil para executar efeitos colaterais (ex: imprimir, alterar variáveis externas etc.).
- A função de callback recebe até 3 parâmetros:
  1. Valor atual
  2. Índice
  3. O array original completo
*/

// Array base para os exemplos
const frutas = ['maçã', 'banana', 'laranja', 'melancia'];

/*========================================
  Exemplo 1 - Usando função nomeada
========================================*/

function imprimirFruta(fruta, indice) {
  console.log(`Fruta ${indice + 1}: ${fruta}`);
}

frutas.forEach(imprimirFruta);


/*========================================
  Exemplo 2 - Função anônima
========================================*/

frutas.forEach(function(fruta, i) {
  console.log(`[${i}] -> ${fruta.toUpperCase()}`);
});


/*========================================
  Exemplo 3 - Usando arrow function (forma moderna)
========================================*/

frutas.forEach((fruta, index, array) => {
  console.log(`"${fruta}" está no índice ${index} do array completo:`, array);
});


/*========================================
  Exemplo 4 - Somando valores de um array numérico
========================================*/

const numeros = [10, 20, 30];
let soma = 0;

numeros.forEach(numero => {
  soma += numero;
});

console.log("Soma dos números:", soma); // Saída: 60


/*========================================
  Exemplo 5 - Interagindo com objetos dentro do array
========================================*/

const produtos = [
  { nome: 'Notebook', preco: 3000 },
  { nome: 'Mouse', preco: 150 },
  { nome: 'Teclado', preco: 250 }
];

produtos.forEach(produto => {
  console.log(`${produto.nome} custa R$ ${produto.preco}`);
});


/*========================================
  Exemplo 6 - Modificando objetos diretamente
========================================*/

produtos.forEach(p => {
  p.precoComDesconto = p.preco * 0.9; // desconto de 10%
});

console.log("Produtos com desconto:", produtos);


/*========================================
  Exemplo 7 - Cuidado! forEach NÃO pode ser interrompido
========================================*/

const nomes = ['Ana', 'Carlos', 'Pedro'];

nomes.forEach(nome => {
  if (nome === 'Carlos') {
    console.log('Encontrado Carlos!');
    // return aqui só sai do callback, NÃO do forEach
  }
});

/*
⚠️ Importante: `forEach` NÃO pode ser interrompido com `break`, `return` ou `continue`.
Se você precisa interromper a iteração, use um `for`, `for...of` ou `some`.
*/


/*========================================
  Exemplo 8 - Usos mais criativos: DOM (em navegadores)
========================================*/
/*
// Suponha uma lista de elementos no HTML
const botoes = document.querySelectorAll('button');

botoes.forEach(btn => {
  btn.addEventListener('click', () => {
    alert(`Clicou no botão ${btn.textContent}`);
  });
});
*/


/*========================================
  Resumo:
========================================
- forEach é ótimo para executar efeitos colaterais (ex: print, DOM, somas).
- Não retorna array, apenas executa.
- Não pode ser interrompido.
- Evite usá-lo se você precisa construir um novo array (prefira map, filter).
*/