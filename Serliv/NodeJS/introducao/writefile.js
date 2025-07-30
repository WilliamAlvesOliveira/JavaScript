//==========================================
//       CRIANDO ARQUIVOS COM NODE.JS
//==========================================

// Importa o módulo 'fs' (File System) para trabalhar com arquivos
const fs = require('fs')

//==========================================
//     CRIANDO UM ARQUIVO DE TEXTO (.md)
//==========================================

// Conteúdo que será salvo no arquivo 'teste.md'
// É um template Markdown com uma estrutura de lista
const md = `
    # Este é um conteúdo criado dinamicamente

    *ITEM 1: item1
    *ITEM 2: item2
    *ITEM 3: item3
`

// Escreve o conteúdo da variável 'md' dentro de './files/teste.md'
// Se o arquivo não existir, ele será criado. Se já existir, será sobrescrito.
fs.writeFile('./files/teste.md', md, err => {
    if (err) throw err

    console.log('Arquivo salvo com sucesso!')
})

//==========================================
//       CRIANDO UM ARQUIVO JSON (.json)
//==========================================

// Objeto simples com dados de usuário
const users = [{
    name: 'user1',
    email: 'user@server.com'
}]

// Serializa o objeto 'users' para formato JSON e salva no arquivo
fs.writeFile('./files/users.json', JSON.stringify(users), err => {
    if (err) throw err

    console.log('JSON salvo com sucesso!')
})

//===========================================================
// CRIANDO UM ARQUIVO EM UM DIRETÓRIO QUE AINDA NÃO EXISTE
//===========================================================

// Função que cria o arquivo 'users.json' dentro do diretório './dados'
const createUsersJson = () => {
    fs.writeFile('./dados/users.json', JSON.stringify(users), err => {
        if (err) throw err

        console.log('JSON salvo com sucesso dentro de "dados"!')
    })
}

// Verifica se o diretório './dados' já existe usando 'existsSync'
if (!fs.existsSync('./dados')) {
    // Se não existir, cria o diretório
    fs.mkdir('dados', err => {
        if (err) throw err

        // Após criar, chama a função para salvar o JSON dentro dele
        createUsersJson()
    })
} else {
    // Se já existir, apenas cria o arquivo normalmente
    createUsersJson()
}
