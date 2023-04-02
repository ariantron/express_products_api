import SessionModel from "../models/session.model"

class SessionService {
    static async create(userId: string, userAgent: string) {
        try {
            const session = await SessionModel.create({userId, userAgent})
            return session.toJSON()
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export default SessionService