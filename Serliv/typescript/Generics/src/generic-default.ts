//==========================
//  TIPO GENÉRICO DEFAULT
//==========================

//* Explicação didática:

// Aqui definimos uma interface genérica chamada 'Generic' com um tipo genérico T
// O detalhe é que T tem um valor default: string
// Isso significa que, se não especificarmos um tipo ao usar Generic, o TypeScript usará string automaticamente

interface Generic<T = string> {
    prop: T
}

// Neste exemplo, usamos a interface Generic SEM passar um tipo explicitamente
// Como não passamos nenhum tipo, o TypeScript usa o tipo padrão: string
const generic1: Generic = {
    prop: 'string' // ✅ Correto: string é o tipo default
}

// const generic2: Generic = {
//     prop: 2
// }
// ❌ ERRO: Como não especificamos um tipo, o default (string) é usado, e 2 não é string

// Para aceitar um número, precisamos sobrescrever o tipo padrão e informar o tipo explicitamente
const generic2: Generic<number> = {
    prop: 2 // ✅ Correto: agora 'prop' espera um número
}
