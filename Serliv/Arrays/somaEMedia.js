export function somar (...numeros){
    console.log(typeof numeros)
    if (numeros.length === 1 && Array.isArray(numeros[0])) {
        numeros = numeros[0];

    }
    const soma = numeros.reduce((sum, atual) => sum + atual, 0)
    console.log(soma)
    
    return soma
}

export function media (...numeros){
    const soma = somar(...numeros)
    if (numeros.length === 1 && Array.isArray(numeros[0])){
        numeros = numeros[0];
        
    }
    const media = soma / numeros.length
    console.log(media)
    return numeros.length ? media : 0; 
}

somar()
somar(3,8)
somar([3,8])
media(3,8)
media([3,8])

