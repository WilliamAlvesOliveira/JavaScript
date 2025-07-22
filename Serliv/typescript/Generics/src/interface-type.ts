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

//=============================================
//* BLOCO: ADD COM RESTRIÇÃO E TRANSFORMAÇÃO DE DADOS
//=============================================

//* EXPLICAÇÃO:
//
// Esta versão da função `addAction2` impõe uma restrição mais específica:
// - O objeto deve ter os campos definidos em `Action2`
// - E também deve obrigatoriamente ter um campo `id` do tipo `number`
//
// Além de registrar a ação no histórico, a função também transforma o objeto:
// - Ela gera um campo adicional chamado `_id`, construído a partir de `id` e `timestamp`
// - O novo objeto é criado com spread operator (`...obj`) e o novo campo é anexado antes de ser salvo
//
// Essa abordagem é útil quando precisamos **enriquecer os dados** antes de armazenar ou processar.


// Função genérica com restrição combinada:
// - T deve estender Action2 (action: string, timestamp: number)
// - E também ter obrigatoriamente { id: number }
const addAction2 = <T extends Action2 & { id: number }>(obj: T) => {
    console.log('addAction')
    console.log(obj)

    // Criamos um novo objeto contendo tudo que já existia em `obj`
    // E adicionamos um novo campo `_id` que combina `id` e `timestamp`
    const result = {
        ...obj,
        _id: obj.id + '_' + obj.timestamp // Ex: "123_12345"
    }

    // Adicionamos o novo objeto no histórico
    historyActions.push(result)
}

// Chamando a função com um objeto válido:
// - Contém todos os campos exigidos por Action2
// - Inclui o campo extra `id` (obrigatório)
// - Pode ter outros campos extras como `teste` (permitido)
addAction2({
    action: 'delete',
    timestamp: 12345,
    teste: 'teste', // Extra permitido
    id: 123         // Obrigatório por causa da restrição
})
