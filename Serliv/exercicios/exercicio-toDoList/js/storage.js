;(function (window){
    "use strict"

    // localStorage é uma API do navegador que permite armazenar dados localmente no navegador do usuário, em forma de pares chave-valor (string-string). Isso significa que os dados permanecem mesmo depois que o usuário fecha ou recarrega a página.

    // 📌 Limitações:
    // Armazena apenas strings.
    // Capacidade geralmente limitada (cerca de 5MB).
    // Só acessível do mesmo domínio/origem.
    
    function getServerData(){
        //Lê os dados salvos no localStorage na chave 'tarefas' 
        
        //Usa JSON.parse para transformar a string de volta em array
        //Se não houver nada salvo, retorna um array vazio
        // Observação: localStorage.getItem('tarefas') pode retornar null, então usamos || '[]' como fallback.
        const storageObjects = JSON.parse(localStorage.getItem('tarefas') || '[]')
        return storageObjects.length ? storageObjects : []
    }

    function setNewData(arrayDeObjetos){
        //Converte o array de objetos em string com JSON.stringify
        //Salva no localStorage usando a chave 'tarefas'
        localStorage.setItem('tarefas', JSON.stringify(arrayDeObjetos));
    }

    window.storage = {
        getServerData,
        setNewData
    }
})(window)