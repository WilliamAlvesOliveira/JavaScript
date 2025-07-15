// Importa o módulo nativo 'fs' (filesystem) do Node.js
const fs = require("fs");

/*
🔍 Detalhe:
Quando usamos `require("fs")`, o Node entende que estamos pedindo um módulo **nativo**.
Esses módulos fazem parte do próprio Node.js — não precisam ser instalados com npm.
*/

// Importa o módulo externo 'node-emoji', instalado via npm
const emoji = require('node-emoji');

/*
🔍 Detalhe:
Quando usamos `require("nome-do-pacote")`, o Node procura esse pacote na pasta `node_modules`.
Se não encontrar ali, ele sobe na hierarquia de pastas procurando até achar ou lançar erro.
*/

// Importa um módulo criado localmente (um arquivo seu)
const teste = require("./modulos/mod1.js");
console.log(teste);

// Usa o módulo 'fs' para criar ou sobrescrever um arquivo com o conteúdo especificado
fs.writeFile("teste.txt", "Olá, Mundo!", erro => {
    if (erro) throw erro;
    console.log("Arquivo salvo com sucesso! ", emoji.get("coffee"));
});

// Importa mais dois módulos locais
const mod2 = require('./modulos/mod2');
const mod3 = require('./modulos/mod3');

// Ambos os objetos exportados por mod2 e mod3 têm a propriedade "teste",
// mas não há conflito porque pertencem a módulos diferentes.
console.log(mod2);
console.log(mod3);

//=============================================================================
// ✅ Informações sobre o arquivo atual e seu diretório

// __dirname retorna o caminho absoluto da pasta onde este arquivo está localizado
console.log("Diretório atual (__dirname):", __dirname);

// __filename retorna o caminho absoluto completo deste arquivo (incluindo o nome do arquivo)
console.log("Caminho completo do arquivo (__filename):", __filename);

/*
🧠 Por que isso é útil?

- Em aplicações reais, geralmente precisamos manipular arquivos, imagens, dados, etc.
- Usar caminhos absolutos com `__dirname` evita erros causados por caminhos relativos mal resolvidos.
- Especialmente útil ao trabalhar com os módulos `fs` e `path`.

Exemplo:
    const caminho = path.join(__dirname, 'dados.txt');
    fs.readFile(caminho, ...)

Com isso, o código sempre sabe "onde ele está", independentemente de onde o script for chamado.
*/
//=====================================================================================

//RESUMO FINAL==========
/*📦 Os módulos (CommonJS no caso do Node.js) vieram para:

1. 🧩 Modularizar o código:
   - Você pode dividir seu projeto em pequenos arquivos reutilizáveis.
   - Cada arquivo pode exportar o que for necessário (funções, objetos, strings, etc.).

2. 🔒 Isolar o escopo:
   - Antes dos módulos, usava-se IIFE (funções auto-executáveis) para proteger variáveis do escopo global.
   - Isso era arriscado: variáveis com o mesmo nome podiam causar conflitos.
   - Com módulos, cada arquivo tem seu **próprio escopo** — ou seja, variáveis e funções ficam protegidas.

3. 📚 Organização:
   - Fica mais fácil manter e entender projetos grandes.
   - Podemos importar apenas o que for necessário com `require()` (CommonJS) ou `import` (ESModules).

4. 🤝 Reutilização:
   - Você pode reaproveitar módulos entre arquivos ou até entre projetos diferentes.

🔁 Em resumo:
Módulos tornam o código **mais seguro, organizado, reutilizável** e fácil de manter.
Eles são uma **melhoria enorme** em relação à programação em um único arquivo global.
*/