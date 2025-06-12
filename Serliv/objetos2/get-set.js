// Definindo uma variável tipo fora do objeto — será usada como valor interno
let tipo = 'desconhecido'

// Objeto contendo os tipos permitidos (estrutura tipo "conjunto")
let tiposPermitidos = {
    'mamifero': true,
    'anfibio': true,
    'reptil': true
}

// Criando o objeto cachorro
const cachorro = {
    nome: 'Rex', // propriedade comum

    // getter: acessa o valor da variável "tipo"
    get tipo() {
        return tipo
    },

    // setter: altera o valor da variável "tipo", se for permitido
    set tipo(_tipo) {
        // verifica se o tipo é permitido antes de alterar
        if (tiposPermitidos[_tipo]) {
            tipo = _tipo
        }
    }
}

// Teste de exibição do objeto
console.log(cachorro)


// IIFE (Immediately Invoked Function Expression) para criar escopo isolado
;(function() {
    // Dentro da função, novas variáveis com o mesmo nome, mas escopo diferente
    let tipo = 'DesconhecidoKJ'

    let tiposPermitidos = {
        'mamifero': true,
        'anfibio': true,
        'reptil': true
    }

    // Novo objeto, agora local ao escopo da IIFE
    const sapo = {
        nome: 'Froggy',

        // getter local, acessa a variável 'tipo' da IIFE
        get tipo() {
            return tipo
        },

        // setter local, verifica se o tipo é permitido e altera
        set tipo(_tipo) {
            if (tiposPermitidos[_tipo]) {
                tipo = _tipo
            }
        }
    }

    // Expondo 'sapo' para o escopo global
    this.sapo = sapo
})()
