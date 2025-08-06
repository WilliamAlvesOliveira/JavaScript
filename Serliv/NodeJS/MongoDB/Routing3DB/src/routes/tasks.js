const express = require('express');
const router = express.Router();
const controller = require('../controller/tasks.controler');

router.get('/', controller.getAll);
router.post('/', controller.create);

router.route('/:id')
  .get(controller.getById)
  .put(controller.update)
  .patch(controller.partialUpdate)
  .delete(controller.delete);

module.exports = router;