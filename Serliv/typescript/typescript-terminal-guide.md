
# Rodando TypeScript no Terminal com Node.js

Este guia te mostra como configurar e rodar projetos TypeScript diretamente pelo terminal. Inclui também algumas alternativas modernas para acelerar o desenvolvimento.

---

## 🛠️ 1. Inicializar o Projeto

```bash
npm init -y
```

Esse comando cria um arquivo `package.json` básico para seu projeto Node.js.

---

## 📦 2. Instalar as Dependências

```bash
npm install typescript ts-node-dev -D
```

### Explicando os pacotes:

- `typescript`: Transpilador oficial para converter `.ts` em `.js`.
- `ts-node-dev`: Executa arquivos `.ts` diretamente, com **hot reload** e reinício automático ao salvar alterações.

---

## ⚙️ 3. Configurar o TypeScript

Crie o arquivo `tsconfig.json` com:

```bash
npx tsc --init
```

Você pode ajustar o arquivo conforme necessário, por exemplo:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

## 🧪 4. Estrutura de Diretórios

Organize seu projeto assim:

```
/src
  index.ts
/tsconfig.json
/package.json
```

---

## 🚀 5. Scripts no package.json

Adicione em `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## ✅ 6. Rodar o Projeto

Durante o desenvolvimento:

```bash
npm run dev
```

Para compilar:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm start
```

---

## 🚀 Alternativas Mais Modernas

### 1. Usando `tsx` (alternativa moderna ao `ts-node-dev`)

```bash
npm install -D tsx
```

Altere seu script de desenvolvimento:

```json
"scripts": {
  "dev": "tsx watch src/index.ts"
}
```

### 2. Usando `bun` (runtime rápido com suporte nativo a TS)

```bash
bun init
bun run src/index.ts
```

> Requer instalar o [Bun](https://bun.sh).

---

## 🧼 Dica Final

Para manter o projeto organizado:

- Use `src/` para seus arquivos `.ts`
- Use `dist/` para os arquivos compilados `.js`
- Ignore `dist/` no `.gitignore`

---
