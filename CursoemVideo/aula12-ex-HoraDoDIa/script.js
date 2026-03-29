function carregar(){
    var msg = window.document.getElementById('msg')
    var foto = document.getElementsByClassName('imagem')[0]
    data = new Date()
    var hora = data.getHours()
    msg.innerHTML = `Agora são ${hora} horas.`

    if(hora >= 0 && hora < 12){
        foto.style.backgroundColor = 'yellow'
        document.body.style.backgroundImage = 'linear-gtadient(to bottom, yellow, orange)'
    } else if(hora >=12 && hora < 18){
        foto.style.backgroundColor = 'orange'
        document.body.style.backgroundImage= 'linear-gradient(to bottom, orange, darkblue)'
    }else{
        foto.style.backgroundColor = "darkblue"
        document.body.style.background = 'darkblue'
    }
}

