;(function(window){
    "use strict"

    //Elementos para manipulação do Doom
    const inputTextBox = document.getElementById('item-input')
    const toDoAddForm = document.getElementById('todo-add')
    const toDoUnorderedList = document.getElementById('todo-list')
    const TodosOsItens = document.getElementsByTagName('li')//necesitamos de uma html collection para manter a lista atualizada.
    const arrayDeTarefas = storage.getServerData()

    //função para adicionar listener aos itens da lista
    function onListClick(event) {
        // event.target é o elemento específico que foi clicado (pode ser um <i>, <span> etc.)
        // Usamos .closest('[data-action]') para subir até o ancestral mais próximo que contenha o atributo data-action
        const clickedElement = event.target.closest('[data-action]')
        if (!clickedElement) return

        const dataAction = clickedElement.getAttribute('data-action')
        logger.logINFO(`Ação detectada: ${dataAction}`)

        //usamos current li para ter o elemto do target que queremos usar
        let currentLi = event.target
        while(currentLi.nodeName !== "LI" ){
            currentLi = currentLi.parentElement
        }
        
        //devemos ter o indice do elemento dentro do array
        const currentLiIndex = [...TodosOsItens].indexOf(currentLi)
        
        const actions = {
            checkButtonHandle: function() {
                arrayDeTarefas[currentLiIndex].concluido = !arrayDeTarefas[currentLiIndex].concluido

                logger.logINFO(`A tarefa ${arrayDeTarefas[currentLiIndex].nome} ${arrayDeTarefas[currentLiIndex].concluido?'foi concluída':'foi desmarcada' }`)
                
                storage.setNewData(arrayDeTarefas)
                renderizarTarefas()
            },
            editarTarefa: function() {
                const editContainer = currentLi.querySelector('.editContainer');// Use ponto e vírgula antes de iniciar uma nova linha com [, (, +, -, *, !, ~, await, import ou crase (`), 
                // para evitar erros de interpretação pelo JavaScript (ASI - Automatic Semicolon Insertion)

                [...toDoUnorderedList.querySelectorAll('.editContainer')].forEach(container => {
                    container.removeAttribute('style')
                })
                
                editContainer.style.display = 'flex'

                const editInput = currentLi.querySelector('.editInput')
                editInput.focus()
            },
                confirmarEdicao: function(){
                    const editInput = currentLi.querySelector('.editInput')

                    const novoNome = editInput.value.trim()
                    const nomeAntigo = arrayDeTarefas[currentLiIndex].nome

                    if(novoNome === nomeAntigo){
                        const editContainer = currentLi.querySelector('.editContainer')
                        editContainer.removeAttribute('style')
                        logger.logINFO('Nenhuma alteração detectada')
                        currentLi.querySelector('.editInput').value = arrayDeTarefas[currentLiIndex].nome 
                        return
                    }

                    arrayDeTarefas[currentLiIndex].nome = novoNome
                    
                    logger.logINFO(`Tarefa ${nomeAntigo} foi alterada para ${novoNome}`)

                    storage.setNewData(arrayDeTarefas)
                    renderizarTarefas()
                },
            cancelarEdicao: function(){
                const editContainer = currentLi.querySelector('.editContainer')
                editContainer.removeAttribute('style')

               currentLi.querySelector('.editInput').value = arrayDeTarefas[currentLiIndex].nome //reseta o valor do editTestBox
            },
            deletarTarefa: function() {
                logger.logWarn('Tarefa deletada: ' + currentLi.querySelector('.task-name').textContent)
                arrayDeTarefas.splice(currentLiIndex, 1)
                logger.logINFO('ArrayDeTarefas atualizado')
                logger.logINFO(`Número de objetos no array: ${arrayDeTarefas.length}`)

                storage.setNewData(arrayDeTarefas)
                renderizarTarefas()// problema de performance
                //currentLi.remove(), problema de suporte
                //currentLi.parentElement.removeChild(currentLi), problema de concistencia
            }
            // future: editTaskHandle, deleteTaskHandle etc.
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        } else {
            logger.logWarn(`Ação "${dataAction}" não reconhecida.`)
        }
    }


    //função de renderização das tarefas
    function renderizarTarefas(lista = arrayDeTarefas){
        toDoUnorderedList.innerHTML = ''
        lista.forEach(objetoTarefa =>{
            const li = controller.criarNovaTarefa(objetoTarefa)
            toDoUnorderedList.appendChild(li)
        })
    }

    function tarefaJaExiste(nome) {
        const nomeNormalizado = nome.toLowerCase().trim();
        return arrayDeTarefas.some(tarefa => 
            tarefa.nome.toLowerCase().trim() === nomeNormalizado
        );
    }


    //acionamento do botão add
    toDoAddForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault()
        logger.logINFO('Usuario clicou no botão add')
        logger.logINFO('Novo item recebido no formulário ', inputTextBox.value)

        const inputText = inputTextBox.value
        const novaTarefa = controller.criarTarefa(inputText)
        const tarefaDuplicada = tarefaJaExiste(inputText)

        if (tarefaDuplicada) {
            logger.logWarn('Tarefa duplicada detectada:', inputText)
            // (Opcional) mostrar feedback visual ao usuário
            return
        }

        if (novaTarefa) {
            arrayDeTarefas.push(novaTarefa)
            logger.logINFO('ArrayDeTarefas atualizado')
            logger.logINFO(`Número de objetos no array: ${arrayDeTarefas.length}`)


            storage.setNewData(arrayDeTarefas)
            renderizarTarefas()
            inputTextBox.value = ''
            inputTextBox.focus()
        } else {
            logger.logWarn('Tarefa inválida. Nada foi adicionado.')
        }
    })
    
    //adiciona event listener a todos os elementos do toDoUnorderedList
    toDoUnorderedList.addEventListener('click', onListClick)

    
    renderizarTarefas()

    window.todolist = {
        renderizarTarefas,
        tarefaJaExiste,
        // outras funções que queira expor para testes
    }

    
})(window)