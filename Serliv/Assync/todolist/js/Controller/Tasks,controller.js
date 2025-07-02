import {Task} from '../Model/todoTask.model.js'

export default class TasksController{
    constructor(service, view){
        this.service = service
        this.view = view
    }

    add(title, userId){
        this.service.add(new Task(title), () => this.view.render(this.service.tasks),userId)
        //this.service.tasks
    }

    remove(id, userId){
        this.service.remove(id, userId, () => this.view.render(this.service.tasks))
    }

    update(task, userId){
        task.updatedAt = Date.now() 
        this.service.update(task, userId, () => this.view.render(this.service.tasks))
    }

    toggleDone(id, userId){
        const task = this.service.getById(id)
        const { completed } = task

        this.update({completed: !completed, id}, userId)
    }
}