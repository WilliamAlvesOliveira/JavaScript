agora = new Date() //comando para pegar a data,hora do sistema
hora = agora.getHours() //pega somente a hora
console.log(agora)
console.log('Agora são ',hora,'horas')
if(hora <= 12){
    console.log('Bom Dia!')
} else if (hora <= 6){
    console.log('Boa Tarde')
}else{
    comsole.log('Boa Noite!')
}

dia = agora.getDay()
console.log(`Hoje é`)
switch (dia){
    case 0:
        console.log('Domingo')
        break
    case 1:
        console.log('Segunda')
        break
    case 2:
        console.log('Terça')
        break
    case 3:
        console.log('quanta')
        break
    case 4:
        console.log('quinta')
        break
    case 5:
        console.log('Sexta')
        break
    default:
        console.log('Sábado')
        break
}

nome = 'camila'

switch(nome){
    case 'william':
        console.log('É o william')
        break
    case 'joaquim':
        console.log('É o joaquim')
        break
    default:
        console.log('não é nenhum dos dois')
}