//------------------------------
//     Enunciado
//
//parametros e sa[idas
//
//console.log(nome) // Nome
//console.log(nomeESobrenome)//Sobrenome, Nome
//console.log(nome-sobrenome-terceitonome)//Sobrenome Terceironome, Nome
//------------------------------


function formatarNome(nome){ 
    nome = nome.trim()
    let primeiroEspaço = nome.indexOf(' ')
    if (primeiroEspaço < 0) return nome

    let primeitoNome = nome.substring(0, primeiroEspaço)
    let sobreNome = nome.substring(primeiroEspaço+1)
    return sobreNome + ', '+ primeitoNome
}

let nome1 = 'William' 
let nome2 = 'William Oliveira'
let nome3 = 'William Alves de Oliveira'

console.log(formatarNome(nome1))
console.log(formatarNome(nome2))
console.log(formatarNome(nome3))
console.log(' ')

//------------------------------
//sobrenome, nome
//------------------------------

function formatarNome2(nomeCompleto){ 
    nomeCompleto = nomeCompleto.trim()
    let ultimoEspaço = nomeCompleto.lastIndexOf(' ')
    if (ultimoEspaço < 0) return nomeCompleto

    let ultimoNome = nomeCompleto.substring(ultimoEspaço + 1)
    let nome= nomeCompleto.substring(0, ultimoEspaço)
    return ultimoNome + ', '+ nome
}

console.log(formatarNome2(nome1))
console.log(formatarNome2(nome2))
console.log(formatarNome2(nome3))
console.log(' ')

//------------------------------
//Usando método split
//------------------------------

function formatarNome3(nome){ 
    let arrayNome = nome.split(' ')

    if(arrayNome.length === 1) return nome

    let primeitoNome = arrayNome.shift()
    
    return arrayNome.join(' ') + ', ' + primeitoNome
}


console.log(formatarNome3(nome1))
console.log(formatarNome3(nome2))
console.log(formatarNome3(nome3))
console.log(' ')

//------------------------------
//sobrenome, nome
//------------------------------
 
function formatarNome4(nome){ 
    let arrayNome = nome.split(' ')

    if(arrayNome.length === 1) return nome

    let sobreNome = arrayNome.pop()
    
    return sobreNome + ', ' + arrayNome.join(' ')
}


console.log(formatarNome4(nome1))
console.log(formatarNome4(nome2))
console.log(formatarNome4(nome3))