const express = require("express")
const tasks = require('./data/tasks.json') // Importa um array de tarefas de um arquivo JSON local

const app = express()

// Middleware para interpretar JSON e dados de formulários
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ===============================================
//             ROTA PARA LER TODAS AS TAREFAS
// ===============================================
app.get('/tasks', (req, res) => {
    res.send(tasks) // Retorna todas as tarefas
})

// ===============================================
//            ROTA PARA CRIAR UMA NOVA TAREFA
// ===============================================
app.post('/tasks', (req, res) => {
    console.log(req.body)
    const { title, userId } = req.body

    // Criação de uma nova tarefa
    const newTask = {
        title,
        completed: false,
        createdAt: Date.now(),
        updatedAt: null,
        userId,
        id: tasks[tasks.length - 1].id + 1 // Incrementa ID com base na última tarefa
    }

    tasks.push(newTask) // Adiciona a nova tarefa ao array
    res.send(newTask) // Retorna a nova tarefa criada
})

// ===============================================
//      ROTAS ENCADEADAS PARA OPERAÇÕES COM ID
// ===============================================
app.route('/tasks/:id')

    // ---------- LER UMA TAREFA ESPECÍFICA ----------
    .get((req, res) => {
        const task = tasks.find(task => task.id === parseInt(req.params.id))
        if (!task) {
            return res.status(404).send({ error: "Tarefa não encontrada." })
        }
        res.send(task)
    })

    // ---------- SUBSTITUIR UMA TAREFA COMPLETA ----------
    .put((req, res) => {
        const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))
        if (taskIndex === -1) {
            return res.status(404).send({ error: "Tarefa não encontrada para substituição." })
        }

        const { title, completed, createdAt, updatedAt, userId, id } = req.body
        const newTask = { title, completed, createdAt, updatedAt, userId, id }

        tasks.splice(taskIndex, 1, newTask)
        res.send(newTask)
    })

    // ---------- ATUALIZAÇÃO PARCIAL DE UMA TAREFA ----------
    .patch((req, res) => {
        const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))
        if (taskIndex === -1) {
            return res.status(404).send({ error: "Tarefa não encontrada para atualização." })
        }

        const taskById = tasks[taskIndex]
        const { title, completed, userId } = req.body
        const updatedAt = Date.now()

        // Só inclui propriedades definidas (evita sobrescrever com `undefined`)
        const updatedFields = { title, completed, userId, updatedAt }
        for (let prop in updatedFields) {
            if (typeof updatedFields[prop] === 'undefined') {
                delete updatedFields[prop]
            }
        }

        const updatedTask = { ...taskById, ...updatedFields }

        tasks.splice(taskIndex, 1, updatedTask)
        res.send(updatedTask)
    })

    // ---------- DELETAR UMA TAREFA ----------
    .delete((req, res) => {
        const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))
        if (taskIndex === -1) {
            return res.status(404).send({ error: "Tarefa não encontrada para exclusão." })
        }

        const deletedTask = tasks.splice(taskIndex, 1) // Corrigido: era `task.splice` (erro de digitação)
        res.send(deletedTask)
    })

// ===============================================
//        INICIALIZA O SERVIDOR NA PORTA 3001
// ===============================================
app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001')
})
