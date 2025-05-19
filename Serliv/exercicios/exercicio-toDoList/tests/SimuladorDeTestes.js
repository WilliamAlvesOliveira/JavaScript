;(function (window) {
  'use strict'

  const hooks = {
    beforeAll: [],
    beforeEach: [],
    afterEach: [],
    afterAll: []
  }

  function createSection(title) {
    const section = document.createElement('section')
    const h3 = document.createElement('h3')
    h3.textContent = title
    const ul = document.createElement('ul')
    section.appendChild(h3)
    section.appendChild(ul)
    document.body.appendChild(section)
    return ul
  }

  function beforeAll(fn) {
    hooks.beforeAll.push(fn)
  }

  function beforeEach(fn) {
    hooks.beforeEach.push(fn)
  }

  function afterEach(fn) {
    hooks.afterEach.push(fn)
  }

  function afterAll(fn) {
    hooks.afterAll.push(fn)
  }

  function runHooks(hookType) {
    try {
      hooks[hookType].forEach(fn => fn())
    } catch (e) {
      console.error(`Erro ao executar ${hookType}:`, e)
    }
  }

  let currentList = null
  let totalTests = 0
  let failedTests = 0
  let beforeEachCallback = null

  function describe(title, fn) {
    currentList = createSection(title)
    runHooks('beforeAll')
    fn()
    runHooks('afterAll')
  }

  function it(description, fn) {
    totalTests++
    const li = document.createElement('li')
    
    runHooks('beforeEach')
    if (beforeEachCallback) beforeEachCallback()
    
    try {
      fn()
      li.textContent = `✅ ${description}`
      li.style.color = 'green'
    } catch (err) {
      failedTests++
      li.innerHTML = `❌ ${description}<br><code>${err.message}</code>`
      li.style.color = 'red'
    }
    
    runHooks('afterEach')
    currentList.appendChild(li)
  }

  function expect(received) {
    return {
      toBe(expected) {
        if (received !== expected) {
          throw new Error(`Esperado "${expected}", mas recebeu "${received}"`)
        }
      },
      toBeInstanceOf(constructor) {
        if (!(received instanceof constructor)) {
          throw new Error(`Esperado instância de ${constructor.name}, mas recebeu ${received?.constructor?.name || 'nulo'}`)
        }
      },
      toContain(text) {
        if (!received.includes(text)) {
          throw new Error(`Esperado que "${received}" contenha "${text}"`)
        }
      }
    }
  }

  function showTestSummary() {
    const header = document.createElement('div')
    header.style.cssText = `
      font-weight: bold;
      font-size: 1.4em;
      margin-bottom: 1em;
      padding: 1em;
      border-radius: 6px;
      text-align: center;
    `
    
    if (failedTests === 0) {
      header.textContent = `✅ TESTES PASSARAM: ${totalTests} testes`
      header.style.backgroundColor = '#d4edda'
      header.style.border = '1px solid #c3e6cb'
      header.style.color = 'green'
    } else {
      header.textContent = `❌ TESTES FALHARAM: ${failedTests} de ${totalTests} testes`
      header.style.backgroundColor = '#f8d7da'
      header.style.border = '1px solid #f5c6cb'
      header.style.color = 'red'
    }
    
    document.body.insertBefore(header, document.body.firstChild)
  }

  window.describe = describe
  window.it = it
  window.beforeAll = beforeAll
  window.beforeEach = beforeEach
  window.afterEach = afterEach
  window.afterAll = afterAll
  window.expect = expect
  window.showTestSummary = showTestSummary
})(window)