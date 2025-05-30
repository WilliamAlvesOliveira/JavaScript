'use strict'
class Task {
    #name
    #updateAt
    #createAt

    constructor(nome) {
        this.#name = nome
        this.#createAt = new Date()
        this.#updateAt = null
        Object.seal(this) // Protege a instância de alterações externas
    }

    getName() {
        return this.#name
    }

    getCreateAt() {
        return this.#createAt
    }

    getUpdateAt() {
        return this.#updateAt
    }

    changeName(newName) {
        this.#name = newName
        this.#updateAt = new Date()
    }

    toDebug() {
        return {
            nome: this.#name,
            created: this.#createAt,
            update: this.#updateAt
        }
    }
}

const task1 = new Task('tarefa 1')
console.log(task1) // saída vazia pois os atributos estão restritos
console.log(task1.getName())// saída (tarefa 1) pois usou o método getName

task1.name = 'mudando diretamente'
console.log('log da task1' ,task1)
console.log(task1.getName())// não muda nada pois name esta protegido e o seal evita implementação de novos atributos

console.log(task1.getCreateAt()); // Data atual
console.log(task1.getUpdateAt()); // null

task1.changeName('nova tarefa');
console.log(task1.getName());      // nova tarefa
console.log(task1.getUpdateAt());  // nova data

console.log(task1.toDebug())