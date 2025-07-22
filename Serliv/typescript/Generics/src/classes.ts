// Definimos uma classe genérica Pessoa que aceita um tipo T
class Pessoa<T> {
    // A propriedade 'name' é privada e do tipo genérico T
    constructor(private name: T) {}

    // Método para alterar o nome da pessoa
    setName(name: T): void {
        this.name = name
    }
}

// Criamos uma instância de Pessoa com tipo string
const pessoa = new Pessoa('pessoa1')
// Alteramos o nome da pessoa usando o método setName
pessoa.setName(`PessoaStr`)


// Classe genérica de lista, que aceita qualquer tipo T (como Pessoa<T> ou Animal<T>)
class List<T> {
    // Array privado para armazenar os elementos
    private list: T[] = []

    // Retorna um item da lista em uma posição específica, ou null se for inválido
    getFromList(index: number): T | null {
        const len = this.list.length
        if (len === 0) return null // Lista vazia
        if (index >= len || index < 0) return null // Índice fora dos limites
        return this.list[index]
    }

    // Adiciona um elemento à lista e retorna a própria instância (permite encadeamento de chamadas)
    addToList(element: T): this {
        this.list.push(element)
        return this
    }

    // Remove um elemento da lista com base no índice e retorna esse elemento ou null
    removeFromList(index: number): T | null {
        const element = this.getFromList(index) // Valida o índice e obtém o elemento
        if (element !== null) {
            this.list.splice(index, 1) // Remove o elemento da lista
            return element
        }
        return null
    }
}

// Criamos uma lista de pessoas com tipo Pessoa<string>
const listPessoas = new List<Pessoa<string>>()
// Adicionamos objetos do tipo Pessoa<string> à lista
listPessoas.addToList(pessoa)
    .addToList(new Pessoa('Pessoa2')) // Uso de encadeamento (método retorna this)
    .addToList(new Pessoa('Pessoa3'))

// listPessoas.addToList('maria') // ERRO: string não é do tipo Pessoa<string>

console.log(listPessoas) // Mostra a lista completa de pessoas

listPessoas.removeFromList(1) // Remove a pessoa na posição 1 (Pessoa2)
console.log(listPessoas) // Lista atualizada sem o elemento removido


// Criamos outra classe genérica: Animal
class Animal<T> {
    constructor(private name: T) {}

    setName(name: T): void {
        this.name = name
    }
}

// Criamos um animal chamado "Mingal"
const gato = new Animal('Mingal')

// Criamos uma lista de animais do tipo Animal<string>
const listAnimal = new List<Animal<string>>()
listAnimal.addToList(gato)

// listAnimal.addToList(pessoa) // ERRO: Pessoa<string> não é do tipo Animal<string>
