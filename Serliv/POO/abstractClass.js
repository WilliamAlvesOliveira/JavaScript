// Definindo a classe Animal como uma classe base (abstrata)
class Animal {
    constructor(tipo) {
        // Impede que a classe Animal seja instanciada diretamente
        if (this.constructor === Animal) throw new Error('Animal é uma classe abstrata')

        // Se um tipo for fornecido, ele será atribuído à instância
        if (tipo) this.tipo = tipo
    }

    // Método abstrato: precisa ser implementado pelas subclasses
    comer() {
        throw new Error('O método comer precisa ser implementado')
    }
}

// Criando uma subclasse chamada Gato, que herda de Animal
class Gato extends Animal {
    constructor(nome) {
        // Chama o construtor da classe Animal e define o tipo como 'mamífero'
        super('mamífero')

        // Define o nome do gato
        this.nome = nome
    }

    // Implementa o método comer específico para gatos
    comer() {
        // Usa template string para exibir o nome do gato com a mensagem
        console.log(`${this.nome} está comendo`)
    }
}

// Cria uma instância da classe Gato com o nome 'Mingau'
const gato = new Gato('Mingau')

// Mostra o objeto gato no console
console.log(gato)

// Chama o método comer da instância gato
gato.comer()

// Tenta instanciar a classe Animal diretamente (isso vai lançar um erro)
const animal = new Animal('anfíbio')
