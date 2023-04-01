const dotenv = require('dotenv')
dotenv.config()
const env = process.env

export default {
    port: env.PORT,
    dbUri: env.DB_URI,
    saltWorkFactor: Number(env.SALT_WORK_FACTOR)
}