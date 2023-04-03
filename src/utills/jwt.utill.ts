import jwt from "jsonwebtoken"
import TokenType from "../enums/tokenType.enum"
import config from "config"
import logger from "./logger.utill";

export function signJwt(
    object: Object,
    keyName: TokenType.AccessTokenPrivateKey | TokenType.RefreshTokenPrivateKey,
    options?: jwt.SignOptions | undefined
) {
    const signingKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii")
    return jwt.sign(object, signingKey,
        {
            ...(options && options),
            algorithm: "RS256"
        }
    )
}

export function verifyJwt(token: string,
                          keyName: TokenType.AccessTokenPublicKey | TokenType.RefreshTokenPublicKey) {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii")
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: true,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}