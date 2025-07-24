//==========================================
//           CONDITIONAL TYPES
//==========================================
// Conditional Types (tipos condicionais) permitem criar tipos dinamicamente
// com base em uma condição: T extends U ? X : Y

type MyString = string

// Se MyString for compatível com string OU number, retorna string; senão, retorna boolean
type MyType = MyString extends string | number ? string : boolean
// Resultado: MyType é do tipo string (porque MyString é string, que está contido em string | number)


//------------------------------------------
//     Função com tipo condicional no parâmetro
//------------------------------------------

// Aqui, T é um tipo genérico. A função aceita um parâmetro cujo tipo depende de T.
// Se T for string, o parâmetro será string, senão será null.
function myFunction<T>(param: T extends string ? string : null) {
    console.log(param)
}

// Exemplo:
// Passamos <boolean>, então o tipo do parâmetro é null
myFunction<boolean>(null) // ✅ OK
// myFunction<boolean>('abc') // ❌ Erro se descomentar — espera null

//------------------------------------------
//     Função que retorna uma outra função com tipo condicional
//------------------------------------------

// myFunction2 retorna uma função cujo parâmetro depende de T
function myFunction2<T>(param: T) {
    return function(param2: T extends number ? number : MyString) {
        console.log('Valor interno:', param2)
    }
}

const minhaFuncao = myFunction2(100) // T é number

// minhaFuncao('texto') // ❌ Erro: como T é number, param2 deve ser number
minhaFuncao(10)         // ✅ OK

// Se chamássemos: const outra = myFunction2('oi')
// então: outra aceitaria apenas strings


//==========================================
//                  NEVER
//==========================================
// O tipo 'never' representa algo que nunca ocorre.
// Quando usamos uma condicional e ela não corresponde, podemos "cancelar" o tipo com 'never'.

type NumberOrNothing<T> = T extends number ? number : never

// const teste: NumberOrNothing<boolean> = 0 // ❌ Erro: boolean resulta em never
const test: NumberOrNothing<number> = 10     // ✅ OK: number resulta em number

/*
Resumo:
- Conditional Types: permite criar tipos que mudam com base em uma condição.
- T extends U ? X : Y → Se T for compatível com U, retorna X, senão retorna Y.
- never: usado quando queremos eliminar tipos que não se encaixam em uma condição.

Exemplo prático:
type OnlyStrings<T> = T extends string ? T : never
→ útil para filtrar apenas tipos string dentro de uma união.
*/
