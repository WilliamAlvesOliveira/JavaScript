;(function(){
    "use strict"

    //Elementos para manipulação do Doom
    const inputTextBox = document.getElementById('item-input')
    const toDoAddForm = document.getElementById('todo-add')
    const toDoUnorderedList = document.getElementById('todo-list')
    let TodosOsItens = document.querySelectorAll('li')

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

    [...TodosOsItens].forEach(item =>{
        item.addEventListener('click', () => console.log(item))
    })


})()