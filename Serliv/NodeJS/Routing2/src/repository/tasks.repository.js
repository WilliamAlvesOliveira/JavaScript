// Importa os módulos nativos do Node.js para manipulação de arquivos e caminhos
const fs = require('fs');
const path = require('path');

// Caminho absoluto para o arquivo JSON onde as tarefas serão salvas
const DB_PATH = path.resolve(__dirname, '../../data/tasks.json');

// Inicializa a variável `tasks` carregando os dados do arquivo JSON
let tasks = loadTasks();

//==============================================
// Função para carregar tarefas do arquivo JSON
//==============================================
function loadTasks() {
  try {
    // Lê o conteúdo do arquivo como texto
    const data = fs.readFileSync(DB_PATH, 'utf8');
    // Converte o texto JSON em um array de objetos
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao carregar tarefas:', err);
    // Retorna um array vazio se ocorrer erro (ex: arquivo não existe ainda)
    return [];
  }
}

//==============================================
// Função para salvar as tarefas no arquivo JSON
//==============================================
function saveTasks() {
  try {
    // Converte o array de objetos `tasks` em JSON com identação
    fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Erro ao salvar tarefas:', err);
  }
}

//====================================================
// Retorna todas as tarefas ou uma tarefa específica
//====================================================
exports.get = async (id) => {
  if (id) {
    // Busca a tarefa com o ID correspondente
    return tasks.find(task => task.id === parseInt(id));
  }
  // Se não passar ID, retorna todas as tarefas
  return tasks;
};

//=========================================
// Cria uma nova tarefa e salva no arquivo
//=========================================
exports.post = async (data) => {
  // Gera um novo ID com base no maior ID existente
  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  // Cria o novo objeto de tarefa
  const newTask = {
    ...data,              // Copia os dados recebidos
    id: newId,            // Define o novo ID
    createdAt: Date.now(),// Marca o momento de criação
    updatedAt: null       // Ainda não foi atualizada
  };

  // Adiciona ao array e salva
  tasks.push(newTask);
  saveTasks();
  return newTask;
};

//=================================================
// Substitui completamente uma tarefa existente
//=================================================
exports.put = async (newData, id) => {
  // Encontra o índice da tarefa com o ID informado
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;

  // Cria uma nova versão da tarefa mantendo o ID original
  const updatedTask = {
    ...tasks[taskIndex], // Dados antigos
    ...newData,          // Dados novos
    id,
    updatedAt: Date.now() // Atualiza a data de modificação
  };

  // Substitui no array e salva
  tasks[taskIndex] = updatedTask;
  saveTasks();
  return updatedTask;
};

//==========================================================
// Atualiza parcialmente os campos de uma tarefa existente
//==========================================================
exports.patch = async (id, updatedFields) => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;

  // Remove campos indefinidos (não enviados)
  const cleanFields = Object.entries(updatedFields).reduce((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});

  // Atualiza apenas os campos enviados
  const updatedTask = {
    ...tasks[taskIndex],
    ...cleanFields,
    updatedAt: Date.now()
  };

  tasks[taskIndex] = updatedTask;
  saveTasks();
  return updatedTask;
};

//=========================================
// Remove uma tarefa com base no ID
//=========================================
exports.delete = async (id) => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;

  // Remove a tarefa do array
  const [deletedTask] = tasks.splice(taskIndex, 1);
  saveTasks();
  return deletedTask;
};
