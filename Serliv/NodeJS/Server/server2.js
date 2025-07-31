//============================================
// SERVIDOR HTTP ESTÁTICO + TRATAMENTO DE ERROS
//============================================

// Módulos internos do Node.js
const fs = require('fs')               // Manipulação de arquivos
const http = require('http')           // Criar o servidor
const path = require('path')           // Resolver caminhos de arquivos

//--------------------------------------------
// Função genérica para servir arquivos estáticos
//--------------------------------------------
const getStaticFile = (_path, type, res) => {
   // Verifica se o arquivo existe
   if (!fs.existsSync(_path)) {
        // Se for HTML e não existir, tenta servir uma página 404 customizada
        if (type === 'text/html') {
            const errorPath = path.join(__dirname, 'static', '404.html');
            if (fs.existsSync(errorPath)) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return fs.createReadStream(errorPath).pipe(res);
            }
        }
        // Caso não seja HTML ou a 404.html não exista
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Arquivo não encontrado');
    } else {
        // Arquivo existe, define status 200
        res.writeHead(200, { 'Content-type': type });
    }

    // Lê e envia o arquivo via stream
    fs.createReadStream(_path)
        .pipe(res)
        .on('error', () => {
            res.writeHead(500);
            res.end('Erro interno do servidor');
        })
        .on('finish', () => {
            console.log(`Arquivo ${_path} enviado com sucesso.`);
        });
}

//--------------------------------------------
// Mapeamento de extensões para MIME types
//--------------------------------------------
const mimetype = {
    'css': 'text/css',
    'html': 'text/html',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'js': 'application/javascript',
}

//--------------------------------------------
// Encapsula o tratamento de arquivos estáticos
//--------------------------------------------
const serverStaticFile = (url, res) => {
    const _path = path.join(__dirname, 'static', url); // Caminho absoluto do arquivo
    const extName = path.extname(url).substring(1) || 'html'; // Obtém a extensão do arquivo
    getStaticFile(_path, mimetype[extName], res);
}

//--------------------------------------------
// Criação do servidor
//--------------------------------------------
http.createServer((req, res) =>  {
    console.log(`Requisição recebida: ${req.url}`);

    let url = req.url;

    // Redireciona '/' para 'index.html'
    if (url === '/') {
        url = '/index.html';
    }

    // Ignora favicon
    if (url === '/favicon.ico') {
        return res.end();
    }

    //----------------------------------------
    // Rota especial: /login (POST ou GET)
    //----------------------------------------
    if (url === '/login') {
        if (req.method.toLowerCase() === 'post') { // Corrigido: era .toLocaleLowerCase
            let body = '';
            req.on('data', data => body += data);
            req.on('end', () => {
                console.log('Dados recebidos no POST:', body);
                // Aqui você poderia tratar o corpo (ex: parsear JSON ou form-urlencoded)
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end('Login recebido');
            });
            return; // Impede que o código continue após tratar o POST
        }

        // Se for GET
        getStaticFile(path.join(__dirname, 'static', 'login.html'), mimetype.html, res);
        return; // Evita continuar para o static
    }

    //----------------------------------------
    // Servir qualquer outro arquivo estático
    //----------------------------------------
    serverStaticFile(url, res);

}).listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001');
});
