const app = require('./src/app.js')
const connectToDb = require('./src/db/connect.js')

const PORT = process.env.PORT || 3000
const url = process.env.MONGO_URL

const main = async () => {
    try{
        await connectToDb(url)
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

main()


