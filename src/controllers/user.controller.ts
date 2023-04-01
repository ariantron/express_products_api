import {Request, Response} from "express"
import UserService from "../services/user.service";
import logger from "../utills/logger";

class UserController {
    static async create(request: Request, response: Response) {
        try {
            const user = await UserService.create(request.body)
            return response.send(user)
        } catch (error) {
            logger.error(error)
            return response.status(409).send(error.message)
        }
    }
}

export default UserController