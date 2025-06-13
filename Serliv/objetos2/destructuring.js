/*===========================
    Destructuring (Objeto)
===========================*/

// Criamos um objeto chamado 'eu' com duas propriedades: 'nome' e 'sobrenome'
const eu = {
    nome: 'William',
    sobrenome: 'Alves de Oliveira'
};

// Aqui usamos a desestruturação para extrair as propriedades diretamente para variáveis com o mesmo nome
let { nome, sobrenome } = eu;

// Embora pareça um objeto entre chaves, na verdade é um atalho para criar variáveis com base nas propriedades do objeto
// A ordem não importa — o que importa é o nome da propriedade
console.log(nome);       // Saída: 'William'
console.log(sobrenome);  // Saída: 'Alves de Oliveira'

/*===================================================
    Renomeando variáveis durante a desestruturação
====================================================*/

// Podemos extrair a propriedade e dar outro nome para a variável
let { nome: n, sobrenome: sn } = eu;

console.log(n);   // Saída: 'William'
console.log(sn);  // Saída: 'Alves de Oliveira'

/*============================
    Propriedades inexistentes
=============================*/

// Se a propriedade não existir no objeto, a variável recebe 'undefined'
let { idade } = eu;
console.log(idade); // Saída: undefined

/*=============================
    Definindo valor padrão
==============================*/

// Podemos evitar o 'undefined' definindo um valor padrão
let { idade: i = 30 } = eu;
console.log(i); // Saída: 30

/*=====================================
    Desestruturação em parâmetros
======================================*/

// Também é possível usar diretamente em parâmetros de função
function apresentar({ nome, sobrenome }) {
    console.log(`Olá! Meu nome é ${nome} ${sobrenome}.`);
}

apresentar(eu); // Saída: Olá! Meu nome é William Alves de Oliveira.

/*===============================
    Cuidados com variáveis já criadas
================================*/

// Se você já declarou a variável antes, precisa usar parênteses
let cidade;
({ cidade = 'Desconhecida' } = { cidade: 'São Paulo' });

console.log(cidade); // Saída: São Paulo

