function mascararTelefone(numeroDeTelefone){
    let hiffenIndex = numeroDeTelefone.indexOf('-')
    let partInicio = numeroDeTelefone.slice(0, hiffenIndex)
    let partEnd = numeroDeTelefone.slice(hiffenIndex + 1)
    
    return `${partInicio[0].padEnd(partInicio.length,'*')}-${partEnd.slice(-2).padStart(4,'*')}`
}

const telefone = '95817-1140'
console.log(telefone)
console.log(mascararTelefone(telefone))