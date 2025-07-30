//======================================
//     BAIXANDO PÁGINA VIA HTTPS
//======================================
// Objetivo: Fazer uma requisição HTTPS para um servidor remoto e
// salvar o conteúdo da resposta em um arquivo local usando streams.

// Importa o módulo nativo 'fs' para manipulação de arquivos
const fs = require('fs')

// Importa o módulo 'https' para fazer requisições seguras (HTTPS)
const https = require('https')

// Importa a função hostname do módulo 'os' (aqui não está sendo usada)
const { hostname } = require('os')

// Configurações da requisição HTTPS
const options = {
    hostname: 'serfrontend.com', // Endereço do servidor
    port: '443',                 // Porta padrão HTTPS
    path: '/cursos/index.html', // Caminho do recurso desejado
    method: 'GET'               // Método HTTP usado
}

// Cria um Write Stream para salvar a resposta no arquivo 'index.html'
const writeStream = fs.createWriteStream('./index.html', 'UTF-8')

// Faz a requisição HTTPS
const request = https.request(options, (resposta) => {
    // Define a codificação da resposta como texto
    resposta.setEncoding('UTF-8')

    // Opcional: acumular a resposta completa em uma string (não usado no final)
    let response = ''

    // 🔁 Forma manual (comentada): capturar dados em partes
    /*
    resposta.on('data', data => {
        console.log(data.length)   // Exibe o tamanho de cada chunk
        response += data           // Acumula os dados
        writeStream.write(data)    // Escreve manualmente no arquivo
    })
    */

    // 🔚 Detecta o fim da resposta HTTP (mesmo que os dados tenham sido processados antes)
    request.on('end', () => {
        // Alternativa de escrita com writeFile (comentada)
        /*
        fs.writeFile('./index.html', response, err => {
            if (err) throw err
            console.log('index.html baixado')
        })
        */
        console.log('index.html lido') // Apenas indica que a leitura acabou
    })

    // 📝 Quando o Write Stream terminar de escrever tudo
    writeStream.on('finish', () => {
        console.log('index.html baixado') // Mensagem de sucesso
    })

    // ✅ Forma automática: usar .pipe() para conectar leitura e escrita
    resposta.pipe(writeStream).on('finish', () => {
        console.log('finish do pipe') // Mensagem quando o pipe terminar
    })
})

// Envia a requisição (obrigatório com request)
request.end()

