para desenvolver um script typescript e roda=lo no terminal devemos configurar o ambiente

´primeiro iniciaremos o node no projeto
npm init -y

de´pos instalaremos o typescript e o ts-node-dev  para abilitar o modo watch usamos a flag --respawn
npm install typescript ts-node-dev --respawn ./src/index.ts

incluiremos o ts-node-dev ./src/index.ts no scripts "start" para facilitar

agora o ambiente esta configurado para trabalharmos com o typescript pelo terminal 