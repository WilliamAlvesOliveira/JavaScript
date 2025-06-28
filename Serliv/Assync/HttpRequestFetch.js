// Função genérica para fazer requisições HTTP usando fetch
// Parâmetros:
// - method: método HTTP (GET, POST, etc.)
// - url: endereço da API ou arquivo JSON
// - data: dados a serem enviados (usado em POST, PUT, etc.)
// - callback: função que será chamada com a resposta (em caso de sucesso ou erro)
function fetchData(method, url, data = null, callback) {
    // Criamos o objeto de configuração da requisição
    const options = {
        method: method,              // Método HTTP (GET, POST, etc.)
        headers: {
            'Content-Type': 'application/json' // Informamos que estamos enviando (ou esperando) JSON
        }
    }

    // Se for um método que envia dados (POST, PUT...), incluímos o body com JSON
    if (data && method !== 'GET') {
        options.body = JSON.stringify(data) // Convertemos os dados JS para JSON string
    }

    // Fazemos a requisição usando fetch
    fetch(url, options)
        .then(response => {
            // Verifica se a resposta foi bem-sucedida (status 200–299)
            if (!response.ok) {
                throw {
                    status: response.status,
                    message: 'Erro na resposta da API',
                    response: response
                }
            }
            return response.json() // Convertemos o corpo da resposta em JSON
        })
        .then(json => {
            // Se houver callback e ele for uma função, chamamos passando os dados recebidos
            if (typeof callback === 'function') {
                callback(json)
            }
        })
        .catch(error => {
            // Tratamos qualquer erro (conexão, parse, ou erro manual lançado acima)
            if (typeof callback === 'function') {
                callback({
                    status: error.status || 0,
                    message: error.message || 'Erro de rede ou JSON inválido',
                    obj: error
                })
            }
        })
}
