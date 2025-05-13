(function(){
    'use strict'

    //input título
    const txtTitulo  = document.getElementById('txtTitulo')
    //formulário
    const checkbox = document.getElementById('chkAceito')
    const btn = document.getElementById('btn')
    const formCadastro = document.querySelector('.formCadastro')
    //text area e contador de caracteres
    const txtDescricao = document.getElementById('txtDescricao')
    const contadorContainer = document.getElementById('contador')
    contadorContainer.style.display = 'block' //aparece somente caso js abilitado
    const contadorDeCaracteres = contadorContainer.firstElementChild
    const maximoDeCaracteres = txtDescricao.maxLength
    mostrarNumeroDeCaracteres(maximoDeCaracteres)

    function mostrarNumeroDeCaracteres(numero){
        contadorDeCaracteres.innerText = numero
    }

    checkbox.addEventListener('change', function () {
        btn.disabled = !checkbox.checked;
        });

    formCadastro.addEventListener('submit', function(evento){
        evento.preventDefault()
        if (!txtTitulo.value.trim()){
            window.alert('Preencha todos os campos.')
            txtTitulo.focus()
        }else{
            console.log(txtTitulo.value)
            txtTitulo.value = ''
        }
    })

    txtDescricao.addEventListener('input', function(){
        //poderia ser usando o this, mas optei por usar a varável para desxar configurado para arrow function
        let numeroDeLetrasDigitadas = txtDescricao.value.length

        // parseInt deve ser usado sempre que recebemos um valor numerico da interface gráfica
        let letrasRestantes =  parseInt(maximoDeCaracteres) - numeroDeLetrasDigitadas
        
        mostrarNumeroDeCaracteres(letrasRestantes)
    })
})()
    
