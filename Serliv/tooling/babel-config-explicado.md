
# ⚙️ Explicação do arquivo `babel.config.json`

Este arquivo é utilizado para configurar o comportamento do Babel — o transpilador JavaScript responsável por converter código moderno (ES6+) para versões compatíveis com navegadores mais antigos.

Abaixo está o conteúdo configurado e o que cada parte faz:

```json
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "modules": false,
      "corejs": 3,
      "targets": {
        "chrome": "58",
        "ie": "11"
      }
    }]
  ]
}
```

## 🧩 Explicando cada configuração:

### `"presets"`
- Define um conjunto de regras que orientam como Babel deve transpilar o código.
- Aqui estamos usando o `@babel/preset-env`, que é o mais comum e inteligente para adaptar o código ao ambiente desejado.

### `"useBuiltIns": "usage"`
- Diz ao Babel para incluir **polyfills apenas quando o código realmente usar uma funcionalidade que precise deles**.
- Isso evita importar coisas desnecessárias, otimizando o tamanho final do bundle.

### `"modules": false`
- Indica que o Babel **não deve transformar os módulos ES6 (`import/export`)** em CommonJS (`require`).
- Isso é importante quando usamos empacotadores como **Webpack**, que já lidam com os módulos.

### `"corejs": 3`
- Especifica a versão da biblioteca **core-js** que será usada para os polyfills.
- A versão 3 é mais moderna e modular.

### `"targets"`
- Define os navegadores-alvo que devem ser suportados.
- Aqui, estamos dizendo ao Babel para gerar código compatível com:
  - Google Chrome versão 58
  - Internet Explorer 11

---

## ✅ O que esta configuração resolve:

- Transforma **sintaxe moderna** (como arrow functions, classes, etc.) em versões mais antigas compreensíveis por navegadores antigos.
- Insere **polyfills automaticamente**, apenas onde necessário, com base no uso real do código (graças ao `"useBuiltIns": "usage"`).
- Garante que o código **funcione em navegadores mais antigos**, mesmo que o desenvolvedor use funcionalidades modernas.

---

## ❌ O que ela **não resolve** sozinha:

- **Não inclui arquivos finais em HTML, CSS, imagens, etc.**
- **Não junta os arquivos JS em um único arquivo final** (bundle).
- **Não otimiza ou minifica o código**.
- **Não carrega assets como imagens, fontes ou estilos externos**.
- **Não lida com módulos dinamicamente (ex: imports que dependem de lógica de execução).**

---

## 🧱 Por que precisamos usar um empacotador como o Webpack?

O Babel é responsável por **transpilar** código moderno para código mais antigo, mas **ele não empacota o projeto**. Para isso, usamos ferramentas como **Webpack**, que:

- 📦 Juntam todos os módulos JS em um único arquivo otimizado (bundle)
- 🧩 Lidam com **imports e exports** de múltiplos arquivos
- 🧼 Minificam o código para produção
- 🖼️ Permitem importar arquivos CSS, imagens, fontes e outros assets
- 🔁 Fazem hot reload no desenvolvimento
- 🔒 Criam ambientes isolados por build (dev, test, production)

### ✅ Conclusão:

> Babel **transpila** código. Webpack **empacota** o projeto inteiro.

Usamos ambos juntos para garantir que nosso código funcione em diferentes navegadores e esteja preparado para ambientes reais.

