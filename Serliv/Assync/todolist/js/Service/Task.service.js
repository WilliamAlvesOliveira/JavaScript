import { createFetch } from '../createFetch.js'
import {urlUsers, urlTasks} from '../config.js'    
import {Task} from '../Model/todoTask.model.js'

export default class TaskService{
    constructor(){
        this.tasks = []
    }
    
    add(task, cb, error,  userId){
        createFetch('POST', `${urlUsers}${userId}`,JSON.stringify(task))
            .then(()=> this,this.getTask(userId))
            .then(() => cb())
            .catch(erro => error(erro))
    }

    getTask(userId,sucess, error){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })

            if(typeof sucess === 'function') sucess(this.tasks)
                return this.tasks
        }

        return createFetch('GET', `${urlUsers}${userId}`)
            .then(response => fn(response))
            .catch(erro =>{
                if(typeof error === 'function'){
                    return error(erro.message)
                }
                throw Error(erro.message)
            })
    }

    remove(id, userId, cb, error){
        createFetch('DELETE', `${urlTasks}${id}`)
            .then(() => this.getTask(userId))
            .then(() => cb())
            .catch(erro => error(erro.message))
    }

    update(task, userId, cb, error){
        task.updatedAt = Date.now()

        createFetch('PATCH',`${urlTasks}${task.id}`,JSON.stringify(task))
            .then(() => this.getTask(userId))
            .then(() => cb())
            .catch(erro => error(erro.message))
    }

    getById(id){
        return this.tasks.find(task => task.id === id)
    }
}

//==============
//mais Exemplos
//==============
//  Usando .then(), .catch() e .finally()

// Requisição usando a API Fetch com Promises encadeadas
fetch('http://localhost:3000/users')
  .then(resposta => resposta.json()) // Converte a resposta em JSON
  .then(dados => {
    // Se a resposta foi convertida com sucesso
    console.log('Usuários recebidos:', dados); // Exibe os dados no console
  })
  .catch(erro => {
    // Caso ocorra algum erro de rede ou durante o processamento
    console.error('Erro ao buscar usuários:', erro);
  })
  .finally(() => {
    // Este bloco é executado sempre, com sucesso ou erro
    console.log('Requisição finalizada (com sucesso ou erro).');
  });



//Usando async/await
// Função assíncrona autoexecutável (IIFE)
;(async function() {
  let users = []; // Variável para guardar os dados retornados da API

  try {
    // Faz a requisição e aguarda a resposta
    const resposta = await fetch('http://localhost:3070/users');

    // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
    if (!resposta.ok) {
      // Se a resposta não for OK, lança um erro com o status HTTP
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    // Aguarda e converte a resposta para JSON
    users = await resposta.json();

    // Exibe os dados no console
    console.log('Usuários recebidos:', users);
  } catch (erro) {
    // Trata erros de rede, conversão ou status inválido
    console.error('Erro ao buscar usuários:', erro);
  } finally {
    // Executa sempre, independente de erro ou sucesso
    console.log('Requisição finalizada. Estado final da variável users:', users);
  }
})();


