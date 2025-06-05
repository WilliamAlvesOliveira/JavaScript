var n = 10 //neste caso n vai para o escopo global podendo conflitar com outras variaveis n que podem estar espalhadas pelo codigo, por isso era comum antigamente isolar essa variavel da seguinte maneira

var app = {
    n: 10
}
//neste caso somente app ia para o escopo global e se precisasse ter acesso a n bastaria chamar

app.n

//sendo assim para criar módulos deveriamos colocalos em funções auto-invocaveis

const calcReveralPattern = (function(){ //criando o módulo calc
    let n = 0
    function somar(_n){
        n += _n
    }
    
    function subtrair(_n){
        n -= _n
    }

    function log(){
        console.log(n)
    }

    return {
        somar,  //shorthand para somar : somar pois ambas tem o mesmo nome
        subtrair,
        log
    }
})()

calcReveralPattern.somar(5) //soma 5 a n (n === 5)
console.log(calcReveralPattern) //printa apenas o objeto pois não existe acesso a variável no escopo da função
calcReveralPattern.somar(5) //soma mais 5 a n
calcReveralPattern.log() //printa o valor de n que agora passa a ser 10
console.log('----------')

//podemos usar o conceito de encadeamento para obter os retornos das fun~ções utilizando o return this

const calcReveralPattern2 = (function(){ //criando o módulo calc
    let n = 0 //variavel que será "lembrada" por conta do closure

    function _checkNumber(n){ //função para validar a entrada (utiliza-se _ no inicio para indicar ser uma propriedade privada)
        if(typeof n !== 'number')
            throw TypeError('Entrada inválida')
    }

    function somar(_n){
        _checkNumber(_n)
        n += _n
        return this//retorna o objeto para o encadeamento
    }
    
    function subtrair(_n){
        _checkNumber(_n)
        n -= _n
        return this
    }

    function log(){
        console.log(n)
        return this
    }

    return {
        somar,
        subtrair,
        log
    }
})()

calcReveralPattern2.somar(3)//funciona normalmente
calcReveralPattern2.log()//printa o valor de n
calcReveralPattern2.somar('5')//retorna um typeError

/* ================================================
    Revealing Module Pattern (Padrão de Módulo Revelador)
==================================================

→ Quando usamos "var n = 10" diretamente, a variável vai para o escopo global,
  o que pode causar conflitos se outras partes do código também usarem "n".

→ Para evitar isso, era comum encapsular a variável em um objeto:
    var app = { n: 10 }
  Assim, apenas "app" ocupa o escopo global, e "n" fica acessível via app.n.

→ Uma abordagem ainda mais segura e modular era usar IIFE (funções auto-invocadas)
  para criar módulos fechados, evitando exposição acidental no escopo global.

→ Exemplo com o Revealing Module Pattern:
    - Criamos uma função auto-invocada que define variáveis e funções privadas.
    - Retornamos apenas os métodos que queremos expor.
    - Isso reforça o encapsulamento e evita poluição do escopo global.

→ Os métodos somar, subtrair e log acessam a variável privada "n" via closure,
  e são expostos no objeto retornado.

→ Para permitir encadeamento (chaining), basta retornar "this" no final de cada função.

→ Também é possível adicionar uma função auxiliar (ex: _checkNumber) para validar
  os argumentos antes de realizar operações. Essa função fica privada dentro do módulo.

→ Exemplo de encadeamento:
    calcReveralPattern2.somar(5).subtrair(2).log()

→ Caso seja passado um tipo inválido (como string), a função lança um TypeError,
  mostrando como validar entradas em um módulo fechado.

→ Embora hoje em dia o uso de módulos modernos (ES Modules) ou bundlers como Webpack
  tenha tornado esse padrão menos comum na prática, ele continua sendo útil para:
    • Aprender e reforçar closures
    • Entender encapsulamento
    • Ler código legado
    • Aplicações simples em JS puro
================================================== */
