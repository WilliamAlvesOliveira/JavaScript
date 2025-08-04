const repository = require('../repositories/tasks.repository')
const taskValidator = require('../validators/task.validador')

//===========================
// GET /tasks
// Lista todas as tarefas
//===========================
exports.get = async (req, res) => {
  try {
    const tasks = await repository.get();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro no GET /tasks:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar tarefas',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//===========================
// GET /tasks/:id
// Busca uma tarefa pelo ID
//===========================
exports.getById = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const task = await repository.get(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(`Erro no GET /tasks/${req.params.id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao buscar tarefa',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//===========================
// POST /tasks
// Cria uma nova tarefa
//===========================
exports.post = async (req, res) => {
  try {
    const validationResult = taskValidator.createValidator(req.body);
    
    if (validationResult.errors) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: validationResult.errors
      });
    }

    const newTask = {
      title: req.body.title,
      completed: req.body.completed || false,
      userId: parseInt(req.body.userId),
      createdAt: new Date(),
      updatedAt: null
    };

    const createdTask = await repository.post(newTask);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Erro no POST /tasks:', error);
    res.status(500).json({ 
      error: 'Erro ao criar tarefa',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//===========================
// PUT /tasks/:id
// Atualização completa de uma tarefa
//===========================
exports.put = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const validationResult = taskValidator.updateValidator(req.body);
    
    if (validationResult.errors) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: validationResult.errors
      });
    }

    const updatedData = {
      title: req.body.title,
      completed: req.body.completed,
      userId: parseInt(req.body.userId),
      updatedAt: new Date()
    };

    const updatedTask = await repository.put(updatedData, taskId);

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Erro no PUT /tasks/${req.params.id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao atualizar tarefa',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//===========================
// PATCH /tasks/:id
// Atualização parcial de uma tarefa
//===========================
exports.patch = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const validationResult = taskValidator.patchValidator(req.body);
    
    if (validationResult.errors) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: validationResult.errors
      });
    }

    const updatedFields = {
      ...req.body,
      updatedAt: new Date()
    };

    // Garante que o userId seja um número se foi fornecido
    if (updatedFields.userId !== undefined) {
      updatedFields.userId = parseInt(updatedFields.userId);
    }

    const updatedTask = await repository.patch(taskId, updatedFields);

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Erro no PATCH /tasks/${req.params.id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao atualizar tarefa parcialmente',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//===========================
// DELETE /tasks/:id
// Remove uma tarefa
//===========================
exports.delete = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deletedTask = await repository.delete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.status(200).json({
      message: 'Tarefa deletada com sucesso',
      deletedTask
    });
  } catch (error) {
    console.error(`Erro no DELETE /tasks/${req.params.id}:`, error);
    res.status(500).json({ 
      error: 'Erro ao deletar tarefa',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};