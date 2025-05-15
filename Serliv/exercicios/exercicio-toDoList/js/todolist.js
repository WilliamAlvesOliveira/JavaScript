;(function(){
    "use strict"

    //Elementos para manipulação do Doom
    const inputTextBox = document.getElementById('item-input')
    const toDoAddForm = document.getElementById('todo-add')
    const toDoUnorderedList = document.getElementById('todo-list')
    //const TodosOsItens = document.querySelectorAll('li')
    const arrayDeTarefas = []

    //função para adicionar listener aos itens da lista
    function addEventLi(li){
        li.addEventListener('click', function(){
            const id = this.getAttribute('data-id')
            logger.logINFO(`Usuario clicou no item: ID ${id}`)
            console.log(this)/*
            console.log(this.textContent)
            console.log(this.innerText)
            console.log(this.innerHTML)
            console.log(this.outerHTML)*/
        })
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
        addEventLi(li)
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


    renderizarTarefas()

})()