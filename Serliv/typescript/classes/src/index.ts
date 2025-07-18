
//===============================
//    Classes no TypeScript
//===============================

// Forma mais longa e detalhada de declarar uma classe
// Aqui definimos manualmente a propriedade e usamos o construtor para inicializá-la.
class Animal {
    categoria: string

    constructor(categoria: string) {
        this.categoria = categoria
    }
}

const animal = new Animal('mamífero')
console.log(animal)


// Forma mais curta usando o modificador de acesso 'public'
// O TypeScript já cria a propriedade e faz a atribuição automaticamente.
class Animal2 {
    constructor(public categoria: string) {}
}

const animal2 = new Animal2('mamífero')
console.log('animal 2:', animal2)
console.log(animal2.categoria)


//===========================
// Protegendo a Propriedade
//===========================

// 'readonly' permite apenas leitura — não é possível reatribuir depois da criação.
class Animal3 {
    constructor(readonly categoria: string) {}
}

const animal3 = new Animal3('mamífero')
// animal3.categoria = 'nova categoria' // ❌ Erro: não é possível alterar uma propriedade readonly


// 'private' torna a propriedade acessível apenas dentro da classe
class Animal4 {
    constructor(private categoria: string) {}

    // Método para exibir a categoria (padrão de encapsulamento)
    showCategory(): void {
        console.log(this.categoria)
    }
}

const animal4 = new Animal4('mamífero')
// console.log(animal4.categoria) // ❌ Erro: propriedade privada
animal4.showCategory()


//====================
// Outros Recursos
//====================

// 'protected' permite acesso dentro da classe e em suas subclasses
class Animal5 {
    constructor(protected categoria: string) {}

    getCategory(): string {
        return this.categoria
    }
}

// Classe que herda de Animal5
class Cachorro extends Animal5 {
    latir(): void {
        console.log("Au au! Eu sou um " + this.categoria) // Pode acessar 'categoria' porque é protected
    }
}

const cachorro = new Cachorro('mamífero')
cachorro.latir()


//====================
// Getters e Setters
//====================

class Animal6 {
    private _categoria: string

    constructor(categoria: string) {
        this._categoria = categoria
    }

    // getter
    get categoria(): string {
        return this._categoria
    }

    // setter
    set categoria(novaCategoria: string) {
        if (novaCategoria.length > 0) {
            this._categoria = novaCategoria
        }
    }
}

const animal6 = new Animal6('mamífero')
console.log(animal6.categoria) // usa o getter
animal6.categoria = 'ave'      // usa o setter
console.log(animal6.categoria)


//====================
// Classe Abstrata
//====================

// Uma classe abstrata não pode ser instanciada diretamente
abstract class Animal7 {
    constructor(public nome: string) {}

    abstract emitirSom(): void // método abstrato deve ser implementado pelas subclasses
}

class Gato extends Animal7 {
    emitirSom(): void {
        console.log("Miau!")
    }
}

const gato = new Gato('Felix')
gato.emitirSom()


//====================
// Interfaces com Classe
//====================

interface IAnimal {
    nome: string
    emitirSom(): void
}

class Passaro implements IAnimal {
    constructor(public nome: string) {}

    emitirSom(): void {
        console.log("Piu piu!")
    }
}

const passaro = new Passaro("Canarinho")
passaro.emitirSom()

//====================
// Fim dos exemplos
//====================
