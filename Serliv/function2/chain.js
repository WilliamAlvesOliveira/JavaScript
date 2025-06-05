/*----------------------
    Encadeamento (method chaining)
---------------------*/

const calc ={
    value: 0,
    soma(n){
        this.value += n
    },
    subtrai(n){
        this.value -= n
    },
    log(){

    }
}

console.log(calc) //nesse log teremos o objeto calc
calc.soma(5) //aqui passamos o número 5 para ser somado ao value
console.log(calc) //aqui teremos o objeto calc com o valor 5 resultado da soma

console.log('----------')

/*=========================
porem não poderiamos continuar encadeando os métodos neste caso

// calc.subtrai(2).soma(3)  <- isso resultaria em um erro pois .soma estaria tentando utilizar o método do que foi retornado po calc.subtrai, que como não possuí um retorno, retorna undefined
==========================*/

console.log(calc.soma(5)) //saída é undefined (obs: a função foi chamada portanto somou 5, portanto o value de soma agora será 10)

console.log('----------')
/*===================
    para resolvermos esse problema basta retornarmos o objeto depois de executar as funções para permitirmos que os métodos possam ser encadeados
=====================*/

const calc2 ={
    value: 0,
    soma(n){
        this.value += n
        return this
    },
    subtrai(n){
        this.value -= n
        return this
    },
    log(){
        console.log(this.value)
    }
}

calc2.soma(5).subtrai(2) //value adiciona 5 depois subtrai 2, resultado 3
console.log('resultado: ',calc2.value)
console.log('----------')
console.log('retorno do método calc2.soma')
console.log(calc2.soma(7)) //aqui o print será o retorno do método soma que é o this da função, ou seja o próprio objeto

console.log('----------')
//portanto agora nossa função pode ser encadeada, calc2 agora tem o valor 10 vamos encadear os metodos para ele ficar com 15
calc2.soma(2).subtrai(4).soma(3).soma(2).subtrai(5).soma(7).log()

//atenção no nosso objeto log não retorna o this portanto se ele for usado não podemos continuar encadeando, ou devemos retornar o this em log para "ativar" o encadeamento

/*
-------------------------------
Anotações complementares sobre Encadeamento (Method Chaining)
-------------------------------

- Encadeamento permite chamar múltiplos métodos de um objeto em sequência, como:
  obj.metodo1().metodo2().metodo3()

- Para que o encadeamento funcione, cada método deve retornar o próprio objeto (`this`).
  Isso permite continuar chamando métodos da mesma instância.

- Métodos que não retornam nada (ou retornam `undefined`) interrompem o encadeamento.

- Exemplo de quebra de encadeamento:
  Se `obj.metodo1()` não retornar nada, então `obj.metodo1().metodo2()` gerará erro,
  pois `metodo2()` será chamado sobre `undefined`.

- Usar `return this` ao final dos métodos é uma prática comum para permitir encadeamento fluido.

- Métodos "terminadores", como `log()` no exemplo, podem **ou não** retornar `this`,
  dependendo se você deseja continuar encadeando após ele.
  Caso queira encadear mesmo depois do `log()`, adicione `return this` ao final do método `log`.

- Encadeamento é muito usado em APIs como jQuery, bibliotecas de manipulação de DOM,
  bibliotecas de animações, ORMs, validação de dados e muito mais.

- Benefícios do encadeamento:
  • Código mais conciso e legível
  • Menor repetição de nomes de variáveis
  • Estilo fluente e descritivo

- Cuidados:
  • Evite métodos com efeitos colaterais inesperados
  • Encadeamento excessivo pode dificultar o debug

*/
