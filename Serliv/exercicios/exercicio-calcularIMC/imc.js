function calcularIMC(peso, altura){
    if( peso == null ||  altura == null){
        throw new Error ('Informe os valores corretamente')
    }
    if (typeof peso !== 'number'|| typeof altura !=='number'){
        throw new Error("valor Inválido")
    }
    console.log(peso, altura)
    let IMC = peso / (altura**2)
    
    return IMC
}

IMC = calcularIMC(65, 1.65)
console.log(`O seu IMC é de: ${IMC.toFixed(2)}.`)

const classificaçãoImc = (IMC) =>
    IMC <= 16.9 ? "Muito abaixo do peso" :
    IMC <= 18.4 ?"Abaixo do peso" :
    IMC <= 24.9 ?"Peso normal" :
    IMC <= 29.9 ? "Sobrepeso": 
    IMC <= 34.9 ? "Obesidade Grau I":
    IMC <= 40 ? "Obesidade Grau II": "Obesidade Grau III";

console.log("e sua classificação é de:", classificaçãoImc(IMC))
