import {Request, Response} from "express"
import UserService from "../services/user.service"
import {HttpStatusCode} from "../enums/httpStatusCode.enum"
import SessionService from "../services/session.service"
import {signJwt} from "../utills/jwt.utill"
import config from "config"
import TokenType from "../enums/tokenType.enum"

class UserSessionController {
    static async create(request: Request, response: Response) {
        //Validate the user's password
        const user = await UserService.validatePassword(request.body)
        if (!user)
            return response.status(HttpStatusCode.Unauthorized).send("Invalid email or password")

        //Create a session
        const session = await SessionService.create(user._id, request.get("user-agent") || "")

        //Create an access token
        const accessToken = signJwt(
            {...user, session: session._id},
            TokenType.AccessTokenPrivateKey,
            {expiresIn: config.get('accessTokenTtl')}
        )

        //Create a refresh token
        const refreshToken = signJwt(
            {...user, session: session._id},
            TokenType.RefreshTokenPrivateKey,
            {expiresIn: config.get('refreshTokenTtl')}
        )

        //Access to access and refresh token
        return response.send({accessToken, refreshToken})
    }

    static async get(request: Request, response: Response) {
        const userId = response.locals.user._id
        const sessions = await SessionService.find({user: userId, valid: true})
        return response.send(sessions)
    }

    static async delete(request: Request, response: Response) {
        const sessionId = response.locals.user.session
        await SessionService.update({_id: sessionId}, {valid: false})
        return response.send({
            accessToken: null,
            refreshToken: null
        })
    }
}

export default UserSessionController