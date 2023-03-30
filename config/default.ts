const dotenv = require('dotenv')
dotenv.config()

export default {
    port: process.env.PORT,
    dbUri: process.env.DB_URI
}