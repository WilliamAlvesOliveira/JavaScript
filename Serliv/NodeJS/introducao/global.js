//=====================================
//    🌐 GLOBAL - Node.js
//=====================================

// Acessa o objeto `global` e usa o console para imprimir "teste"
// No Node.js, `global` é como o `window` no navegador – o escopo global
global.console.log('teste')

// Exibe o caminho completo até o arquivo atual (com nome do arquivo incluído)
console.log(__filename)

// Exibe o diretório onde este arquivo está localizado
console.log(__dirname)

// Mostra a versão do Node.js em execução
console.log(process.versions.node)

// Mostra o ID do processo atual
console.log(process.pid)

// Exibe os argumentos passados na execução do script
// Os dois primeiros argumentos são fixos: 
// [0] = caminho do executável do Node, 
// [1] = caminho do arquivo em execução
console.log(process.argv)

//=================================================
//    🧠 Manipulando argumentos com destructuring
//=================================================

// Aqui estamos fazendo um destructuring para capturar diretamente os argumentos de índice 2 e 3
// Exemplo: node app.js João Silva => firstname = "João", lastname = "Silva"
const [, , firstname, lastname] = process.argv

// Neste ponto, firstname e lastname dependem da ordem correta dos argumentos
// console.log(`O nome é ${firstname} ${lastname}`) // Comentado porque usaremos outra abordagem

//=================================================
//    🏷️ Buscando argumentos por flags personalizadas
//=================================================

// Função que procura uma flag específica nos argumentos e retorna o valor associado a ela
// Exemplo: node app.js --firstname João --lastname Silva
const getByFlag = flag => {
  // Procura o índice da flag dentro do array process.argv
  const indexOfFlag = process.argv.indexOf(flag)

  // Retorna o valor logo após a flag
  return process.argv[indexOfFlag + 1]
}

// Busca os valores passados após as flags --firstname e --lastname
const firstnameFlag = getByFlag('--firstname')
const lastnameFlag = getByFlag('--lastname')

// Exibe o nome completo formatado com base nas flags passadas
console.log(`O nome é ${firstnameFlag} ${lastnameFlag}`)
