//=============================================================
// GENERICS em Promises com Axios + TypeScript — AULA 1 a 3
//=============================================================

/*
  Objetivo geral: Usar Axios com TypeScript para fazer requisições HTTP
  com dados tipados corretamente usando Generics, garantindo segurança,
  intellisense e controle total sobre o que é enviado e recebido.
*/

import axios, { AxiosResponse } from 'axios'; // Importando axios e tipos auxiliares

//--------------------------------------------------------------
// AULA 1 — FAZENDO REQUISIÇÃO COM TIPO GENÉRICO NO GET
//--------------------------------------------------------------

/*
  Suponha que a API retorne um array de usuários com:
  - name (string)
  - id (number)
  - email (string)

  Vamos definir esse formato com um tipo personalizado.
*/

export type ResponseUser = {
  name: string;
  id: number;
  email: string;
};

/*
  A função axios.get permite o uso de um Generic,
  que especifica o tipo de dado retornado pela requisição.

  Aqui indicamos que o retorno é um array de ResponseUser.
*/
axios
  .get<Array<ResponseUser>>('http://localhost:3001/users')
  .then((response) => {
    // Tipagem automática: response.data é Array<ResponseUser>

    console.log('Lista completa de usuários:', response.data);

    const primeiroUsuario = response.data[0];

    console.log('Nome do primeiro usuário:', primeiroUsuario.name);

    // ❌ Se tentarmos acessar uma propriedade inexistente, como:
    // console.log(primeiroUsuario.idade); → Erro de TypeScript!
  })
  .catch((error) => {
    console.error('Erro ao buscar usuários:', error);
  });

/*
  ✅ Vantagens de usar Generics com Axios:

  - Intellisense para acessar propriedades
  - Prevenção contra erros de digitação
  - Tipagem robusta para manutenção e colaboração
  - Segurança ao consumir dados de APIs externas
*/

//----------------------------------------------
// Extra: versão alternativa usando async/await
//----------------------------------------------

/*
async function carregarUsuarios() {
  try {
    const response = await axios.get<Array<ResponseUser>>('http://localhost:3001/users');
    console.log('Usuários:', response.data);
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}
// carregarUsuarios();
*/

//--------------------------------------------------------------
// AULA 2 — ENVIANDO DADOS COM POST + TIPAGEM NO RETORNO
//--------------------------------------------------------------

/*
  Agora vamos enviar um novo usuário via POST.

  Como estamos usando json-server, o ID será gerado automaticamente,
  então não precisamos enviar o campo "id".
*/

const novoUsuario = {
  name: 'Tommy',
  email: 'tommy@server.com',
};

/*
  Criamos uma função assíncrona controlada,
  para evitar que o envio ocorra automaticamente.
*/

async function criarUsuario() {
  try {
    const response = await axios.post<ResponseUser>('http://localhost:3001/users', novoUsuario);
    console.log('Usuário criado com ID:', response.data.id);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

// ⚠️ Descomente para executar manualmente
// criarUsuario();

/*
  ✅ Vantagens:

  - Evita duplicações no db.json
  - Tipagem segura no envio e retorno
  - Permite acionar a função sob demanda
  - Facilidade para adicionar validações ou lógica extra
*/

//--------------------------------------------------------------
// AULA 3 — BUSCANDO USUÁRIO POR ID COM GET E PROMISE TYPING
//--------------------------------------------------------------

/*
  Vamos criar uma função getUser para buscar um usuário pelo ID.

  Ela retorna uma Promise que resolve para um AxiosResponse,
  com os dados tipados como ResponseUser.
*/

const getUser = (id: string): Promise<AxiosResponse<ResponseUser>> => {
  return axios.get('http://localhost:3001/users/' + id);
};

/*
  Quando chamamos a função, usamos then() para extrair os dados.

  A desestruturação de { data } é possível graças à tipagem.
*/

getUser('1')
  .then(({ data }) => console.log('Nome do usuário:', data.name))
  .catch((error) => console.error('Erro ao buscar usuário:', error));

/*
  ✅ Vantagens:

  - Acesso claro e seguro a dados da resposta
  - Excelente para código modular e reutilizável
  - Pronto para tratar status, headers e outros detalhes da resposta
*/

//----------------------------------------------
// Extra: versão alternativa com async/await
//----------------------------------------------

/*
async function mostrarUsuario(id: string) {
  try {
    const response = await getUser(id);
    console.log('Nome do usuário:', response.data.name);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
  }
}
// mostrarUsuario('1');
*/
