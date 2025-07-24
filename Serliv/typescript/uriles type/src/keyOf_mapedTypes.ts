import { Square } from './index' // Importa o tipo Square de outro arquivo

//==========================================
//                KEYOF
//==========================================
// O operador 'keyof' retorna um tipo que é a união das chaves de um objeto

// Exemplo: se Square for { x: number, y: number, width: number, height: number }
// então: OnePropertyOfSquare será equivalente a: 'x' | 'y' | 'width' | 'height'
type OnePropertyOfSquare = keyof Square

// Isso é útil para trabalhar dinamicamente com nomes de propriedades
// Podemos, por exemplo, fazer validações, acessar dinamicamente, etc.


//==========================================
//             MAPPED TYPES
//==========================================
// Mapped Types permitem criar novos tipos baseados em um conjunto de chaves

// Define três propriedades possíveis: 'x', 'y' e 'z'
type Props = 'x' | 'y' | 'z'

// Cria um tipo onde cada propriedade de 'Props' será do tipo number
type MappedFromProps = {
    [P in Props]: number
}

// Equivalente a:
// type MappedFromProps = {
//   x: number;
//   y: number;
//   z: number;
// }


//------------------------------------------
//     Mapped Types com Generics
//------------------------------------------

// Define um tipo genérico que aceita qualquer conjunto de chaves
// desde que sejam string, number ou symbol
type MappedFromProps2<T extends string | number | symbol> = {
    [P in T]: number
}

// Podemos usar esse tipo para criar tipos dinamicamente a partir de unions
type MyMappedTypes = MappedFromProps2<Props>
// Resultado:
// type MyMappedTypes = { x: number; y: number; z: number }


//------------------------------------------
//     Mapped Types com keyof T (extração total)
//------------------------------------------

// Cria um tipo baseado nas chaves e tipos de outro tipo qualquer
type MappedFromProps3<T> = {
    [P in keyof T]: T[P]
    /*
    Outras variações:
    [P in keyof T]?: T[P]                → todas as propriedades se tornam opcionais
    readonly [P in keyof T]: T[P]        → todas as propriedades se tornam readonly
    [P in keyof T]: T[P] | 'desconhecido' → permite valores alternativos
    */
}

// Exemplo de uso com objeto literal
type teste = MappedFromProps3<{ a: 'a', b: 'b' }>
// Resultado:
// type teste = {
//   a: 'a';
//   b: 'b';
// }


//==========================================
//            LOOKUP TYPES
//==========================================
// Lookup Types permitem extrair o tipo de uma propriedade específica de outro tipo

// Tipo base representando uma conta bancária
type BanlAcount = {
    id: number
    name: string
    count: {
        agency: number
        code: number
        digit: number
    }
}

// Extraindo o tipo da propriedade 'id' diretamente de BanlAcount
type Id = BanlAcount['id']          // Resultado: number

// Extraindo o tipo da propriedade 'count' (um objeto)
type Count = BanlAcount['count']    // Resultado: { agency: number, code: number, digit: number }

// Podemos ir mais fundo para extrair 'digit' dentro de 'count'
type Digit = BanlAcount['count']['digit'] // Resultado: number


//==========================================
//                TYPEOF
//==========================================
// O operador typeof permite capturar o tipo de uma variável ou constante
// Isso é útil para reaproveitar o tipo de algo já existente sem precisar reescrevê-lo

const myCount: BanlAcount = {
    id: 1,
    name: 'William',
    count: {
        agency: 1234,
        code: 12,
        digit: 5
    }
}

// Aqui estamos dizendo: o tipo TypeOfMyCount será igual ao tipo de 'myCount'
type TypeOfMyCount = typeof myCount
// Resultado: mesmo tipo que BanlAcount

// Podemos extrair partes específicas também
type TypeOfMyCountId = typeof myCount.id
// Resultado: number

// Outro exemplo simples com string
let minhaString = 'Olá, Mundo!'
let string2: typeof minhaString
// string2 agora também será do tipo string
