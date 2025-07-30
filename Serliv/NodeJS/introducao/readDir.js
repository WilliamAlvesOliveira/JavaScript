//==========================================
//   LENDO ARQUIVOS E DIRETÓRIOS NO NODE.JS
//==========================================

// Importa o módulo 'fs' (File System) para trabalhar com o sistema de arquivos
const fs = require('fs')

// Importa o módulo 'path' para trabalhar com caminhos de arquivos e diretórios
const path = require('path')

// Exibe o nome base do arquivo atual (sem o caminho completo)
console.log(path.basename(__filename))
// Exemplo: se o arquivo se chama 'index.js', o console exibirá 'index.js'

//==========================================
//      LENDO UM DIRETÓRIO DE ARQUIVOS
//==========================================

// Versão assíncrona: lê o conteúdo do diretório './files'
fs.readdir('./files', (err, files) => {
    if (err) {
        // Se ocorrer algum erro na leitura, ele será lançado
        throw err
    }

    // Caso não ocorra erro, será exibido o array com os nomes dos arquivos
    console.log(files)
})

// Essa mensagem será exibida antes da leitura terminar
console.log('iniciando leitura de diretório...')

//==========================================
//        LENDO UM ARQUIVO DE TEXTO
//==========================================

// Versão assíncrona: lê o conteúdo do arquivo README.md no diretório './files'
// O segundo argumento 'UTF-8' define o encoding, para que o conteúdo não venha em bytes
fs.readFile('./files/README.md', 'UTF-8', (err, content) => {
    if (err) throw err

    // Exibe o conteúdo do arquivo como texto
    console.log(content)
})

// Essa linha será exibida antes da leitura terminar
console.log('lendo arquivo....')

//==========================================
//         LENDO UM ARQUIVO DE IMAGEM
//==========================================

// Aqui estamos lendo um arquivo de imagem (binário), sem passar o encoding
// Isso significa que o conteúdo virá como um Buffer (bloco de dados binários)
fs.readFile('./files/banner.jpg', (err, content) => {
    if (err) throw err

    // Exibe o conteúdo da imagem como Buffer (não é legível, mas útil para salvar ou transferir)
    console.log(content)
})

//==========================================
//         LENDO UM ARQUIVO SVG (TEXTO)
//==========================================

// Um arquivo .svg é, na verdade, um arquivo de texto com marcação XML
// Por isso, podemos ler com 'UTF-8' e visualizar normalmente o conteúdo
fs.readFile('./files/_ionicons_svg.svg', 'UTF-8', (err, content) => {
    if (err) throw err

    // Exibe o conteúdo textual do SVG (XML)
    console.log(content)
})
