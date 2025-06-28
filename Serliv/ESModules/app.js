// Importa três itens do módulo 'module1.js':
// - 'mymod1': a exportação default do módulo
// - 'mod1_nomeada' e 'PI': exportações nomeadas
import mymod1, { mod1_nomeada, PI } from "./Modules/module1.js";

// Executa a função default (mymod1) e guarda o retorno em 'result'
const result = mymod1();

// Mostra no console a mensagem "app rodando!" seguida do valor retornado por 'mymod1'
console.log('app rodando!', result);

// Chama a função 'mod1_nomeada' e mostra seu retorno, junto com o valor da constante 'PI'
console.log(mod1_nomeada(), PI);


