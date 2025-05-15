;(function(window){
    'use strict'

    function criarTarefa(nome) {
        const nomeTrimmed = nome.trim()

        if (nomeTrimmed === '') {
            logger.logWarn('Nome da tarefa está vazio ou só com espaços.')
            return null // ou undefined
        }

        return {
            nome: nomeTrimmed,
            id: crypto.randomUUID(),
            concluido: false
        }
    }


    function criarNovaTarefa(objetoTarefa){
        if (typeof objetoTarefa !== 'object' || objetoTarefa === null) {
            logger.logError('Tipo inválido: tarefa não é um objeto válido', objetoTarefa)
            return
        }

        if (objetoTarefa.nome.trim() === '') {
            logger.logWarn('Campo vazio')
            return
        }
    

        logger.logINFO('Adicionando item: ', objetoTarefa.nome)

        const novaTarefa = document.createElement('li')
        novaTarefa.classList.add('todo-item')
        novaTarefa.setAttribute('data-id', objetoTarefa.id)
        novaTarefa.innerHTML = `
        <button class="button-check">
            <i class="fas fa-check displayNone"></i>
        </button>
        <p class="task-name">${objetoTarefa.nome}</p>
        <i class="fas fa-edit"></i>
        <div class="editContainer">
                <input class="editInput" type="text">
                <button class="editButton">Edit</button>
                <button class="cancelButton">Cancel</button>
        </div>
        <i class="fas fa-trash-alt"></i>
        `
        logger.logINFO('Novo elemento criado!')
        return novaTarefa
    }

    window.controller = {
        criarTarefa,
        criarNovaTarefa: criarNovaTarefa
    }

})(window)