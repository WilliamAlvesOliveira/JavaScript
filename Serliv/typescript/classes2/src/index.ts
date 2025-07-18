//=========================
//  Herança (extends) no TypeScript
//=========================

// Uma classe abstrata não pode ser instanciada diretamente.
// Serve como base para outras classes e pode conter métodos concretos ou abstratos.
abstract class Animal {
    // 'protected readonly' permite que a propriedade seja acessada por subclasses,
    // mas nunca reatribuída após o construtor.
    constructor(protected readonly categoria: string) {}

    // Método acessível pelas subclasses e também externamente
    getCategory(): void {
        console.log('A categoria deste animal é:', this.categoria)
    }
}

//=========================
//    Subclasse: Gato
//=========================

class Gato extends Animal {
    private nome: string

    constructor(nome: string) {
        // 'super' chama o construtor da classe pai (Animal)
        super('mamífero')
        this.nome = nome
    }

    // Método específico da classe Gato
    mostrarDetalhes(): void {
        // Podemos acessar 'categoria' porque ela é protected
        console.log(`Nome: ${this.nome}, Categoria: ${this.categoria}`)
    }
}

// const animal = new Animal('mamífero') // ❌ Erro: não é possível instanciar classe abstrata

const mingau = new Gato('Mingau')
mingau.mostrarDetalhes()


//=========================
//    Subclasse: Cachorro
//=========================

class Cachorro extends Animal {
    constructor(private _nome: string) {
        super('mamífero')
    }

    // Getter para acessar o nome
    get nome(): string {
        return this._nome
    }

    // Setter com possibilidade de validação antes de alterar o nome
    set nome(novoNome: string) {
        if (novoNome.length > 0) {
            this._nome = novoNome
        }
    }

    mostrarDetalhes(): void {
        console.log(`${this._nome} é um ${this.categoria}`)
    }
}

const rex = new Cachorro('Rex')
rex.mostrarDetalhes()

console.log('Nome antes do setter:', rex.nome)
rex.nome = 'Rexão' // usando o setter
console.log('Nome depois do setter:', rex.nome)


//=========================
//    Classe Cliente
//=========================

class Cliente {
    // Lista interna protegida contra alterações externas
    private readonly _listaAnimais: Animal[] = []

    // Cópia temporária para ser exposta com segurança ao exterior
    private _tempListAnimais: Animal[] = []

    // Método para adicionar animais à lista do cliente
    addAnimal(...animais: Animal[]): void {
        console.log('Array completo:', animais) // imprime o array de animais
        console.log('Animais individualmente:', ...animais) // imprime cada animal separado

        // Adiciona os animais ao array interno
        this._listaAnimais.push(...animais)

        // Atualiza a cópia segura
        this._tempListAnimais = [...this._listaAnimais]
    }

    // Getter que retorna uma cópia controlada da lista de animais
    get listaAnimais(): Animal[][] {
        // Retorna um array que contém a cópia da lista como elemento
        return [this._tempListAnimais]
    }
}

const cliente = new Cliente()
cliente.addAnimal(mingau, rex)

console.log('Cliente com animais:', cliente)

// Tentativa de esvaziar a lista externamente (não funciona corretamente por ser uma cópia)
cliente.listaAnimais.length = 0

console.log('Cliente após tentativa de apagar lista:', cliente)
