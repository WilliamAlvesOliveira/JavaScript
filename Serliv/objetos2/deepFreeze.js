const obj1 = {
    foo: 'bar',
    internalprop: {}
};

//=====================
// Object.freeze(obj)
//=====================

// Congela o objeto obj1 superficialmente (shallow freeze)
// ou seja, só as propriedades de primeiro nível ficam imutáveis
Object.freeze(obj1);

// Tentando alterar a propriedade primitiva 'foo'
obj1.foo = 'alterado'; // Ignorado (ou erro em modo estrito)
console.log(obj1); // { foo: 'bar', internalprop: {} }

// Tentando alterar um objeto interno (ainda é possível! pois só o obj1 foi congelado)
obj1.internalprop.foo = 'bar'; // FUNCIONA!
console.log(obj1); // { foo: 'bar', internalprop: { foo: 'bar' } }

// Agora congelamos também o objeto interno
Object.freeze(obj1.internalprop);

// Tentamos adicionar outra propriedade ao objeto interno (agora congelado)
obj1.internalprop.foo2 = 'bar22'; // Ignorado
console.log(obj1); // { foo: 'bar', internalprop: { foo: 'bar' } }

/*======================
    deepFreeze(obj)
=======================*/

// Função recursiva para congelar profundamente um objeto (deep freeze)
function deepfreeze(object) {
    // Lista todas as propriedades próprias (não herdadas)
    const propNames = Object.getOwnPropertyNames(object);

    // Para cada propriedade:
    propNames.forEach(name => {
        let prop = object[name];

        // Se a propriedade for um objeto e não for nula, aplica deepfreeze nela também
        if (typeof prop === 'object' && prop !== null) {
            deepfreeze(prop);
        }
    });

    // Por fim, congela o objeto atual
    return Object.freeze(object);
}

// Exemplo de uso:
const obj2 = {
    foo: 'bar',
    internalprop: {
        array: [1, 2, 3],
        internalobject: {
            teste: 'teste'
        }
    }
};

// Aplica deepFreeze no objeto completo
deepfreeze(obj2);

// Tentativas de alteração
obj2.foo = 'alterado'; // Ignorado
// obj2.internalprop.array.push(4); // Gera erro em modo estrito! (objeto interno congelado)
obj2.internalprop.internalobject.teste = 'alterado'; // Ignorado

console.log(obj2);
// {
//   foo: 'bar',
//   internalprop: {
//     array: [1, 2, 3],
//     internalobject: { teste: 'teste' }
//   }
// }