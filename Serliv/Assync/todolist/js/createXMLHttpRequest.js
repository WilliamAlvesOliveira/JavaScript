// Função genérica para criar uma requisição HTTP usando XMLHttpRequest.
// Parâmetros:
// - method: método HTTP (GET, POST, etc.)
// - url: endereço do recurso (ex: um arquivo .json ou uma API)
// - data: dados a serem enviados no corpo da requisição (para POST, PUT, etc.)
// - callback: função que será chamada com a resposta (sucesso ou erro)
export function createXMLHttpRequest(method, url, callback, data = null) {

    // Cria uma nova instância de XMLHttpRequest
    const xhr = new XMLHttpRequest()

    // Inicializa a requisição com o método e a URL
    xhr.open(method, url)

    // Envia a requisição. Se o método for GET, o 'data' será ignorado.
    xhr.send(data)

    // Define a função que será chamada sempre que o estado da requisição mudar
    xhr.onreadystatechange = verificaAjax

    // Função interna que verifica o status da requisição
    function verificaAjax() {

        // readyState === 4 significa que a requisição foi concluída
        if (xhr.readyState === 4) {

            // status 200: OK | status 304: conteúdo não modificado (cache)
            if (xhr.status === 200 || xhr.status === 304) {

                // Converte a resposta JSON (texto) em objeto JavaScript
                const json = JSON.parse(xhr.responseText)

                // Se foi fornecida uma função de callback, chamamos passando os dados
                if (typeof callback === 'function') {
                    callback(json)
                }

            } else if (typeof callback === 'function') {
                // Se houve erro (status diferente de 200 ou 304), chamamos o callback com informações do erro
                callback({
                    error: true,
                    status: xhr.status,
                    message: 'Algo deu errado com a conexão',
                    obj: xhr
                })
            }
        }
    }
}
