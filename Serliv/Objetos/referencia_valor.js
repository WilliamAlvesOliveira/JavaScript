let numero = 10

function mudaNumero(numero){//numero passado por parametro não recebe a variável, ela recebe o valor
    numero++
    console.log('numero interno ', numero)
}

mudaNumero(numero)
console.log('numero externo ',numero)

let Arraynumero = [10]
console.log(typeof Arraynumero)

function mudaNumero(Array){// neste caso o arraynumeros recebe a referencia ao array então a mudaça ocorre no array original mesmo sem return
    //Arraynumero.push(11)
    console.log(typeof Array)
    Array.push(11)
    console.log('numero interno ', Array)
}

mudaNumero(Arraynumero)
console.log('numero externo ',Arraynumero)