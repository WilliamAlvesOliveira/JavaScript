const name = 'William' //const/let é uma variavel global mais não pode ser acessada a partir do objeto window no browser

var _name = 'William'// var cria uma nova propriedade no objeto window e pode ser acessada pelo window

//no node ambos não poluem o objeto global

function teste(string, number){
    console.log('this: ',this)//objeto global(node) ou  window(browser)
    console.log('this const: ',this.name)//unsefined tanto para node quanto para browser
    console.log('this var: ',this._name)//undefined no node, e valor do _name no browser pois ele foi declarado com var e criou a propriedade no window
    console.log(string, number)
}

teste('numero: ', 10)

console.log('-------------------------')

/*-------------------------------------------------------
mudando o escopo do this utilizando o método call
--------------------------------------------------------*/
function teste2(string, number){
    console.log('this: ',this)// this é o objeto passado
    console.log(this.name)//propriedade name do objeto this
    console.log(string, number)
}

teste2.call({name:'Maria'},'número2: ', 20)

console.log('-------------------------')

/*-------------------------------------------------------
mudando o escopo do this utilizando o método apply
--------------------------------------------------------*/
//para utilizar o metodo apply devemos passar um array com os parametros

teste2.apply({name: 'Joaquim'},['numero3: ', 30])

console.log('-------------------------')

/*---------
ES6
---------*/
//a partir do ECMAScript 6 com o spread operator podemos usar o call e usarmos um array como no metodo apply

teste2.call({name: 'Camila'}, ...['numero4: ', 40])

console.log('-------------------------')

/*-------------------------------------------------------
mudando o escopo do this utilizando o método bind
--------------------------------------------------------*/

const teste3 = teste2.bind({name: 'Cookie'})//o bind retorna uma nova função e vai armazenar esta função na constante

teste3('número5: ', 50)

//o metodo bind é muito útil em por exemplo botões para garantir quem vai ser o this recebido na função

const teste4 = teste2.bind({name:'Gatão'}) 

document.addEventListener('click', teste4)//this será o objeto passado na constante (obs: neste caso string vai receber como parametro o objeto poiterEvent e numero vai receber undefined)

//correção para a função funcionar corretamente

const teste5 = teste2.bind({name:'Fujimoto'}, 'numero6: ', 60)

document.addEventListener('click', teste5)