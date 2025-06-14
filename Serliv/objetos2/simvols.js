// ==============================
// 🧠 Aula sobre Symbol em JS
// ==============================

// Criando um Symbol
// Symbols são únicos e imutáveis. Mesmo que você crie dois Symbols com a mesma descrição, eles são diferentes entre si.

const NOME = Symbol() // criando um Symbol sem descrição

// ==============================
// 🏗️ Montando o objeto usuario
// ==============================

let n = 0

const usuario = {
    // criando propriedades com nomes dinâmicos (nome1, nome2, nome3)
    ['nome' + (++n)]: 'teste' + n,
    ['nome' + (++n)]: 'teste' + n,
    ['nome' + (++n)]: 'teste' + n,

    // criando uma chave do tipo Symbol
    [NOME]: 'nomeSymbol',

    // chave tradicional string
    'nome': 'nomestring',

    // chave numérica — o JS converte para string automaticamente
    2: 'numero sera convertido para string'
}

// ==============================
// 🔍 Explorando o Symbol
// ==============================

console.log(NOME)             // mostra o Symbol (ex.: Symbol())
console.log(typeof NOME)      // 'symbol'
console.log(usuario)          // imprime o objeto usuario

// ==============================
// ✍️ Alterando valores
// ==============================

// alterando a chave 'nome' (string)
usuario.nome = 'alterando o nome'
console.log(usuario)          // verifica alteração

// acessando o valor da chave Symbol
console.log(usuario[NOME])

// alterando o valor da chave Symbol
usuario[NOME] = 'alterando nome do symbol'

// ==============================
// 🕵️‍♂️ Hackeando Symbols
// ==============================

// Symbols não aparecem em loops como for...in, Object.keys, etc.
// Mas podem ser acessados diretamente assim:
let Hack = Object.getOwnPropertySymbols(usuario)

console.log(Hack)      // retorna um array com os Symbols do objeto
console.log(Hack[0])   // mostra o primeiro Symbol (no caso é NOME)

// alterando o valor da chave Symbol acessando pelo array de Symbols
usuario[Hack[0]] = 'hacked'

// conferindo o objeto
console.log(usuario)

/* ===============================================
🧠 RESUMO SOBRE SYMBOL EM JAVASCRIPT

🔸 O que é Symbol?
- Symbol é um tipo primitivo introduzido no ES6.
- Cria identificadores únicos e imutáveis.
- Mesmo passando a mesma descrição, Symbols nunca são iguais.
Ex.: Symbol('teste') !== Symbol('teste') // true

🔸 Pra que serve o Symbol?
- Criar chaves únicas em objetos.
- Evitar conflitos de nomes, especialmente em objetos compartilhados.
- Adicionar propriedades que ficam "ocultas" nas iterações comuns.
- Usado internamente no JavaScript (ex.: Symbol.iterator, Symbol.toStringTag).

🔸 Características principais:
- É do tipo 'symbol' (typeof Symbol()).
- Sempre único.
- Funciona como chave em objetos.
- Não aparece em loops (for...in, Object.keys, JSON.stringify).
- Só pode ser acessado diretamente pelo Symbol ou via Object.getOwnPropertySymbols().

🔸 Quando usar Symbol?
✔️ Quando precisa criar propriedades únicas e evitar conflitos.
✔️ Para adicionar dados em objetos sem interferir em outras partes do código.
✔️ Ao trabalhar com APIs que fazem uso de Symbols (como iteradores).

🔸 Quando NÃO usar?
- Quando precisa de dados visíveis, serializados ou persistentes (como JSON).
- Quando não há risco de conflito, usar string como chave é mais simples.

💡 Frase de ouro:
"Symbol é como uma etiqueta invisível, única, que você coloca no objeto. 
Só você sabe que ela tá lá — e só você sabe como acessá-la."

================================================ */
