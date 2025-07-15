# 📦 Babel — Guia Completo para Transpilação e Suporte Cross-Browser

> ⚠️ Este guia segue as instruções de um curso que utiliza **versões antigas do Babel**, apenas para fins didáticos.  
> Em projetos reais, é recomendado utilizar as **versões mais recentes** e consultar a [documentação oficial do Babel](https://babeljs.io/docs/en/).

---

## 🛠️ Etapa 1: Instalação do Babel com versões do curso

Use o seguinte comando para instalar as dependências como `devDependencies`:

```bash
npm i -D @babel/core@7.12.10 @babel/cli@7.12.10 @babel/preset-env@7.12.11
```

- `@babel/core` → núcleo do Babel
- `@babel/cli` → interface de linha de comando para transpilar arquivos
- `@babel/preset-env` → preset que adapta o código JS para navegadores específicos

---

## 🛠️ Etapa 2: Transpilando com Babel

### ✅ Transpilar uma pasta inteira:

```bash
npx babel src -d dist
```

- `src` → pasta com os arquivos-fonte
- `-d dist` → define que os arquivos convertidos serão salvos na pasta `dist`

---

### ✅ Transpilar um único arquivo:

```bash
npx babel src/test1.js -o dist/test1.js
```

- `-o` define o arquivo de saída

---

### ⚙️ Adicionando suporte a navegadores com `@babel/preset-env`

Você pode passar os presets diretamente no terminal:

```bash
npx babel src/test1.js -o dist/test1.js --presets=@babel/env
```

Mas o **método mais comum e recomendado** é criar um arquivo de configuração.

---

## 🛠️ Etapa 3: Criando o arquivo de configuração do Babel

Crie o arquivo `babel.config.json` na **raiz do projeto** com o seguinte conteúdo:

### 🌍 Suporte genérico (para navegadores com > 0.25% de uso global):

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%"
    }]
  ]
}
```

### 💻 Suporte específico (Chrome 58 e Internet Explorer 11):

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "chrome": "58",
        "ie": "11"
      }
    }]
  ]
}
```

---

## 📁 Estrutura sugerida do projeto

```
meu-projeto/
├── src/
│   └── test1.js
├── dist/
├── babel.config.json
├── package.json
└── node_modules/
```

---

## ℹ️ Observações importantes

- O Babel **não modifica arquivos diretamente** — ele sempre gera **arquivos transpilados** de saída.
- O preset `@babel/preset-env` **identifica automaticamente** quais recursos do JS precisam ser convertidos com base nos navegadores que você definir.
- O uso do Babel **não polui o escopo global** e ajuda a manter o código compatível com navegadores antigos.

---

## 🧠 Conclusão

- Babel é uma ferramenta que **transpila código moderno (ES6+)** para uma versão mais compatível com navegadores antigos.
- Ele é uma **etapa essencial** para garantir compatibilidade cross-browser em aplicações web.
- Embora este guia use versões antigas, o **conceito e a lógica de transpilação continuam os mesmos** em versões mais recentes.

---

📚 Para aprofundar:

- [Documentação oficial do Babel](https://babeljs.io/docs/en/)
- [Tabela de compatibilidade Can I use](https://caniuse.com/)
