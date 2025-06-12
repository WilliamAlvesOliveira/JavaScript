(function(){
    let quantidade = 0
    let showed = 0

    this.produto = {
        get quantidade(){
            console.log(`quantidade foi exibida ${++showed} vez${showed >1?'es':''}`)
            return quantidade
        },
        set quantidade(valor){
            if(valor >= 0){
                quantidade = valor
            }
        }
    }
})()

produto.quantidade = 20
console.log(produto.quantidade)
produto.quantidade = 21
console.log(produto.quantidade)
produto.quantidade = 20
console.log(produto.quantidade)

