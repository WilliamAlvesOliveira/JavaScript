//=============================
//         STREAMS
//=============================
// Neste exemplo, usamos duas formas de ler um arquivo JSON:
// 1. Com fs.readFile (modo tradicional - carrega tudo de uma vez)
// 2. Com fs.createReadStream (modo stream - carrega em pedaços)

// Importa o módulo File System
const fs = require('fs')

//=============================
//    LENDO COM readFile()
//=============================

// Lê o arquivo inteiro de uma vez só
fs.readFile('./swapi.json', (err, data) => {
    if (err) throw err

    // Converte o Buffer em objeto JS e acessa o nome do primeiro personagem
    const results = JSON.parse(data).results[0].name
    console.log(results)
})

//=============================
//    LENDO COM STREAMS
//=============================

// Cria um stream de leitura para o arquivo, com codificação UTF-8
const readStream = fs.createReadStream('./swapi.json', 'UTF-8')

//=============================
//   Evento: on('data')
//=============================

// Quando o stream receber um pedaço (chunk) de dados, este evento é disparado
// Isso pode acontecer várias vezes, dependendo do tamanho do arquivo

let json = '' // Acumulador para juntar os pedaços

readStream.on('data', data => {
    console.log('on-data')          // Indica que um chunk chegou
    console.log(data.length)       // Tamanho do pedaço recebido
    json += data                   // Junta os pedaços na variável 'json'
})

//=============================
//   Evento: on('end')
//=============================

// Quando todo o arquivo for lido, esse evento é disparado

readStream.on('end', () => {
    console.log('end')       // Indica o fim da leitura
    console.log(json)        // Exibe o conteúdo completo
})
