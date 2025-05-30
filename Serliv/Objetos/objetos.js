// sintaxe literal para objetos
const objeto1 = {
    nome: 'william'
}

//sintaxe formal
const objeto2 = new Object
objeto2.nome = 'Maria'
objeto2['idade'] = 5

//a sintaxe formal usando o método construtor new fará o objeto receber um [[primary object]] que recebera algumas propriedades e métodos padrão.

const data1 = Date()
console.log(data1) //saída: diaSemana-mes-diaMes-ano / hora-min-seg / codigo / localidade
console.log(typeof data1) //saída string

const data2 = new Date()
console.log(data2) //saída 2025-05-21T11:42:45.560Z
console.log(typeof data2)// saída object
