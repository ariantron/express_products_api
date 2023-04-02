import {Request, Response} from "express"
import UserService from "../services/user.service";
import logger from "../utills/logger.utill";
import {CreateUserInput} from "../schemas/user.schema";

class UserController {
    static async create(request: Request<{}, {}, CreateUserInput["body"]>, response: Response) {
        try {
            const user = await UserService.create(request.body)
            return response.send(user)
        } catch (error: any) {
            logger.error(error)
            return response.status(409).send(error.message)
        }
    }
}

export default UserController