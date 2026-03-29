function verificar(){
    var data = new Date()
    var ano = data.getFullYear()
    var input_ano = document.getElementById('ano').value
    var msg = document.querySelector('div>p#mensagem')
    var res = document.getElementById('resultado')
    if (input_ano.length == 0 || Number(input_ano) > ano){ 
        window.alert('[ERRO!] Verifique os dados e tente novamente')
    }else{
        var sexo_pessoa = document.getElementsByName('sexo')
        var idade = ano - input_ano
        var genero = ''
        msg.innerText = `Sua idade é ${idade} anos`
        if (sexo_pessoa[0].checked){
            genero = 'homem'
        }else if(sexo_pessoa[1].checked){
            genero = 'mulher'
        }
        
        if(genero == 'homem'){
            if(idade <=12){
                res.innerText = 'menino'
            }else if(idade <=21){
                res.innerText = 'Homem Jovem'
            }else if(idade <=65){
                res.innerText = 'Homem'
            }else if(idade > 65){
                res.innerText = 'Idoso'
            }
        }else if(genero == 'mulher'){
            if(idade <=12){
                res.innerText = 'menina'
            }else if(idade <=21){
                res.innerText = 'Mulher Jovem'
            }else if(idade <=65){
                res.innerText = 'Mulher'
            }else if(idade > 65){
                res.innerText = 'Idosa'
            }
        }
    }
}
