import SessionModel, {SessionDocument} from "../models/session.model"
import {FilterQuery} from "mongoose"
import {signJwt, verifyJwt} from "../utills/jwt.utill"
import {get} from "lodash"
import TokenType from "../enums/tokenType.enum"
import config from "config"
import UserService from "./user.service";

class SessionService {
    static async create(userId: string, userAgent: string) {
        try {
            const session = await SessionModel.create({user: userId, userAgent})
            return session.toJSON()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async find(query: FilterQuery<SessionDocument>) {
        return SessionModel.find(query).lean()
    }

    static async reIssueAccessToken({refreshToken}: { refreshToken: string }) {
        const {decoded} = verifyJwt(refreshToken, TokenType.RefreshTokenPublicKey)
        if (!decoded || !get(decoded, "session")) return false
        const session = await SessionModel.findById(get(decoded, "session"))
        if (!session || !session.valid) return false
        const user = await UserService.find({_id: session.user})
        if (!user) return false
        return signJwt(
            {...user, session: session._id},
            TokenType.AccessTokenPrivateKey,
            {expiresIn: config.get("accessTokenTtl")} // 15 minutes
        );
    }
}

export default SessionService