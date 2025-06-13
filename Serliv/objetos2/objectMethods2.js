const obj1 = {
    prop1: 'propriedade 1',
    prop2: 'propriedade 2'
};

// Fazemos cópias do objeto original para aplicar os diferentes métodos
const objFreeze = { ...obj1 };
const objSeal = { ...obj1 };
const objPreventExtension = { ...obj1 };

/*=================
    Object.freeze
==================*/

// Object.freeze(obj) → Congela o objeto:
// ❌ Não permite adicionar novas propriedades
// ❌ Não permite excluir propriedades
// ❌ Não permite alterar os valores das propriedades
Object.freeze(objFreeze);

// Tentativas de modificação:
objFreeze.prop1 = 'nova prop1';         // Ignorado (modo não estrito) ou erro (modo estrito)
objFreeze.novaProp = 'propriedade nova'; // Ignorado
delete objFreeze.prop2;                  // Ignorado

console.log('objFreeze:', objFreeze);
// Saída: { prop1: 'propriedade 1', prop2: 'propriedade 2' }

/*===============
    Object.seal
================*/

// Object.seal(obj) → Sela o objeto:
// ❌ Não permite adicionar novas propriedades
// ❌ Não permite excluir propriedades
// ✅ Permite modificar o valor das propriedades existentes
Object.seal(objSeal);

// Tentativas de modificação:
objSeal.prop1 = 'nova prop1';           // Funciona
objSeal.novaProp = 'propriedade nova';  // Ignorado
delete objSeal.prop2;                   // Ignorado

console.log('objSeal:', objSeal);
// Saída: { prop1: 'nova prop1', prop2: 'propriedade 2' }

/*==============================
    Object.preventExtensions
==============================*/

// Object.preventExtensions(obj) → Impede extensões:
// ❌ Não permite adicionar novas propriedades
// ✅ Permite excluir propriedades existentes
// ✅ Permite modificar propriedades existentes
Object.preventExtensions(objPreventExtension);

// Tentativas de modificação:
objPreventExtension.prop1 = 'nova prop1';            // Funciona
delete objPreventExtension.prop2;                    // Funciona
objPreventExtension.novaProp = 'propriedade nova';   // Ignorado

console.log('objPreventExtension:', objPreventExtension);
// Saída: { prop1: 'nova prop1' } → prop2 foi excluída

 