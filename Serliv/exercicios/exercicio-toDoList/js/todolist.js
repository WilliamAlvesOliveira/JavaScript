;(function(){
    "use strict"

    //Elementos para manipulação do Doom
    const inputTextBox = document.getElementById('item-input')
    const toDoAddForm = document.getElementById('todo-add')
    const toDoUnorderedList = document.getElementById('todo-list')
    //const TodosOsItens = document.querySelectorAll('li')
    const arrayDeTarefas = []

    //função para adicionar listener aos itens da lista
    function onListClick(event) {
        // event.target é o elemento específico que foi clicado (pode ser um <i>, <span> etc.)
        // Usamos .closest('[data-action]') para subir até o ancestral mais próximo que contenha o atributo data-action
        const clickedElement = event.target.closest('[data-action]')
        if (!clickedElement) return

        const dataAction = clickedElement.getAttribute('data-action')
        logger.logINFO(`Ação detectada: ${dataAction}`)

        const actions = {
            checkButtonHandle: function () {
            console.log('tarefa cumprida')
            },
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
            addEventLi(li)
            toDoUnorderedList.appendChild(li)
        })
    }

    function adicionarNovaTarefa(novaTarefa){
        const li = controller.criarNovaTarefa(novaTarefa)
        toDoUnorderedList.appendChild(li)
        logger.logINFO('Nova tarefa adicionada!', novaTarefa)
    }

    function tarefaJaExiste(nome) {
        return arrayDeTarefas.some(tarefa => tarefa.nome.toLowerCase() === nome.toLowerCase())
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
            logger.logINFO(`Número de objetos: ${arrayDeTarefas.length}`)

            adicionarNovaTarefa(novaTarefa)  // chama aqui dentro do if
            inputTextBox.value = ''
            inputTextBox.focus()
        } else {
            logger.logWarn('Tarefa inválida. Nada foi adicionado.')
        }
    })
    
    //adiciona event listener a todos os elementos do toDoUnorderedList
    toDoUnorderedList.addEventListener('click', onListClick)

    renderizarTarefas()

})()