function calcularIMC(peso, altura, action){
    if (typeof peso !== 'number' || typeof altura !== 'number'){ return 0 }
    console.log(peso, altura)
    let IMC = peso / (altura**2)
    if (typeof action === "function"){
        return action(IMC)
    }
    return IMC
}

const classificarIMC = (IMC) =>{return
    IMC <= 16.9 ? "Muito abaixo do peso" :
    IMC <= 18.4 ? "Abaixo do peso" :
    IMC <= 24.9 ? "Peso normal" :
    IMC <= 29.9 ? "Sobrepeso" :
    IMC <= 34.9 ? "Obesidade Grau I" :
    IMC <= 40   ? "Obesidade Grau II" : "Obesidade Grau III"};
  

console.log(calcularIMC())
console.log(calcularIMC(60, 1.64))
console.log(calcularIMC(60, 1.64, classificarIMC))
console.log(classificarIMC(35))