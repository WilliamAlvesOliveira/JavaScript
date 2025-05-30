function ChangeName(nome){
    console.log(this) //saída global do node
    this.name = nome //this refere-se ao objeto e vai receber o nome passado por parametro
    this.updateAtt = new Date()
}

console.log('chamada da função ChangeName fora de objeto')
ChangeName()//this aponta para o global do ambiente(NODE)
console.log(' ')

const arrowChangeName = () =>{
    console.log(this)
}// O this em arrow functions sempre aponta para o this do contexto onde a função foi criada, e não muda, mesmo que você tente usar .call(), .apply() ou .bind().

console.log('chamada da função arrowChangeName fora de objeto')
arrowChangeName()//this aponta para o contexto onde foi criado
console.log(' ')

const task1 = {
    name: 'task1',
    createdAtt: new Date(),
    updateAtt: null,
    completed: false,
    ChangeName,
    arrowChangeName
    // nameChange: function (nome){
    //     console.log(this)// this referesse a este(this) objeto(task1)
    // }
}

const task2 = {
    name: 'task1',
    createdAtt: new Date(),
    updateAtt: null,
    completed: false
}

console.log('chamada da função ChangeName dentro do objeto')
task1.ChangeName('nome atualizado')//this aponta para task1
console.log(' ')

console.log('chamada da função arrowChangeName dentro do objeto')
task1.arrowChangeName()//this aponta para o contexto que foi criado
console.log(' ')


console.log('task1 com o nome e updateAtt atualizado pela função ChngeName')
console.log(task1)