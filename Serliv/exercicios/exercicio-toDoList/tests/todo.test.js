describe('Validação de tarefas duplicadas', () => {
  let arrayDeTarefas

  beforeEach(() => {
    arrayDeTarefas = []
  })

  it('deve detectar tarefa duplicada no array', () => {
    arrayDeTarefas.push({ nome: 'Comprar pão', id: '1', concluido: false })

    const duplicada = arrayDeTarefas.some(t => t.nome.toLowerCase() === 'comprar pão')
    expect(duplicada).toBe(true)
  })

  it('deve permitir tarefa com nome diferente', () => {
    const duplicada = arrayDeTarefas.some(t => t.nome.toLowerCase() === 'estudar')
    expect(duplicada).toBe(false)
  })
})
