// Exportando uma propriedade chamada "teste" com o valor "Oká, Mundo!"
module.exports.teste = 'Oká, Mundo!';

/*
🧾 Explicação:
module.exports é o objeto que o Node.js irá exportar quando este módulo for importado.
Neste caso, estamos adicionando uma propriedade "teste" diretamente a ele.
*/

// Também poderíamos exportar um objeto completo, substituindo o module.exports por outro:
 
// module.exports = { teste2: 'Oká, Mundo!' };

/*
⚠️ Observação:
Aqui estamos **substituindo completamente** o objeto `module.exports` por um novo.
Isso muda a referência original compartilhada com `exports`, o que afeta como o módulo será exportado.
*/

// Printando o conteúdo atual de module.exports
console.log('module.exports:', module.exports);

// Printando o conteúdo atual de exports
console.log('exports:', exports);

// Comparando se module.exports e exports ainda apontam para o mesmo objeto
console.log('module.exports === exports');

/*
🧠 Entendendo o resultado da comparação:

✅ Se você **apenas adiciona propriedades** (ex: `module.exports.teste = ...` ou `exports.teste = ...`),
    - Ambos (`module.exports` e `exports`) ainda apontam para o **mesmo objeto**
    - Resultado: `true`

❌ Se você **reatribui um novo objeto** (ex: `module.exports = { ... }`),
    - `module.exports` agora aponta para outro objeto
    - `exports` continua apontando para o objeto antigo (vazio)
    - Resultado: `false`
*/

// Também podemos exportar diretamente uma função:

/*
module.exports = () => {
    console.log("Função exportada com module.exports");
    return 'Retorno da função exportada';
};
*/

/*
📌 IMPORTANTE:

- `module.exports` é o que **realmente é exportado** pelo módulo.
- `exports` é apenas uma **referência auxiliar** a `module.exports` no início do arquivo.

Se você fizer:
    module.exports = () => { ... }

Tudo funciona, pois está substituindo o que será exportado.

MAS se fizer:
    exports = () => { ... }

⚠️ Isso NÃO funciona! Porque você só mudou a variável `exports`, não o que será exportado de verdade.

✅ Forma correta para manter `exports` funcional:
    exports.fn = () => { ... }

Isso adiciona uma função ao objeto `exports`, que ainda compartilha referência com `module.exports`.
*/
