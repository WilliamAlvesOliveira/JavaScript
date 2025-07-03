import {Task} from '../Model/todoTask.model.js'
import {userId} from '../config.js'

export default class TasksController{
    constructor(service, view){
        this.service = service
        this.view = view
    }

    add(title){
        this.service.add(new Task(title),
            () => this.view.render(this.service.tasks),
            (error) => alert(error),
            userId
        )
    }

    remove(id){
        this.service.remove(id, userId,
            () => this.view.render(this.service.tasks),
            (error) => alert(error)
        )
    }

    update(task){
        task.updatedAt = Date.now() 
        this.service.update(task, userId,
            () => this.view.render(this.service.tasks),
            (error) => alert(error)
        )
    }

    toggleDone(id){
        const task = this.service.getById(id)
        const { completed } = task

        this.update({completed: !completed, id}, userId)
    }

    getTasks(){
        this.service.getTask(userId,
            () => this.view.render(this.service.tasks),
            (erro) => alert(erro))
    }
}