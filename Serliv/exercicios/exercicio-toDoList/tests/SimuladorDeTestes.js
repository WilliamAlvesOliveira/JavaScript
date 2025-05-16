;(function (window) {
  'use strict'

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

  let currentList = null
  let totalTests = 0
  let failedTests = 0
  let beforeEachCallback = null

  function describe(title, fn) {
    currentList = createSection(title)
    fn()
  }

  function beforeEach(callback) {
    beforeEachCallback = callback
  }

  function it(description, fn) {
    totalTests++
    const li = document.createElement('li')
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
      },
      toBeCloseTo(expected, precision = 2) {
        const factor = Math.pow(10, precision)
        if (Math.round(received * factor) !== Math.round(expected * factor)) {
          throw new Error(`Esperado aproximadamente ${expected} (precisão ${precision}), mas recebeu ${received}`)
        }
      }
    }
  }

  function showTestSummary() {
    const header = document.createElement('div')
    header.style.fontWeight = 'bold'
    header.style.fontSize = '1.4em'
    header.style.marginBottom = '1em'
    header.style.padding = '1em'
    header.style.borderRadius = '6px'
    header.style.textAlign = 'center'
    if (failedTests === 0) {
      header.textContent = `✅ TESTES PASSARAM: ${totalTests} testes`
      header.style.color = 'green'
      header.style.backgroundColor = '#d4edda'
      header.style.border = '1px solid #c3e6cb'
    } else {
      header.textContent = `❌ TESTES FALHARAM: ${failedTests} de ${totalTests} testes`
      header.style.color = 'red'
      header.style.backgroundColor = '#f8d7da'
      header.style.border = '1px solid #f5c6cb'
    }
    document.body.insertBefore(header, document.body.firstChild)
  }

  window.describe = describe
  window.it = it
  window.expect = expect
  window.beforeEach = beforeEach
  window.showTestSummary = showTestSummary
})(window)
