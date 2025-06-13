// Criamos um objeto 'pai' com uma propriedade 'nome' e um método 'falar'
const pai = {
    nome: 'pai',
    falar() {
        console.log(this.nome + ' diz Olá'); // 'this' se refere ao objeto que chama o método
    }
};

/*===============
    .create
================*/

// Criamos um novo objeto 'filho' que herda de 'pai'
// 'filho' agora tem 'pai' como seu protótipo
const filho = Object.create(pai, {
    nome: {
        value: 'filho',
        enumerable: true // Só com isso já faz com que o nome apareça nos logs (for...in, Object.keys etc.)
        // writable e configurable continuam false por padrão
    }
});

console.log(pai);         // Exibe pai com suas propriedades
console.log(filho);       // Exibe apenas as propriedades próprias de filho (nome)
console.log(filho.__proto__); // Exibe o protótipo de filho → pai

filho.falar(); // "filho diz Olá" → método vem do protótipo, mas 'this' é filho


/*================
    .assign
================*/

const obj1 = {
    a: 'a',
    b: 'b',
    c: 'c'
};

// Object.assign(destino, ...fontes)
// Ele copia *somente as propriedades enumeráveis e próprias* dos objetos fonte
// e sobrescreve propriedades já existentes no destino se houver conflito

const filha = Object.assign(obj1, filho);
// Copia propriedades de filho (nome) para obj1 (e retorna o próprio obj1)
// ATENÇÃO: obj1 agora foi **modificado**

const filha2 = Object.assign({}, obj1, filho);
// Cria um novo objeto vazio, copia propriedades de obj1 e depois de filho
// Isso evita modificar os objetos originais

console.log(filho);   // { nome: 'filho' }
console.log(filha);   // obj1 agora tem { a, b, c, nome }
console.log(filha2);  // Novo objeto com { a, b, c, nome }

// Adicionando uma nova propriedade em obj1 depois do assign
obj1.d = 'd';

console.log(filha);   // Também mostra 'd', porque 'filha' é o próprio obj1
console.log(filha2);  // Não muda! É um clone feito no momento do assign


// TESTANDO COM PROPRIEDADES NÃO ENUMERÁVEIS
const obj2 = {
    c: 'c2',
    d: 'd2'
};

Object.defineProperties(obj2, {
    'não enumeravel': {
        value: 'não enumeravel',
        enumerable: false // não será copiada por Object.assign
    }
});

const clone = Object.assign({}, obj1, obj2);
// Copia apenas propriedades enumeráveis de obj1 e obj2 para um novo objeto

console.log(clone); 
// Mostra { a: 'a', b: 'b', c: 'c2', d: 'd2', nome: 'filho' }
// A propriedade 'não enumeravel' não aparece


// SPREAD OPERATOR (ES6+)
// Faz algo parecido com Object.assign({}, ...)
// Também ignora propriedades não enumeráveis ou com símbolos

const obj3 = { ...obj1, ...obj2 }; // obj2 sobrescreve obj1 em caso de conflito
const obj4 = { ...obj2, ...obj1 }; // obj1 sobrescreve obj2

console.log(obj3); // { a: 'a', b: 'b', c: 'c2', d: 'd2', nome: 'filho' }
console.log(obj4); // { c: 'c', d: 'd', a: 'a', b: 'b', nome: 'filho' }

/*============
    .keys
=============*/

// Object.keys(obj) → Retorna um array com os nomes (chaves) das propriedades próprias e enumeráveis
console.log(Object.keys(obj2));
// Saída: [ 'c', 'd' ]
// 'não enumeravel' não aparece porque não é enumerável


/*==============
    .values
===============*/

// Object.values(obj) → Retorna um array com os valores das propriedades próprias e enumeráveis
console.log(Object.values(obj2));
// Saída: [ 'c2', 'd2' ]
// Mesmo motivo: só mostra valores das chaves enumeráveis

/*==============
    .entries
===============*/

// Object.entries(obj) → Retorna um array com pares [chave, valor] das propriedades próprias e enumeráveis
console.log(Object.entries(obj2));
// Saída: [ ['c', 'c2'], ['d', 'd2'] ]

// Guardamos o array retornado em uma variável
const entradas = Object.entries(obj2);

// Mostra o array completo com os pares chave-valor
console.log(entradas);           
// Saída: [ ['c', 'c2'], ['d', 'd2'] ]

// Acessamos o primeiro par [chave, valor]
console.log(entradas[0]);        
// Saída: ['c', 'c2']

// Acessamos a chave do primeiro par
console.log(entradas[0][0]);     
// Saída: 'c'

// Acessamos o valor do primeiro par
console.log(entradas[0][1]);     
// Saída: 'c2'


