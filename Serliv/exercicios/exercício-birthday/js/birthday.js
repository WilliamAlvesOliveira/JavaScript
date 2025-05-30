function quantoFaltaPara(m, d, ano) {
    const today = new Date()
    const currentYear = today.getFullYear()
    const one_day = 24 * 60 * 60 * 1000
    
    const birthday = new Date(currentYear, m- 1, d).getTime()
    const currentDay = today.getTime()
    console.log(`birthday code ${birthday}`)
    console.log(`hoje code ${currentDay}`)

    if(birthday < currentDay){
        let nextbirth = new Date(currentYear + 1, m- 1, d).getTime()
        console.log(nextbirth)
        let dias = Math.floor((nextbirth - currentDay) / one_day )
        return dias
    }else{
        let dias = Math.floor((birthday - currentDay) / one_day )
        return dias
    }

}

