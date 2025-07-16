let msg: string = 'teste de string'
console.log(msg)

let n: number = 123

let isValid: boolean = false

//arrays
let numArr: number[]
let strArr: string[]

//
let strArrGeneric: Array<string>
strArrGeneric = ['teste','teste2', 'teste3']


//========================
//obj
//========================
let aluno: {nome: string, aprovado: boolean, idade: number}
aluno ={
    nome: 'Maria',
    aprovado: true,
    idade: 10
}

//
let aluno2: {}
aluno2 ={
    nome: 'Maria',
    idade: 10
}

//========================
// tuplas
//========================

let alunoTuple: {nome: string, aprovado?: boolean, idade: number, notas:[number, number, number, number]}

alunoTuple = {
    nome: 'Joaquim',
    idade: 12,
    notas:[10, 7 ,7, 9]
}

//========================
//enum
//========================

enum Sizes{
    SMALL, NORMAL, LARGE
}
//AMALL = 0 | NORMAL = 1 | LARGE = 2

enum Sizes2{
    SMALL = '12px',
    NORMAL = '16px',
    LARGE = '22px'
}

//========================
//type any & unknown <- devemos evitar sempre que possivel
//========================

//any
/*
function soma(x, y){//vai dar um alerta de erro que pode 
    return x + y
}
// mas podemos  desativar na configuração noImplicitAny e  atribuir false
*/

//unknown
/* exemplo sem checagem
function typeUnknow(x: unknown, y: unknown){
    return x + y 
}

const unknownTest = typeUnknow(3, 6) //type any
*/

//exemplo com checagem
function typeUnknow2(x: unknown, y: unknown){
    if(typeof x === 'number' && typeof y === 'number'){
        return x + y
    }
    return 'tipo desconhecidos'
}

const unknownTest2 = typeUnknow2(3, 5)// type number | 'tipo desconhecidos'

//========================
//void & never
//========================

//void - retorno de função que não possui um return

function showFeedback(message:string , type: string): void{
    console.log(type.toUpperCase() + ': ' + message)
    //qualquer tipo de return gerará um erro 
}

const voidTest = showFeedback('ok', 'info') //void /undefined

//========================
//never
//========================

function showError(message: string): never{
    throw new Error('funcção marcada com never nunca retorna nada')
}

const error =  showError('errp')

//========================
//undefined && null
//========================

const isUndefined: undefined = undefined
const isnull: null = null

//========================
//union type
//========================

function unionFunc(x: number, y?:number){
    if(y === undefined){
        return null
    }
    return x + y
}
const unionTest = unionFunc(10)

let unionTypeTest: string | number
unionTypeTest = 'Olá, Mundo!'
unionTypeTest = 10
//unionTypeTest = false

let unionObj :{
    nome: string,
    idade: number | null
}

//========================
//alias
//========================
//alias para tipos
type Tipospermitidos = string | number | boolean

let aliasTest: Tipospermitidos

//alias para objetos
type User = {
    nome: string,
    idade?: number
}

const novoUsuario: User = {
    nome: 'Usuario'
}

type AliasSizes = '12px' | '16px' | '22px'

const small: AliasSizes = '12px'

//========================
//intersection
//========================

type UserInteserction ={
    nome: string,
    id: number
}

type LevelAdimin = 'teacher' | 'cordenator' | 'menager'

type AdminIntersection = {
    isAdmin: true,
    level: LevelAdimin
}

type UserAdmin = UserInteserction & AdminIntersection

let administrador: UserAdmin = {
    nome: "Administrador",
    id: 123456,
    isAdmin: true,
    level: 'teacher'
}

//==============================
//function
//==============================
function tyoedFunction(x:number, y:number ):number{
    return x + y
}

const typedArrowFunc = (x:number):number =>  x*2
const typedArrowFunc2 = (x:number):string => 'x'
const tyoedFunction3: (x:number, y:number) => number  = (x,y) => x+y

const isAdmin: (user: UserAdmin) => boolean = (user: UserAdmin) => user.isAdmin
console.log(isAdmin(administrador)) // true)

//===================================
//assection
//===================================
type IsAdmin = (user: User) => boolean

const isAdmin2: IsAdmin = (user) => !!(user as UserAdmin).isAdmin

let maria: UserInteserction = {
    nome: 'Maria',
    id: 12
}

console.log(isAdmin2(administrador)) //true
console.log(isAdmin2(maria)) //false 

//assection para elementos do dom
//exemplos sem assertcion
const testeDom = document.getElementById('teste')
testeDom?.addEventListener('click', e => console.log(e))

const testeDom2 = document.getElementById('teste')!
testeDom2.addEventListener('click', e => console.log(e))

// exemplo com assertion
const testeDom3 = document.getElementById('teste') as HTMLButtonElement
testeDom3.addEventListener('click', (e: MouseEvent) => console.log(e))
