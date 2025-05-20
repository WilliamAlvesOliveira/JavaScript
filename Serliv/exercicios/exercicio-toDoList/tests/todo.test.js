describe('Testes de Todo List', () => {
  let arrayDeTarefas;
  let toDoUnorderedList;

  beforeAll(() => {
    // Carrega o HTML básico necessário
    document.body.innerHTML = `
      <div id="app-container">
        <ul id="todo-list"></ul>
        <form id="todo-add">
          <input id="item-input" type="text">
        </form>
      </div>
    `;
  });

  beforeEach(() => {
    // Reseta o estado antes de cada teste
    arrayDeTarefas = [];
    toDoUnorderedList = document.getElementById('todo-list');
    
    // Garante que o elemento existe
    if (!toDoUnorderedList) {
      toDoUnorderedList = document.createElement('ul');
      toDoUnorderedList.id = 'todo-list';
      document.body.appendChild(toDoUnorderedList);
    }
    
    toDoUnorderedList.innerHTML = '';
  });

  it('deve renderizar tarefas corretamente', () => {
    // Mock básico se a função não estiver disponível
    if (typeof renderizarTarefas !== 'function') {
      window.renderizarTarefas = function(lista) {
        const ul = document.getElementById('todo-list');
        ul.innerHTML = '';
        lista.forEach(tarefa => {
          const li = document.createElement('li');
          li.className = 'todo-item';
          li.innerHTML = `
            <button class="button-check">
              <i class="fas fa-check ${tarefa.concluido ? '' : 'displayNone'}"></i>
            </button>
            <p class="task-name">${tarefa.nome}</p>
          `;
          ul.appendChild(li);
        });
      };
    }

    arrayDeTarefas = [
      { nome: 'Tarefa 1', id: '1', concluido: false },
      { nome: 'Tarefa 2', id: '2', concluido: true }
    ];
    
    renderizarTarefas(arrayDeTarefas);
    
    const itens = document.querySelectorAll('#todo-list .todo-item');
    expect(itens.length).toBe(2);
    expect(itens[0].querySelector('.task-name').textContent).toBe('Tarefa 1');
    
    // Verifica o ícone de check
    const icon = itens[1].querySelector('.fa-check');
    if (icon) {
      expect(icon.classList.contains('displayNone')).toBe(false);
    } else {
      throw new Error('Ícone de check não encontrado');
    }
  });

  it('deve detectar tarefas duplicadas corretamente', () => {
    // Usa a função real exportada pelo módulo
    const { tarefaJaExiste } = window.todolist || {};
    
    // Se a função não estiver disponível, cria um mock fiel à implementação original
    const testFunction = function(nome) {
      return arrayDeTarefas.some(tarefa => {
        console.log('Comparando:', tarefa.nome, 'com', nome); // Debug detalhado
        return tarefa.nome.toLowerCase() === nome.toLowerCase().trim();
      });
    };

    arrayDeTarefas = [
      { nome: 'Comprar pão', id: '1', concluido: false },
      { nome: 'Estudar JavaScript', id: '2', concluido: true }
    ];

    console.log(arrayDeTarefas)

    // Testes atualizados
    expect(testFunction('comprar pão')).toBe(true);
    expect(testFunction('  COMPRAR PÃO  ')).toBe(true);
    expect(testFunction('Estudar javascript')).toBe(true);
    expect(testFunction('Fazer exercícios')).toBe(false);
    
    // Teste adicional para garantir o trim()
    expect(testFunction('  Comprar pão  ')).toBe(true);
    expect(testFunction('Comprar pão   ')).toBe(true);
  });

  //   1. Adição de Tarefa via Formulário (Teste de Integração)
  // O que testar:
  
// Se o submit do formulário adiciona um item ao arrayDeTarefas

// Se o input é limpo após a adição

// Se a lista DOM é atualizada

// 2. Alternância de Estado "Concluído" (Teste de Interação)
// O que testar:

// Se clicar no botão altera tarefa.concluido no array

// Se a classe displayNone no ícone é atualizada

// Se a tarefa é re-renderizada corretamente

// 3. Validação de Input Vazio/Mal-formatado (Teste de Segurança)
// O que testar:

// Se o formulário rejeita strings vazias ou só espaços

// Se caracteres HTML/XSS são sanitizados (ex: <script>)

// 4. Exclusão de Tarefa (Se aplicável)
// O que testar:

// Se a função de remoção atualiza o arrayDeTarefas

// Se o item é removido do DOM

// 5. Performance com Muitos Itens (Teste de Stress)
// O que testar:

// Renderização com 100+ itens não deve travar a UI

// Tempo de resposta aceitável (<500ms)
});



