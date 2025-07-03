import {urlUsers, urlTasks} from '../config.js'
import  {createXMLHttpRequest} from '../createXMLHttpRequest.js'
import {Task} from '../Model/todoTask.model.js'

export default class TaskService{
    constructor(){
        this.tasks = []
    }
    
    add(task, cb, error,  userId){
        const fn = (task) => {
            const {title, completed, createdAt, updatedAt} = task
            this.getTask(userId, cb)
        }

        createXMLHttpRequest('POST', `${urlUsers}${userId}`, fn, error, JSON.stringify(task))
    }

    getTask(userId,sucess, error){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })

            if(typeof sucess === 'function') sucess(this.tasks)
        }
        createXMLHttpRequest('GET', `${urlUsers}${userId}`, fn, error)
    }

    remove(id, userId, cb, error){
        const fn = () => {
            this.getTask(userId, cb)
        }

        createXMLHttpRequest('DELETE', `${urlTasks}${id}`, fn, error)
    }

    update(task, userId, cb, error){
        task.updatedAt = Date.now()
        const fn = () => {
            this.getTask(userId, cb)
        }

        createXMLHttpRequest('PATCH',`${urlTasks}${task.id}`,  fn, error, JSON.stringify(task))
    }

    getById(id){
        return this.tasks.find(task => task.id === id)
    }
}