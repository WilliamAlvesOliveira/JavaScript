interface Action<T>{
    step1: T
}

const action: Action<number> = {
    step1: 0
}

//step.action = '10' /Erro
action.step1 = 10

const action2 : Action<string> = {
    step1: 'start'
}

action2.step1 = 'started'

type ActionType<T> = {
    step1: T
}

const action3 :ActionType<boolean> ={
    step1: true
}

//================================
// Utilizando 2 ou mais tipos em
//       um único Generic
//================================

interface Action2 <T = string, U = number>{
    action: T
    timestamp: U
}

const act: Action2 = {
    action: 'delete',
    timestamp: 123
}

//restren
//podemos restringir os tipos utilizando :
// <T extends string | number, U = number> 
//também podemos restringir e manter o default
// <T extends string | number = string, U = number>
// e ainda podemos setar um type com os tipos para usalos depois
//type NumberOrString = number | string
//<T extends NumberOrString = string, U = number>

interface Action3 <T extends string | number = string, U = number>{
    action: T
    timestamp: U
}

//=========================
//RESTRIÇÃO DE TIPOS
//=========================

// Neste bloco, simulamos um "histórico de ações" (como um log).
// Usamos a interface genérica Action2 para garantir que cada ação tenha os campos corretos (`action`, `timestamp`).
// A função `addAction` aceita objetos que seguem (ou estendem) a estrutura da interface Action2.
// Mesmo objetos com propriedades extras ainda são aceitos, desde que contenham ao menos os campos exigidos pela interface.


// Criamos um array de objetos com o tipo Action2 (usando os defaults: T = string, U = number)
const historyActions: Array<Action2> = []

// Adicionamos a constante `act`, que já é do tipo Action2
historyActions.push(act)

// Adicionamos diretamente um novo objeto válido para Action2
historyActions.push({
    action: 'delete',
    timestamp: 123
})


// Função genérica que recebe um objeto do tipo T
// O tipo T deve estender Action2 (ou seja, conter ao menos os campos: action e timestamp)
const addAction = <T extends Action2>(obj: T) => {
    console.log('addAction')
    console.log(obj)
    historyActions.push(obj) // Mesmo que o objeto tenha campos extras, ele será aceito
}

// Aqui passamos um objeto que tem os campos exigidos por Action2, mas também outros extras
addAction({
    action: 'delete',
    timestamp: 123,
    teste: 'teste', // Campo extra (permitido)
    id: 123         // Campo extra (permitido)
})

