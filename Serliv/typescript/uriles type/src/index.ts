//==============================
//         UTILITIES
//==============================
//------- Partial<T> -----------

// Define um tipo chamado Square com 4 propriedades obrigatórias
export type Square = {
    x: number
    y: number
    width: number
    height: number
}

// Cria um quadrado completo, preenchendo todas as propriedades exigidas por 'Square'
const square: Square = {
    x: 10,
    y: 20,
    width: 100,
    height: 200
}

// Aqui usamos o utilitário Partial<T> do TypeScript
// Ele transforma todas as propriedades do tipo 'Square' em opcionais
// Isso permite criar objetos com apenas parte dos dados de 'Square'
const square2: Partial<Square> = { x: 150 }

// Define um tipo de função chamada 'UpdateSquare'
// Ela recebe dois parâmetros:
// - 'a' do tipo Square (objeto completo)
// - 'b' do tipo Partial<Square> (objeto parcial com atualizações)
// A função retorna um novo objeto do tipo Square
type UpdateSquare = (a: Square, b: Partial<Square>) => Square

// Função que aplica as atualizações de 'b' sobre o objeto base 'a'
// Usa Object.assign para mesclar os objetos:
// - Cria um novo objeto vazio
// - Copia todas as propriedades de 'sqr' para ele
// - Em seguida, sobrescreve com as propriedades de 'sqr2' se existirem
const updatesquare: UpdateSquare = (sqr, sqr2) => {
    return Object.assign({}, sqr, sqr2)
}

// Aplica atualização: apenas a propriedade 'x' será alterada (de 10 para 150)
const square3 = updatesquare(square, square2)

// Aplica outra atualização: altera somente a propriedade 'y' (de 20 para 230)
const square4 = updatesquare(square, { y: 230 })

// Exibe todos os quadrados no console
console.log('1: ', square)    // original, não foi alterado
console.log('2: ', square2)   // apenas com 'x'
console.log('3: ', square3)   // cópia do square com 'x' atualizado
console.log('4: ', square4)   // cópia do square com 'y' atualizado

/*
===========================================
|           RESUMO DOS CONCEITOS         |
===========================================

🔹 Partial<T>
- Transforma todas as propriedades de um tipo em opcionais.
- Muito útil para criar objetos de atualização ou formulários parciais.

🔹 Object.assign()
- Método para mesclar objetos.
- No exemplo, usamos para combinar um objeto original com um objeto de atualização.

🔹 Imutabilidade
- A função 'updatesquare' retorna um novo objeto.
- O original 'square' permanece intacto.

*/
//=========================================
//                  PICK
//=========================================
// Pick<T, K> permite criar um novo tipo a partir de outro,
// selecionando apenas as propriedades desejadas.


// Cria um tipo Position com apenas as propriedades 'x' e 'y' de Square
type Position = Pick<Square, 'x' | 'y'>

// Cria um objeto do tipo Position, contendo apenas 'x' e 'y'
const position: Position = { x: 10, y: 20 }


//==========================================
//                  OMIT
//==========================================
// Omit<T, K> é o oposto do Pick:
// remove as propriedades especificadas e mantém o restante.

// Cria um tipo Size com todas as propriedades de Square, exceto 'x' e 'y'
type Size = Omit<Square, 'x' | 'y'>

// Cria um objeto do tipo Size, contendo apenas 'width' e 'height'
const size: Size = {
    width: 100,
    height: 100
}


//==========================================
//           EXCLUDE<T, U>
//==========================================
// Exclude é usado para remover tipos de uma união.
// Ele remove da união T todos os membros que também existem em U.

type Colors = 'red' | 'blue' | 'green' | 'black' | 'white'

// Cria um novo tipo que exclui 'black' e 'white' da união de Colors
type RGB = Exclude<Colors, 'black' | 'white'>

// O tipo RGB agora é: 'red' | 'blue' | 'green'


//==========================================
//           EXTRACT<T, U>
//==========================================
// Extract faz o oposto de Exclude:
// ele mantém apenas os tipos que existem em T e também em U.

type NeutralColors = 'black' | 'white' | 'gray'

// Cria um tipo com os valores que existem tanto em Colors quanto em NeutralColors
type NeutralColorsOfColors = Extract<Colors, NeutralColors>

// Resultado: 'black' | 'white'


//==========================================
//         REQUIRED / READONLY
//==========================================

// Tipo base User com:
// - 'name' e 'email' obrigatórios
// - 'id' opcional (note o '?')
type User = {
    name: string
    email: string
    id?: number
}

//------------------------------------------
//          Required<T>
//------------------------------------------
// Torna TODAS as propriedades obrigatórias, até mesmo as que eram opcionais
type UserGet = Required<User>

// Agora 'id' também é obrigatório
const fullUser: UserGet = {
    name: "João",
    email: "joao@email.com",
    id: 123
}

//------------------------------------------
//          Partial<T>
//------------------------------------------
// Já conhecido, transforma TODAS as propriedades em opcionais
type UserPath = Partial<User>

// Podemos criar um objeto com apenas uma parte do tipo User
const partialUser: UserPath = {
    email: "teste@email.com"
}

//------------------------------------------
//          Readonly<T>
//------------------------------------------
// Torna todas as propriedades imutáveis (não podem ser reatribuídas)
type UserRead = Readonly<User>

// O objeto pode ser criado normalmente...
const readonlyUser: UserRead = {
    name: "Maria",
    email: "maria@email.com",
    id: 456
}

// ...mas tentar modificar qualquer campo depois disso causará erro de compilação
// readonlyUser.name = "Outra Maria" // ❌ Erro! name é readonly


//==========================================
//         NonNullable
//==========================================
//explicação

type CPF = {cpf: string}
type CNPJ = {cnpj :string}

type Cliente = CPF | CNPJ | null | undefined

const cliente: NonNullable<Cliente> = {cpf: ''}


//==========================================
//                RECORD
//==========================================

// O utilitário Record<K, T> é usado para criar um tipo de objeto
// onde as chaves (K) são um conjunto de strings (ou union types)
// e os valores (T) seguem um determinado tipo

// Define o tipo que representa a estrutura de um valor
type Url = {
    url: string
}

// Define um conjunto de chaves válidas (SocialMedia)
type SocialMedia = 'facebook' | 'instagram' | 'linkedin'

// Usa Record para criar um objeto onde:
// - Cada chave deve ser uma das redes sociais
// - Cada valor deve ser um objeto do tipo Url
const media: Record<SocialMedia, Url> = {
    facebook: { url: 'facebook.com' },
    instagram: { url: 'instagram.com' },
    linkedin: { url: 'linkedin.com' }
}

// Resultado:
// media = {
//   facebook: { url: 'facebook.com' },
//   instagram: { url: 'instagram.com' },
//   linkedin: { url: 'linkedin.com' }
// }
