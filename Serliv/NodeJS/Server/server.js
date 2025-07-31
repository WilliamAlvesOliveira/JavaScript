//========================================
//  EXEMPLO DE COMO FUNCIONA UM SERVIDOR
//  (de forma básica, simulando um servidor real)
//========================================

const http = require('http') // módulo para criar servidor HTTP
const fs = require('fs')     // módulo para manipular arquivos

// Cria um servidor HTTP
http.createServer((req, res) => {
    // Estrutura de controle para lidar com diferentes rotas
    switch (req.url) { 
        case '/':
        case '/index.html':
            // Lê o arquivo HTML da pasta atual
            fs.readFile('./index.html', (error, html) => {
                if (error) {
                    // Se der erro na leitura, retorna erro 500
                    res.writeHead(500)
                    res.end('<h1>Erro interno no servidor</h1>')
                    return // evita continuar após erro
                }

                // Resposta OK com cabeçalho de conteúdo HTML
                res.writeHead(200, { 'Content-Type': 'text/html' })

                // Cria uma função com template string a partir do HTML lido
                // Isso permite interpolar dados se desejar (como num template engine)
                const ConvertToTemplate = new Function("return `" + html + "`")

                // Executa a função no contexto do `req` e envia o HTML gerado
                res.end(ConvertToTemplate.call(req))
            })
            break // evita cair nos próximos "case"

        case '/estilos/estilo.css':
            res.writeHead(200, { 'Content-Type': 'text/css' })
            // Serve um CSS direto no código, apenas para exemplo
            res.end('body { color: red; font-family: sans-serif; }')
            break

        case '/img/logo.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            // Serve a imagem através de stream (eficiente para arquivos grandes)
            fs.createReadStream('./logo.jpg').pipe(res)
            break

        default:
            // Qualquer outra rota não reconhecida
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end('<h1>404 - Página não encontrada</h1>')
            break
    }

}).listen(3000) // Servidor escuta na porta 3000

console.log('Servidor rodando em:\nhttp://localhost:3000')
