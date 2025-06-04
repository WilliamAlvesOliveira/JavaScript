//variaveis e constantes no escopo global podem ser acessadas por quelquer função do arquivo

const str = 'global string' //string no escopo global

function teste(){
    console.log(str)//str funciona pois é uma constate global
    const localStr = 'local string' //string no escopo local
    //por ser uma constante local pode ter o mesmo nome sem gerar conflito, caso str fosse passado como parametro (teste(str){str dentro da função seria a string passada por parametro})
}

teste()
console.log('----------------------')

function teste2(){
    const str = 'local string' //string no escopo local
    //por ser uma constante local pode ter o mesmo nome sem gerar conflito, caso str fosse passado como parametro (teste(str){str dentro da função seria a string passada por parametro})
    console.log(str)
}

teste2()
console.log(str)//não foi afetada 

console.log('----------------------')

/*------------------
    OBJECT THIS
-------------------*/

function testeEscopo(){
    console.log(this) // this em uma function declaration é dinâmico, pode variar dependendo de onde ele for chamado
}

testeEscopo()//o this da função irá referir-se ao escopo global pois foi onde a função foi chamada

const testeEscopo2 = () => {
    console.log(this)//em arrow function o this é estático, vai ser atribuido ao local aonde foi declarado
}

console.log('----------------------')

const obj = {
    foo:'bar',
    testeEscopo,
    testeEscopo2
}

obj.testeEscopo()//neste caso o this da função é o proprio objeto

console.log('----------------------')


testeEscopo2()//no caso do node o this será um objeto vazio, no browser o this seria o objeto global window
obj.testeEscopo2()//tera a mesma saída acima, pois o this na arrow function é estático (objeto vazio no node ou o window no browser)

console.log('----------------------')

function testeEscopo3(){
    console.log('this na função delaration')
    console.log(this) // this dinâmico referente a function declaration

    setTimeout(function(){
        console.log('this no método setTimeout')
        console.log(this) // neste caso, o this dentro da função anônima de setTimeout depende do ambiente. No Node, é um objeto Timeout, no browser, é o window
    },1)
}

console.log('testeEscopo3 chamado diretamente')
testeEscopo3()// saída do primeito this vai ser o global/window e o segundo o setTimeout

console.log('----------------------')

const obj2 = {
    foo: 'bar',
    testeEscopo3
}

console.log('testeEscopo3 chamado a partir do obj2')
obj2.testeEscopo3()// primeira saida será o objeto e a segunda será o setTimeout

console.log('----------------------')
//para resolver a dualidade na saída pordemos usar uma arrou function para o set timeout
function testeEscopo4(){
    console.log('this na função delaration')
    console.log(this) // this dinâmico referente a function declaration

    setTimeout(() => {
        console.log('this no método setTimeout')
        console.log(this) // neste caso o this refere-se a arrow function que herda o objeto de onde foi chamado
    },1)
}

const obj3 = {
    foo: 'bar',
    testeEscopo4
}

console.log('testeEscopo3 chamado a partir do obj2')
obj3.testeEscopo4()//saída do primeiro e do segundo será igual o proprio objeto

//podemos usar as arrow functions, quando quisermos que o this em um método ou evento não sofra alterações