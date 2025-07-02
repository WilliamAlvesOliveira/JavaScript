import {Task} from './Model/todoTask.model.js'
import { createXMLHttpRequest } from './createXMLHttpRequest.js'
import TaskService from './Service/Task.service.js'
import TasksController from './Controller/Tasks,controller.js'
import TasksView from './View/Tasks.view.js'

//const UrlTodo = 'https://jsonplaceholder.typicode.com/users/1/todos/'
//const UrlTodo = 'http://localhost:3000/tasks?userId=1'

const UrlTask = 'http://localhost:3000/tasks'

const userId = 1

const taskService = new TaskService()

const ul = document.getElementById("todo-list")

const tasksView = new TasksView(ul)
const taskController = new TasksController(taskService, tasksView)

const itemInput = document.getElementById("item-input")
const todoAddForm = document.getElementById("todo-add")
const lis = ul.getElementsByTagName("li")

taskService.getTask(userId, init)

todoAddForm.addEventListener("submit", function (e) {
    e.preventDefault()
    taskController.add(itemInput.value, userId)

    itemInput.value = ""
    itemInput.focus()
});

function init(arrInstancesTasks){

    if(arrInstancesTasks.error) return

    tasksView.render(taskService.tasks)

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
                taskController.remove(currentLi.getAttribute('data-id'), userId)
            },
            containerEditButton: function () {
                const title = currentLi.querySelector(".editInput").value
                const id = currentLi.getAttribute('data-id')
                taskController.update({title, id}, userId)
            },
            containerCancelButton: function () {
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getTitle()
            },
            checkButton: function () {
                const id = currentLi.getAttribute('data-id')
                // DEVE USAR O MÉTODO toggleDone do objeto correto
                // arrInstancesTasks[currentLiIndex].toggleDone()
                // renderTasks()
                taskController.toggleDone(id, userId)
            }
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        }
    }
    ul.addEventListener("click", clickedUl)
 }
   