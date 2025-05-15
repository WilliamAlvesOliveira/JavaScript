describe('controller.addItem()', () => {
  it('deve retornar um elemento <li> para texto válido', () => {
    const item = controller.addItem('Comprar leite')
    expect(item.tagName).toBe('LI')
  })

  it('deve conter o texto correto', () => {
    const item = controller.addItem('Estudar JavaScript')
    expect(item.textContent).toContain('Estudar JavaScript')
  })

  it('não deve criar item com string vazia', () => {
    const item = controller.addItem('  ')
    expect(item).toBe(undefined)
  })

  it('deve funcionar com texto cheio de espaços', () => {
    const item = controller.addItem('   fazer café   ')
    expect(item.tagName).toBe('LI')
    expect(item.textContent).toContain('fazer café')
  })
})

showTestSummary()
