// ✅ Importação usando ESModules (padrão moderno do JavaScript)

import { teste } from './modulos/mod_esm.mjs';
import { teste as teste2 } from './modulos/mod_esm2.mjs';

/*
📦 Aqui estamos usando a sintaxe moderna `import`, disponível nos ESModules.
Isso só funciona se:

1. O arquivo tiver extensão `.mjs`, ou
2. O seu `package.json` tiver `"type": "module"`

Esse tipo de módulo é recomendado para novos projetos, pois é o padrão oficial do JavaScript moderno.
*/

// Imprime no console o valor exportado da variável 'teste'
console.log(teste);
console.log(teste2);

// 🚫 IMPORTANTE:
// Em arquivos ESModules, as variáveis `__dirname` e `__filename` NÃO estão disponíveis por padrão.
// Isso acontece porque ESModules seguem o padrão dos navegadores (onde essas variáveis não existem).
// Se você tentar usar `__dirname` ou `__filename` aqui, receberá um erro: "is not defined".


//==== Como recriar __dirname e __filename em ESModules===============

// ✅ Solução para recriar __dirname e __filename em arquivos ESModule
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Converte a URL do módulo atual para caminho de arquivo
const __filename = fileURLToPath(import.meta.url);

// Extrai o diretório do caminho
const __dirname = dirname(__filename);

// Agora você pode usar como se estivesse no CommonJS
console.log("Caminho completo do arquivo (__filename):", __filename);
console.log("Diretório atual (__dirname):", __dirname);
