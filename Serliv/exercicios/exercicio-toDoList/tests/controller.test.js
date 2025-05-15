describe('controller.criarTarefa()', () => {
  it('deve criar um objeto válido com nome, id e concluido', () => {
    const tarefa = controller.criarTarefa('Comprar pão')
    expect(typeof tarefa).toBe('object')
    expect(tarefa.nome).toBe('Comprar pão')
    expect(typeof tarefa.id).toBe('string')
    expect(tarefa.concluido).toBe(false)
  })

  it('deve ignorar espaços nas bordas', () => {
    const tarefa = controller.criarTarefa('   Dormir cedo   ')
    expect(tarefa.nome).toBe('Dormir cedo')
  })
})

describe('controller.criarNovaTarefa()', () => {
  const tarefaMock = {
    nome: 'Estudar testes',
    id: '123abc',
    concluido: false
  }

  it('deve retornar um elemento <li>', () => {
    const li = controller.criarNovaTarefa(tarefaMock)
    expect(li.tagName).toBe('LI')
  })

  it('deve conter o nome da tarefa no conteúdo', () => {
    const li = controller.criarNovaTarefa(tarefaMock)
    expect(li.textContent).toContain('Estudar testes')
  })

  it('deve incluir o atributo data-id com o id da tarefa', () => {
    const li = controller.criarNovaTarefa(tarefaMock)
    expect(li.getAttribute('data-id')).toBe('123abc')
  })

  it('deve esconder o ícone de check se tarefa não estiver concluída', () => {
    const li = controller.criarNovaTarefa(tarefaMock)
    const icon = li.querySelector('.fa-check')
    expect(icon.classList.contains('displayNone')).toBe(true)
  })
})


showTestSummary()
