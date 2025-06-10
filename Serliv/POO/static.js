// ES5: Função construtora e protótipos
function Animal() { 
    // Função construtora vazia
}

// Método que será compartilhado entre todas as instâncias via protótipo
Animal.prototype.whoAmI = function() {
    return this
}

// Propriedade estática: pertence à função construtora, não às instâncias
Animal.categoria = 'ser vivo'

// Criando uma instância de Animal
const dog = new Animal()
// --------------------------------------------------
/*
Conceitos principais sobre classes, métodos e propriedades em JavaScript:

- Em JavaScript, funções construtoras (ES5) e classes (ES6) criam objetos.
- Cada instância criada com 'new' tem seus próprios dados (propriedades de instância).
- Métodos de instância são funções que operam sobre dados de cada objeto individual.
- Propriedades estáticas pertencem à função construtora ou à classe em si, não às instâncias.
Ou seja, não podem ser acessadas diretamente por objetos criados, somente pela classe/função construtora.
- Métodos estáticos são funções associadas à classe/função construtora e normalmente executam ações gerais,
que não dependem de um objeto específico.
- Dentro de métodos estáticos, 'this' refere-se à própria classe/função construtora.
- Isso permite organizar melhor o código e diferenciar o que é comportamento de objeto e comportamento da classe.

O exemplo abaixo mostra essa diferença usando ES5 e ES6.

// ES6: Sintaxe de classe com construtor e métodos estáticos

*/

class Cachorro {
    constructor(nome) {
        this.nome = nome

        console.log('chamando o método estático dentro do constructor')
        // Chamando método estático dentro do construtor
        Cachorro.nascer()
    }

    // Método estático: pertence à classe, não às instâncias
    static comer() {
        console.log('comendo')
        // 'this' dentro de método estático refere-se à própria classe
        this.satisfeito()
    }

    static satisfeito() {
        console.log('está satisfeito')
    }

    static nascer() {
        console.log('um novo cachorro nasceu')
    }
}

// Criando uma instância da classe Cachorro
const rex = new Cachorro('Rex')

// Para chamar método estático fora da classe:
// Cachorro.comer()

