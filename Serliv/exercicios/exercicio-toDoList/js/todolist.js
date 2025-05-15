;(function(){
    "use strict"

    //Elementos para manipulação do Doom
    const inputTextBox = document.getElementById('item-input')
    const toDoAddForm = document.getElementById('todo-add')
    const toDoUnorderedList = document.getElementById('todo-list')
    //const TodosOsItens = document.querySelectorAll('li')

    let arrayDeTasks = [
        {
            nome: "task 1",
            createAt: Date.now(),
            completed: false
        }
    ]

    //acionamento do botão add
    toDoAddForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault()
        logger.logINFO('Usuario clicou no botão add')
        logger.logINFO('Novo item recebido no formulário', inputTextBox.value)
        
        const newItemli = controller.addItem(inputTextBox.value)

        if (newItemli) {
            toDoUnorderedList.appendChild(newItemli)
            controller.addEventLi(newItemli)
            logger.logINFO('Item adicionado com sucesso')
        }

        inputTextBox.value = ''
        inputTextBox.focus()
    });

    arrayDeTasks.forEach(item =>{
        addEventLi(item)
    })


})()