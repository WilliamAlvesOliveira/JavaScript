import "core-js"
import axios from 'axios'

const test = 'teste'

const arrowFn = n => n * n
console.log(arrowFn(2))

class Teste{
    constructor(n){
        this.n = n
    }
}

console.log(new Teste(5))

const getAdress = async (cep) =>{
    let url = `http://viacep.com.br/ws/${cep}/json`
    try{
        const resposta = await axios.geth(url)
        const json = await resposta.data()
        return json
    }catch(e){
        throw e
    }
}

const endereco = getAdress('08080-700').then( data => console.log(data))
console.log(endereco)

//para otimizar o código ao inves de importarmos todo o core-js importamos apenas as partes necessárias dele utoilizando o import "core-js/stale"

//também podemos retirar a importação do core-js/stable do arquivo econfigura-lo na entry no nosso arquivo webpack.config

//depois no webapck.config mudamos a propriedade mode de development para production
