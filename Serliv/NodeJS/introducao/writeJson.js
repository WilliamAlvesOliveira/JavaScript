const fs = require('fs')
const dados = require('./dados/users.json')

dados.push({name: 'user2', email: 'maria@server.com'})

fs.writeFile('./dados/users.json', JSON.stringify(dados), err =>{
    if(err) throw err
})