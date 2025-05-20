// Você precisa escrever uma função que receba um array de objetos representando produtos, cada um com um nome e um preço. A função deve retornar um novo array com os preços aumentados em 10%, sem modificar o array original
import Decimal from 'decimal.js'

const produtos = [
  { nome: "Teclado", preco: 100 },
  { nome: "Mouse", preco: 50 },
  { nome: "Monitor", preco: 500 }
];

// Sua função aqui!
function novoPreço(array){
    let produtosComJuros = [...produtos]
    for (produto of produtosComJuros){
        produto.preco = produto.preco + produto.preco/100*10
    }
    return produtosComJuros
}

function novoPreco2(array) {
    return array.map(produto => ({
        ...produto,
        preco: Number(produto.preco * 1.1).toFixed(2)
    }));
}

function novoPreco3(array) {
    return array.map(produto => ({
        ...produto,
        preco: new Decimal(produto.preco).mul(1.1).toFixed(2)
    }));
}


console.log(novoPreco3(produtos))