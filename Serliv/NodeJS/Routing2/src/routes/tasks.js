const express = require('express')
const router = express.Router()
const controller = require('../controllers/tasks.controller') // Ajuste no caminho

router.get('/', controller.get)
router.post('/', controller.post)

router.route('/:id')
    .get(controller.getById)
    .put(controller.put)
    .patch(controller.patch) // Nome do método corrigido
    .delete(controller.delete)

module.exports = router