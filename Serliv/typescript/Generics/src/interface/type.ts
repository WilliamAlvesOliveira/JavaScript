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
