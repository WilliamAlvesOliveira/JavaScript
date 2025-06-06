/*================
    rest operator
=================*/

//em uma função devemos receber valores por parametro
function teste(n1, n2, n3, n4, n5){
    console.log(n1, n2, n3, n4, n5)
}

teste(1,2,3,4,5)

//note que nesse primeiro exemplo recebemos ambos os valores e os imprimimos, porém ha alguns problemas, pois se passassemos mais um parâmetro ele seria ignorado pela função
teste(1,2,3,4,5,6) // numero 6 será ignorado

//da mesma forma, se passarmos um parâmetro a menos ele seria undefined(a não ser que utilizassemos valores como default)
teste(1,2,3) //ambos os 2 ultimos valores seriam undefined

//e por valores default além de muito verboso seria ruim em casos de comparaçãoes com o menor valor etc
function variosParametros(n1=0, n2=0, n3=0, n4=0, n5=0){
    console.log(n1, n2, n3, n4, n5)
}

variosParametros() //printa os valores como 0, mais se eu passasse 1,2,3 e tivesse uma lógica na função para saber qual é o menor, o menor seria o 0 padrão

//para isso devemos usar o rest operator (...)
 // ATENÇÃO!!! Podemos passar mais de um parâmetro antes do rest operator,
    // como em (n1, n2, ...n3). Assim, n1 e n2 receberão os primeiros valores
    // normalmente, e 'n3' armazenará o restante como array.
    // IMPORTANTE: O rest operator deve sempre vir por último, senão gerará erro.
function teste2(...numeros){// ATENÇÃO!!! podemos passar mais de um parâmetro e usar o rest 
    console.log(numeros)
    console.log(typeof numeros) 
    // Embora seja mostrado como array e tenha os métodos de array (como map), o typeof retorna 'object' porque todo array em JavaScript é, na verdade, um tipo especial de objeto.
    // No entanto, o valor retornado pelo rest operator é um **array real**, com acesso total aos métodos do prototype de Array.
    
    console.log(numeros.map) 
    // Aqui vemos que o método map existe, pois 'numeros' é de fato um array (diferente, por exemplo, de 'arguments' que é array-like).
}

teste2(1,2,3,4,5) // o console.log da função vai printar um array com os valores

/*
================
    Conclusão
================

O operador REST (`...`) permite que funções recebam um número variável de argumentos, agrupando-os em um array real. Isso torna o código mais flexível e limpo, pois não é necessário definir cada parâmetro manualmente ou lidar com o objeto `arguments`.

Vantagens do REST:
- Lida bem com número indefinido de parâmetros.
- É mais legível e prático do que usar `arguments`.
- Permite o uso direto de métodos de array como `map`, `filter`, `reduce`, etc.

Obs: O REST operator só pode ser usado como último parâmetro da função.
*/

/*
==============================
  Diferença entre REST e SPREAD
==============================
*/

// REST OPERATOR (coleta valores em um único parâmetro como array)
function somarTudo(...numeros) {
    return numeros.reduce((total, atual) => total + atual, 0)
}

console.log(somarTudo(1, 2, 3, 4)) // 10
// O operador REST (...numeros) junta os argumentos em um único array chamado 'numeros'.

// SPREAD OPERATOR (espalha os valores de um array ou objeto)
const valores = [1, 2, 3, 4]
console.log(somarTudo(...valores)) // 10
// Aqui usamos o SPREAD (...valores) para espalhar os elementos do array como se fossem passados um a um na função.

// Exemplo com objetos:
const obj1 = { nome: 'Rex', idade: 5 }
const obj2 = { cor: 'preto', peso: 20 }

const cachorro = { ...obj1, ...obj2 }
console.log(cachorro)
// { nome: 'Rex', idade: 5, cor: 'preto', peso: 20 }
// O SPREAD pega as propriedades de vários objetos e as combina em um novo objeto

/*
=================
  Conclusão
=================

- REST: junta (agrega) vários valores em uma única estrutura (normalmente usada em parâmetros de funções).
  Exemplo: function minhaFuncao(...args) {}

- SPREAD: espalha elementos de um array (ou propriedades de um objeto) em outro contexto (função, array ou objeto).
  Exemplo: const novoArray = [...arrayOriginal]

Ambos usam os mesmos três pontinhos (...), mas têm propósitos opostos:
➡ REST = juntar
➡ SPREAD = espalhar
*/

