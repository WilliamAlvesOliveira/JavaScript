;(function(window){
    'use strict'

    function addEventLi(li){
        li.addEventListener('click', function(){
            console.log(this)/*
            console.log(this.textContent)
            console.log(this.innerText)
            console.log(this.innerHTML)
            console.log(this.outerHTML)*/
        })
    }

    function addItem(itemValue){
        if (itemValue.trim() === '') {
            logger.logWarn('Campo vazio')
            return
        }
    

        logger.logINFO('Adicionando item: ', itemValue)

        const newItem = document.createElement('li')
        newItem.classList.add('todo-item')
        newItem.innerHTML = `
        <button class="button-check">
            <i class="fas fa-check displayNone"></i>
        </button>
        <p class="task-name">${itemValue}</p>
        <i class="fas fa-edit"></i>
        <div class="editContainer">
                <input class="editInput" type="text">
                <button class="editButton">Edit</button>
                <button class="cancelButton">Cancel</button>
        </div>
        <i class="fas fa-trash-alt"></i>
        `
        logger.logINFO('Novo elemento criado!')
        return newItem
    }

    window.controller = {
        addItem: addItem,
        addEventLi: addEventLi
    }

})(window)