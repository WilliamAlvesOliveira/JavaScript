// Quando criamos um objeto assim:
const pessoa = {
    nome: 'William'
};

// Podemos verificar as *descrições* da propriedade 'nome':
console.log(Object.getOwnPropertyDescriptor(pessoa, 'nome'));
/*
  Saída:
  {
    value: 'William',      // O valor armazenado na propriedade
    writable: true,        // Pode ser alterado (ex: pessoa.nome = 'Outro nome')
    enumerable: true,      // Aparece em loops (ex: for...in ou Object.keys)
    configurable: true     // Pode ser deletada ou ter a descrição alterada com defineProperty
  }
*/


// Podemos alterar ou definir a descrição de uma propriedade com `Object.defineProperty`
Object.defineProperty(pessoa, 'sobrenome', {
    value: 'Alves de Oliveira'
    // writable, enumerable e configurable são false por padrão
});

console.log(Object.getOwnPropertyDescriptor(pessoa, 'sobrenome'));
/*
  Saída:
  {
    value: 'Alves de Oliveira',
    writable: false,       // Não pode ser alterado (pessoa.sobrenome = 'Outro' não funcionará)
    enumerable: false,     // Não aparecerá em loops ou em Object.keys
    configurable: false    // Não pode ser deletada ou reconfigurada
  }
*/


// Podemos definir várias propriedades de uma vez com `Object.defineProperties`
Object.defineProperties(pessoa, {
    prop1L: {
        value: 'propriedade 1',
        writable: true,     // Pode ser alterado depois
        enumerable: false,  // Não foi especificado, então é false por padrão
        configurable: false // Também false por padrão
    },
    prop2: {
        value: 2,
        writable: false,    // Não pode ser alterado
        enumerable: false,  // False por padrão
        configurable: false // False por padrão
    }
});

console.log(pessoa);
/*
  Ao exibir o objeto diretamente no console, só veremos as propriedades *enumeráveis*.
  Portanto, apenas `nome` será exibido, porque é a única com enumerable: true.

  Para ver todas as propriedades, mesmo as não enumeráveis:
*/
console.log(Object.getOwnPropertyNames(pessoa)); // ['nome', 'sobrenome', 'prop1L', 'prop2']


