// Importa o módulo `express`, que facilita a criação de servidores web com Node.js
const express = require('express')

// Importa o módulo `path` do Node.js, usado para trabalhar com caminhos de arquivos e diretórios
const path = require('path')

// Cria uma instância do Express, que será nossa aplicação
const app = express()

//=============================================
// 1. Servindo arquivos estáticos da pasta 'static'
//=============================================

// Esta linha permite que todos os arquivos da pasta 'static' sejam acessados diretamente pelo navegador.
// Exemplo: um arquivo em 'static/style.css' poderá ser acessado em 'http://localhost:3001/style.css'
app.use(express.static('static'))

//=============================================
// 2. Servindo imagens a partir de uma sub-rota '/images'
//=============================================

// Aqui estamos dizendo que os arquivos dentro da pasta 'images' devem estar disponíveis
// via a rota '/images'.
// Exemplo: um arquivo 'images/logo.png' poderá ser acessado em 'http://localhost:3001/images/logo.png'
app.use('/images', express.static(path.join(__dirname, 'images')))


//=============================================
// 3. Middleware para páginas não encontradas (Erro 404)
//=============================================

// Este middleware será executado quando nenhuma das rotas anteriores for encontrada.
// Ele captura requisições que não bateram em nenhuma rota definida.
app.use((req, res) => {
    // Exibe no terminal a rota que não foi encontrada
    console.log(`Rota não encontrada: ${req.originalUrl}`)

    // Verifica se o cliente aceita resposta no formato HTML
    if (req.accepts('html')) {
        // Envia a página 404.html como resposta
        res.status(404).sendFile(path.join(__dirname, '404.html'))
    } else {
        // Caso o cliente não aceite HTML, retorna texto puro
        res.status(404).send('Página não encontrada.')
    }
})


//=============================================
// 4. Iniciando o servidor
//=============================================

// O servidor começa a escutar requisições na porta 3001
// Ao iniciar, exibe a URL de acesso no terminal
app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001')
})
