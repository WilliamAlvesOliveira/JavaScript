
# 📘 Streams no Node.js

## O que são Streams?

**Streams** são uma forma eficiente de ler, escrever e processar dados em partes (chunks), em vez de carregar tudo na memória de uma vez. Isso é útil, por exemplo, ao lidar com arquivos grandes ou transferências de dados via rede.

Existem **4 tipos principais** de Streams no Node.js:

1. **Readable** - Leitura de dados (ex: ler arquivos, receber dados via HTTP)
2. **Writable** - Escrita de dados (ex: salvar arquivos, enviar dados)
3. **Duplex** - Leitura e escrita ao mesmo tempo (ex: conexões de rede)
4. **Transform** - Streams duplex que podem modificar os dados enquanto passam por elas (ex: compressão, criptografia)

---

## Métodos comuns de Streams

### `fs.createReadStream(path, options)`

Cria uma stream de leitura a partir de um arquivo.

```js
const fs = require('fs')
const readStream = fs.createReadStream('./arquivo.txt', 'utf8')

readStream.on('data', chunk => {
  console.log('Chunk:', chunk)
})
```

### `fs.createWriteStream(path, options)`

Cria uma stream de escrita para um arquivo.

```js
const fs = require('fs')
const writeStream = fs.createWriteStream('./saida.txt', 'utf8')

writeStream.write('Olá mundo!')
writeStream.end()
```

### `.pipe(dest)`

Encadeia uma stream de leitura com uma de escrita. Muito usado para copiar dados ou fazer transformações simples.

```js
const fs = require('fs')
const read = fs.createReadStream('./entrada.txt')
const write = fs.createWriteStream('./saida.txt')

read.pipe(write)
```

### `.on('data', callback)`

Escuta quando um novo pedaço de dado (chunk) está disponível.

### `.on('end', callback)`

Disparado quando todos os dados foram lidos.

### `.on('error', callback)`

Captura erros que ocorrem durante a leitura ou escrita.

### `.on('finish', callback)`

Disparado quando **toda a escrita** foi concluída (apenas em streams de escrita).

---

## Vantagens dos Streams

- **Eficiência de memória**: processam dados aos poucos.
- **Performance**: não precisa esperar o conteúdo completo para começar a processar.
- **Controle total**: você pode pausar, retomar, tratar erros, etc.

---

## Exemplo prático com HTTPS

```js
const fs = require('fs')
const https = require('https')

const options = {
  hostname: 'exemplo.com',
  port: 443,
  path: '/arquivo',
  method: 'GET'
}

const writeStream = fs.createWriteStream('./saida.html', 'utf8')

const request = https.request(options, resposta => {
  resposta.pipe(writeStream)
})

request.end()
```

---

## Dica final

Prefira `.pipe()` quando possível, pois simplifica o código e cuida automaticamente de fluxos de leitura e escrita.

---

> **Stream é como um rio de dados: em vez de carregar o lago inteiro de uma vez, você coleta a água enquanto ela flui. 🌊**
