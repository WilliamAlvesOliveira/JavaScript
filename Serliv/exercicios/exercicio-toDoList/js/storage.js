;(function (window){
    "use strict"
    
    function getServerData(){
        const storageObjects = JSON.parse(localStorage.getItem('tarefas') || '[]')
        return storageObjects.length ? storageObjects : []
    }

    function setNewData(arrayDeObjetos){
        localStorage.setItem('tarefas', JSON.stringify(arrayDeObjetos));
    }

    window.storage = {
        getServerData,
        setNewData
    }
})(window)