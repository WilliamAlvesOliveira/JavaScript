# 📦 Guia de Configuração: Webpack + Babel + Polyfills + Axios

> Este guia segue as etapas ensinadas no curso, com correções, explicações didáticas e boas práticas.  
> Usamos versões específicas para manter compatibilidade com o Internet Explorer, focando no entendimento do processo.

---

## ✅ 1. Instalação do Webpack e Webpack CLI

Instale as dependências principais do Webpack:

```bash
npm install -D webpack@5.11.1 webpack-cli@4.3.1
```

- `webpack` é o empacotador principal.
- `webpack-cli` é a interface de linha de comando para usar o Webpack via `npx`.

---

## ✅ 2. Instalação do Babel Loader

O `babel-loader` conecta o Webpack ao Babel, permitindo que o código JavaScript passe pela transpiração.

```bash
npm i -D babel-loader@8.2.2
```

---

## ✅ 3. Criando o arquivo de configuração do Webpack

Crie um arquivo chamado `webpack.config.js` na raiz do projeto.  
Este arquivo define as entradas, saídas e loaders (como o Babel).

Exemplo básico:

```js
module.exports = {
  entry: './src/teste1.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
```

---

## ✅ 4. Adicionando o plugin `@babel/plugin-transform-runtime`

Este plugin evita duplicações de helpers Babel e melhora performance:

```bash
npm i -D @babel/plugin-transform-runtime@7.12.10
```

---

## ✅ 5. Instalando o `core-js` (polyfills)

O `core-js` é uma biblioteca que fornece polyfills para funcionalidades modernas como `Promise`, `Array.prototype.includes`, etc.

```bash
npm install core-js@3.3.2
```

---

## ✅ 6. Importando os polyfills no seu código

No início do seu `src/teste1.js`, importe o `core-js`:

```js
import "core-js";
```

> Isso garante que o código funcione mesmo em navegadores como o **Internet Explorer 11**, desde que você tenha configurado o Babel com `useBuiltIns`.

---

## ✅ 7. Executando o Webpack

Para gerar o bundle, execute:

```bash
npx webpack
```

> O Webpack vai gerar o arquivo `dist/bundle.js` com todo o código transpilado e compatível com os navegadores-alvo.

---

## ⚠️ 8. Sobre o uso de `path`

- O IE11 **não possui suporte nativo para a API `fetch` nem para `URL` ou `path`**.
- O Webpack **não adiciona automaticamente polyfills para todas as APIs do Node.js ou browser**.
- Se precisar usar `path`, será necessário adicionar o polyfill manualmente ou evitar seu uso diretamente no navegador.

---

## ✅ 9. Instalando e usando Axios

Como `fetch` não é suportado no IE11, podemos usar uma biblioteca compatível como o `axios`.

```bash
npm install axios@0.21.1
```

> Obs: `-D` **não é necessário** aqui, pois o axios é usado **no código de produção**, e não apenas no ambiente de desenvolvimento.

---

## ✅ 10. Substituindo o `fetch` por `axios`

No seu `src/teste1.js`, importe o Axios:

```js
import axios from "axios";
```

E escreva a função da seguinte forma:

```js
const getAddress = async (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json`;

  try {
    const resposta = await axios.get(url);
    return resposta.data;
  } catch (e) {
    throw e;
  }
};
```

---

## ✅ Conclusão

- O Webpack empacota os arquivos JS, mas **não resolve tudo sozinho**.
- O Babel **transpila a sintaxe moderna**, e o `core-js` **insere polyfills** para compatibilidade.
- Algumas APIs como `fetch`, `URL`, ou `path` ainda exigem atenção especial.
- O uso do `axios` é uma boa solução para garantir compatibilidade em navegadores mais antigos como o IE11.

