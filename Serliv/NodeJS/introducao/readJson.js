//==========================================
//     LENDO JSON COM require E fs.readFile
//==========================================

// Importa o módulo 'fs' para leitura de arquivos
const fs = require('fs')

// Carrega e interpreta o JSON diretamente com require
// Obs: funciona apenas com arquivos .json, e a leitura é síncrona
const dados = require('./dados/users.json')

//==========================================
//       LENDO JSON COM fs.readFile
//==========================================

// Leitura assíncrona do arquivo 'users.json' com encoding 'UTF-8'
fs.readFile('./dados/users.json', 'UTF-8', (err, content) => {
    if (err) throw err

    // Exibe o conteúdo como string bruta (texto do JSON)
    console.log(content)
    console.log('dados acessados com sucesso')

    // Converte o texto JSON em um objeto JavaScript
    console.log('primeiro objeto do JSON:')
    const json = JSON.parse(content)

    // Exibe o primeiro item do array (caso o JSON seja um array)
    console.log(json[0])

    // Exibe apenas a propriedade "name" do primeiro objeto
    console.log(json[0].name)
})

[
  { "name": "user1", "email": "user@server.com" }
]

//==========================================
//    LENDO JSON DIRETAMENTE COM require
//==========================================

// Nesse ponto o JSON já foi carregado automaticamente
// como objeto JavaScript (repare que não há callback)

// Exibe todo o conteúdo importado
console.log(dados)

// Exibe o primeiro item do array
console.log(dados[0])

// Exibe o campo "name" do primeiro item
console.log(dados[0].name)

// Apenas para separar visualmente os blocos no terminal
console.log('------------------')

/*
💡 Dica Importante
Usar require para ler JSON é simples e direto, mas ele faz cache do arquivo. Se o conteúdo for alterado depois da leitura, ele não é recarregado automaticamente. Por isso, para leituras dinâmicas (ex: arquivos que podem mudar), prefira sempre fs.readFile.
*/