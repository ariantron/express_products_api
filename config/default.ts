const dotenv = require('dotenv')
dotenv.config()
const env = process.env

export default {
    port: env.PORT,
    dbUri: env.DB_URI,
    saltWorkFactor: 10,
    publicKey: env.PUBLIC_KEY,
    privateKey: env.PRIVATE_KEY
}