//==================
//   WRITE STREAMS
//==================
// Conceito: Write Stream é uma forma de escrever dados em arquivos (ou saídas) aos poucos,
// ideal para grandes volumes de dados ou escrita contínua.

// Importa o módulo 'fs' (File System)
const fs = require('fs')

// Cria um Write Stream para escrever no arquivo 'file.md'
// O segundo argumento define a codificação (aqui estamos usando 'UTF-8', ou seja, texto)
// Poderia ser omitido se estivéssemos escrevendo binário
const WS = fs.createWriteStream('./file.md', 'UTF-8')

// Escreve uma linha de texto no arquivo
// Ideal quando você precisa escrever em partes, ou muitas vezes (ex: logs)
WS.write('# Olá, Mundo!')

// Cria um Read Stream para ler o arquivo 'swapi'
// Como não tem extensão, presume-se que seja um JSON ou texto
const readStream = fs.createReadStream('./swapi', 'UTF-8')

// Cria um Write Stream para escrever em 'swapi_clone.json'
const writeStream = fs.createWriteStream('./swapi_clone.json', 'UTF-8')

//🔁 Opção 1: usando .on('data') manualmente (comentada)

// Esta forma manual escuta os pedaços (chunks) que chegam
// E escreve cada um deles no arquivo de destino
// readStream.on('data', data => {
//     writeStream.write(data)
// })

//⚠️ Essa abordagem funciona, mas você precisa controlar o fluxo e saber quando terminou. Pode ser útil se quiser processar os dados no meio do caminho.

//✅ Opção 2: usando .pipe() (forma mais simples e automática)

/*
readStream.pipe(writeStream)
*/
// O método pipe liga a saída do readStream à entrada do writeStream,
// ou seja: o que for lido será escrito automaticamente, em tempo real.
// É ideal para cópia de arquivos, como backup, duplicação etc.

//🔚 Encerramento com evento finish

// Aqui encadeamos o evento 'finish' ao final do pipe
// Ele é chamado quando a escrita termina totalmente
readStream.pipe(writeStream).on('finish', () => {
    console.log('finish') // Mensagem indicando que tudo foi copiado com sucesso
})
