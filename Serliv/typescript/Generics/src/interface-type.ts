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
