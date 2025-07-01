const urlUsers = 'http://localhost:3000'
import  {createXMLHttpRequest} from '../createXMLHttpRequest.js'
import {Task} from '../Model/todoTask.model.js'

export default class TaskService{
    constructor(){
        this.tasks = []
    }
    
    add(task, cb, userId){
        if(!task instanceof Task){
            throw TypeError("Task must be instance of Tasks")
        }
    
        const fn = (task) => {
            this.tasks.push(new Task(task))
            if(typeof cb === 'function')cb()
        }

        createXMLHttpRequest('POST', `${urlUsers}/tasks?userId=${userId}`, fn, JSON.stringify(task))
    }

    getTask(userId,callback){
        const fn = (arrTasks) => {
            console.log(arrTasks)
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt } = task
                return new Task(title, completed, createdAt, updatedAt)
            })
            callback(this.tasks)
        }
        createXMLHttpRequest('GET', `${urlUsers}/tasks?userId=${userId}`, fn)
    }
}