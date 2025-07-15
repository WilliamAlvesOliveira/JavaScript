# 🛠️ Explicação do arquivo `webpack.config.js`

Este arquivo define como o Webpack deve empacotar seu projeto. Abaixo está a explicação detalhada de cada configuração:

---

```js
const path = require("path");
```

### 📌 `path`
- Módulo nativo do Node.js usado para resolver caminhos de arquivos de forma segura, independente do sistema operacional.

---

```js
module.exports = {
  ...
}
```

### 📦 `module.exports`
- Exporta a configuração para que o Webpack possa utilizá-la ao ser executado.

---

```js
mode: "development",
```

### ⚙️ `mode`
- Define o modo de compilação:
  - `"development"` → gera um bundle legível, sem minificação, útil para testes.
  - `"production"` → otimiza e minifica o código automaticamente.

---

```js
target: ["web", "es5"],
```

### 🎯 `target`
- Diz ao Webpack para gerar código:
  - Compatível com navegadores (`"web"`)
  - Compatível com ECMAScript 5 (`"es5"`) — importante para suporte a navegadores antigos como o IE11.

---

```js
entry: "./src/teste1.js",
```

### 🏁 `entry`
- Define o **ponto de entrada** da aplicação. É o primeiro arquivo que o Webpack vai analisar.

---

```js
output: {
  path: path.resolve(__dirname, "dist", "js"),
  filename: "teste1.js"
}
```

### 📤 `output`
- Define onde o arquivo final empacotado será salvo:
  - `path`: usa `path.resolve` para garantir o caminho absoluto (`/dist/js`)
  - `filename`: nome do arquivo gerado

---

```js
module: {
  rules: [ ... ]
}
```

### 🧩 `module.rules`
- Define as **regras de transformação** dos arquivos (loaders).

---

```js
{
  exclude: /node_modules/,
  test: /\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ['@babel/preset-env'],
      plugins: [["@babel/plugin-transform-runtime"]]
    }
  }
}
```

### 🔄 Babel Loader
- `exclude`: ignora a pasta `node_modules` (não precisa transpilar dependências externas).
- `test`: aplica a regra apenas para arquivos `.js`.
- `use`: define o `babel-loader` como responsável pela transpiração.
- `options`:
  - `presets`: usa `@babel/preset-env` para adaptar o código ao ambiente especificado.
  - `plugins`: inclui o `@babel/plugin-transform-runtime` para evitar duplicações e otimizar o bundle.

---

## ✅ Conclusão

Este arquivo de configuração Webpack:

- Define que estamos no modo **desenvolvimento**
- Transforma código moderno em **ES5**, compatível com navegadores antigos
- Usa o Babel para transpilar apenas os arquivos `.js`
- Gera um bundle organizado dentro de `/dist/js/teste1.js`
- Inclui polyfills apenas onde necessário, graças ao plugin `transform-runtime`

> Ideal para entender como o Webpack e Babel trabalham juntos para criar projetos compatíveis com múltiplos navegadores!

