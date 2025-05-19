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

        const novaTarefa = document.createElement('li')
        novaTarefa.classList.add('todo-item')
        novaTarefa.setAttribute('data-id', objetoTarefa.id)
        
        const checkboxButton = document.createElement('button')
        checkboxButton.classList.add('button-check')
        checkboxButton.setAttribute('data-action','checkButtonHandle')

        const checkIcon = document.createElement('i')
        checkIcon.classList.add('fas','fa-check', 'displayNone')
        if(objetoTarefa.concluido === true){
            checkIcon.classList.remove('displayNone')
        }
        checkboxButton.appendChild(checkIcon)
        
        novaTarefa.appendChild(checkboxButton)

        const nomeDaTarefa = document.createElement('p')
        nomeDaTarefa.classList.add('task-name')
        nomeDaTarefa.textContent = objetoTarefa.nome
        novaTarefa.appendChild(nomeDaTarefa)

        const editIcon = document.createElement('i')
        editIcon.classList.add('fas','fa-edit')
        editIcon.setAttribute('data-action', 'editarTarefa')
        novaTarefa.appendChild(editIcon)

        const editContainer = document.createElement('div')
        editContainer.classList.add('editContainer')

        const editTextBox = document.createElement('input')
        editTextBox.classList.add('editInput')
        editTextBox.setAttribute('type','text')
        editTextBox.value = objetoTarefa.nome
        editContainer.appendChild(editTextBox)

        const editButton = document.createElement('button')
        editButton.classList.add('editButton')
        editButton.setAttribute('data-action','confirmarEdicao')
        editButton.textContent = 'Edit'
        editContainer.appendChild(editButton)

        novaTarefa.appendChild(editContainer)

        const cancelEdit = document.createElement('button')
        cancelEdit.classList.add('cancelButton')
        cancelEdit.setAttribute('data-action','cancelarEdicao')
        cancelEdit.textContent = 'Cancelar'
        editContainer.appendChild(cancelEdit)

        const trashButton = document.createElement('i')
        trashButton.classList.add('fas','fa-trash-alt')
        trashButton.setAttribute('data-action','deletarTarefa')
        novaTarefa.appendChild(trashButton)


        // novaTarefa.innerHTML = `
        // <button class="button-check">
        //     <i class="fas fa-check displayNone"></i>
        // </button>
        // <p class="task-name">${objetoTarefa.nome}</p>
        // <i class="fas fa-edit"></i>
        // <div class="editContainer">
        //         <input class="editInput" type="text">
        //         <button class="editButton">Edit</button>
        //         <button class="cancelButton">Cancel</button>
        // </div>
        // <i class="fas fa-trash-alt"></i>
        // `
        // logger.logINFO('Novo elemento criado!')
        return novaTarefa
    }

    window.controller = {
        criarTarefa,
        criarNovaTarefa
    }

})(window)