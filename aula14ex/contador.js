function contar(){
    var ini = Number(document.querySelector('input#inicio').value)
    var fim = Number(document.querySelector('input#fim').value)
    var passo = Number(document.querySelector('input#passo').value)
    if(passo === 0){
        alert('Passo 0 invalido, passo = 1')
        passo = 1}
    var res = document.querySelector('#resultado')
    if (ini < fim){
        for(let c = ini; c <= fim; c += passo){//contagem com for
            res.innerHTML += `${c} `
        }
    }else{
        while(ini >= fim){// contagem com while
            res.innerHTML += `${ini} `
            ini -= passo
        }
    }
}