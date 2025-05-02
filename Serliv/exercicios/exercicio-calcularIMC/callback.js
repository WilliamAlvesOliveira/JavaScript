/*exercicio
criar uma função calcularImc para calcular o IMC de uma pessoa recebendo peso, altura e uma função classificarIMC, caso a função seja chamada sem passar algum dos parametros deve retornar 0, caso receba apenas o peso e altura retorna o IMC, se for passada a função deve retornar o resultado.
entradas:
() // 0,
(60, 1.64) // 22.3081 ,
(60, 1.64, classificarIMC) // peso normal
*/


function calcularIMC(peso, altura, callback){
    if (typeof peso !== 'number' || typeof altura !== 'number'){ return 0 }
    console.log(peso, altura)
    let IMC = peso / (altura**2)
    if (typeof callback === "function"){
        return callback(IMC)
    }
    return IMC
}

const classificarIMC = (IMC) =>{
    return IMC <= 16.9 ? "Muito abaixo do peso" :
    IMC <= 18.4 ? "Abaixo do peso" :
    IMC <= 24.9 ? "Peso normal" :
    IMC <= 29.9 ? "Sobrepeso" :
    IMC <= 34.9 ? "Obesidade Grau I" :
    IMC <= 40   ? "Obesidade Grau II" : "Obesidade Grau III"};
  
//chamada sem parametro retorno 0
console.log(calcularIMC()) 
//chamada sem o atributo action para retorna somento o imc
console.log(calcularIMC(60, 1.64)) 
//chada com o atributo action retorna a classificação
console.log(calcularIMC(60, 1.64, classificarIMC))
//chamada da função classificarimc diretamente
console.log(classificarIMC(35))

