//função construtora vai ser uma função responsavél por gerar objetos, em casos de funções construtoras deve-se sempre usar o new seguida de uma letra maiuscula

// função atualizada
// function Task(nomePorParametro) {
//     "use strict";

//     let nomeDoObjeto = nomePorParametro;

//     // Campos internos
//     const createAt = new Date();
//     let updateAt = null;

//     // Métodos públicos
//     this.getName = function () {
//         return nomeDoObjeto;
//     };

//     this.getCreateAt = function () {
//         return createAt;
//     };

//     this.getUpdateAt = function () {
//         return updateAt;
//     };

//     this.changeName = function (newName) {
//         nomeDoObjeto = newName;
//         updateAt = new Date();
//     };

//     // Congela a estrutura externa do objeto para evitar adição/modificação de propriedades diretas
//     Object.freeze(this);
// }

//função criada na aula (OBS: contem falhas)
//essa função vai criar um objeto com o nome passado por parametr

//versãp moderna: class com campos privados #
// class Task {
//     #name;
//     #updateAt;
//     #createAt;

//     constructor(nome) {
//         this.#name = nome;
//         this.#createAt = new Date();
//         this.#updateAt = null;
//         Object.freeze(this); // Protege a instância de alterações externas
//     }

//     getName() {
//         return this.#name;
//     }

//     getCreateAt() {
//         return this.#createAt;
//     }

//     getUpdateAt() {
//         return this.#updateAt;
//     }

//     changeName(newName) {
//         this.#name = newName;
//         this.#updateAt = new Date();
//     }
// }

function Task(nomePorParametro){
    "use strict"
    
    let nomeDoObjeto = nomePorParametro

    this.createAt = new Date()
    this.updateAt = null
    this.changeName = function changeName(newName){
        nomeDoObjeto = newName
        this.updateAt = new Date()
    }
    
    this.getName = function(){
        return nomeDoObjeto
    }
}

const task1 = new Task('tarefa 1')// new chama a função construtora Task

console.log('task1 original')
console.log(task1.getName(), task1)//usamos get name para o nome do task que agora esta protegida contra mudanças
console.log('\n')

task1.changeName('novo nome')
console.log('task1 com nome e updateAt alterados via função changeName')
console.log(task1.getName(),'\n',task1) //se não usarmos o metodo getName não irá aparecer o nome
console.log('\n')


const task2 = new Task('tarefa 2')
console.log('task2 original')
console.log(task2)
console.log('\n')

task2.nome = 'não deveria ser permitido alterar diretamente'
console.log(task2.nome)

console.log('task2 com nome alterado diretamete')
console.log(task2.getName(),task2) //não altera o updateAt
console.log('\n')

task2.updateAt = 'mudei o que não deveria'
console.log(task2)