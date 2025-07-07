export function createFetch(method, url, body = null) {
    
    function handleError(response){
        if(!response.ok){
            throw Error(response.status + ": " + response.statusText)
        }
        return response.json()
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(response => handleError(response))
}
