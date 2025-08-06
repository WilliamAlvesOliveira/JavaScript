const repository = require('../repository/tasks.repository');
const { validateCreate, validateUpdate, validatePartialUpdate, checkValidation } = require('../validator/task.validador');

// Helper para tratamento de erros
const handleError = (res, error, context = '') => {
  console.error(`Error ${context}:`, error);
  const status = error.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({
    error: error.message,
    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

// GET /tasks
exports.getAll = async (req, res) => {
  try {
    const tasks = await repository.getAll();
    res.json(tasks);
  } catch (error) {
    handleError(res, error, 'fetching tasks');
  }
};

// GET /tasks/:id
exports.getById = async (req, res) => {
  try {
    const task = await repository.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    handleError(res, error, 'fetching task');
  }
};

// POST /tasks (com validação)
exports.create = [
  validateCreate,
  checkValidation,
  async (req, res) => {
    try {
      const newTask = {
        title: req.body.title,
        userId: req.body.userId,
        completed: req.body.completed || false
      };
      
      const task = await repository.create(newTask);
      res.status(201).json(task);
    } catch (error) {
      handleError(res, error, 'creating task');
    }
  }
];

// PUT /tasks/:id (atualização completa)
exports.update = [
  validateUpdate,
  checkValidation,
  async (req, res) => {
    try {
      const updatedTask = await repository.update(req.params.id, req.body);
      if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
      res.json(updatedTask);
    } catch (error) {
      handleError(res, error, 'updating task');
    }
  }
];

// PATCH /tasks/:id (atualização parcial)
exports.partialUpdate = [
  validatePartialUpdate,
  checkValidation,
  async (req, res) => {
    try {
      const updatedFields = req.body;
      const updatedTask = await repository.partialUpdate(req.params.id, updatedFields);
      if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
      res.json(updatedTask);
    } catch (error) {
      handleError(res, error, 'partially updating task');
    }
  }
];

// DELETE /tasks/:id
exports.delete = async (req, res) => {
  try {
    const deletedTask = await repository.delete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    handleError(res, error, 'deleting task');
  }
};