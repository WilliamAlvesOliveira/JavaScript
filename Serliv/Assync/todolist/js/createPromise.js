export function createPromise(method, url, data = null) {
    return new Promise(function(resolve, reject){
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)
        xhr.setRequestHeader("Content-Type'", "application/json;charset=UTF-8")
        xhr.send(data)

        xhr.onreadystatechange = verificaAjax

        function verificaAjax() {
            if (xhr.readyState === 4) {

                if (xhr.status < 400) {
                    const json = JSON.parse(xhr.responseText)
                    resolve(json)

                } else{
                    reject(Error('Algo deu errado com a conexão'))
                }
            }
        }
    })
}
