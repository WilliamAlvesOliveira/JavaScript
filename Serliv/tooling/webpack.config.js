const path = require("path")

module.exports = {
    mode: "production",
    target: ["web","es5"],
    entry: "./src/teste1.js",
    output: {
        path: path.resolve(__dirname, "dist", "js"),
        filename: "teste1.js"
    },
    devtool: "source-map",
    module: {
        rules:[
            {
                exclude:/node_modules/,
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                }
            }
        ]
    }
}

/*
🛠️ Scripts recomendados no package.json para rodar o Webpack:

"scripts": {
  "build": "webpack",                         // 🔨 Compila o projeto uma única vez
  "build:watch": "webpack -w",                // 👀 Compila e observa alterações automaticamente
  "build:legacy": "set NODE_OPTIONS=J"
  // ⚠️ Este último resolve o erro com Node 17+ ou superior (OpenSSL incompatível com Webpack antigo)

💡 Como usar (no terminal):
- npm run build         → Gera o bundle apenas uma vez
- npm run build:watch   → Gera e observa alterações em tempo real
- npm run build:legacy  → Corrige o erro "ERR_OSSL_EVP_UNSUPPORTED" no Node moderno
*/

//para linux e macOS
//"build:legacy": "NODE_OPTIONS=--openssl-legacy-provider webpack"  