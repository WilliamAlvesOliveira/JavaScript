; (function () {
    "use strict"



    // crie uma funcao construtora chamada Task.
    // essa funcao recebe por parametro obrigatório o nome da tarefa
    // também recebe tres parametros opcionais (completed, createdAt, updatedAt)
    // o objeto retornado por essa funcao deve ter quatro propriedades:
	class Task {
        //  - name - string - obrigatório, 
        //  - completed - boolean - opcional, false é o default, 
        //  - createdAt - timestamp - opcional, timestamp atual é o valor default) 
        //  - updatedAt - timestamp - opcional, null é o valor default
        // o objeto retornado por essa funcao deve ter um método chamado toggleDone, que deve inverter o boolean completed
        #name
        constructor(
            name, 
            completed = false,
            createdAt = Date.now(), 
            updatedAt = null
        ){
            if (!name) throw new Error('Nome não pode estar vazio')
            
            this.#name = name
            this.completed = completed
            this.createdAt = createdAt
            this.updatedAt = updatedAt
        }

        toggleDone(){
            this.completed = !this.completed
            this.updatedAt = Date.now()
        }

        getName() {
            return this.#name
        }

        setName(newname){
            if (!newname) throw new Error('Nome não pode estar vazio')
            console.log(this)
        this.#name = newname
        this.updatedAt = Date.now()
        console.log(this)

        }
	}

	let arrTasks = [
		{
			name: "task 1",
			completed: true,
			createdAt: 1592667375012,
			updatedAt: null
		},
		{
			name: "task 2",
			createdAt: 1581667345723,
			updatedAt: 1592667325018
		},
		{
			name: "task 3",
			completed: true,
			createdAt: 1592667355018,
			updatedAt: 1593677457010
		}
	]


    // a partir de um array de objetos literais, crie um array contendo instancias de Tasks. 
    // Essa array deve chamar arrInstancesTasks
	// const arrInstancesTasks = DESCOMENTE ESSA LINHA E RESOLVA O ENUNCIADO
    const arrInstancesTasks = arrTasks.map(task => {
        const {name, completed, createAt, updatedAt} = task
        return new Task(name, completed, createAt, updatedAt)
    })



    //ARMAZENAR O DOM EM VARIAVEIS
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul = document.getElementById("todo-list")
    const lis = ul.getElementsByTagName("li")


    function generateLiTask(obj) {

        const li = document.createElement("li")
        const p = document.createElement("p")
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deleteButton = document.createElement("i")

        li.className = "todo-item"

        checkButton.className = "button-check"
        checkButton.innerHTML = `
            <i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`
        checkButton.setAttribute("data-action", "checkButton")

        li.appendChild(checkButton)

        p.className = "task-name"
        p.textContent = obj.getName()
        li.appendChild(p)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action", "editButton")
        li.appendChild(editButton)


        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"
        const inputEdit = document.createElement("input")
        inputEdit.setAttribute("type", "text")
        inputEdit.className = "editInput"
        inputEdit.value = obj.getName()

        containerEdit.appendChild(inputEdit)
        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action", "containerEditButton")
        containerEdit.appendChild(containerEditButton)
        const containerCancelButton = document.createElement("button")
        containerCancelButton.className = "cancelButton"
        containerCancelButton.textContent = "Cancel"
        containerCancelButton.setAttribute("data-action", "containerCancelButton")
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)



        deleteButton.className = "fas fa-trash-alt"
        deleteButton.setAttribute("data-action", "deleteButton")
        li.appendChild(deleteButton)

        return li
    }

    function renderTasks() {
        ul.innerHTML = ""
        arrInstancesTasks.forEach(taskObj => {
            ul.appendChild(generateLiTask(taskObj))
        });
    }

    function addTask(taskname) {
        // adicione uma nova instancia de Task
        arrInstancesTasks.push(new Task(taskname))
        renderTasks()
    }

    function clickedUl(e) {
        const dataAction = e.target.getAttribute("data-action")
        console.log(e.target)
        if (!dataAction) return

        let currentLi = e.target
        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)

        const actions = {
            editButton: function () {
                const editContainer = currentLi.querySelector(".editContainer");

                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });

                editContainer.style.display = "flex";


            },
            deleteButton: function () {
                arrInstancesTasks.splice(currentLiIndex, 1)
                renderTasks()

            },
            containerEditButton: function () {
                const val = currentLi.querySelector(".editInput").value
                arrInstancesTasks[currentLiIndex].setName(val)
                renderTasks()
            },
            containerCancelButton: function () {
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getName()
            },
            checkButton: function () {

                // DEVE USAR O MÉTODO toggleDone do objeto correto
                arrInstancesTasks[currentLiIndex].toggleDone()
	            renderTasks()
            }
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        }
    }

    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(itemInput.value)
        addTask(itemInput.value)
        renderTasks()

        itemInput.value = ""
        itemInput.focus()
    });

    ul.addEventListener("click", clickedUl)

    renderTasks()

})();