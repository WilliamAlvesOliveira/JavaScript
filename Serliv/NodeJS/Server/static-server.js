const fs = require('fs')
const http = require('http')
const path = require('path')

const getStaticFile = (_path, type, res) => {
   if (!fs.existsSync(_path)) {
        if (type === 'text/html') {
            const errorPath = path.join(__dirname, 'static', '404.html');
            if (fs.existsSync(errorPath)) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return fs.createReadStream(errorPath).pipe(res);
            }
        }
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Arquivo não encontrado');
    }else{
        res.writeHead(200, {'Content-type': type})
    }

    fs.createReadStream(_path).pipe(res).on('error', () => {
        res.writeHead(500)
        res.end()
    }).on('finish', () =>{
        console.log('finish')
    })
}

const mimetype = {
    'css': 'text/css',
    'html': 'text/html',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'js': 'application/javascript',
}

const serverStaticFile = (url, res) => {
    const _path = path.join(__dirname, 'static', url)
    const extName = path.extname(url).substring(1) || 'html'
    getStaticFile(_path, mimetype[extName], res)
}

http.createServer((req, res) =>  {
    console.log(req.url)
    let url = req.url
    if(url === '/'){
        url = '/index.html'
    }
    if(url === '/favicon.ico'){
        return res.end()
    }
    
    serverStaticFile(url, res)

}).listen(3001)