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
            const {title, completed, createdAt, updatedAt} = task
            //this.tasks.push(new Task(title, completed, createdAt, updatedAt))
            this.getTask(userId, cb)
            //if(typeof cb === 'function')cb()
        }

        createXMLHttpRequest('POST', `${urlUsers}/tasks?userId=${userId}`, fn, JSON.stringify(task))
    }

    getTask(userId,callback){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })

            if(typeof callback === 'function') callback(this.tasks)
        }
        createXMLHttpRequest('GET', `${urlUsers}/tasks?userId=${userId}`, fn)
    }

    remove(id, userId, cb){
        const fn = () => {
            this.getTask(userId, cb)
        }

        createXMLHttpRequest('DELETE', `${urlUsers}/tasks/${id}`, fn)
    }
}