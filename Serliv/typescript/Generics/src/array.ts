//=========================
// GENERICS em Arrays
//=========================

// Criamos um type genérico que define um array cujos elementos são do tipo T.
// O nome <T> é uma convenção para "Type", e representa um tipo genérico que será definido no uso.
type ArrUniqueTypes<T> = T[]

// Aqui usamos o type genérico passando 'string' como tipo.
// Portanto, 'teste' só pode conter elementos do tipo string.
const teste: ArrUniqueTypes<string> = ['false', '1','string']

// Aqui usamos 'number' como tipo genérico, então 'teste2' só pode conter números.
const teste2: ArrUniqueTypes<number> = [1, 2, 3]   

// Aqui usamos uma união de tipos: string | number.
// Portanto, 'teste3' pode conter elementos que sejam strings ou números.
const teste3: ArrUniqueTypes<string | number> = ['1', 1]

// Estes são dois exemplos equivalentes de como declarar arrays em TypeScript:

// - Usando a sintaxe tradicional: tipo[]
const arrNumber: number[] = [1,2,3]

// - Usando a forma genérica: Array<tipo>
const arrNumber2: Array<number> = [1,2,3]
