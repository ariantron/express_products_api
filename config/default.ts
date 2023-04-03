const dotenv = require('dotenv')
dotenv.config()
const env = process.env

export default {
    port: env.PORT,
    dbUri: env.DB_URI,
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    accessTokenPublicKey: env.ACCESS_TOKEN_PUBLIC_KEY,
    accessTokenPrivateKey: env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: env.REFRESH_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: env.REFRESH_TOKEN_PRIVATE_KEY
}