/*======================
    Factories Functions
=======================*/

//imaginemos que temos 3 objetos para cachorros
const rex = {
    name:'Rex',
    latir(){},
    andar(){},
    comer(){}
}
const mailow = {
    name: 'Mailow',
    latir(){},
    andar(){},
    comer(){}
}
const toto = {
    name: 'Totó',
    latir(){},
    andar(){},
    comer(){}
}

//neste caso caso fossemos escrever as funções para o objeto teriamos que escreve-las em todos eles, e se necessitássemos de alterações teriamos que alterar uma por uma, para isso deveriamos criar uma função para a criação de cada cachorro
function createDog(name){
    return {
        name, //shorthand pois name : name
        latir(){
            console.log(this.name, 'está latindo')
        },
        andar(quantPassos){
            console.log(this.name, `andou ${quantPassos} passos`)
        },
        comer(comida){
            console.log(this.name, `está comendo ${comida}`)
        }
    }
}


const rex2 = createDog('Rex')//rex2 vai ser o objeto retornado por createDog tendo Rex como name
console.log(rex2)//obj rex2
console.log('---------')

//para resolvermos isso criaremos uma função fabrica(factory function) para que ela seja responsável por criar o objeto, assim caso quizermos alterar alguma lógica, ou adicionar/remover métodos, basta alterar-mos na função

//vamos criar uma variável para mostrar a posição do cachorro 

function createDog2(name){
    let position = 0
    return {
        name, //shorthand pois name : name
        latir(){
            console.log(this.name, 'está latindo')
        },
        andar(quantPassos){
            position += quantPassos
            console.log(this.name, `andou ${quantPassos} passos`)
        },
        comer(comida){
            console.log(this.name, `está comendo ${comida}`)
        },
        showPosition(){
            return position
        }
    }
}

const rex3 = createDog2("Rex")
rex3.andar(10)//rex andou 10 passos
rex3.andar(5)//rex andou mais 5 passos
console.log(rex3.showPosition())// mostra que rex andou 15 passos
console.log('----------')

const toto2 = createDog2('Totó')
toto2.andar(20)
toto2.andar(-3)
console.log(toto2.showPosition())
