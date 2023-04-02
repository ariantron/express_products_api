import {get} from "lodash"
import {NextFunction, Request, Response} from "express"
import {verifyJwt} from "../utills/jwt.utill"
import TokenType from "../enums/tokenType.enum"
import SessionService from "../services/session.service"

const deserializeUser = async (request: Request, response: Response, next: NextFunction) => {
    const accessToken = get(request, "headers.authorization", "").replace(/^Bearer\s/, "")
    const refreshToken = get(request, "headers.x-refresh","").toString()
    if (!accessToken) return next()
    const {decoded, expired} = verifyJwt(accessToken, TokenType.AccessTokenPublicKey)
    if (decoded) {
        response.locals.user = decoded
        return next()
    }
    if (expired && refreshToken) {
        const newAccessToken = await SessionService.reIssueAccessToken({refreshToken})
        if (newAccessToken) response.setHeader("x-access-token", newAccessToken)
        const result = verifyJwt(newAccessToken as string, TokenType.AccessTokenPublicKey)
        response.locals.user = result.decoded
        return next();
    }
    return next();
};

export default deserializeUser