// Importa uma classe chamada 'MyMod2' que foi exportada de 'module2.js'
// Isso permite usar essa classe dentro deste módulo
import { MyMod2 } from "./module2.js";

// ---------------------
// FUNÇÃO PRINCIPAL (exportação default)
// ---------------------

// Função que será exportada como padrão (default)
// Isso significa que ela pode ser importada com qualquer nome
function mymod1() {
    console.log('função mymod1 do module1 executada');
    return 'retorno da função mymod1';
}

// ---------------------
// EXPORTAÇÕES NOMEADAS
// ---------------------

// Exporta uma função nomeada chamada 'mod1_nomeada'
// Pode ser importada usando { mod1_nomeada }
export function mod1_nomeada() {
    return 'exportando função nomeada';
}

// Exporta uma constante chamada PI com o valor de π (limitado a 4 casas decimais)
export const PI = 'PI: ' + Math.PI.toFixed(4);

// Exporta um objeto chamado 'obj' com algumas propriedades
export const obj = {
    foo: true,
    bar: 'olá, mundo!'
};

// Define duas variáveis locais
const nome = 'william';
const idade = 31;

// Exporta essas variáveis como exportações nomeadas
// Elas poderão ser importadas com { nome, idade }
export { nome, idade };

// ---------------------
// AÇÕES EXECUTADAS AO IMPORTAR O MÓDULO
// ---------------------

// Cria uma nova instância da classe MyMod2 (só executa ao importar este módulo)
// Isso serve para testar ou verificar comportamento no momento da importação
console.log(new MyMod2());

// Exportação padrão (default) do módulo — será usada se o import não estiver entre chaves
export default mymod1;
