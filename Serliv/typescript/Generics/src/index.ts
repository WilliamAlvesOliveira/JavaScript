//=================
//  GENERICS
//=================
//* O que são Generics:
// Generics são uma forma de tornar funções, classes ou interfaces mais flexíveis,
// permitindo que o tipo de dado seja definido no momento do uso, e não fixado na declaração.
// Isso nos dá segurança de tipo, reuso e autocompletar, sem abrir mão da flexibilidade.

function somaOuConcatena(x: number | string, y: number | string): number | string {
    return (typeof x === 'number' && typeof y === 'number')
        ? x + y 
        : x + '' + y
}

// Exemplos de uso:
console.log(somaOuConcatena(1, 2))       // saída: 3 (soma numérica)
console.log(somaOuConcatena('1', '2'))   // saída: '12' (concatenação de strings)
console.log(somaOuConcatena('1', 2))     // saída: '12' (concatenação por coerção)

// Problema: mesmo sendo possível somar/concatenar, a função aceita misturar tipos,
// o que pode causar resultados inesperados. Para resolver isso, usamos Generics:
// Se o primeiro argumento for string, o segundo também precisa ser string.
// Se for number, o segundo também precisa ser number.

function genericSomaOuConcatena<T>(x: T, y: T) {
    return (typeof x === 'number' && typeof y === 'number')
        ? x + y 
        : x + '' + y
}

// Exemplos:
genericSomaOuConcatena(1, 2)          // OK
genericSomaOuConcatena('1', '2')      // OK
// genericSomaOuConcatena(1, '2')     // Erro: tipos diferentes
// genericSomaOuConcatena('1', 2)     // Erro: tipos diferentes

console.log(genericSomaOuConcatena(true, false)) // ✅ válido, pois ambos são boolean


// Para restringir os tipos aceitos a apenas number ou string, usamos `extends`

function SomaOuConcatenaG<T extends number | string>(x: T, y: T) {
    return (typeof x === 'number' && typeof y === 'number')
        ? x + y 
        : x + '' + y
}

// SomaOuConcatenaG(true, false) // ❌ Erro: boolean não é permitido


// Podemos também criar um type alias auxiliar para reutilizar a restrição de tipo:

type NumStr = number | string

function SomaOuConcatenaG2<T extends NumStr>(x: T, y: T) {
    return (typeof x === 'number' && typeof y === 'number')
        ? x + y 
        : x + '' + y
}

// SomaOuConcatenaG2(true, false) // ❌ Erro
