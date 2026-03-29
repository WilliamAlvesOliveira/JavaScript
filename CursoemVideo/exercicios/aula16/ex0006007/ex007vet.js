let lista = []
let maior = 0
let menor = 0
let total = 0

function adicionar(){
    let entrada = document.getElementById('numero')
    let num = entrada.value
    if (num === '' || num <= 0 || num > 100 ){
        window.alert('Insira um número válido')
    }else{
        let n = Number(num)
        let mensagem = document.querySelector('#containervet')
        if (lista.length === 0){
            mensagem.innerHTML += `<p>Número ${n} foi adicionado.</p>`
            lista.push(n)
            maior = n
            menor = n
            total = n
        }else{
            if (lista.includes(n)){
                alert('Número já adicionado')
            }else{
                mensagem.innerHTML += `<p>Número ${n} foi adicionado</p>`
                lista.push(n)
                total += n
                if (n > maior){
                    maior = n
                }else if (n < menor){
                    menor = n
                }
            }
        }
        entrada.value=''
        entrada.focus()
    }
}

function finalizar(){
    let res = document.querySelector('#resultado')
    if (lista.length === 0){
        alert('Insira um número')
    }else{
        res.innerHTML = `<p>Os números adicionados foram: ${lista}</p>`
        res.innerHTML += `<p>Ao todo temos ${lista.length} números</p>`
        res.innerHTML += `<p>O maior número informado foi ${maior}.</p>
        <p>O menor número informado foi ${menor}.</p>
        <p>Somando todos os valores temos: ${total}.</p>
        <p>A média dos valores digitados é: ${(total/lista.length).toFixed(1)}.</p>`
    }
}