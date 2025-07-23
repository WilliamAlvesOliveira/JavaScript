//============================================================
// FUNÇÕES ASSÍNCRONAS + ASYNC/AWAIT + AXIOS + TIPAGEM
//====================== AULA 4 ==============================

/*
  Objetivo: Usar funções assíncronas com o axios para buscar
  dados de um usuário específico, aproveitando os benefícios
  do async/await com tratamento de erro (try/catch).
*/

import axios from 'axios' // Importa o axios para requisições HTTP
import { ResponseUser } from './index.js' // Importa o tipo definido em outro arquivo (mesmo que seja .ts, em tempo de execução o compilador procura .js)

//-------------------------------------------------------------
// Etapa 1: Demonstração básica de função assíncrona
//-------------------------------------------------------------

/*
  Funções marcadas com 'async' sempre retornam uma Promise.
  Aqui, mesmo retornando o número 6, o valor real retornado será:
  Promise<number>, e deve ser consumido com then() ou await.
*/

async function fn(): Promise<number> {
  return 6;
}

const func = fn(); // função retorna uma Promise<number>

func.then(n => console.log('O valor de n é: ' + n)); // Mostra: "O valor de n é: 6"

/*
  ⚠️ OBS: mesmo que você retorne um valor direto, a função async
  o empacota automaticamente dentro de uma Promise.
*/

//-------------------------------------------------------------
// Etapa 2: Usando async/await com axios
//-------------------------------------------------------------

/*
  Função getUser busca um usuário pelo ID fornecido.

  - A função retorna uma Promise<ResponseUser>, ou seja, o dado já tipado.
  - O axios.get também recebe <ResponseUser> como tipo genérico.
  - A resposta é acessada via await e depois retornada ao chamador.
  - Caso ocorra algum erro (ex: ID inválido), ele será capturado no catch,
    e um erro mais descritivo será lançado com throw new Error().
*/

async function getUser(id: string): Promise<ResponseUser> {
  try {
    const resposta = await axios.get<ResponseUser>("http://localhost:3001/users/" + id);
    console.log(resposta.data); // Mostra os dados completos no console
    return resposta.data;       // Retorna apenas o objeto do usuário
  } catch (e: any) {
    // Lança um novo erro com mensagem customizada
    throw new Error('Error: ' + e.message);
  }
}

//-------------------------------------------------------------
// Etapa 3: Chamando a função e tratando o retorno
//-------------------------------------------------------------

/*
  Aqui usamos .then() para acessar o retorno da função getUser
  e .catch() para tratar qualquer erro lançado pela função.

  ⚠️ Se o ID informado for inválido (não encontrado), o erro será tratado.
*/

getUser('e4cd')
  .then((dado) => {
    console.log('testando com id correto')
    console.log('dados: ');
    console.log(dado.name); // Acesso seguro com Intellisense
  })
  .catch(e => {
    console.log('Não foi possível encontrar o ID.');
    console.log(e.message); // Mostra a mensagem de erro
  });

/*
  BENEFÍCIOS DESSE FORMATO:

  ✅ Uso moderno e claro com async/await
  ✅ Tipagem completa com ResponseUser
  ✅ Tratamento de erros com try/catch e throw
  ✅ Código mais organizado e fácil de manter
  ✅ Possibilidade de reutilizar a função getUser em outros contextos
*/

getUser('ecd') //id erradi
.then((dado) => {
    console.log('dado: ');
    console.log(dado.name); // Acesso seguro com Intellisense
})
.catch(e => {
    console.log('testando erro: ')
    console.log('Não foi possível encontrar o ID.');
    console.log(e.message); // Mostra a mensagem de erro
  });