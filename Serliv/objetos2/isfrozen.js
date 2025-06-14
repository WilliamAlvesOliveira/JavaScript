/*============================================
    CONGELAMENTO DE OBJETOS - Object.freeze
    e verificação com Object.isFrozen()
=============================================*/

const obj1 = {
    nome: 'William'
};

const obj2 = {
    nome: 'Maria'
};

/*=====================
    Object.freeze()
=======================*/

// Congelamos o objeto obj1 com Object.freeze()
// Isso impede: adicionar, remover ou modificar propriedades
Object.freeze(obj1);

// Verificando se obj1 está congelado com Object.isFrozen()
console.log('obj1 está congelado?', Object.isFrozen(obj1)); // true

// Verificando obj2 (ainda não foi congelado)
console.log('obj2 está congelado?', Object.isFrozen(obj2)); // false

/*==========================================================
    Testando se um objeto pode ser considerado congelado
    sem usar Object.freeze() diretamente
===========================================================*/

// Aqui estamos definindo manualmente a propriedade 'nome' como:
// - não editável (writable: false)
// - não configurável (configurable: false)
Object.defineProperty(obj2, 'nome', {
    writable: false,
    configurable: false
});

// Mesmo após isso, obj2 ainda NÃO é considerado congelado
// porque ele ainda pode receber novas propriedades
console.log('obj2 está congelado após definirProperty?', Object.isFrozen(obj2)); // false

// Agora impedimos que novas propriedades sejam adicionadas
Object.preventExtensions(obj2);

// E agora sim, o objeto atende os 3 critérios para ser considerado frozen:
// - Não extensível
// - Todas as propriedades não editáveis
// - Todas as propriedades não configuráveis
console.log('obj2 está congelado após preventExtensions?', Object.isFrozen(obj2)); // true

/*==========================================
    Relembrando: um objeto é frozen se for:
    - Não extensível
    - Todas as props forem:
        writable: false
        configurable: false
===========================================*/

//obs:assim como o método frozen tem o is frozem e pode ser feito sem o própriométodo, o seal tem Object.isSealed e o prevente extenwionw  tem o Object.isExtensible